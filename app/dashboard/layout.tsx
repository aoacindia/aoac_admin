import { requirePagePermission } from "@/lib/page-auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requirePagePermission("dashboard.view");
  return <>{children}</>;
}

