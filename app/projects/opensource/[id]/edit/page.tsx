// app/projects/opensource/[id]/edit/page.tsx
import ProjectForm from '@/components/ProjectForm';
import { getProjectById } from '@/lib/projects-db';
import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = Number(params.id);

  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <h1>Edit Project</h1>
      <ProjectForm type="opensource" project={project} />
    </div>
  );
}