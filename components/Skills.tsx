interface SkillsProps {
  skills: string[];
}

export default function Skills({ skills }: SkillsProps) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">Skills</h2>
      <ul className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <li
            key={skill}
            className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}