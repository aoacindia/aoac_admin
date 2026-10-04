import { requirePagePermission } from "@/lib/page-auth";

export default async function OrderSummaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requirePagePermission("orders.view");
  return <>{children}</>;
}
