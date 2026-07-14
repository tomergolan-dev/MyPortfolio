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
    githubHandle: "@tomergolan-dev",
    linkedin: "#",
    linkedinHandle: "Tomer Golan",
  },
};

export const about = {
  eyebrow: "About",
  title: "A bit about me",
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
  category: string;
  description: string;
  status: string;
  href: string;
};

export const projectsSection = {
  eyebrow: "Projects",
  title: "Selected Projects",
  description:
    "A few projects that reflect how I approach problems — from first concept to shipped product. Replace these with your own case studies.",
};

export const projects: Project[] = [
  {
    title: "Project One",
    category: "Web App",
    description: "A short description of what this project does and the problem it solves.",
    status: "Completed",
    href: "#",
  },
  {
    title: "Project Two",
    category: "API & Backend",
    description: "A short description of what this project does and the problem it solves.",
    status: "In Progress",
    href: "#",
  },
  {
    title: "Project Three",
    category: "Data",
    description: "A short description of what this project does and the problem it solves.",
    status: "MVP",
    href: "#",
  },
];

export type SkillGroup = {
  category: string;
  items: string[];
};

export const skillsSection = {
  eyebrow: "Skills",
  title: "Toolbox",
  description: "The languages, frameworks, and tools I reach for most often.",
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

export const contactSection = {
  eyebrow: "Contact",
  title: "Let's Talk",
  description:
    "I'm always open to new opportunities and interesting projects. If you're looking for someone who's a fast learner and not afraid of the unexpected — let's talk.",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
