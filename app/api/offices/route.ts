import { NextRequest, NextResponse } from "next/server";
import { adminPrisma } from "@/lib/admin-prisma";

export async function GET(request: NextRequest) {
  try {
    const offices = await adminPrisma.office.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: offices });
  } catch (error: any) {
    console.error("Error fetching offices:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { gstin, address, state, stateCode } = body;

    if (!gstin || !address || !state || !stateCode) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingOffice = await adminPrisma.office.findUnique({
      where: { gstin },
    });

    if (existingOffice) {
      return NextResponse.json(
        { success: false, error: "Office with this GSTIN already exists" },
        { status: 400 }
      );
    }

    const office = await adminPrisma.office.create({
      data: {
        gstin,
        address,
        state,
        stateCode,
      },
    });

    return NextResponse.json({ success: true, data: office }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating office:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


