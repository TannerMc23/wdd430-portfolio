import ProjectList from '@/components/ProjectList';
import { getProjects } from '@/lib/projects-db';

export const dynamic = 'force-dynamic';

export default async function SchoolProjects() {
  const projects = await getProjects('school');

  return (
    <div>
      <h1>School Projects</h1>
      <p>Projects completed as part of my BYU-Idaho coursework.</p>
      <ProjectList projects={projects} />
    </div>
  );
}