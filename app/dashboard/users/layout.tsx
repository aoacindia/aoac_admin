import { redirect } from "next/navigation";
import DashboardShell from "@/app/components/DashboardShell";
import { auth } from "@/auth";

const menuItems = [
  { label: "All Users", href: "/dashboard/users" },
  { label: "Create User", href: "/dashboard/users/create" },
];

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <DashboardShell sectionName="Users" menuItems={menuItems}>
      {children}
    </DashboardShell>
  );
}

