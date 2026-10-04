import DashboardShell from "@/app/components/DashboardShell";
import { requirePagePermission } from "@/lib/page-auth";

const menuItems = [
  { label: "All Users", href: "/dashboard/users" },
  { label: "Create User", href: "/dashboard/users/create" },
];

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requirePagePermission("users.view");

  return (
    <DashboardShell sectionName="Users" menuItems={menuItems}>
      {children}
    </DashboardShell>
  );
}

