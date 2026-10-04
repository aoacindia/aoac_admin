import DashboardShell from "@/app/components/DashboardShell";
import { requirePagePermission } from "@/lib/page-auth";

const menuItems = [
  { label: "All Customers", href: "/dashboard/customers" },
  { label: "Create Customer", href: "/dashboard/customers/create" },
  { label: "Add Business", href: "/dashboard/customers/add-business" },
  { label: "Addresses", href: "/dashboard/customers/addresses" },
];

export default async function CustomersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requirePagePermission("customers.view");
  return (
    <DashboardShell sectionName="Customers" menuItems={menuItems}>
      {children}
    </DashboardShell>
  );
}

