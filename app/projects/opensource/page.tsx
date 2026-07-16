import ProjectList from '@/components/ProjectList';
import { getProjects } from '@/lib/projects-db';

export const dynamic = 'force-dynamic';

export default async function OpenSourceProjects() {
  const projects = await getProjects('opensource');

  return (
    <div>
      <h1>Open Source Projects</h1>
      <p>Contributions and personal projects outside of coursework.</p>
      <ProjectList projects={projects} />
    </div>
  );
}