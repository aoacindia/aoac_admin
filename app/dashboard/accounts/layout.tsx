import { redirect } from "next/navigation";
import DashboardShell from "@/app/components/DashboardShell";
import { auth } from "@/auth";

const menuItems = [{ label: "Accounts", href: "/dashboard/accounts" }];

export default async function AccountsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <DashboardShell sectionName="Accounts" menuItems={menuItems}>
      {children}
    </DashboardShell>
  );
}

