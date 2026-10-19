export type ProjectCategory = "Web apps" | "Portfolios" | "Experiments";
export type ProjectVisual =
  | "hospital"
  | "nova"
  | "hostel"
  | "cinematic"
  | "portfolio"
  | "lab"
  | "storefront"
  | "webflow"
  | "react"
  | "quiz"
  | "weather"
  | "solar";

export interface Project {
  id: string;
  title: string;
  coverTitle?: string;
  subtitle: string;
  category: ProjectCategory;
  year: string;
  description: string;
  stack: string[];
  live: string;
  source: string;
  visual: ProjectVisual;
  accent: string;
  featured?: boolean;
  flagship?: boolean;
}

export const profile = {
  name: "Aqib Hussain Khan",
  shortName: "Aqib",
  role: "Creative front-end developer",
  email: "aqib.n2742@gmail.com",
  github: "https://github.com/AqibHussainKhan",
  linkedin: "https://www.linkedin.com/in/aqib-hussain-khan-b92311408/",
  location: "Mailsi, Pakistan",
  education: "Artificial Intelligence · Islamia University of Bahawalpur",
  introduction:
    "I turn ideas into expressive digital experiences. Thoughtful interfaces, purposeful motion, and the little details that make a website feel alive.",
};

const github = "https://github.com/AqibHussainKhan";
const live = "https://aqibhussainkhan.github.io";

