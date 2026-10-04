import DashboardShell from "@/app/components/DashboardShell";
import { requirePagePermission } from "@/lib/page-auth";

const menuItems = [{ label: "All Contacts", href: "/dashboard/contacts" }];

export default async function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requirePagePermission("contacts.view");
  return (
    <DashboardShell sectionName="Contacts" menuItems={menuItems}>
      {children}
    </DashboardShell>
  );
}

