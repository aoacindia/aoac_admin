"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetchContacts(1);
  }, []);

  const fetchContacts = async (nextPage: number) => {
    try {
      setLoading(true);
      const url = `/api/contacts?page=${nextPage}&limit=${limit}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setContacts(data.data);
        setTotalCount(data.meta?.total ?? 0);
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

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return;
    fetchContacts(nextPage);
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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) {
      return;
    }

    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert("Contact deleted successfully");
        fetchContacts(page);
      } else {
        alert("Error deleting contact: " + data.error);
      }
    } catch (err: any) {
      alert("Error deleting contact: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-zinc-600 dark:text-zinc-400">Loading contacts...</p>
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
            All Contacts
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Manage contact form submissions
          </p>
        </div>
      </div>

      {/* Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Contacts</p>
          <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{totalCount}</p>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader className="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
              <TableRow>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Name
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Email
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Subject
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Date
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-700">
              {contacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="px-4 py-8 text-center text-zinc-500 dark:text-zinc-400">
                    No contacts found.
                  </TableCell>
                </TableRow>
              ) : (
                contacts.map((contact) => (
                  <TableRow
                    key={contact.id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {contact.name}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {contact.email}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xs truncate">
                        {contact.subject}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Link
                          href={`/dashboard/contacts/${contact.id}`}
                          className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                          title="View"
                        >
                          View
                        </Link>
                        <Button
                          onClick={() => handleDelete(contact.id)}
                          className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                          title="Delete"
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="px-4 py-4 border-t border-zinc-200 dark:border-zinc-700">
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
