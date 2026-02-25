"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface EmailAccount {
  id: string;
  fromEmail: string;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function EmailsPage() {
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    fetchEmailAccounts();
  }, [activeFilter]);

  const fetchEmailAccounts = async () => {
    try {
      setLoading(true);
      let url = "/api/emails";
      if (activeFilter !== "all") {
        url += `?isActive=${activeFilter === "active"}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setEmailAccounts(data.data);
      } else {
        setError(data.error || "Failed to fetch email accounts");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch email accounts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Email Accounts</h1>
          <p className="text-sm text-muted-foreground">
            Manage SMTP email account configurations.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
          >
            <option value="all">All Accounts</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </Select>
          <Link href="/dashboard/emails/create">
            <Button>Add New Email Account</Button>
          </Link>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-border bg-background">
        {loading ? (
          <div className="p-6 text-sm text-muted-foreground">Loading...</div>
        ) : error ? (
          <div className="p-6 text-sm text-red-500">{error}</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From Email</TableHead>
                <TableHead>SMTP Host</TableHead>
                <TableHead>SMTP Port</TableHead>
                <TableHead>SMTP User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emailAccounts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-sm">
                    No email accounts found.
                  </TableCell>
                </TableRow>
              ) : (
                emailAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell>{account.fromEmail}</TableCell>
                    <TableCell>{account.smtpHost}</TableCell>
                    <TableCell>{account.smtpPort}</TableCell>
                    <TableCell>{account.smtpUser}</TableCell>
                    <TableCell>
                      {account.isActive ? (
                        <Badge className="bg-green-500">Active</Badge>
                      ) : (
                        <Badge className="bg-gray-500">Inactive</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(account.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

