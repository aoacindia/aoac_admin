import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { dbUser } from "@/lib/db";
import { contacts } from "@/lib/db/user-schema";
import { requirePermissionApi } from "@/lib/require-admin";

// GET a single contact by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requirePermissionApi("contacts.view");
  if ("error" in authResult) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const { id } = await params;

    const [contact] = await dbUser
      .select()
      .from(contacts)
      .where(eq(contacts.id, id))
      .limit(1);

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
  } catch (error: unknown) {
    console.error("Error fetching contact:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// DELETE a contact by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requirePermissionApi("contacts.delete");
  if ("error" in authResult) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const { id } = await params;

    const [existing] = await dbUser
      .select({ id: contacts.id })
      .from(contacts)
      .where(eq(contacts.id, id))
      .limit(1);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Contact not found" },
        { status: 404 }
      );
    }

    await dbUser.delete(contacts).where(eq(contacts.id, id));

    return NextResponse.json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error: unknown) {
    console.error("Error deleting contact:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
