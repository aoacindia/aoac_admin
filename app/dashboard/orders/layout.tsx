import DashboardShell from "@/app/components/DashboardShell";
import { requirePagePermission } from "@/lib/page-auth";

export default async function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requirePagePermission("orders.view");

  const menuItems = [
    { label: "All Orders", href: "/dashboard/orders" },
    { label: "Processing Orders", href: "/dashboard/orders/processing" },
    { label: "Create Order", href: "/dashboard/orders/create" },
    { label: "Order summary", href: "/dashboard/orders/summary" },
  ];

  return (
    <DashboardShell sectionName="Orders" menuItems={menuItems}>
      {children}
    </DashboardShell>
  );
}

