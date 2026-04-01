import { redirect } from "next/navigation";
import DashboardShell from "@/app/components/DashboardShell";
import { auth } from "@/auth";

export default async function AllOrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <DashboardShell
      sectionName="All orders"
      menuItems={[
        { label: "All orders", href: "/dashboard/all-orders" },
        { label: "Upload file", href: "/dashboard/all-orders/upload" },
      ]}
    >
      {children}
    </DashboardShell>
  );
}
