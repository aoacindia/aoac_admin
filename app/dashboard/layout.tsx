import SessionLoadingGate from "@/app/components/SessionLoadingGate";
import { requirePagePermission } from "@/lib/page-auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requirePagePermission("dashboard.view");
  return <SessionLoadingGate>{children}</SessionLoadingGate>;
}

