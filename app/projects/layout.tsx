import Link from 'next/link';

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <nav>
        <Link href="/projects">Overview</Link> |{' '}
        <Link href="/projects/opensource">Open Source</Link> |{' '}
        <Link href="/projects/school">School</Link>
      </nav>
      {children}
    </section>
  );
}