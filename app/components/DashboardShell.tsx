import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";

interface MenuItem {
  label: string;
  href: string;
}

interface DashboardShellProps {
  sectionName: string;
  menuItems: MenuItem[];
  children: React.ReactNode;
}

export default function DashboardShell({
  sectionName,
  menuItems,
  children,
}: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar menuItems={menuItems} sectionName={sectionName} />
        <main className="flex-1 md:ml-0">{children}</main>
      </div>
    </div>
  );
}

