import ProjectList from "@/components/ProjectList";
import Skills from "@/components/Skills";

const projects = [
  {
    title: "Vantyx Web Presence",
    description: "A multi-site business platform for a storage container and semi-truck tire company, including a Square-integrated parking payment app.",
    technologies: ["Next.js", "Node.js", "Express", "Square API"],
    link: "https://vantyx.us",
  },
  {
    title: "RollCall Inventory App",
    description: "A tire inventory and sales management tool with customer tracking and stock transaction history.",
    technologies: ["Node.js", "Express", "PostgreSQL", "EJS"],
    link: "https://github.com/TannerMc23",
  },
];

const skills = [
  "Next.js", "React", "TypeScript", "Node.js", "Express",
  "PostgreSQL", "MongoDB", "Tailwind CSS", "Git",
];

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Tanner McMillan</h1>
        <p className="text-lg text-gray-600">
          Web developer transitioning from B2B sales, building full-stack applications with Next.js, React, and Node.js.
        </p>
      </section>
      <Skills skills={skills} />
      <section>
        <h2 className="text-2xl font-semibold mb-6">Projects</h2>
        <ProjectList projects={projects} />
      </section>
    </div>
  );
}