import DashboardShell from "@/app/components/DashboardShell";
import { requirePagePermission } from "@/lib/page-auth";

const menuItems = [
  { label: "All Suppliers", href: "/dashboard/suppliers" },
];

export default async function SuppliersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requirePagePermission("suppliers.view");
  return (
    <DashboardShell sectionName="Suppliers" menuItems={menuItems}>
      {children}
    </DashboardShell>
  );
}

