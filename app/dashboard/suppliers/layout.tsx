import DashboardShell from "@/app/components/DashboardShell";


const menuItems = [
  { label: "All Suppliers", href: "/dashboard/suppliers" },
];

export default function SuppliersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell sectionName="Suppliers" menuItems={menuItems}>
      {children}
    </DashboardShell>
  );
}

