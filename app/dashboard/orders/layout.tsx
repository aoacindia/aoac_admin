import DashboardShell from "@/app/components/DashboardShell";


const menuItems = [
  { label: "All Orders", href: "/dashboard/orders" },
  { label: "Create Order", href: "/dashboard/orders/create" },
];

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell sectionName="Orders" menuItems={menuItems}>
      {children}
    </DashboardShell>
  );
}

