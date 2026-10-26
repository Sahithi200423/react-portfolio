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
  headline: "Engineering Graduate crafting high-performance web applications",
  paragraphs: [
    "I am an Engineering Graduate and Web Application Engineer who completed my degree in Computer Science and Engineering at Andhra University College of Engineering (A), Visakhapatnam. My philosophy centers around learning by building practical, real-world systems—combining clean semantic code with expressive typography, smooth transitions, and intuitive design patterns.",
    "From designing high-concurrency ticket reservations in CineBook with atomic seat locks to developing interactive web graphics with Three.js, I focus on engineering web applications that feel fluid, reliable, and delightful to interact with across every screen size.",
  ],
  educationSummary: {
    degree: "B.Tech in Computer Science and Engineering — Graduated",
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
    title: "CineBook V2 — Movie Ticket Booking Platform",
    category: "Full-Stack",
    badge: "Featured Production System",
    flagship: true,
    featured: true,
    summary:
      "A complete cinema ticket reservation platform featuring interactive 128-seat auditorium selection, atomic concurrency control, Razorpay sandbox payment integration, and internationalization.",
    description:
      "CineBook evolved from an initial prototype into a hardened production architecture featuring real-time seat reservation locks to prevent double-booking, multi-locale language switching, and comprehensive automated API tests.",
    problemSolved:
      "High-concurrency ticket reservations frequently suffer from double-booking race conditions when multiple users attempt to hold the same seat simultaneously.",
    myContribution:
      "Architected the full-stack system: implemented atomic conditional upserts directly in PostgreSQL to lock seats for 10 minutes, built an interactive 128-seat auditorium map, integrated Razorpay test payment flow with HMAC-SHA256 signature verification, and configured reverse-proxy security.",
    technologies: ["React 19", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma ORM", "Three.js", "Razorpay API", "Tailwind CSS v4"],
    liveUrl: "https://movie-booking-one-azure.vercel.app/",
    githubUrl: "https://github.com/Sahithi200423/Movie_booking",
    backendHealthUrl: "https://cinebook-backend-as00.onrender.com/api/health",
    image: "/assets/projects/cinebook_preview.png",
    seatsImage: "/assets/projects/cinebook_seats.png",
    highlights: [
      "Dynamic interactive auditorium seat map (128 seats across 3 tiers)",
      "Atomic PostgreSQL concurrency locks preventing seat collisions",
      "Razorpay test payment integration with webhook HMAC verification",
      "18-language locale switcher with dynamic RTL layout support",
    ],
    architecture: {
      bookingFlow:
        "Movie catalog browsing -> Showtime selection -> 128-seat interactive auditorium grid -> 10-minute atomic seat lock -> Razorpay test sandbox checkout -> Signed QR ticket generation.",
      seatSelection:
        "128-seat matrix across rows A–H and columns 1–16, categorized into VIP Recliner, Premium Prime, and Standard Classic tiers with live seat counters.",
      database:
        "Supabase PostgreSQL with Prisma ORM, utilizing atomic row-level locks and raw webhook buffer verification for HMAC-SHA256 signature checks.",
      concurrency:
        "Strict 10-minute hold duration with automatic expiration and conflict handling: conditional upsert queries return HTTP 409 Conflict to competing requests.",
    },
  },
  {
    id: "groundwater",
    title: "Global Groundwater Consultants — Enterprise Web Portal",
    category: "Full-Stack",
    badge: "Featured Environmental Platform",
    flagship: true,
    featured: true,
    summary:
      "Full-stack hydrogeological survey and groundwater consulting web platform featuring 5 specialized mathematical calculators, an administrative operations subsystem, and client engagement tools.",
    description:
      "A comprehensive technical web solution engineered for a professional hydrogeological and environmental consultancy firm. It bridges the gap between field hydrogeologists and clients (industrial, agricultural, and residential) through interactive preliminary engineering calculators, client consultation request flows, and administrative management.",
    problemSolved:
      "Groundwater recharge feasibility and Central Ground Water Authority (CGWA) compliance require complex calculations, unit conversions, and immediate preliminary documentation for clients.",
    myContribution:
      "Architected the full-stack portal with React 19, TypeScript, and Vite. Implemented 5 specialized mathematical domain calculators with jsPDF client-side estimation report exports, an emergency helpline modal, and a 10-view administrative management subsystem integrated with Supabase.",
    technologies: ["React 19", "TypeScript", "Tailwind CSS v4", "Supabase", "jsPDF", "Express", "Vite", "Motion"],
    liveUrl: null, // Staging / local development
    githubUrl: "https://github.com/Sahithi200423/GlobalGroundWater",
    image: null,
    highlights: [
      "5 specialized engineering calculators (Groundwater Recharge, Rainwater Harvesting, Water Demand, Cost Estimator, Hydraulic Units)",
      "Client-side preliminary estimation PDF report generation using jsPDF",
      "10-view administrative management portal with Supabase database integration for appointments & inquiries",
      "Comprehensive service catalog, consultation booking workflows, and 24/7 emergency helpline trigger",
    ],
    architecture: {
      calculators:
        "Engineered 5 mathematical domain tools: Groundwater Recharge (soil permeability & runoff volume), Rainwater Harvesting (annual harvest potential), Daily Water Demand (per-capita/industrial forecasting), Project Cost Estimator (budgeting with jsPDF export), and Hydraulic Unit Converter (flux, volume, pressure).",
      adminSubsystem:
        "10-view administrative management portal integrated with Supabase for appointments, client testimonials, service catalogs, project case studies, and career applications.",
      workflows:
        "Client consultation request flows, WhatsApp consultation trigger, 24/7 emergency helpline modal, and global search functionality.",
      stack:
        "React 19, TypeScript, Tailwind CSS v4, Express server, Motion animations, jsPDF report generator, and Supabase database client.",
    },
    availabilityNote: "Verified Open-Source Repository on GitHub / Staging Deployment in Local Development.",
  },
];

export const educationData = [
  {
    id: "au-dual-degree",
    degree: "B.Tech in Computer Science and Engineering — Graduated",
    institution: "Andhra University College of Engineering (Autonomous)",
    location: "Visakhapatnam, Andhra Pradesh, India",
    period: "Graduated",
    status: "Completed",
    description:
      "Rigorous engineering program covering fundamental computer science, software engineering principles, full-stack web architectures, and algorithms.",
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
