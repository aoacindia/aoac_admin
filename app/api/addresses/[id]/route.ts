import { NextRequest, NextResponse } from "next/server";
import { userPrisma } from "@/lib/user-prisma";

// GET address by id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const address = await userPrisma.address.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            isBusinessAccount: true,
            businessName: true,
          },
        },
      },
    });

    if (!address) {
      return NextResponse.json(
        { success: false, error: "Address not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: address });
  } catch (error: any) {
    console.error("Error fetching address:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT update address
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
      houseNo,
      line1,
      line2,
      city,
      district,
      state,
      stateCode,
      country,
      pincode,
      isDefault,
    } = body;

    // Check if address exists
    const existingAddress = await userPrisma.address.findUnique({
      where: { id },
    });

    if (!existingAddress) {
      return NextResponse.json(
        { success: false, error: "Address not found" },
        { status: 404 }
      );
    }

    // If this is set as default, unset other default addresses for this user
    if (isDefault && !existingAddress.isDefault) {
      await userPrisma.address.updateMany({
        where: {
          userId: existingAddress.userId,
          isDefault: true,
          id: { not: id },
        },
        data: {
          isDefault: false,
        },
      });
    }

    const updateData: any = {};
    if (type !== undefined) updateData.type = type;
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (houseNo !== undefined) updateData.houseNo = houseNo;
    if (line1 !== undefined) updateData.line1 = line1;
    if (line2 !== undefined) updateData.line2 = line2 || null;
    if (city !== undefined) updateData.city = city;
    if (district !== undefined) updateData.district = district;
    if (state !== undefined) updateData.state = state;
    if (stateCode !== undefined) updateData.stateCode = stateCode || null;
    if (country !== undefined) updateData.country = country || "India";
    if (pincode !== undefined) updateData.pincode = pincode;
    if (isDefault !== undefined) updateData.isDefault = isDefault;

    const address = await userPrisma.address.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            isBusinessAccount: true,
            businessName: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: address });
  } catch (error: any) {
    console.error("Error updating address:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE address
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const address = await userPrisma.address.findUnique({
      where: { id },
    });

    if (!address) {
      return NextResponse.json(
        { success: false, error: "Address not found" },
        { status: 404 }
      );
    }

    await userPrisma.address.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Address deleted" });
  } catch (error: any) {
    console.error("Error deleting address:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

