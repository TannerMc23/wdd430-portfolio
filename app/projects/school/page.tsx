// app/projects/school/page.tsx
import { Suspense } from 'react';
import Link from 'next/link';
import SchoolProjectList from '@/components/SchoolProjectList';

export const dynamic = 'force-dynamic';

export default function SchoolProjects() {
  return (
    <div>
      <h1>School Projects</h1>
      <p>Projects completed as part of my BYU-Idaho coursework.</p>
      <Link href="/projects/school/create">+ New Project</Link>
      <Suspense fallback={<SchoolProjectsSkeleton />}>
        <SchoolProjectList />
      </Suspense>
    </div>
  );
}

function SchoolProjectsSkeleton() {
  return (
    <section className="grid gap-4 md:grid-cols-2 animate-pulse">
      <div className="h-32 rounded-xl bg-slate-200" />
      <div className="h-32 rounded-xl bg-slate-200" />
    </section>
  );
}