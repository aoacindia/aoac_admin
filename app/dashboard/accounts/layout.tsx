import DashboardShell from "@/app/components/DashboardShell";
import { requirePagePermission } from "@/lib/page-auth";

const menuItems = [
  { label: "Accounts", href: "/dashboard/accounts" },
  { label: "Credit Summary", href: "/dashboard/accounts/credit-summary" },
];

export default async function AccountsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requirePagePermission("settings.view");

  return (
    <DashboardShell sectionName="Accounts" menuItems={menuItems}>
      {children}
    </DashboardShell>
  );
}

