/**
 * ============================================================================
 * PORTFOLIO DATA - CENTRALIZED DATA LAYER
 * Single source of truth for Sahithi Chukka's Portfolio.
 * Edit this file to update any content across the website!
 * ============================================================================
 */

export const personalInfo = {
  name: "Sahithi Chukka",
  monogram: "SC",
  headline: "Frontend Developer & Web Application Engineer",
  shortBio:
    "Building thoughtful, responsive, and high-performance web experiences with modern architecture, interactive graphics, and clean code.",
  location: "Visakhapatnam, India",
  status: "Available for Opportunities",
  email: "sahithichukka2004@gmail.com",
  avatar: "/assets/warm_outdoor_portrait.png",
  resumePath: "/assets/Chukka_Sahithi_resume.pdf",
  socials: {
    github: "https://github.com/Sahithi200423",
    linkedin: "https://www.linkedin.com/in/sahithi-chukka-26b919290/",
    email: "mailto:sahithichukka2004@gmail.com",
  },
};

export const aboutData = {
  headline: "Computer Science scholar crafting high-performance web applications",
  paragraphs: [
    "I am a Frontend Developer and Web Application Engineer pursuing my B.Tech + M.Tech Dual Degree in Computer Science and Engineering at Andhra University College of Engineering (A), Visakhapatnam. My philosophy centers around learning by building practical, real-world systems—combining clean semantic code with expressive typography, smooth transitions, and intuitive design patterns.",
    "From designing high-concurrency ticket reservations in CineBook with atomic seat locks to developing interactive web graphics with Three.js, I focus on engineering web applications that feel fluid, reliable, and delightful to interact with across every screen size.",
  ],
  educationSummary: {
    degree: "B.Tech + M.Tech Dual Degree (CSE)",
    university: "Andhra University College of Engineering (A)",
    location: "Visakhapatnam, Andhra Pradesh, India",
    focus: "React, Modern JavaScript, UI/UX, REST APIs",
  },
  interests: [
    "Modern React Architecture",
    "Interactive 3D WebGL & Canvas Graphics",
    "Accessible & Responsive Design Systems",
    "API Concurrency & Real-Time Data",
  ],
};

export const skillsData = {
  categories: [
    {
      id: "frontend",
      title: "Frontend Engineering",
      description: "Building responsive, accessible, and fast user interfaces",
      skills: [
        { name: "React", level: 90, tag: "Core" },
        { name: "JavaScript (ES6+)", level: 92, tag: "Core" },
        { name: "Modern CSS / CSS3", level: 90, tag: "Design" },
        { name: "HTML5 & Accessibility", level: 95, tag: "Structure" },
        { name: "Responsive Web Design", level: 92, tag: "Layout" },
        { name: "Three.js & Canvas", level: 75, tag: "3D/Graphics" },
      ],
    },
    {
      id: "backend",
      title: "Backend & APIs",
      description: "Developing clean APIs and server-side logic",
      skills: [
        { name: "Node.js", level: 82, tag: "Runtime" },
        { name: "Express.js", level: 80, tag: "Framework" },
        { name: "RESTful API Design", level: 85, tag: "Architecture" },
        { name: "Concurrency & Lock Handling", level: 78, tag: "Systems" },
      ],
    },
    {
      id: "database",
      title: "Database & Backend as a Service",
      description: "Storing, managing, and securing application data",
      skills: [
        { name: "PostgreSQL", level: 80, tag: "Relational" },
        { name: "Supabase", level: 82, tag: "BaaS & Auth" },
        { name: "SQL Queries & Schema Design", level: 80, tag: "Queries" },
      ],
    },
    {
      id: "tools",
      title: "Development Tools & Workflow",
      description: "Industry-standard development, version control, and deployment",
      skills: [
        { name: "Git & GitHub", level: 88, tag: "Version Control" },
        { name: "Vite", level: 90, tag: "Build Tool" },
        { name: "Vercel", level: 85, tag: "Deployment" },
        { name: "npm / Package Management", level: 88, tag: "Workflow" },
        { name: "Chrome DevTools", level: 90, tag: "Debugging" },
      ],
    },
  ],
};

