import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/prisma/generated/admin";
import { adminPrisma } from "@/lib/admin-prisma";
import { requireAdminApi } from "@/lib/require-admin";

function parseOrderDateUtc(s: unknown): Date | null {
  if (typeof s !== "string") return null;
  const t = s.trim();
  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(t);
  if (!iso) return null;
  const y = Number(iso[1]);
  const mo = Number(iso[2]);
  const d = Number(iso[3]);
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  return new Date(Date.UTC(y, mo - 1, d, 0, 0, 0, 0));
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const gate = await requireAdminApi();
  if ("error" in gate) {
    return NextResponse.json(
      { success: false, error: gate.error },
      { status: gate.status }
    );
  }

  const { id } = await params;

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON." },
      { status: 400 }
    );
  }

  const orderDate = parseOrderDateUtc(body.orderDate);
  const orderName =
    typeof body.orderName === "string" ? body.orderName.trim() : "";
  const deliveryCharges = Number(body.deliveryCharges);
  const orderTotal = Number(body.orderTotal);
  const itemsRaw = body.items;

  if (!orderDate) {
    return NextResponse.json(
      { success: false, error: "Invalid order date (use YYYY-MM-DD)." },
      { status: 400 }
    );
  }
  if (!orderName) {
    return NextResponse.json(
      { success: false, error: "Order name is required." },
      { status: 400 }
    );
  }
  if (!Number.isFinite(deliveryCharges) || !Number.isFinite(orderTotal)) {
    return NextResponse.json(
      { success: false, error: "Delivery and total must be valid numbers." },
      { status: 400 }
    );
  }

  if (!Array.isArray(itemsRaw) || itemsRaw.length === 0) {
    return NextResponse.json(
      { success: false, error: "At least one line item is required." },
      { status: 400 }
    );
  }

  const items: Array<{ itemName: string; amount: number }> = [];
  for (const row of itemsRaw) {
    if (!row || typeof row !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid line items." },
        { status: 400 }
      );
    }
    const r = row as Record<string, unknown>;
    const name = typeof r.itemName === "string" ? r.itemName.trim() : "";
    const amount = Number(r.amount);
    if (!name) {
      return NextResponse.json(
        { success: false, error: "Each line item needs a name." },
        { status: 400 }
      );
    }
    if (!Number.isFinite(amount)) {
      return NextResponse.json(
        { success: false, error: "Each line item needs a valid amount." },
        { status: 400 }
      );
    }
    items.push({ itemName: name, amount });
  }

  const sumItems = items.reduce((s, it) => s + it.amount, 0);
  if (Math.abs(sumItems + deliveryCharges - orderTotal) > 0.02) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Sum of line amounts plus delivery must equal order total (within 0.02).",
      },
      { status: 400 }
    );
  }

  const existing = await adminPrisma.importedOrder.findUnique({
    where: { id },
  });
  if (!existing) {
    return NextResponse.json(
      { success: false, error: "Order not found." },
      { status: 404 }
    );
  }

  await adminPrisma.$transaction(async (tx) => {
    await tx.importedOrder.update({
      where: { id },
      data: {
        orderDate,
        orderName,
        deliveryCharges: new Prisma.Decimal(deliveryCharges),
        orderTotal: new Prisma.Decimal(orderTotal),
      },
    });
    await tx.importedOrderItem.deleteMany({ where: { orderId: id } });
    await tx.importedOrderItem.createMany({
      data: items.map((it, idx) => ({
        orderId: id,
        lineIndex: idx,
        itemName: it.itemName,
        amount: new Prisma.Decimal(it.amount),
      })),
    });
  });

  const updated = await adminPrisma.importedOrder.findUnique({
    where: { id },
    include: { items: { orderBy: { lineIndex: "asc" } } },
  });

  if (!updated) {
    return NextResponse.json(
      { success: false, error: "Failed to load updated order." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      order: {
        id: updated.id,
        orderDate: updated.orderDate.toISOString(),
        orderName: updated.orderName,
        deliveryCharges: Number(updated.deliveryCharges),
        orderTotal: Number(updated.orderTotal),
        createdAt: updated.createdAt.toISOString(),
        items: updated.items.map((it) => ({
          id: it.id,
          lineIndex: it.lineIndex,
          itemName: it.itemName,
          amount: Number(it.amount),
        })),
      },
    },
  });
}
