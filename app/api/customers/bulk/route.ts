import { NextRequest, NextResponse } from "next/server";
import { userPrisma } from "@/lib/user-prisma";
import { formatUserId, getIdPrefix, getMaxSequence } from "@/lib/user-id";

type RawBulkRecord = {
  name?: string;
  email?: string;
  phone?: string;
  accountType?: string;
  isBusinessAccount?: boolean | string;
  businessName?: string;
  gstNumber?: string;
  hasAdditionalTradeName?: boolean | string;
  additionalTradeName?: string;
  billingHouseNo?: string;
  billingLine1?: string;
  billingLine2?: string;
  billingCity?: string;
  billingDistrict?: string;
  billingState?: string;
  billingStateCode?: string;
  billingCountry?: string;
  billingPincode?: string;
};

type NormalizedRecord = {
  name: string;
  email: string;
  phone: string;
  isBusinessAccount: boolean;
  businessName: string | null;
  gstNumber: string | null;
  hasAdditionalTradeName: boolean;
  additionalTradeName: string | null;
  billingAddress: {
    houseNo: string;
    line1: string;
    line2: string | null;
    city: string;
    district: string;
    state: string;
    stateCode: string | null;
    country: string;
    pincode: string;
  } | null;
};

type PreviewRow = {
  rowNumber: number;
  expectedId: string;
  data: NormalizedRecord;
  errors: string[];
};

const BUSINESS_TYPE_VALUES = new Set([
  "business",
  "bussiness",
  "company",
  "b2b",
  "corporate",
]);

const INDIVIDUAL_TYPE_VALUES = new Set([
  "individual",
  "indivisla",
  "personal",
  "b2c",
  "user",
]);

function normalizeText(value: unknown) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function parseBoolean(value: unknown) {
  if (typeof value === "boolean") return value;
  const normalized = normalizeText(value).toLowerCase();
  return ["true", "1", "yes", "y"].includes(normalized);
}

function resolveIsBusiness(record: RawBulkRecord) {
  if (typeof record.isBusinessAccount === "boolean") {
    return record.isBusinessAccount;
  }
  if (typeof record.isBusinessAccount === "string") {
    return parseBoolean(record.isBusinessAccount);
  }
  const typeValue = normalizeText(record.accountType).toLowerCase();
  if (BUSINESS_TYPE_VALUES.has(typeValue)) return true;
  if (INDIVIDUAL_TYPE_VALUES.has(typeValue)) return false;
  return false;
}

function toNormalizedRecord(record: RawBulkRecord): NormalizedRecord {
  const isBusinessAccount = resolveIsBusiness(record);
  const hasAdditionalTradeName = parseBoolean(record.hasAdditionalTradeName);
  const billingAddress = isBusinessAccount
    ? {
        houseNo: normalizeText(record.billingHouseNo),
        line1: normalizeText(record.billingLine1),
        line2: normalizeText(record.billingLine2) || null,
        city: normalizeText(record.billingCity),
        district: normalizeText(record.billingDistrict),
        state: normalizeText(record.billingState),
        stateCode: normalizeText(record.billingStateCode) || null,
        country: normalizeText(record.billingCountry) || "India",
        pincode: normalizeText(record.billingPincode),
      }
    : null;

  return {
    name: normalizeText(record.name),
    email: normalizeText(record.email),
    phone: normalizeText(record.phone),
    isBusinessAccount,
    businessName: isBusinessAccount ? normalizeText(record.businessName) || null : null,
    gstNumber: isBusinessAccount ? normalizeText(record.gstNumber) || null : null,
    hasAdditionalTradeName: isBusinessAccount ? hasAdditionalTradeName : false,
    additionalTradeName:
      isBusinessAccount && hasAdditionalTradeName
        ? normalizeText(record.additionalTradeName) || null
        : null,
    billingAddress,
  };
}

