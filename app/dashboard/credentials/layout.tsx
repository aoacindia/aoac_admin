import DashboardShell from "@/app/components/DashboardShell";
import { requirePagePermission } from "@/lib/page-auth";

const menuItems = [
  { label: "All Credentials", href: "/dashboard/credentials" },
];

export default async function CredentialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requirePagePermission("credentials.view");

  return (
    <DashboardShell sectionName="Credentials" menuItems={menuItems}>
      {children}
    </DashboardShell>
  );
}