export const projectsData = [
  {
    id: "cinebook",
    title: "CineBook — Movie Ticket Booking Platform",
    category: "Full-Stack",
    badge: "Featured Production Project",
    summary:
      "A complete cinema ticket reservation platform featuring interactive 128-seat auditorium selection, concurrency control, Razorpay sandbox payment integration, and internationalization.",
    description:
      "CineBook evolved from an initial prototype into a hardened production architecture with real-time seat reservation locks to prevent double-booking, multi-locale language switching, and comprehensive automated API tests.",
    technologies: ["React", "Node.js", "Express", "PostgreSQL", "Three.js", "Razorpay API"],
    liveUrl: "https://movie-booking-one-azure.vercel.app/",
    githubUrl: "https://github.com/Sahithi200423/Movie_booking",
    backendHealthUrl: "https://cinebook-backend-as00.onrender.com/api/health",
    image: "/assets/projects/cinebook_preview.png",
    featured: true,
    highlights: [
      "Dynamic interactive auditorium seat map",
      "Atomic concurrency locks preventing seat collisions",
      "Razorpay test payment integration",
      "43 automated test suite passes",
    ],
  },
  {
    id: "groundwater",
    title: "Groundwater Consultants Web Portal",
    category: "Frontend",
    badge: "Client Web Solution",
    summary:
      "A responsive professional web portal for hydrogeological surveys, field services, and client inquiries.",
    description:
      "Designed and developed with a strong focus on accessibility, fast load times, and structured presentation of technical consulting services.",
    technologies: ["JavaScript", "HTML5", "Modern CSS", "Responsive Design"],
    liveUrl: "#",
    githubUrl: "https://github.com/Sahithi200423",
    image: "/assets/projects/groundwater_preview.png",
    featured: false,
    highlights: [
      "Responsive across all mobile and desktop screens",
      "Clean corporate design system",
      "Inquiry and service documentation flows",
    ],
  },
  {
    id: "scenelingo",
    title: "SceneLingo / Native Language AI",
    category: "AI & Frontend",
    badge: "AI Concept Project",
    summary:
      "Multilingual learning and pronunciation rehearsal studio utilizing voice recognition and situational dialogues.",
    description:
      "Provides learners with interactive speech recognition scenarios and real-time pronunciation guidance in multiple native languages.",
    technologies: ["React", "JavaScript", "Web Speech API", "CSS Grid"],
    liveUrl: "#",
    githubUrl: "https://github.com/Sahithi200423",
    image: "/assets/projects/scenelingo_preview.png",
    featured: false,
    highlights: [
      "Voice recognition integration",
      "Interactive conversational prompts",
      "Adaptive feedback system",
    ],
  },
];

export const educationData = [
  {
    id: "au-dual-degree",
    degree: "B.Tech + M.Tech Dual Degree in Computer Science and Engineering",
    institution: "Andhra University College of Engineering (Autonomous)",
    location: "Visakhapatnam, Andhra Pradesh, India",
    period: "2021 – Present",
    status: "In Progress",
    description:
      "Rigorous dual degree program covering fundamental computer science, software engineering principles, full-stack web architectures, and algorithms.",
    coursework: [
      "Data Structures & Algorithms",
      "Web Technologies & Frameworks",
      "Database Management Systems",
      "Object-Oriented Programming",
      "Computer Networks",
    ],
  },
];

export const experienceData = [
  {
    id: "frontend-dev-learning",
    role: "Frontend Developer (Project-Based & Open Source)",
    organization: "Independent Development & Academic Projects",
    period: "2023 – Present",
    location: "Visakhapatnam, India",
    type: "Practical Experience",
    responsibilities: [
      "Architected and deployed full-stack web applications including CineBook with React and Node.js.",
      "Engineered responsive, accessible user interfaces following modern design systems and performance standards.",
      "Integrated third-party APIs, database services (PostgreSQL / Supabase), and automated testing suites.",
    ],
  },
];

export const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" },
];
