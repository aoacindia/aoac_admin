import { NextRequest, NextResponse } from "next/server";
import { adminPrisma } from "@/lib/admin-prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const account = await adminPrisma.account.findUnique({
      where: { id },
    });

    if (!account) {
      return NextResponse.json(
        { success: false, error: "Account not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: account });
  } catch (error: any) {
    console.error("Error fetching account:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const existingAccount = await adminPrisma.account.findUnique({
      where: { id },
    });

    if (!existingAccount) {
      return NextResponse.json(
        { success: false, error: "Account not found" },
        { status: 404 }
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
        adminPrisma.account.update({ where: { id }, data: payload }),
      ]);

      return NextResponse.json({ success: true, data: account });
    }

    const account = await adminPrisma.account.update({
      where: { id },
      data: payload,
    });

    return NextResponse.json({ success: true, data: account });
  } catch (error: any) {
    console.error("Error updating account:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existingAccount = await adminPrisma.account.findUnique({
      where: { id },
    });

    if (!existingAccount) {
      return NextResponse.json(
        { success: false, error: "Account not found" },
        { status: 404 }
      );
    }

    await adminPrisma.account.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Account deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

