import DashboardShell from "@/app/components/DashboardShell";

const menuItems = [
  { label: "All Email Accounts", href: "/dashboard/emails" },
  { label: "Add Email Account", href: "/dashboard/emails/create" },
];

export default function EmailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell sectionName="Email" menuItems={menuItems}>
      {children}
    </DashboardShell>
  );
}

