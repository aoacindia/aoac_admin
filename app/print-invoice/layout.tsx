import { requirePagePermission } from "@/lib/page-auth";

export default async function PrintInvoiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requirePagePermission("orders.view");
  return children;
}
