import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";

import { dbAdmin } from "@/lib/db";
import { companyAdministration } from "@/lib/db/admin-schema";
import {
  COMPANY_DOC_FIELDS,
  type CompanyDocPathKey,
} from "@/lib/company-administration-docs";
import { isSafeInternalPath } from "@/lib/internal-files";
import { requireAdminApi } from "@/lib/require-admin";

const DOC_KEYS = new Set(
  COMPANY_DOC_FIELDS.map((f) => f.key) as CompanyDocPathKey[]
);

function emptyCompanyPayload() {
  return {
    companyName: "",
    addressLine: "",
    city: "",
    district: "",
    state: "",
    stateCode: "",
    pincode: "",
    country: "India",
    uin: "",
    pan: "",
    tin: "",
    panDocumentPath: null as string | null,
    tinDocumentPath: null as string | null,
    certificateOfIncorporationPath: null as string | null,
    memorandumOfAssociationPath: null as string | null,
    articlesOfAssociationPath: null as string | null,
  };
}

export async function GET() {
  const authResult = await requireAdminApi();
  if ("error" in authResult) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const [row] = await dbAdmin
      .select()
      .from(companyAdministration)
      .orderBy(desc(companyAdministration.createdAt))
      .limit(1);

    return NextResponse.json({
      success: true,
      data: row ?? emptyCompanyPayload(),
    });
  } catch (error: unknown) {
    console.error("Error fetching company administration:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const body = await request.json();
    const companyName = String(body.companyName ?? "").trim();
    const addressLine = String(body.addressLine ?? "").trim();
    const city = String(body.city ?? "").trim();
    const district = String(body.district ?? "").trim();
    const state = String(body.state ?? "").trim();
    const stateCode = String(body.stateCode ?? "").trim();
    const pincode = String(body.pincode ?? "").trim();
    const country = String(body.country ?? "India").trim() || "India";
    const uin = String(body.uin ?? "").trim();
    const pan = String(body.pan ?? "").trim().toUpperCase();
    const tin = String(body.tin ?? "").trim();

    if (!companyName) {
      return NextResponse.json(
        { success: false, error: "Company name is required" },
        { status: 400 }
      );
    }
    if (!addressLine || !city || !district || !state || !stateCode) {
      return NextResponse.json(
        { success: false, error: "Registered address fields are required" },
        { status: 400 }
      );
    }
    if (!/^\d{6}$/.test(pincode)) {
      return NextResponse.json(
        { success: false, error: "Pincode must be 6 digits" },
        { status: 400 }
      );
    }

    const docPaths: Partial<Record<CompanyDocPathKey, string | null>> = {};
    for (const key of DOC_KEYS) {
      if (body[key] !== undefined) {
        const raw = body[key];
        if (raw === null || raw === "") {
          docPaths[key] = null;
        } else if (typeof raw === "string" && isSafeInternalPath(raw)) {
          docPaths[key] = raw.trim();
        } else {
          return NextResponse.json(
            { success: false, error: `Invalid document path for ${key}` },
            { status: 400 }
          );
        }
      }
    }

    const now = new Date();
    const [existing] = await dbAdmin
      .select({ id: companyAdministration.id })
      .from(companyAdministration)
      .orderBy(desc(companyAdministration.createdAt))
      .limit(1);

    const values = {
      companyName,
      addressLine,
      city,
      district,
      state,
      stateCode,
      pincode,
      country,
      uin,
      pan,
      tin,
      ...docPaths,
      updatedAt: now,
    };

    let saved;
    if (existing) {
      [saved] = await dbAdmin
        .update(companyAdministration)
        .set(values)
        .where(eq(companyAdministration.id, existing.id))
        .returning();
    } else {
      [saved] = await dbAdmin
        .insert(companyAdministration)
        .values({
          ...emptyCompanyPayload(),
          ...values,
          createdAt: now,
          updatedAt: now,
        })
        .returning();
    }

    return NextResponse.json({ success: true, data: saved });
  } catch (error: unknown) {
    console.error("Error saving company administration:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
