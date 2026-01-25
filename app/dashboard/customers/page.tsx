"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface SuspensionReason {
  id: string;
  reason: string;
  suspendedAt: string;
}

interface BillingAddress {
  id: string;
  houseNo: string;
  line1: string;
  line2: string | null;
  city: string;
  district: string;
  state: string;
  country: string;
  pincode: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  suspended: boolean;
  suspended_number: number;
  terminated: boolean;
  isBusinessAccount: boolean | null;
  businessName: string | null;
  gstNumber: string | null;
  createdAt: string;
  suspensionReasons: SuspensionReason[];
  billingAddress: BillingAddress | null;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSuspended, setFilterSuspended] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [businessCount, setBusinessCount] = useState(0);
  const [personalCount, setPersonalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    setPage(1);
    fetchCustomers(1);
  }, [filterSuspended]);

  const fetchCustomers = async (nextPage: number) => {
    try {
      setLoading(true);
      let url = "/api/customers";
      const params = new URLSearchParams();
      
      if (searchTerm) {
        params.append("search", searchTerm);
      }
      
      if (filterSuspended === "suspended") {
        params.append("suspended", "true");
      } else if (filterSuspended === "terminated") {
        params.append("terminated", "true");
      }

      params.append("page", String(nextPage));
      params.append("limit", String(limit));
      
      if (params.toString()) {
        url += "?" + params.toString();
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setCustomers(data.data);
        setTotalCount(data.meta?.total ?? 0);
        setBusinessCount(data.meta?.businessCount ?? 0);
        setPersonalCount(data.meta?.personalCount ?? 0);
        setTotalPages(data.meta?.totalPages ?? 1);
        setPage(data.meta?.page || nextPage);
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchCustomers(1);
  };

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return;
    fetchCustomers(nextPage);
  };

  const getPaginationItems = () => {
    const pages = new Set<number>();
    pages.add(1);
    pages.add(totalPages);
    pages.add(page);
    pages.add(page - 1);
    pages.add(page + 1);

    return Array.from(pages)
      .filter((p) => p >= 1 && p <= totalPages)
      .sort((a, b) => a - b);
  };

  const handleSuspend = async (id: string) => {
    const reason = prompt("Please provide a reason for suspending this customer:");
    if (!reason || reason.trim() === "") {
      alert("Suspension reason is required");
      return;
    }

    try {
      const response = await fetch(`/api/customers/${id}/suspend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Customer suspended successfully");
        fetchCustomers(page);
      } else {
        alert("Error suspending customer: " + data.error);
      }
    } catch (err: any) {
      alert("Error suspending customer: " + err.message);
    }
  };

  const handleUnsuspend = async (id: string) => {
    if (!confirm("Are you sure you want to unsuspend this customer?")) {
      return;
    }

    try {
      const response = await fetch(`/api/customers/${id}/unsuspend`, {
        method: "POST",
      });

      const data = await response.json();

      if (data.success) {
        alert("Customer unsuspended successfully");
        fetchCustomers(page);
      } else {
        alert("Error unsuspending customer: " + data.error);
      }
    } catch (err: any) {
      alert("Error unsuspending customer: " + err.message);
    }
  };

  const handleTerminate = async (id: string) => {
    if (!confirm("Are you sure you want to terminate this customer? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`/api/customers/${id}/terminate`, {
        method: "POST",
      });

      const data = await response.json();

      if (data.success) {
        alert("Customer terminated successfully");
        fetchCustomers(page);
      } else {
        alert("Error terminating customer: " + data.error);
      }
    } catch (err: any) {
      alert("Error terminating customer: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-zinc-600 dark:text-zinc-400">Loading customers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            All Customers
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Manage your customers
          </p>
        </div>
        <Link
          href="/dashboard/customers/create"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-center"
        >
          Create Customer
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Customers</p>
          <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{totalCount}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Personal Customers</p>
          <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{personalCount}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Business Customers</p>
          <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{businessCount}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              type="text"
              placeholder="Search by name, email, phone, or business name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <Select
              value={filterSuspended}
              onChange={(e) => setFilterSuspended(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Customers</option>
              <option value="suspended">Suspended</option>
              <option value="terminated">Terminated</option>
            </Select>
          </div>
          <div>
            <Button
              onClick={handleSearch}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Customers List */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Customers ({customers.length})
        </h2>
        {customers.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">
            No customers found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="border-b border-zinc-200 dark:border-zinc-700">
                  <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Name
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Email
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Phone
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Type
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Status
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow
                    key={customer.id}
                    className="border-b border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    <TableCell className="py-3 px-4">
                      {customer.isBusinessAccount && customer.businessName ? (
                        <>
                          <div className="font-medium text-zinc-900 dark:text-zinc-100">
                            {customer.businessName}
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            {customer.name}
                          </div>
                        </>
                      ) : (
                        <div className="font-medium text-zinc-900 dark:text-zinc-100">
                          {customer.name}
                        </div>
                      )}
                      {customer.suspended_number > 0 && (
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                          Suspended {customer.suspended_number} time(s)
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-zinc-600 dark:text-zinc-400">
                      {customer.email}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-zinc-600 dark:text-zinc-400">
                      {customer.phone}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      {customer.isBusinessAccount ? (
                        <span className="inline-block px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded">
                          Business
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                          Personal
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      {customer.terminated ? (
                        <span className="inline-block px-2 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
                          Terminated
                        </span>
                      ) : customer.suspended ? (
                        <span className="inline-block px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded">
                          Suspended
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                          Active
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/dashboard/customers/${customer.id}`}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                        >
                          View
                        </Link>
                        <Link
                          href={`/dashboard/customers/${customer.id}/edit`}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors"
                        >
                          Edit
                        </Link>
                        {!customer.terminated && (
                          <>
                            {customer.suspended ? (
                              <Button
                                onClick={() => handleUnsuspend(customer.id)}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                              >
                                Unsuspend
                              </Button>
                            ) : (
                              <Button
                                onClick={() => handleSuspend(customer.id)}
                                className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-xs rounded transition-colors"
                              >
                                Suspend
                              </Button>
                            )}
                            <Button
                              onClick={() => handleTerminate(customer.id)}
                              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
                            >
                              Terminate
                            </Button>
                          </>
                        )}
                        {customer.suspensionReasons.length > 0 && (
                          <Button
                            onClick={() => {
                              const reasons = customer.suspensionReasons
                                .map(
                                  (r, idx) =>
                                    `${idx + 1}. ${r.reason} (${new Date(r.suspendedAt).toLocaleDateString()})`
                                )
                                .join("\n");
                              alert("Suspension Reasons:\n\n" + reasons);
                            }}
                            className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors"
                            title="View suspension reasons"
                          >
                            View Reasons
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page - 1);
                    }}
                  />
                </PaginationItem>

                {getPaginationItems().map((pageNumber, index, array) => {
                  const prev = array[index - 1];
                  const showEllipsis = prev && pageNumber - prev > 1;
                  return (
                    <PaginationItem key={pageNumber}>
                      {showEllipsis && <PaginationEllipsis />}
                      <PaginationLink
                        href="#"
                        isActive={pageNumber === page}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(pageNumber);
                        }}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page + 1);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}

