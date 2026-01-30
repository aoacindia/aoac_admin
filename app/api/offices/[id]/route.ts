import { NextRequest, NextResponse } from "next/server";
import { adminPrisma } from "@/lib/admin-prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const office = await adminPrisma.office.findUnique({
      where: { id },
    });

    if (!office) {
      return NextResponse.json(
        { success: false, error: "Office not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: office });
  } catch (error: any) {
    console.error("Error fetching office:", error);
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
    const { gstin, address, state, stateCode } = body;

    if (!gstin || !address || !state || !stateCode) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingOffice = await adminPrisma.office.findUnique({
      where: { id },
    });

    if (!existingOffice) {
      return NextResponse.json(
        { success: false, error: "Office not found" },
        { status: 404 }
      );
    }

    const conflictOffice = await adminPrisma.office.findFirst({
      where: {
        gstin,
        id: { not: id },
      },
    });

    if (conflictOffice) {
      return NextResponse.json(
        { success: false, error: "Office with this GSTIN already exists" },
        { status: 400 }
      );
    }

    const office = await adminPrisma.office.update({
      where: { id },
      data: {
        gstin,
        address,
        state,
        stateCode,
      },
    });

    return NextResponse.json({ success: true, data: office });
  } catch (error: any) {
    console.error("Error updating office:", error);
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

    const existingOffice = await adminPrisma.office.findUnique({
      where: { id },
    });

    if (!existingOffice) {
      return NextResponse.json(
        { success: false, error: "Office not found" },
        { status: 404 }
      );
    }

    await adminPrisma.office.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Office deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting office:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


