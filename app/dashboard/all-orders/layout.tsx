import DashboardShell from "@/app/components/DashboardShell";
import { auth } from "@/auth";

export default async function AllOrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";

  const menuItems = [{ label: "All orders", href: "/dashboard/all-orders" }];
  if (isAdmin) {
    menuItems.push({ label: "Upload file", href: "/dashboard/all-orders/upload" });
  }

  return (
    <DashboardShell
      sectionName="All orders"
      menuItems={menuItems}
    >
      {children}
    </DashboardShell>
  );
}