async function buildPreviewRows(records: RawBulkRecord[]) {
  const normalized = records.map(toNormalizedRecord);
  const year = new Date().getFullYear();

  const businessPrefix = getIdPrefix(true);
  const individualPrefix = getIdPrefix(false);
  const [businessStart, individualStart] = await Promise.all([
    getMaxSequence(userPrisma, businessPrefix, year),
    getMaxSequence(userPrisma, individualPrefix, year),
  ]);

  let businessSequence = businessStart;
  let individualSequence = individualStart;

  const emailMap = new Map<string, number[]>();
  const phoneMap = new Map<string, number[]>();
  normalized.forEach((record, index) => {
    if (record.email) {
      const key = record.email.toLowerCase();
      emailMap.set(key, [...(emailMap.get(key) || []), index]);
    }
    if (record.phone) {
      phoneMap.set(record.phone, [...(phoneMap.get(record.phone) || []), index]);
    }
  });

  const emails = Array.from(emailMap.keys());
  const phones = Array.from(phoneMap.keys());
  const orFilters = [
    emails.length ? { email: { in: emails } } : null,
    phones.length ? { phone: { in: phones } } : null,
  ].filter(Boolean) as Array<{ email?: { in: string[] }; phone?: { in: string[] } }>;

  const existingUsers = orFilters.length
    ? await userPrisma.user.findMany({
        where: {
          OR: orFilters,
        },
        select: { email: true, phone: true },
      })
    : [];

  const existingEmails = new Set(existingUsers.map((user) => user.email.toLowerCase()));
  const existingPhones = new Set(existingUsers.map((user) => user.phone));

  const rows: PreviewRow[] = normalized.map((record, index) => {
    const errors: string[] = [];
    if (!record.name) errors.push("Name is required");
    if (!record.email) errors.push("Email is required");
    if (!record.phone) errors.push("Phone is required");

    if (record.email && existingEmails.has(record.email.toLowerCase())) {
      errors.push("Email already exists");
    }
    if (record.phone && existingPhones.has(record.phone)) {
      errors.push("Phone already exists");
    }

    if (record.isBusinessAccount) {
      if (!record.businessName) errors.push("Business name is required");
      if (!record.billingAddress?.houseNo) errors.push("Billing house/flat no is required");
      if (!record.billingAddress?.line1) errors.push("Billing address line 1 is required");
      if (!record.billingAddress?.city) errors.push("Billing city is required");
      if (!record.billingAddress?.district) errors.push("Billing district is required");
      if (!record.billingAddress?.state) errors.push("Billing state is required");
      if (!record.billingAddress?.pincode) errors.push("Billing pincode is required");
    }

    if (record.email) {
      const occurrences = emailMap.get(record.email.toLowerCase());
      if (occurrences && occurrences.length > 1) {
        errors.push("Duplicate email in CSV");
      }
    }
    if (record.phone) {
      const occurrences = phoneMap.get(record.phone);
      if (occurrences && occurrences.length > 1) {
        errors.push("Duplicate phone in CSV");
      }
    }

    const prefix = getIdPrefix(record.isBusinessAccount);
    const sequence =
      prefix === businessPrefix ? ++businessSequence : ++individualSequence;
    const expectedId = formatUserId(prefix, year, sequence);

    return {
      rowNumber: index + 1,
      expectedId,
      data: record,
      errors,
    };
  });

  const valid = rows.every((row) => row.errors.length === 0);
  return { rows, valid };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const records = Array.isArray(body?.records) ? (body.records as RawBulkRecord[]) : [];
    const dryRun = Boolean(body?.dryRun);

    if (!records.length) {
      return NextResponse.json(
        { success: false, error: "No records provided" },
        { status: 400 }
      );
    }

    const preview = await buildPreviewRows(records);

    if (dryRun) {
      return NextResponse.json({
        success: true,
        data: preview,
      });
    }

    if (!preview.valid) {
      return NextResponse.json(
        { success: false, error: "Validation failed", data: preview },
        { status: 400 }
      );
    }

    const createdUsers = await userPrisma.$transaction(
      preview.rows.map((row) =>
        userPrisma.user.create({
          data: {
            id: row.expectedId,
            name: row.data.name,
            email: row.data.email,
            phone: row.data.phone,
            password: null,
            isBusinessAccount: row.data.isBusinessAccount,
            businessName: row.data.businessName,
            gstNumber: row.data.gstNumber,
            hasAdditionalTradeName: row.data.hasAdditionalTradeName,
            additionalTradeName: row.data.additionalTradeName,
            billingAddress: row.data.isBusinessAccount && row.data.billingAddress
              ? {
                  create: {
                    houseNo: row.data.billingAddress.houseNo,
                    line1: row.data.billingAddress.line1,
                    line2: row.data.billingAddress.line2,
                    city: row.data.billingAddress.city,
                    district: row.data.billingAddress.district,
                    state: row.data.billingAddress.state,
                    stateCode: row.data.billingAddress.stateCode,
                    country: row.data.billingAddress.country,
                    pincode: row.data.billingAddress.pincode,
                  },
                }
              : undefined,
          },
          include: {
            billingAddress: true,
          },
        })
      )
    );

    return NextResponse.json({
      success: true,
      data: {
        createdCount: createdUsers.length,
        ids: createdUsers.map((user) => user.id),
      },
    });
  } catch (error: any) {
    console.error("Error creating bulk customers:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

