export const roles = [
  "Information Science Student",
  "AI & Backend Developer",
  "Full Stack Developer",
  "Building Practical AI Projects",
  "Always Learning",
];

export const skillGroups = [
  {
    label: "Languages",
    items: [
      { name: "Python", level: 92 },
      { name: "Java", level: 85 },
      { name: "JavaScript", level: 82 },
      { name: "SQL", level: 80 },
      { name: "HTML", level: 90 },
      { name: "CSS", level: 85 },
    ],
  },
  {
    label: "Frameworks",
    items: [
      { name: "FastAPI", level: 85 },
      { name: "Flask", level: 88 },
      { name: "Django", level: 80 },
      { name: "React", level: 82 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Bootstrap", level: 80 },
    ],
  },
  {
    label: "Machine Learning",
    items: [
      { name: "Scikit-learn", level: 82 },
      { name: "Pandas", level: 88 },
      { name: "NumPy", level: 86 },
      { name: "XGBoost", level: 80 },
      { name: "OpenCV", level: 78 },
    ],
  },
  {
    label: "Tools & Platforms",
    items: [
      { name: "Git", level: 90 },
      { name: "GitHub", level: 90 },
      { name: "PostgreSQL", level: 78 },
      { name: "SQLite", level: 85 },
      { name: "REST APIs", level: 85 },
      { name: "Vercel", level: 80 },
      { name: "Netlify", level: 78 },
      { name: "Render", level: 78 },
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  accent: string;
};

export const projects: Project[] = [
  {
    id: "visioncapture",
    title: "VisionCapture",
    tagline: "AI-powered computer vision application.",
    description:
      "A computer vision application that detects, tracks and analyzes objects in real time, wrapping model inference behind a clean, responsive interface built for fast iteration and demoing.",
    tech: ["Python", "OpenCV", "FastAPI", "React"],
    github: "https://github.com/adp-iitm/visioncapture",
    live: "",
    accent: "from-indigo-500 to-cyan-400",
  },
  {
  id: "adi-assistant",
  title: "Adi Assistant",
  tagline: "AI developer assistant for coding, debugging and project generation.",
  description:
    "An AI-powered assistant to help with software development. It assists in code generation, debugging, explaining concepts, generating documentation, and accelerating project development through natural language conversations.",
  tech: [
    "React",
    "TypeScript",
    "AI",
    "LLM"
  ],
  github: "https://github.com/adp-iitm",
  live: "",
  accent: "from-fuchsia-500 to-indigo-500",
},
  {
    id: "hospital-management",
    title: "Hospital Management System",
    tagline: "Three-tier healthcare management platform.",
    description:
      "A three-tier platform separating admin, doctor and patient workflows — appointment scheduling, records management and role-based access built on a Django and SQLite stack.",
    tech: ["Django", "SQLite", "Bootstrap", "Python"],
    github: "https://github.com/adp-iitm",
    live: "",
    accent: "from-violet-500 to-indigo-400",
  },
  {
    id: "data-analysis-agent",
    title: "Data Analysis Agent",
    tagline: "AI-powered data analysis assistant.",
    description:
      "An assistant that takes raw datasets and returns cleaned data, statistical summaries and generated charts through natural-language prompts, chaining an LLM with a Python analysis pipeline.",
    tech: ["Python", "Pandas", "LLM APIs", "FastAPI"],
    github: "https://github.com/adp-iitm",
    live: "",
    accent: "from-cyan-400 to-indigo-500",
  },
  {
    id: "cybersafe-ai",
    title: "CyberSafe AI",
    tagline: "Fraud detection and phishing analysis platform.",
    description:
      "A detection platform that scores transactions and messages for fraud and phishing risk using trained classifiers, surfacing explainable risk signals rather than a black-box verdict.",
    tech: ["Python", "Scikit-learn", "XGBoost", "Flask"],
    github: "https://github.com/adp-iitm",
    live: "",
    accent: "from-rose-400 to-violet-500",
  },
  {
    id: "rewear",
    title: "ReWear",
    tagline: "Community clothing exchange platform.",
    description:
      "A community marketplace for swapping and re-homing clothing — listing, matching and point-based exchange flows designed to make reuse the easy option.",
    tech: ["React", "Django", "PostgreSQL", "REST APIs"],
    github: "https://github.com/adp-iitm",
    live: "",
    accent: "from-emerald-400 to-cyan-400",
  },
  {
    id: "trekking-management",
    title: "Trekking Management System",
    tagline: "Flask-based trekking management application.",
    description:
      "An end-to-end trekking operations app with admin, staff and trekker roles, route seeding for Indian trekking trails, and fully tested booking and management flows.",
    tech: ["Flask", "SQLAlchemy", "SQLite", "Bootstrap"],
    github: "https://github.com/adp-iitm",
    live: "",
    accent: "from-amber-400 to-rose-400",
  },
];

export const timeline = [
  {
    year: "2026",
    title: "Smart Agriculture Assistance System",
    org: "Academic Project · NIE Mysuru",
    description:
      "Building an assistance system for farmers under the guidance of Dr. Mayura Tapkire, combining sensor data and ML-driven recommendations.",
    type: "project",
  },
  {
    year: "2025",
    title: "Goldman Sachs Hackathon",
    org: "Hackathon",
    description:
      "Solved a drone delivery route-optimization problem in Python — time-aware no-fly-zone avoidance, energy modeling and multi-pass scheduling.",
    type: "hackathon",
  },
  {
    year: "2025",
    title: "ESG Emissions Data Platform",
    org: "Independent Build",
    description:
      "Designed and built an emissions data platform from scratch with ingestion, normalization, review and audit workflows on Django REST Framework and React.",
    type: "project",
  },
  {
    year: "2024 – Present",
    title: "BS in Data Science & Applications",
    org: "IIT Madras",
    description:
      "Pursuing a second degree alongside the B.E. programme, focused on applied data science, statistics and machine learning.",
    type: "education",
  },
  {
    year: "2023 – Present",
    title: "B.E. Information Science Engineering",
    org: "The National Institute of Engineering, Mysuru",
    description:
      "Core coursework spanning blockchain technology, software architecture and design patterns, and systems programming.",
    type: "education",
  },
];

export const achievements = [
  { label: "Projects Completed", value: 15, suffix: "+" },
  { label: "GitHub Contributions", value: 480, suffix: "+" },
  { label: "Technologies Learned", value: 22, suffix: "+" },
  { label: "Coding Hours", value: 1200, suffix: "+" },
];

export const certifications = [
  {
    title: "AWS Cloud Computing — Skill Development",
    issuer: "AWS Academy / NIE Mysuru",
    year: "2025",
  },
  {
    title: "Blockchain Technology (BIS613A)",
    issuer: "The National Institute of Engineering",
    year: "2025",
  },
  {
    title: "Software Architecture & Design Patterns (BIS606)",
    issuer: "The National Institute of Engineering",
    year: "2025",
  },
  {
    title: "Data Science & Applications — Foundation Level",
    issuer: "IIT Madras",
    year: "2024",
  },
];

export const education = [
  {
    title: "B.E. Information Science Engineering",
    place: "The National Institute of Engineering, Mysuru",
    period: "2023 — 2027 (Expected)",
    detail: "Coursework: Full Stack Development, Software Architecture & Design Patterns, Machine Learning, DBMS",
  },
  {
    title: "BS in Data Science & Applications",
    place: "Indian Institute of Technology, Madras",
    period: "2023 — 2027 (Expected)",
    detail: "Focus: statistics, machine learning, applied data science, programming",
  },
];

export const techMarquee = [
  "Python",
  "React",
  "FastAPI",
  "Django",
  "Flask",
  "XGBoost",
  "PostgreSQL",
  "TypeScript",
  "Tailwind CSS",
  "Scikit-learn",
  "Pandas",
  "Git",
];

export const socials = {
  email: "adpaniitian@gmail.com",
  linkedin: "https://www.linkedin.com/in/aditya-pareek-235280293/",
  github: "https://github.com/adp-iitm",
  location: "Mysuru / Mangaluru, Karnataka, India",
};
