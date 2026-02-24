import { NextRequest, NextResponse } from "next/server";
import { userPrisma } from "@/lib/user-prisma";

// GET all contacts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");
    const safePage = Number.isFinite(page) && page > 0 ? page : 1;
    const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 10;

    const total = await userPrisma.contact.count();

    const contacts = await userPrisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip: (safePage - 1) * safeLimit,
      take: safeLimit,
    });

    return NextResponse.json({
      success: true,
      data: contacts,
      meta: {
        total,
        page: safePage,
        limit: safeLimit,
        totalPages: Math.ceil(total / safeLimit),
      },
    });
  } catch (error: any) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
