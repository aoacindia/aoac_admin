import DashboardShell from "@/app/components/DashboardShell";
import { requirePagePermission } from "@/lib/page-auth";

const menuItems = [
  { label: "All Email Accounts", href: "/dashboard/emails" },
  { label: "Add Email Account", href: "/dashboard/emails/create" },
];

export default async function EmailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requirePagePermission("settings.manage");
  return (
    <DashboardShell sectionName="Email" menuItems={menuItems}>
      {children}
    </DashboardShell>
  );
}

