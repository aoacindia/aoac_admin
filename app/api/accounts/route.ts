import { NextRequest, NextResponse } from "next/server";
import { adminPrisma } from "@/lib/admin-prisma";

export async function GET(request: NextRequest) {
  try {
    const accounts = await adminPrisma.account.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: accounts });
  } catch (error: any) {
    console.error("Error fetching accounts:", error);
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
      accountHolderName,
      accountNumber,
      ifsc,
      branch,
      swiftCode,
      bankName,
      isDefault,
    } = body;

    if (!accountHolderName || !accountNumber || !ifsc || !branch || !bankName) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const payload = {
      accountHolderName,
      accountNumber,
      ifsc,
      branch,
      swiftCode: swiftCode || null,
      bankName,
      isDefault: Boolean(isDefault),
    };

    if (payload.isDefault) {
      const [, account] = await adminPrisma.$transaction([
        adminPrisma.account.updateMany({ data: { isDefault: false } }),
        adminPrisma.account.create({ data: payload }),
      ]);

      return NextResponse.json({ success: true, data: account }, { status: 201 });
    }

    const account = await adminPrisma.account.create({ data: payload });
    return NextResponse.json({ success: true, data: account }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating account:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

