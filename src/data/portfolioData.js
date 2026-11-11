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
    "Building thoughtful, responsive web applications with React, clean user interfaces, and readable code.",
  location: "Hyderabad, India",
  status: "Available for Opportunities",
  email: "sahithichukka@gmail.com",
  avatar: "/assets/warm_outdoor_portrait.png",
  resumePath: "/assets/Chukka_Sahithi_resume.pdf",
  socials: {
    github: "https://github.com/Sahithi200423",
    linkedin: "https://www.linkedin.com/in/sahithi-chukka-26b919290/",
    email: "mailto:sahithichukka@gmail.com",
  },
};

export const aboutData = {
  headline: "Computer Science graduate crafting responsive and practical web applications",
  paragraphs: [
    "I am a Computer Science and Engineering graduate (B.Tech, 2022–2026) from Andhra University College of Engineering (A), Visakhapatnam. I enjoy learning by building practical web projects—combining clean HTML and CSS with React components, responsive layouts, and REST APIs.",
    "From building a movie ticket booking interface in CineBook to creating interactive engineering calculators in the Global Groundwater Consultants frontend project, I focus on writing clear code and creating interfaces that are easy to use on any device.",
  ],
  educationSummary: {
    degree: "B.Tech in Computer Science and Engineering (2022 – 2026)",
    university: "Andhra University College of Engineering (A)",
    location: "Visakhapatnam, Andhra Pradesh, India",
    focus: "React.js, JavaScript, Responsive UI, REST APIs, SQL",
  },
  interests: [
    "React & Component-Based UI",
    "Responsive & Accessible Design",
    "Full-Stack API Integration",
    "Practical Problem Solving",
  ],
};

export const skillsData = {
  categories: [
    {
      id: "frontend",
      title: "Frontend Development",
      description: "Building responsive, clean, and accessible user interfaces",
      skills: [
        { name: "React.js", tag: "Core" },
        { name: "JavaScript (ES6+)", tag: "Core" },
        { name: "HTML5 & Semantic Markup", tag: "Structure" },
        { name: "CSS3 & Tailwind CSS", tag: "Styling" },
        { name: "Responsive Web Design", tag: "Layout" },
        { name: "TypeScript (Basics)", tag: "Types" },
      ],
    },
    {
      id: "backend",
      title: "Backend & APIs",
      description: "Connecting frontend interfaces with server endpoints",
      skills: [
        { name: "Node.js", tag: "Runtime" },
        { name: "Express.js", tag: "Framework" },
        { name: "RESTful API Integration", tag: "APIs" },
      ],
    },
    {
      id: "database",
      title: "Databases & Storage",
      description: "Querying relational data and managing client state",
      skills: [
        { name: "SQL (MySQL / PostgreSQL)", tag: "Relational" },
        { name: "Supabase (Client SDK)", tag: "BaaS" },
        { name: "Browser localStorage", tag: "Client State" },
      ],
    },
    {
      id: "tools",
      title: "Languages & Tools",
      description: "Programming foundations and everyday development workflow",
      skills: [
        { name: "Python & Java (Core)", tag: "Languages" },
        { name: "Git & GitHub", tag: "Version Control" },
        { name: "Vite", tag: "Build Tool" },
        { name: "Vercel", tag: "Deployment" },
        { name: "Chrome DevTools", tag: "Debugging" },
      ],
    },
  ],
};

