export default function Loading() {
  return (
    <main className="animate-pulse space-y-4">
      <div className="h-10 w-2/3 rounded bg-slate-200" />
      <div className="h-4 w-full rounded bg-slate-200" />
      <div className="h-4 w-5/6 rounded bg-slate-200" />
      <section className="grid gap-4 md:grid-cols-2">
        <div className="h-32 rounded-xl bg-slate-200" />
        <div className="h-32 rounded-xl bg-slate-200" />
      </section>
    </main>
  );
}