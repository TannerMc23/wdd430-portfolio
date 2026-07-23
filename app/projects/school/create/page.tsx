// app/projects/school/create/page.tsx
import ProjectForm from '@/components/ProjectForm';

export default function Page() {
  return (
    <div>
      <h1>New School Project</h1>
      <ProjectForm type="school" />
    </div>
  );
}