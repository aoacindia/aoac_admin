import DashboardShell from "@/app/components/DashboardShell";


const menuItems = [
  { label: "All Products", href: "/dashboard/products" },
  { label: "Create Product", href: "/dashboard/products/create" },
  { label: "Categories", href: "/dashboard/products/categories" },
  { label: "Create Category", href: "/dashboard/products/categories/create" },
  { label: "Category Discounts", href: "/dashboard/products/category-discount" },
  { label: "Product Discounts", href: "/dashboard/products/product-discount" },
];

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell sectionName="Products" menuItems={menuItems}>
      {children}
    </DashboardShell>
  );
}

