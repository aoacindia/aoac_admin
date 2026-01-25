import { NextRequest, NextResponse } from "next/server";
import { userPrisma } from "@/lib/user-prisma";

// GET customer by id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const customer = await userPrisma.user.findUnique({
      where: { id: id },
      include: {
        suspensionReasons: {
          orderBy: {
            suspendedAt: "desc",
          },
        },
        billingAddress: true,
        addresses: {
          orderBy: {
            createdAt: "desc",
          },
        },
        order: {
          orderBy: {
            orderDate: "desc",
          },
          include: {
            orderItems: true,
            shippingAddress: true,
          },
        },
      },
    });

    if (!customer) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: customer });
  } catch (error: any) {
    console.error("Error fetching customer:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT update customer
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      name,
      email,
      phone,
      isBusinessAccount,
      businessName,
      gstNumber,
      hasAdditionalTradeName,
      additionalTradeName,
      billingAddress,
    } = body;

    // Check if customer exists
    const existingCustomer = await userPrisma.user.findUnique({
      where: { id: id },
    });

    if (!existingCustomer) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }

    // Check if email or phone is being changed and if it conflicts
    if (email || phone) {
      const orConditions: any[] = [];
      if (email) orConditions.push({ email });
      if (phone) orConditions.push({ phone });
      
      const conflictUser = await userPrisma.user.findFirst({
        where: {
          AND: [
            { id: { not: id } },
            { OR: orConditions },
          ],
        },
      });

      if (conflictUser) {
        return NextResponse.json(
          { success: false, error: "Email or phone number already exists" },
          { status: 400 }
        );
      }
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (isBusinessAccount !== undefined)
      updateData.isBusinessAccount = isBusinessAccount;
    if (businessName !== undefined)
      updateData.businessName = isBusinessAccount ? businessName : null;
    if (gstNumber !== undefined)
      updateData.gstNumber = isBusinessAccount ? gstNumber : null;
    if (hasAdditionalTradeName !== undefined)
      updateData.hasAdditionalTradeName = isBusinessAccount ? (hasAdditionalTradeName || false) : false;
    if (additionalTradeName !== undefined)
      updateData.additionalTradeName = isBusinessAccount && hasAdditionalTradeName ? additionalTradeName : null;

    // Handle billing address
    if (isBusinessAccount && billingAddress) {
      // Use existingCustomer's id for billing address operations
      const existingBillingAddress = await userPrisma.billingAddress.findUnique({
        where: { userId: id },
      });

      if (existingBillingAddress) {
        // Update existing billing address
        await userPrisma.billingAddress.update({
          where: { userId: id },
          data: {
            houseNo: billingAddress.houseNo,
            line1: billingAddress.line1,
            line2: billingAddress.line2 || null,
            city: billingAddress.city,
            district: billingAddress.district,
            state: billingAddress.state,
            stateCode: billingAddress.stateCode || null,
            country: billingAddress.country || "India",
            pincode: billingAddress.pincode,
          },
        });
      } else {
        // Create new billing address - id is already fetched above
        updateData.billingAddress = {
          create: {
            houseNo: billingAddress.houseNo,
            line1: billingAddress.line1,
            line2: billingAddress.line2 || null,
            city: billingAddress.city,
            district: billingAddress.district,
            state: billingAddress.state,
            stateCode: billingAddress.stateCode || null,
            country: billingAddress.country || "India",
            pincode: billingAddress.pincode,
          },
        };
      }
    } else if (!isBusinessAccount) {
      // Delete billing address if not business account
      // Use existingCustomer's id for billing address operations
      await userPrisma.billingAddress.deleteMany({
        where: { userId: id },
      });
    }

    const customer = await userPrisma.user.update({
      where: { id: id },
      data: updateData,
      include: {
        billingAddress: true,
        suspensionReasons: {
          orderBy: {
            suspendedAt: "desc",
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: customer });
  } catch (error: any) {
    console.error("Error updating customer:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

