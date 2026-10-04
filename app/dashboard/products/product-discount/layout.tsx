import DashboardShell from "@/app/components/DashboardShell";
import { requirePagePermission } from "@/lib/page-auth";

const menuItems = [
  { label: "All Products", href: "/dashboard/products" },
  { label: "Create Product", href: "/dashboard/products/create" },
  { label: "Categories", href: "/dashboard/products/categories" },
  { label: "Create Category", href: "/dashboard/products/categories/create" },
  { label: "Category Discounts", href: "/dashboard/products/category-discount" },
  { label: "Product Discounts", href: "/dashboard/products/product-discount" },
];

export default async function ProductDiscountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requirePagePermission("products.manage_discounts");

  return (
    <DashboardShell sectionName="Products" menuItems={menuItems}>
      {children}
    </DashboardShell>
  );
}

