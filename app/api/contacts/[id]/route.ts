import { NextRequest, NextResponse } from "next/server";
import { userPrisma } from "@/lib/user-prisma";

// GET a single contact by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const contact = await userPrisma.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      return NextResponse.json(
        { success: false, error: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: contact,
    });
  } catch (error: any) {
    console.error("Error fetching contact:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE a contact by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const contact = await userPrisma.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      return NextResponse.json(
        { success: false, error: "Contact not found" },
        { status: 404 }
      );
    }

    await userPrisma.contact.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting contact:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
