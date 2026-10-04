import DashboardShell from "@/app/components/DashboardShell";
import { requirePagePermission } from "@/lib/page-auth";

const menuItems = [
  { label: "Offices", href: "/dashboard/our-own-data/offices" },
  { label: "Administration", href: "/dashboard/our-own-data/administration" },
];

export default async function OurOwnDataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requirePagePermission("settings.view");

  return (
    <DashboardShell sectionName="Our Own Data" menuItems={menuItems}>
      {children}
    </DashboardShell>
  );
}