export const projects: Project[] = [
  {
    id: "hospital",
    title: "Hospital Management System",
    coverTitle: "HMS Care",
    subtitle: "My flagship web development project.",
    category: "Web apps",
    year: "2026",
    description:
      "My flagship web development project: a hospital management workspace for patient records, appointments, clinical departments, staff, and administration. It brings hospital workflows together with authentication and a responsive interface.",
    stack: ["React", "TypeScript", "Supabase"],
    live: `${live}/hospital-management-system./`,
    source: `${github}/hospital-management-system.`,
    visual: "hospital",
    accent: "#91e5cc",
    featured: true,
    flagship: true,
  },
  {
    id: "nova",
    title: "NOVA",
    subtitle: "A different kind of storefront.",
    category: "Web apps",
    year: "2026",
    description:
      "A premium e-commerce interface built around clean product discovery and a considered shopping experience. Explore the live project and its source code.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    live: `${live}/nova-ecommerce-store/`,
    source: `${github}/nova-ecommerce-store`,
    visual: "nova",
    accent: "#c5ff67",
    featured: true,
  },
  {
    id: "hostelx",
    title: "HOSTELX",
    subtitle: "Less admin. More living.",
    category: "Web apps",
    year: "2026",
    description:
      "A hostel management interface that brings room information, residents, and everyday operations into one organized workspace.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    live: `${live}/hostelx-management-system/`,
    source: `${github}/hostelx-management-system`,
    visual: "hostel",
    accent: "#9b91ff",
    featured: true,
  },
  {
    id: "lab",
    title: "LabCore",
    subtitle: "A clearer view of the working day.",
    category: "Web apps",
    year: "2026",
    description:
      "A local lab attendance portal with a sign-in flow and tools for keeping track of attendance sessions and feedback.",
    stack: ["JavaScript", "HTML", "CSS"],
    live: `${live}/gutham-lab-portal/`,
    source: `${github}/gutham-lab-portal`,
    visual: "lab",
    accent: "#82e9d1",
  },
  {
    id: "daraz",
    title: "Daraz Storefront",
    coverTitle: "Daraz",
    subtitle: "A marketplace interface recreation.",
    category: "Web apps",
    year: "2026",
    description:
      "A front-end recreation of the Daraz shopping interface, with category navigation, flash-sale content, and product-card layouts. Built as a storefront design practice project.",
    stack: ["HTML", "CSS"],
    live: `${live}/Daraz.com/`,
    source: `${github}/Daraz.com`,
    visual: "storefront",
    accent: "#ffab77",
  },
  {
    id: "webflow",
    title: "Made in Webflow",
    subtitle: "A showcase website recreation.",
    category: "Web apps",
    year: "2026",
    description:
      "A front-end recreation of the Made in Webflow community showcase, exploring navigation, category controls, and a responsive website-gallery layout.",
    stack: ["HTML", "Tailwind CSS"],
    live: `${live}/made-in-webflow/`,
    source: `${github}/made-in-webflow`,
    visual: "webflow",
    accent: "#8eacff",
  },
  {
    id: "react-clone",
    title: "React Website Clone",
    coverTitle: "React",
    subtitle: "A familiar developer website, recreated.",
    category: "Web apps",
    year: "2026",
    description:
      "A front-end recreation of the React website, including its navigation, component examples, code blocks, and informational sections. This is a website recreation rather than a personal portfolio.",
    stack: ["HTML", "CSS"],
    live: `${live}/react-website-clone/`,
    source: `${github}/react-website-clone`,
    visual: "react",
    accent: "#9ddff4",
  },
  {
    id: "weather",
    title: "SkyWatch Weather",
    coverTitle: "SkyWatch",
    subtitle: "Weather, with a wider view.",
    category: "Web apps",
    year: "2026",
    description:
      "A weather dashboard with city search, saved cities, weather conditions, forecast sections, and chart-based weather views.",
    stack: ["JavaScript", "HTML", "CSS", "Chart.js"],
    live: `${live}/weather-app/`,
    source: `${github}/weather-app`,
    visual: "weather",
    accent: "#b0dcff",
  },
  {
    id: "quiz",
    title: "Web Dev Quiz",
    coverTitle: "Quiz.",
    subtitle: "A little practice. A sharper mind.",
    category: "Experiments",
    year: "2026",
    description:
      "An interactive HTML, CSS, and JavaScript quiz with answer selection, question navigation, progress tracking, results, and an answer review.",
    stack: ["JavaScript", "HTML", "CSS"],
    live: `${live}/quiz-app/`,
    source: `${github}/quiz-app`,
    visual: "quiz",
    accent: "#cab0ff",
  },
  {
    id: "solar",
    title: "Solar System",
    coverTitle: "Orbit.",
    subtitle: "A small exploration of a much bigger world.",
    category: "Experiments",
    year: "2026",
    description:
      "A visual solar-system experiment exploring orbiting planets, layered composition, and motion through front-end styling.",
    stack: ["HTML", "CSS", "Animation"],
    live: `${live}/solar-system/`,
    source: `${github}/solar-system`,
    visual: "solar",
    accent: "#ffcf91",
  },
  {
    id: "cinematic",
    title: "Cinematic Portfolio",
    coverTitle: "In Motion",
    subtitle: "An expressive developer portfolio.",
    category: "Portfolios",
    year: "2026",
    description:
      "A cinematic personal portfolio exploring storytelling, visual composition, and animated interactions.",
    stack: ["React", "TypeScript", "CSS"],
    live: `${live}/aqib-cinematic-portfolio/`,
    source: `${github}/aqib-cinematic-portfolio`,
    visual: "cinematic",
    accent: "#c89fff",
  },
  {
    id: "latest-portfolio",
    title: "Aqib Latest Portfolio",
    coverTitle: "Latest.",
    subtitle: "A personal introduction, carefully composed.",
    category: "Portfolios",
    year: "2026",
    description:
      "A personal developer portfolio presenting my background, education, skills, experience, and projects in a responsive interface.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    live: `${live}/aqib-latest-portfolio/`,
    source: `${github}/aqib-latest-portfolio`,
    visual: "portfolio",
    accent: "#efb8d5",
  },
  {
    id: "personal-portfolio",
    title: "Personal Portfolio",
    coverTitle: "Aqib.",
    subtitle: "The foundations of my personal web presence.",
    category: "Portfolios",
    year: "2026",
    description:
      "A personal portfolio introducing my front-end work, education, experience, projects, and ways to get in touch.",
    stack: ["HTML", "Tailwind CSS", "JavaScript"],
    live: `${live}/portfolio/`,
    source: `${github}/portfolio`,
    visual: "portfolio",
    accent: "#bdb1ec",
  },
  {
    id: "ideas-in-motion",
    title: "Ideas in Motion",
    subtitle: "A portfolio shaped around movement.",
    category: "Portfolios",
    year: "2026",
    description:
      "A creative personal portfolio exploring expressive layouts, interaction, and the relationship between ideas and motion.",
    stack: ["React", "TypeScript", "CSS"],
    live: `${live}/portfolio-ideas-in-motion/`,
    source: `${github}/portfolio-ideas-in-motion`,
    visual: "portfolio",
    accent: "#d0eaa1",
  },
  {
    id: "portfolio-v2",
    title: "Portfolio V2",
    subtitle: "Another perspective on my work.",
    category: "Portfolios",
    year: "2026",
    description:
      "A second personal portfolio layout with an introduction, a project collection, services, and contact information.",
    stack: ["HTML", "Tailwind CSS", "JavaScript"],
    live: `${live}/portfolio-v2/`,
    source: `${github}/portfolio-v2`,
    visual: "portfolio",
    accent: "#f3c69e",
  },
  {
    id: "your-logo",
    title: "Your Logo Portfolio",
    coverTitle: "Your Logo",
    subtitle: "A portfolio template study.",
    category: "Portfolios",
    year: "2026",
    description:
      "A portfolio template recreation exploring personal branding, skills, services, a work showcase, and contact sections.",
    stack: ["HTML", "Tailwind CSS", "JavaScript"],
    live: `${live}/your-logo-portfolio/`,
    source: `${github}/your-logo-portfolio`,
    visual: "portfolio",
    accent: "#a8cfea",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const projectCollections = [
  {
    id: "portfolios",
    title: "Portfolios",
    description: "Different expressions of my personal web presence.",
    projects: projects.filter((project) => project.category === "Portfolios"),
  },
  {
    id: "web-projects",
    title: "Web projects",
    description: "Applications, storefronts, recreations, and experiments.",
    projects: projects.filter((project) => project.category !== "Portfolios"),
  },
] as const;

export const skills = [
  { name: "React", note: "Component-driven interfaces", number: "01" },
  { name: "TypeScript", note: "Thoughtful, maintainable code", number: "02" },
  { name: "Tailwind CSS", note: "Responsive design systems", number: "03" },
  { name: "JavaScript", note: "Interactions with intention", number: "04" },
];
export const categories: Array<"All" | ProjectCategory> = [
  "All",
  "Web apps",
  "Portfolios",
  "Experiments",
];
