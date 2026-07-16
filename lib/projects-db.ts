// lib/projects-db.ts
import { sql } from '@vercel/postgres';

export interface Project {
  id: number;
  title: string;
  description: string;
  type: 'opensource' | 'school';
  technologies: string[];
  link?: string;
}

export async function getProjects(type?: string | null): Promise<Project[]> {
  if (type) {
    const { rows } = await sql<Project>`
      SELECT * FROM projects WHERE type = ${type} ORDER BY id
    `;
    return rows;
  }
  const { rows } = await sql<Project>`SELECT * FROM projects ORDER BY id`;
  return rows;
}

export async function getProjectById(id: number): Promise<Project | null> {
  const { rows } = await sql<Project>`
    SELECT * FROM projects WHERE id = ${id}
  `;
  return rows[0] ?? null;
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredProjects(
  query: string,
  currentPage: number
): Promise<Project[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const searchTerm = `%${query}%`;

  const { rows } = await sql<Project>`
    SELECT * FROM projects
    WHERE title ILIKE ${searchTerm}
       OR description ILIKE ${searchTerm}
       OR EXISTS (
         SELECT 1 FROM unnest(technologies) AS tech
         WHERE tech ILIKE ${searchTerm}
       )
    ORDER BY id
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
  return rows;
}

export async function fetchProjectsPages(query: string): Promise<number> {
  const searchTerm = `%${query}%`;

  const { rows } = await sql`
    SELECT COUNT(*) FROM projects
    WHERE title ILIKE ${searchTerm}
       OR description ILIKE ${searchTerm}
       OR EXISTS (
         SELECT 1 FROM unnest(technologies) AS tech
         WHERE tech ILIKE ${searchTerm}
       )
  `;

  const count = Number(rows[0].count);
  return Math.ceil(count / ITEMS_PER_PAGE);
}