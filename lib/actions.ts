'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const currentYear = new Date().getFullYear();

const ProjectFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  type: z.enum(['opensource', 'school']),
  technologies: z.array(z.string().min(1)).min(1, 'Add at least one technology.'),
  link: z.string().url('Enter a valid URL.').optional().or(z.literal('')),
  yearCompleted: z.coerce
    .number()
    .int('Year must be a whole number.')
    .gte(2000, 'Year must be 2000 or later.')
    .lte(currentYear, `Year cannot be greater than ${currentYear}.`),
});

export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    type?: string[];
    technologies?: string[];
    link?: string[];
    yearCompleted?: string[];
  };
  message?: string | null;
};

function parseFormData(formData: FormData) {
  return {
    title: formData.get('title'),
    description: formData.get('description'),
    type: formData.get('type'),
    technologies: (formData.get('technologies') as string)
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0),
    link: formData.get('link'),
    yearCompleted: formData.get('yearCompleted'),
  };
}

export async function createProject(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = ProjectFormSchema.safeParse(parseFormData(formData));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to save project.',
    };
  }

  const { title, description, type, technologies, link, yearCompleted } = validatedFields.data;

  try {
    await sql.query(
      `INSERT INTO projects (title, description, type, technologies, link, year_completed)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [title, description, type, technologies, link || null, yearCompleted]
    );
  } catch (error) {
    console.error('Error creating project:', error);
    return { message: 'Database Error: Failed to create project.' };
  }

  revalidatePath(`/projects/${type}`);
  redirect(`/projects/${type}`);
}

export async function updateProject(
  id: number,
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = ProjectFormSchema.safeParse(parseFormData(formData));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to update project.',
    };
  }

  const { title, description, type, technologies, link, yearCompleted } = validatedFields.data;

  try {
    await sql.query(
      `UPDATE projects
       SET title = $1, description = $2, type = $3, technologies = $4, link = $5, year_completed = $6
       WHERE id = $7`,
      [title, description, type, technologies, link || null, yearCompleted, id]
    );
  } catch (error) {
    console.error('Error updating project:', error);
    return { message: 'Database Error: Failed to update project.' };
  }

  revalidatePath(`/projects/${type}`);
  redirect(`/projects/${type}`);
}

export async function deleteProject(id: number, type: string) {
  try {
    await sql`DELETE FROM projects WHERE id = ${id}`;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project. Please try again later.');
  }
  revalidatePath(`/projects/${type}`);
}