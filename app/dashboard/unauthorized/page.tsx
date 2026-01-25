export default function UnauthorizedPage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-semibold text-foreground">Access denied</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        You do not have permission to view this page.
      </p>
    </div>
  );
}

