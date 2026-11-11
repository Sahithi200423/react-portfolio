/**
 * ============================================================================
 * DEVELOPER JOURNAL ARTICLES DATA
 * Structured technical notes, project walkthroughs, and learning reflections.
 * Written in clear, beginner-friendly language reflecting verified work.
 * Marked as DRAFT pending final author review.
 * ============================================================================
 */

export const journalArticles = [
  {
    slug: "building-cinebook-movie-booking-architecture",
    title: "Building CineBook: Lessons from a Movie Booking Project",
    status: "Draft",
    statusNotice: "Draft — Under Review by Sahithi Chukka",
    date: "October 2026",
    readingTime: "6 min read",
    category: "System Architecture",
    tags: ["React 19", "Node.js", "Express", "PostgreSQL", "Project Notes"],
    summary:
      "A beginner-friendly walkthrough of how I built CineBook: creating the 128-seat layout, handling 10-minute seat holds, and adding a safe Demo Mode checkout flow.",
    tableOfContents: [
      { id: "overview", title: "1. Why I Built CineBook" },
      { id: "seat-matrix", title: "2. The 128-Seat Auditorium Grid" },
      { id: "seat-holds", title: "3. Temporary 10-Minute Seat Holds" },
      { id: "demo-checkout", title: "4. Safe Demo Mode & Test Checkout" },
      { id: "deployment", title: "5. Hosting the Frontend and Backend" },
      { id: "takeaways", title: "6. Key Takeaways" },
    ],
    content: [
      {
        id: "overview",
        heading: "1. Why I Built CineBook",
        paragraphs: [
          "When building a movie ticket booking application like CineBook, the main challenge isn't only displaying movie cards—it is keeping track of seat availability cleanly across steps. If two users click the same seat around the same time, the app needs a clear way to decide who gets to hold it during checkout.",
          "With CineBook, my goal was to connect a responsive React frontend to a real Express API and PostgreSQL database (using Prisma ORM) so I could practice how a full-stack booking flow works from start to finish.",
        ],
      },
      {
        id: "seat-matrix",
        heading: "2. The 128-Seat Auditorium Grid",
        paragraphs: [
          "The interactive seat map is organized into 8 rows (A through H) with 16 seats per row, giving 128 seats per showtime. The rows are grouped into three seating tiers: VIP Recliners (Rows A–B), Premium (Rows C–F), and Standard (Rows G–H).",
          "Each seat shows one of four clear visual states in the UI: Available, Selected, Held (temporarily locked during checkout), or Booked. Limiting bookings to 8 seats per transaction also helps keep the checkout summary straightforward.",
        ],
      },
      {
        id: "seat-holds",
        heading: "3. Temporary 10-Minute Seat Holds",
        paragraphs: [
          "Once a user selects seats and proceeds, the app places a 10-minute hold on those seats so other visitors see them as temporarily unavailable. If the timer expires before checkout finishes, the hold clears so others can book them.",
          "In live database mode, the backend records each hold in PostgreSQL with an expiration timestamp and returns an HTTP 409 Conflict status if another session already holds or booked the seat. When running in Portfolio Demo Mode, the backend simulates seat holds safely without altering live database records.",
        ],
      },
      {
        id: "demo-checkout",
        heading: "4. Safe Demo Mode & Test Checkout",
        paragraphs: [
          "For checkout, I configured Razorpay in Test/Sandbox mode with a uniform ₹5 demo ticket price (500 paise) computed on the server rather than relying on client-side price values.",
          "Because this project is shared publicly on my portfolio, I also enabled a Portfolio Demo Mode flag by default. That way, recruiters and visitors can test browsing movies, picking seats, and previewing QR ticket passes without initiating real financial charges or modifying production records.",
        ],
      },
      {
        id: "deployment",
        heading: "5. Hosting the Frontend and Backend",
        paragraphs: [
          "The React frontend is hosted on Vercel, while the Node.js/Express backend is deployed on Render. Working through this setup taught me how environment variables, CORS configuration, and API health checks (`/api/health`) connect a live frontend and backend across separate servers.",
        ],
      },
      {
        id: "takeaways",
        heading: "6. Key Takeaways",
        paragraphs: [
          "Building CineBook helped me understand how frontend React state, REST APIs, and database tables work together in a real application. I also gained practical experience testing user flows, adding multi-language UI support, and structuring clear fallback behavior for portfolio demos.",
        ],
      },
    ],
  },
  {
    slug: "making-a-react-portfolio-recruiter-friendly",
    title: "Making a React Portfolio More Recruiter-Friendly",
    status: "Draft",
    statusNotice: "Draft — Under Review by Sahithi Chukka",
    date: "October 2026",
    readingTime: "5 min read",
    category: "Portfolio Engineering",
    tags: ["React 19", "UX Design", "Vite", "shadcn/ui", "Career"],
    summary:
      "Why focusing on clean typography, generous whitespace, honest project descriptions, and working demo links makes a stronger entry-level engineering portfolio.",
    tableOfContents: [
      { id: "intro", title: "1. The 30-Second Recruiter Scan" },
      { id: "clarity", title: "2. Prioritizing Clarity Over Visual Clutter" },
      { id: "architecture", title: "3. Multi-Page Navigation with React Router" },
      { id: "honesty", title: "4. Honest Technical Disclosures" },
      { id: "conclusion", title: "5. Summary Checklist" },
    ],
    content: [
      {
        id: "intro",
        heading: "1. The 30-Second Recruiter Scan",
        paragraphs: [
          "Technical recruiters and hiring managers often review dozens of candidate portfolios every day, spending less than a minute on an initial scan.",
          "If a website is slow to load or hides important links behind complex animations, reviewers may move on quickly. What helps most is immediate clarity: Who are you? What projects have you built? Can I click your live demo, inspect your GitHub code, and download your resume easily?",
        ],
      },
      {
        id: "clarity",
        heading: "2. Prioritizing Clarity Over Visual Clutter",
        paragraphs: [
          "When designing this portfolio, I moved toward a clean, typography-focused multi-page layout inspired by modern developer tools.",
          "Using reusable UI components with Tailwind CSS gives the site readable contrast in both light and dark themes, crisp borders, and responsive spacing across desktop and mobile screens.",
        ],
      },
      {
        id: "architecture",
        heading: "3. Multi-Page Navigation with React Router",
        paragraphs: [
          "Organizing the portfolio into dedicated routes (`/`, `/about`, `/projects`, `/journal`, `/contact`) makes each section easy to browse and share.",
          "Someone reviewing my projects can jump straight to `/projects`, while my education, internship, and technical skills sit neatly on `/about`. Adding Vercel rewrite rules ensures refreshing any page route works smoothly.",
        ],
      },
      {
        id: "honesty",
        heading: "4. Honest Technical Disclosures",
        paragraphs: [
          "One important lesson as a fresher is keeping project descriptions completely honest—avoiding inflated user metrics, invented production claims, or listing libraries that aren't actually used.",
          "Every project on this site clearly separates live demos from local or demo-mode projects. When a project is private or local without a public link, I state that openly rather than adding placeholder URLs.",
        ],
      },
      {
        id: "conclusion",
        heading: "5. Summary Checklist",
        paragraphs: [
          "A strong fresher portfolio does not need flashy gimmicks. It needs clean layout, working links, truthful descriptions that you can explain confidently in an interview, and an easy-to-download resume.",
        ],
      },
    ],
  },
  {
    slug: "learning-as-an-entry-level-frontend-developer",
    title: "What I’m Learning as an Entry-Level Frontend Developer",
    status: "Draft",
    statusNotice: "Draft — Under Review by Sahithi Chukka",
    date: "October 2026",
    readingTime: "5 min read",
    category: "Learning Journey",
    tags: ["Frontend", "JavaScript", "Learning", "Andhra University", "Growth"],
    summary:
      "A personal reflection on moving from university computer science coursework to building React web applications, debugging state, and learning step by step.",
    tableOfContents: [
      { id: "theory-vs-practice", title: "1. Moving Beyond Classroom Theory" },
      { id: "debugging-mindset", title: "2. Learning Through Real Bugs" },
      { id: "accessibility", title: "3. Paying Attention to Accessibility" },
      { id: "step-by-step", title: "4. Growing Step by Step" },
    ],
    content: [
      {
        id: "theory-vs-practice",
        heading: "1. Moving Beyond Classroom Theory",
        paragraphs: [
          "During my B.Tech in Computer Science and Engineering at Andhra University College of Engineering, I studied programming fundamentals, data structures, databases, and computer networks. While coursework builds a great foundation, building interactive web apps teaches a completely different set of practical skills.",
          "Moving from small tutorial exercises to complete React applications pushed me to think about folder structure, reusable components, and how users actually navigate through a website.",
        ],
      },
      {
        id: "debugging-mindset",
        heading: "2. Learning Through Real Bugs",
        paragraphs: [
          "Working on CineBook and my internship projects showed me how many small edge cases appear in real interfaces: invalid form inputs, missing API responses, or mobile screens overflowing when grids aren't responsive.",
          "Instead of getting discouraged by bugs, using browser DevTools, checking network requests, and testing components step by step helped me become much more comfortable debugging JavaScript and React state.",
        ],
      },
      {
        id: "accessibility",
        heading: "3. Paying Attention to Accessibility",
        paragraphs: [
          "Another important habit I am building is writing semantic HTML and accessible components. It is easy to style a clickable `<div>`, but using proper `<button>` elements, keyboard focus outlines, and clear ARIA labels makes sites usable for everyone.",
          "Using accessible UI primitives and testing keyboard navigation has become part of my standard checklist whenever I build new pages.",
        ],
      },
      {
        id: "step-by-step",
        heading: "4. Growing Step by Step",
        paragraphs: [
          "As an entry-level developer, I know there is still a lot to learn across frontend frameworks, backend APIs, and software design. Staying curious, writing honest code I truly understand, and improving with every project keeps me moving forward.",
        ],
      },
    ],
  },
];
