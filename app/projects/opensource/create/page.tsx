// app/projects/opensource/create/page.tsx
import ProjectForm from '@/components/ProjectForm';

export default function Page() {
  return (
    <div>
      <h1>New Open Source Project</h1>
      <ProjectForm type="opensource" />
    </div>
  );
}