import { NextRequest, NextResponse } from "next/server";
import { userPrisma } from "@/lib/user-prisma";

// GET supplier by id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supplier = await userPrisma.supplier.findUnique({
      where: { id },
    });

    if (!supplier) {
      return NextResponse.json(
        { success: false, error: "Supplier not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: supplier });
  } catch (error: any) {
    console.error("Error fetching supplier:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT update supplier
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      type,
      name,
      phone,
      email,
      gstNumber,
      fssaiLicense,
      houseNo,
      line1,
      line2,
      city,
      district,
      state,
      stateCode,
      country,
      pincode,
    } = body;

    // Check if supplier exists
    const existingSupplier = await userPrisma.supplier.findUnique({
      where: { id },
    });

    if (!existingSupplier) {
      return NextResponse.json(
        { success: false, error: "Supplier not found" },
        { status: 404 }
      );
    }

    // Check if email or phone conflicts with another supplier
    if (email || phone) {
      const conflictSupplier = await userPrisma.supplier.findFirst({
        where: {
          AND: [
            { id: { not: id } },
            {
              OR: [
                ...(email ? [{ email }] : []),
                ...(phone ? [{ phone }] : []),
              ],
            },
          ],
        },
      });

      if (conflictSupplier) {
        return NextResponse.json(
          { success: false, error: "Email or phone number already exists" },
          { status: 400 }
        );
      }
    }

    // Validate type if provided
    if (type && type !== "Individual" && type !== "Business") {
      return NextResponse.json(
        { success: false, error: "Type must be 'Individual' or 'Business'" },
        { status: 400 }
      );
    }

    // If Business type, GST number is required
    const finalType = type || existingSupplier.type;
    if (finalType === "Business" && !gstNumber && !existingSupplier.gstNumber) {
      return NextResponse.json(
        { success: false, error: "GST Number is required for Business type" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (type !== undefined) updateData.type = type;
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (email !== undefined) updateData.email = email;
    if (gstNumber !== undefined) {
      updateData.gstNumber = finalType === "Business" ? gstNumber : null;
    }
    if (fssaiLicense !== undefined) updateData.fssaiLicense = fssaiLicense || null;
    if (houseNo !== undefined) updateData.houseNo = houseNo;
    if (line1 !== undefined) updateData.line1 = line1;
    if (line2 !== undefined) updateData.line2 = line2 || null;
    if (city !== undefined) updateData.city = city;
    if (district !== undefined) updateData.district = district;
    if (state !== undefined) updateData.state = state;
    if (stateCode !== undefined) updateData.stateCode = stateCode || null;
    if (country !== undefined) updateData.country = country || "India";
    if (pincode !== undefined) updateData.pincode = pincode;

    const supplier = await userPrisma.supplier.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: supplier });
  } catch (error: any) {
    console.error("Error updating supplier:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE supplier
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if supplier exists
    const supplier = await userPrisma.supplier.findUnique({
      where: { id },
      include: {
        orders: true,
      },
    });

    if (!supplier) {
      return NextResponse.json(
        { success: false, error: "Supplier not found" },
        { status: 404 }
      );
    }

    // Check if supplier has orders
    if (supplier.orders.length > 0) {
      return NextResponse.json(
        { success: false, error: "Cannot delete supplier with existing orders" },
        { status: 400 }
      );
    }

    await userPrisma.supplier.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Supplier deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting supplier:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

