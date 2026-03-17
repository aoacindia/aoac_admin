import DashboardShell from "@/app/components/DashboardShell";

const menuItems = [{ label: "All Contacts", href: "/dashboard/contacts" }];

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell sectionName="Contacts" menuItems={menuItems}>
      {children}
    </DashboardShell>
  );
}

