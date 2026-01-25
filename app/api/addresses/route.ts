import { NextRequest, NextResponse } from "next/server";
import { userPrisma } from "@/lib/user-prisma";

// GET all addresses with search
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const pincode = searchParams.get("pincode");
    const district = searchParams.get("district");
    const state = searchParams.get("state");
    const userName = searchParams.get("userName");
    const businessName = searchParams.get("businessName");

    const where: any = {};

    if (search) {
      // General search across multiple fields
      where.OR = [
        { pincode: { contains: search } },
        { district: { contains: search } },
        { state: { contains: search } },
        { city: { contains: search } },
        {
          user: {
            OR: [
              { name: { contains: search } },
              { businessName: { contains: search } },
            ],
          },
        },
      ];
    } else {
      // Specific field searches
      if (pincode) {
        where.pincode = { contains: pincode };
      }
      if (district) {
        where.district = { contains: district };
      }
      if (state) {
        where.state = { contains: state };
      }
      if (userName) {
        where.user = {
          name: { contains: userName },
        };
      }
      if (businessName) {
        where.user = {
          businessName: { contains: businessName },
        };
      }
    }

    const addresses = await userPrisma.address.findMany({
      where,
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, data: addresses });
  } catch (error: any) {
    console.error("Error fetching addresses:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST create new address
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
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

    // Validate required fields
    if (!userId || !type || !name || !phone || !houseNo || !line1 || !city || !district || !state || !pincode) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await userPrisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // If this is set as default, unset other default addresses for this user
    if (isDefault) {
      await userPrisma.address.updateMany({
        where: {
          userId: userId,
          isDefault: true,
        },
        data: {
          isDefault: false,
        },
      });
    }

    const address = await userPrisma.address.create({
      data: {
        userId,
        type,
        name,
        phone,
        houseNo,
        line1,
        line2: line2 || null,
        city,
        district,
        state,
        stateCode: stateCode || null,
        country: country || "India",
        pincode,
        isDefault: isDefault || false,
      },
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

    return NextResponse.json({ success: true, data: address }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating address:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