export const projectsData = [
  {
    id: "cinebook",
    title: "CineBook — Movie Ticket Booking Web App",
    category: "Full-Stack",
    badge: "Portfolio Demo Application",
    flagship: true,
    featured: true,
    summary:
      "A full-stack movie ticket booking web application featuring movie browsing, an interactive 128-seat layout, temporary seat holds, multi-language switching, and a safe Portfolio Demo checkout flow.",
    description:
      "CineBook is a full-stack cinema reservation project built with React, TypeScript, Express, and PostgreSQL (with Prisma). It demonstrates a complete ticket booking journey—from browsing movies and selecting showtimes to holding seats and previewing a QR pass—while defaulting to Portfolio Demo Mode so visitors can test safely without real payments.",
    problemSolved:
      "Movie booking interfaces need to clearly show which seats are available, temporarily held during checkout, or already booked so two users do not end up reserving the same seat.",
    myContribution:
      "Built the responsive React user interface, interactive 128-seat layout, and booking workflow, and connected the frontend to Express API routes and PostgreSQL tables using AI-assisted development and testing.",
    technologies: [
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma ORM",
      "Three.js",
      "Razorpay (Test Mode)",
    ],
    liveUrl: "https://movie-booking-one-azure.vercel.app/",
    githubUrl: "https://github.com/Sahithi200423/Movie_booking",
    backendHealthUrl: "https://cinebook-backend-as00.onrender.com/api/health",
    image: "/assets/projects/cinebook_preview.png",
    seatsImage: "/assets/projects/cinebook_seats.png",
    highlights: [
      "Interactive 128-seat auditorium map (Rows A–H across 3 seating tiers)",
      "10-minute temporary seat-hold timer with an 8-seat limit per booking",
      "Demo pricing of ₹5 per seat with Razorpay Test/Sandbox checkout flow",
      "18-language switcher (with RTL layout support) and QR pass preview",
    ],
    architecture: {
      bookingFlow:
        "Browse movies -> Choose date & showtime -> Pick seats on the 128-seat map -> Temporary 10-minute seat hold -> Test-mode checkout (₹5 demo ticket) -> QR pass confirmation screen.",
      seatSelection:
        "128 seats arranged across rows A–H (16 seats per row) in VIP, Premium, and Standard tiers, clearly displaying Available, Selected, Held, and Booked states.",
      database:
        "PostgreSQL database accessed via Prisma ORM to store movies, showtimes, seats, and bookings, with backend API checks for seat availability.",
      concurrency:
        "In live database mode, seat holds are recorded with an expiration timestamp in PostgreSQL and return a conflict response (HTTP 409) if a seat is already held. In Portfolio Demo Mode, holds and checkout are safely simulated without modifying live booking data.",
    },
  },
  {
    id: "groundwater",
    title: "Global Groundwater Consultants — Consultancy Website & Calculators",
    category: "Frontend",
    badge: "Local / Private Development Project",
    flagship: true,
    featured: true,
    summary:
      "A responsive multi-page consultancy website for groundwater and rainwater harvesting services, featuring 5 interactive calculation tools and a local demo admin dashboard.",
    description:
      "Built as a local development project for an environmental and hydrogeological consultancy concept. The frontend provides service pages, consultation booking forms, 5 interactive engineering calculators, and an admin management UI powered by browser localStorage with optional Supabase integration.",
    problemSolved:
      "Clients exploring groundwater recharge or rainwater harvesting services benefit from quick preliminary calculation tools and structured inquiry forms before scheduling a consultation.",
    myContribution:
      "Developed the responsive React 18 and TypeScript multi-page frontend, built the 5 interactive calculator components with React state, and created the demo admin dashboard views using localStorage and jsPDF report exports in the Admin Reports view.",
    technologies: [
      "React 18",
      "TypeScript",
      "Tailwind CSS v3",
      "Framer Motion",
      "Vite",
      "jsPDF",
      "Supabase (Optional)",
    ],
    liveUrl: null,
    githubUrl: null,
    image: null,
    highlights: [
      "5 interactive React calculators (Recharge, Rainwater Harvesting, Water Requirement, Cost Estimator, Unit Converter)",
      "Client-side PDF executive report export using jsPDF in the Admin Reports view",
      "Demo admin portal (localStorage persistence, with optional Supabase form storage)",
      "Responsive layout with search modal, emergency helpline modal, and consultation booking form",
    ],
    architecture: {
      calculators:
        "5 interactive React components that take user inputs via controlled state and compute preliminary estimates in real time (Groundwater Recharge, Rainwater Harvesting, Water Requirement, Project Cost Estimator in INR/USD, and Unit Converter).",
      adminSubsystem:
        "Admin dashboard UI (accessible via demo login) with views for appointments, contact requests, projects, services, gallery, testimonials, careers, and PDF report exports via jsPDF.",
      workflows:
        "Service detail pages, consultation booking form, global search modal, and direct WhatsApp contact trigger.",
      stack:
        "Frontend single-page application built with React 18, TypeScript, Tailwind CSS v3, Framer Motion, Vite, jsPDF, and browser localStorage (with optional Supabase setup for form data).",
    },
    availabilityNote: "Local / Private Development Project — No public GitHub repository or live deployment URL.",
  },
];

export const educationData = [
  {
    id: "au-btech-cse",
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Andhra University College of Engineering (Autonomous)",
    location: "Visakhapatnam, Andhra Pradesh, India",
    period: "2022 – 2026",
    status: "CGPA: 7.46 / 10.0",
    description:
      "Undergraduate engineering program covering programming fundamentals, data structures, database management, operating systems, computer networks, and web development.",
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
    ],
  },
];

export const experienceData = [
  {
    id: "qubez-internship",
    role: "Full-Stack Development Intern",
    organization: "Qubez",
    period: "January 11, 2026 – July 2026 (6 Months)",
    location: "Hyderabad, India",
    type: "Internship",
    responsibilities: [
      "Worked across frontend interfaces, backend functionality, and application integration on full-stack web projects.",
      "Built and enhanced web application features using React and reusable UI components.",
      "Practiced integrating REST APIs, handling application data, and connecting frontend views with backend services.",
      "Used AI-assisted coding and prompt engineering workflows to support debugging, code generation, and testing.",
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
