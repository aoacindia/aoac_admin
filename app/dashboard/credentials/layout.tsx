import { redirect } from "next/navigation";
import DashboardShell from "@/app/components/DashboardShell";
import { auth } from "@/auth";

const menuItems = [
  { label: "All Credentials", href: "/dashboard/credentials" },
];

export default async function CredentialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <DashboardShell sectionName="Credentials" menuItems={menuItems}>
      {children}
    </DashboardShell>
  );
}
