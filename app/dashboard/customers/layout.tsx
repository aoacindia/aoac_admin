import DashboardShell from "@/app/components/DashboardShell";


const menuItems = [
  { label: "All Customers", href: "/dashboard/customers" },
  { label: "Create Customer", href: "/dashboard/customers/create" },
  { label: "Add Business", href: "/dashboard/customers/add-business" },
  { label: "Addresses", href: "/dashboard/customers/addresses" },
];

export default function CustomersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell sectionName="Customers" menuItems={menuItems}>
      {children}
    </DashboardShell>
  );
}

