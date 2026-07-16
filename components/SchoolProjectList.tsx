import ProjectList from './ProjectList';
import { getProjects } from '@/lib/projects-db';

export default async function SchoolProjectList() {
  const projects = await getProjects('school');
  return <ProjectList projects={projects} />;
}