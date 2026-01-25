import { NextRequest, NextResponse } from "next/server";
import { userPrisma } from "@/lib/user-prisma";
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
        { success: false, error: "Please select at least one section to download" },
        { status: 400 }
      );
    }

    // Fetch customer data with all related information
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

    // Generate PDF
    const pdfBuffer = await generateCustomerPDF(customer, sections);

    // Convert Uint8Array to Buffer for NextResponse
    const buffer = Buffer.from(pdfBuffer);

    // Return PDF as response
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="customer-${customer.id}-${Date.now()}.pdf"`,
      },
    });
  } catch (error: any) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

