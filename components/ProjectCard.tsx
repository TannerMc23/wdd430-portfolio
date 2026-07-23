import Link from 'next/link';
import { deleteProject } from '@/lib/actions';

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  type: 'opensource' | 'school';
  technologies: string[];
  link?: string;
}

export default function ProjectCard({ id, title, description, type, technologies, link }: ProjectCardProps) {
  return (
    <article className="p-4 border-l-4 border-blue-600 bg-gray-50 rounded">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700 mb-3">{description}</p>
      <p className="text-sm text-gray-600">
        <strong>Technologies:</strong> {technologies.join(', ')}
      </p>
      {link && (
        <p className="mt-2">
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Project</a>
        </p>
      )}

      <div className="mt-3 flex gap-3 items-center">
        <Link href={`/projects/${type}/${id}/edit`} className="text-sm text-blue-600 hover:underline">
          Edit
        </Link>
        <form action={deleteProject.bind(null, id, type)}>
          <button type="submit" className="text-sm text-red-600 hover:underline">
            Delete
          </button>
        </form>
      </div>
    </article>
  );
}