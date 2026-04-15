import { redirect } from "next/navigation";
import DashboardShell from "@/app/components/DashboardShell";
import { auth } from "@/auth";

export default async function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const menuItems = [
    { label: "All Orders", href: "/dashboard/orders" },
    { label: "Processing Orders", href: "/dashboard/orders/processing" },
    { label: "Create Order", href: "/dashboard/orders/create" },
    { label: "Order summary", href: "/dashboard/orders/summary" },
  ];

  return (
    <DashboardShell sectionName="Orders" menuItems={menuItems}>
      {children}
    </DashboardShell>
  );
}

