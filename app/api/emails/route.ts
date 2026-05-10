import { NextRequest, NextResponse } from "next/server";
import { and, count, desc, eq } from "drizzle-orm";

import { dbAdmin } from "@/lib/db";
import { emailAccounts } from "@/lib/db/admin-schema";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get("isActive");
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");

    const filters = [];
    if (isActive !== null && isActive !== undefined && isActive !== "") {
      filters.push(eq(emailAccounts.isActive, isActive === "true"));
    }
    const whereClause = filters.length > 0 ? and(...filters) : undefined;

    const limitN = limit ? parseInt(limit, 10) : undefined;
    const offsetN = offset ? parseInt(offset, 10) : undefined;

    const listBase = dbAdmin
      .select({
        id: emailAccounts.id,
        fromEmail: emailAccounts.fromEmail,
        smtpHost: emailAccounts.smtpHost,
        smtpPort: emailAccounts.smtpPort,
        smtpUser: emailAccounts.smtpUser,
        isActive: emailAccounts.isActive,
        createdAt: emailAccounts.createdAt,
        updatedAt: emailAccounts.updatedAt,
      })
      .from(emailAccounts)
      .orderBy(desc(emailAccounts.createdAt));

    const listed =
      limitN !== undefined && !Number.isNaN(limitN)
        ? offsetN !== undefined && !Number.isNaN(offsetN)
          ? whereClause
            ? await listBase.where(whereClause).limit(limitN).offset(offsetN)
            : await listBase.limit(limitN).offset(offsetN)
          : whereClause
            ? await listBase.where(whereClause).limit(limitN)
            : await listBase.limit(limitN)
        : whereClause
          ? await listBase.where(whereClause)
          : await listBase;

    const countBase = dbAdmin
      .select({ c: count() })
      .from(emailAccounts);
    const [countRow] = whereClause
      ? await countBase.where(whereClause)
      : await countBase;
    const total = Number(countRow?.c ?? 0);

    return NextResponse.json({
      success: true,
      data: listed,
      total,
    });
  } catch (error: unknown) {
    console.error("Error fetching email accounts:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fromEmail,
      smtpHost,
      smtpPort,
      smtpUser,
      smtpPassword,
      isActive,
    } = body;

    if (!fromEmail || !smtpHost || !smtpPort || !smtpUser || !smtpPassword) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing required fields: fromEmail, smtpHost, smtpPort, smtpUser, and smtpPassword are required",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(fromEmail)) {
      return NextResponse.json(
        { success: false, error: "Invalid from email address format" },
        { status: 400 }
      );
    }

    const port = parseInt(String(smtpPort), 10);
    if (Number.isNaN(port) || port < 1 || port > 65535) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid SMTP port number (must be between 1 and 65535)",
        },
        { status: 400 }
      );
    }

    const now = new Date();
    const [emailAccount] = await dbAdmin
      .insert(emailAccounts)
      .values({
        fromEmail: String(fromEmail).trim(),
        smtpHost: String(smtpHost).trim(),
        smtpPort: port,
        smtpUser: String(smtpUser).trim(),
        smtpPassword: String(smtpPassword).trim(),
        isActive: isActive !== undefined ? Boolean(isActive) : true,
        createdAt: now,
        updatedAt: now,
      })
      .returning({
        id: emailAccounts.id,
        fromEmail: emailAccounts.fromEmail,
        smtpHost: emailAccounts.smtpHost,
        smtpPort: emailAccounts.smtpPort,
        smtpUser: emailAccounts.smtpUser,
        isActive: emailAccounts.isActive,
        createdAt: emailAccounts.createdAt,
        updatedAt: emailAccounts.updatedAt,
      });

    return NextResponse.json(
      {
        success: true,
        data: emailAccount,
        message: "Email account created successfully",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error creating email account:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
