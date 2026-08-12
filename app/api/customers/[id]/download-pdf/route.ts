import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { dbUser } from "@/lib/db";
import { users } from "@/lib/db/user-schema";
import { generateCustomerPDF } from "@/lib/pdf-generator";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { sections } = body;

    if (!sections || !Array.isArray(sections) || sections.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Please select at least one section to download",
        },
        { status: 400 }
      );
    }

    const customer = await dbUser.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        suspensionReasons: {
          orderBy: (sr, { desc: d }) => [d(sr.suspendedAt)],
        },
        businesses: {
          with: { billingAddress: true },
        },
        addresses: {
          orderBy: (a, { desc: d }) => [d(a.createdAt)],
        },
        order: {
          orderBy: (o, { desc: d }) => [d(o.orderDate)],
          with: {
            orderItems: true,
            shippingAddress: true,
            business: {
              columns: {
                id: true,
                businessName: true,
                gstNumber: true,
              },
            },
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

    const pdfBuffer = await generateCustomerPDF(customer, sections);

    const buffer = Buffer.from(pdfBuffer);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="customer-${customer.id}-${Date.now()}.pdf"`,
      },
    });
  } catch (error: unknown) {
    console.error("Error generating PDF:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
