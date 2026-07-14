export const profile = {
  name: "Tomer Golan",
  role: "Software Engineer",
  tagline:
    "I build fast, reliable web applications — from backend systems to polished, user-facing interfaces.",
  location: "Israel",
  email: "tomergolan2016@gmail.com",
  resumeUrl: "#",
  social: {
    github: "https://github.com/tomergolan-dev",
    linkedin: "#",
  },
};

export const about = {
  bio: [
    "I'm a software engineer who enjoys turning ambiguous problems into clean, working products. I care about code that's easy to read, easy to change, and does exactly what it says.",
    "Outside of shipping features, I like digging into the 'why' behind a system's design and finding the simplest solution that holds up under real use.",
  ],
  stats: [
    { label: "Years experience", value: "3+" },
    { label: "Projects shipped", value: "10+" },
    { label: "Technologies", value: "15+" },
  ],
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    title: "Project One",
    description:
      "A short description of what this project does and the problem it solves. Replace with a real case study.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    href: "#",
    repo: "#",
  },
  {
    title: "Project Two",
    description:
      "A short description of what this project does and the problem it solves. Replace with a real case study.",
    tags: ["Node.js", "PostgreSQL", "REST API"],
    href: "#",
    repo: "#",
  },
  {
    title: "Project Three",
    description:
      "A short description of what this project does and the problem it solves. Replace with a real case study.",
    tags: ["React", "Python", "Data"],
    href: "#",
    repo: "#",
  },
];

export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "REST APIs", "PostgreSQL"],
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "Vercel", "CI/CD"],
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
