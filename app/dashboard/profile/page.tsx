import Header from "@/app/components/Header";
import { requirePagePermission } from "@/lib/page-auth";

const fields = ["name", "email", "phone", "role"] as const;

export default async function ProfilePage() {
  const { actor } = await requirePagePermission("dashboard.view");

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Header />
      <main className="mx-auto max-w-xl px-6 py-8">
        <h1 className="text-2xl font-semibold text-foreground">My profile</h1>
        <dl className="mt-6 space-y-4 rounded-lg border border-border bg-background p-6">
          {fields.map((field) => (
            <div key={field}>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                {field}
              </dt>
              <dd className="mt-1 text-sm text-foreground">{actor[field]}</dd>
            </div>
          ))}
        </dl>
      </main>
    </div>
  );
}
