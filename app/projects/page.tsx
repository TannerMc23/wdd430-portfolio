import ProjectSearch from '@/components/ProjectSearch';
import ProjectList from '@/components/ProjectList';
import Pagination from '@/components/Pagination';
import { fetchFilteredProjects, fetchProjectsPages } from '@/lib/projects-db';

export const dynamic = 'force-dynamic';

export default async function ProjectsOverview(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const projects = await fetchFilteredProjects(query, currentPage);
  const totalPages = await fetchProjectsPages(query);

  return (
    <div>
      <h1>Projects Overview</h1>
      <p>A collection of the projects I&apos;ve built, from school coursework to personal work.</p>
      <ProjectSearch />
      <ProjectList projects={projects} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}