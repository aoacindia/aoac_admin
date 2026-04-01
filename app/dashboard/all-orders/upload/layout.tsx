import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function AllOrdersUploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard/unauthorized");
  }
  return <>{children}</>;
}

