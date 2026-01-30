import DashboardShell from "@/app/components/DashboardShell";

const menuItems = [{ label: "Offices", href: "/dashboard/our-own-data/offices" }];

export default function OurOwnDataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell sectionName="Our Own Data" menuItems={menuItems}>
      {children}
    </DashboardShell>
  );
}


