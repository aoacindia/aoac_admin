import { NextRequest, NextResponse } from "next/server";
import { userPrisma } from "@/lib/user-prisma";
import { generateNextUserId } from "@/lib/user-id";

// GET all customers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const suspended = searchParams.get("suspended");
    const terminated = searchParams.get("terminated");
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");
    const safePage = Number.isFinite(page) && page > 0 ? page : 1;
    const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 10;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
        { businessName: { contains: search } },
      ];
    }

    if (suspended !== null) {
      where.suspended = suspended === "true";
    }

    if (terminated !== null) {
      where.terminated = terminated === "true";
    }

    const total = await userPrisma.user.count({ where });
    const businessCount = await userPrisma.user.count({
      where: { ...where, isBusinessAccount: true },
    });
    const personalCount = await userPrisma.user.count({
      where: {
        AND: [
          where,
          {
            OR: [{ isBusinessAccount: false }, { isBusinessAccount: null }],
          },
        ],
      },
    });

    const customers = await userPrisma.user.findMany({
      where,
      include: {
        suspensionReasons: {
          orderBy: {
            suspendedAt: "desc",
          },
        },
        billingAddress: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (safePage - 1) * safeLimit,
      take: safeLimit,
    });

    return NextResponse.json({
      success: true,
      data: customers,
      meta: {
        total,
        businessCount,
        personalCount,
        page: safePage,
        limit: safeLimit,
        totalPages: Math.ceil(total / safeLimit),
      },
    });
  } catch (error: any) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST create new customer
export async function POST(request: NextRequest) {
  try {
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

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: name, email, phone" },
        { status: 400 }
      );
    }

    // Check if email or phone already exists
    const existingUser = await userPrisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Email or phone number already exists" },
        { status: 400 }
      );
    }

    // Generate unique user ID based on account type and year
    const isBusiness = isBusinessAccount || false;
    const userId = await generateNextUserId(userPrisma, isBusiness);

    // Create customer without password
    const customer = await userPrisma.user.create({
      data: {
        id: userId,
        name,
        email,
        phone,
        password: null, // No password for admin-created customers
        isBusinessAccount: isBusinessAccount || false,
        businessName: isBusinessAccount ? businessName : null,
        gstNumber: isBusinessAccount ? gstNumber : null,
        hasAdditionalTradeName: isBusinessAccount ? (hasAdditionalTradeName || false) : false,
        additionalTradeName: isBusinessAccount && hasAdditionalTradeName ? additionalTradeName : null,
        billingAddress:
          isBusinessAccount && billingAddress
            ? {
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
              }
            : undefined,
      },
      include: {
        billingAddress: true,
      },
    });

    return NextResponse.json({ success: true, data: customer }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating customer:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

