import { redirect } from "next/navigation";
import DashboardShell from "@/app/components/DashboardShell";
import { auth } from "@/auth";

const menuItems = [
  { label: "Offices", href: "/dashboard/our-own-data/offices" },
  { label: "Administration", href: "/dashboard/our-own-data/administration" },
];

export default async function OurOwnDataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <DashboardShell sectionName="Our Own Data" menuItems={menuItems}>
      {children}
    </DashboardShell>
  );
}


