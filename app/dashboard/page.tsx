"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Modal from "@/app/components/Modal";
import Header from "@/app/components/Header";

interface Section {
  name: string;
  icon: string;
  subsections: {
    label: string;
    href: string;
  }[];
}

const sections: Section[] = [
  {
    name: "Products",
    icon: "📦",
    subsections: [
      { label: "All Products", href: "/dashboard/products" },
      { label: "Create Product", href: "/dashboard/products/create" },
    ],
  },
  {
    name: "Orders",
    icon: "🛒",
    subsections: [
      { label: "All Orders", href: "/dashboard/orders" },
      { label: "Create Order", href: "/dashboard/orders/create" },
    ],
  },
  {
    name: "Customers",
    icon: "👤",
    subsections: [
      { label: "All Customers", href: "/dashboard/customers" },
      { label: "Create Customer", href: "/dashboard/customers/create" },
    ],
  },
  {
    name: "Suppliers",
    icon: "🏭",
    subsections: [
      { label: "All Suppliers", href: "/dashboard/suppliers" },
    ],
  },
  {
    name: "Users",
    icon: "👥",
    subsections: [
      { label: "All Users", href: "/dashboard/users" },
      { label: "Create User", href: "/dashboard/users/create" },
    ],
  },
];

export default function DashboardPage() {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const router = useRouter();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const visibleSections = isAdmin
    ? sections
    : sections.filter((section) => section.name !== "Users");

  const handleSectionClick = (section: Section) => {
    if (section.name === "Users" && !isAdmin) {
      return;
    }
    setSelectedSection(section);
  };

  const handleSubsectionClick = (href: string) => {
    router.push(href);
  };

  const closePopup = () => {
    setSelectedSection(null);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleSections.map((section) => (
            <div
              key={section.name}
              onClick={() => handleSectionClick(section)}
              className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-6 cursor-pointer transition-all hover:shadow-lg hover:scale-105 border border-zinc-200 dark:border-zinc-800"
            >
              <div className="text-4xl mb-4">{section.icon}</div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {section.name}
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                Click to view options
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Popup Modal */}
      {selectedSection && (
        <Modal
          title={
            <span className="flex items-center gap-3">
              <span>{selectedSection.icon}</span>
              {selectedSection.name}
            </span>
          }
          onClose={closePopup}
          panelClassName="p-8 mx-4"
        >
          <div className="space-y-4">
            {selectedSection.subsections.map((subsection) => (
              <div
                key={subsection.href}
                onClick={() => handleSubsectionClick(subsection.href)}
                className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 cursor-pointer transition-all hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700"
              >
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                  {subsection.label}
                </h3>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}

