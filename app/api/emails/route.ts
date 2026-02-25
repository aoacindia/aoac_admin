import { NextRequest, NextResponse } from "next/server";
import { adminPrisma } from "@/lib/admin-prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get("isActive");
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");

    const where: any = {};
    if (isActive !== null && isActive !== undefined) {
      where.isActive = isActive === "true";
    }

    const emailAccounts = await adminPrisma.emailAccount.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit ? parseInt(limit) : undefined,
      skip: offset ? parseInt(offset) : undefined,
      select: {
        id: true,
        fromEmail: true,
        smtpHost: true,
        smtpPort: true,
        smtpUser: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        // Don't return password in GET requests
      },
    });

    const total = await adminPrisma.emailAccount.count({ where });

    return NextResponse.json({
      success: true,
      data: emailAccounts,
      total,
    });
  } catch (error: any) {
    console.error("Error fetching email accounts:", error);
    return NextResponse.json(
      { success: false, error: error.message },
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
        { success: false, error: "Missing required fields: fromEmail, smtpHost, smtpPort, smtpUser, and smtpPassword are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(fromEmail)) {
      return NextResponse.json(
        { success: false, error: "Invalid from email address format" },
        { status: 400 }
      );
    }

    // Validate port number
    const port = parseInt(smtpPort);
    if (isNaN(port) || port < 1 || port > 65535) {
      return NextResponse.json(
        { success: false, error: "Invalid SMTP port number (must be between 1 and 65535)" },
        { status: 400 }
      );
    }

    // Create email account
    const emailAccount = await adminPrisma.emailAccount.create({
      data: {
        fromEmail: fromEmail.trim(),
        smtpHost: smtpHost.trim(),
        smtpPort: port,
        smtpUser: smtpUser.trim(),
        smtpPassword: smtpPassword.trim(),
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
      select: {
        id: true,
        fromEmail: true,
        smtpHost: true,
        smtpPort: true,
        smtpUser: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        // Don't return password in response
      },
    });

    return NextResponse.json(
      { success: true, data: emailAccount, message: "Email account created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating email account:", error);
    

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

