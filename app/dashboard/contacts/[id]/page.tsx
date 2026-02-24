"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export default function ContactDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContact();
  }, [id]);

  const fetchContact = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/contacts/${id}`);
      const data = await response.json();

      if (data.success) {
        setContact(data.data);
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this contact? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert("Contact deleted successfully");
        router.push("/dashboard/contacts");
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
          <p className="text-zinc-600 dark:text-zinc-400">Loading contact details...</p>
        </div>
      </div>
    );
  }

  if (error || !contact) {
    return (
      <div className="p-4 md:p-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">
            Error: {error || "Contact not found"}
          </p>
          <Link
            href="/dashboard/contacts"
            className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Contacts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Link
            href="/dashboard/contacts"
            className="text-blue-600 dark:text-blue-400 hover:underline mb-2 inline-block"
          >
            ← Back to Contacts
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Contact Details
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Complete information about the contact submission
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={handleDelete}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-center"
          >
            Delete Contact
          </Button>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 mb-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Name
            </Label>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium mt-1">
              {contact.name}
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Email
            </Label>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium mt-1">
              {contact.email}
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Subject
            </Label>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium mt-1">
              {contact.subject}
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Contact ID
            </Label>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium mt-1">
              {contact.id}
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Created At
            </Label>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium mt-1">
              {new Date(contact.createdAt).toLocaleString()}
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Last Updated
            </Label>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium mt-1">
              {new Date(contact.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Message
        </h2>
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
          <p className="text-zinc-900 dark:text-zinc-100 whitespace-pre-wrap">
            {contact.message}
          </p>
        </div>
      </div>
    </div>
  );
}
