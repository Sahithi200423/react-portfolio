/**
 * ============================================================================
 * DEVELOPER JOURNAL ARTICLES DATA
 * Structured technical case studies, essays, and learning notes.
 * All articles reflect verified code implementations and learning journeys.
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
    readingTime: "7 min read",
    category: "System Architecture",
    tags: ["PostgreSQL", "Concurrency", "Node.js", "React 19", "System Design"],
    summary:
      "A technical walkthrough of how I built CineBook: engineering atomic PostgreSQL seat holds, an interactive 128-seat auditorium map, and test payment sandbox integration.",
    tableOfContents: [
      { id: "overview", title: "1. The Core Concurrency Problem" },
      { id: "seat-matrix", title: "2. The 128-Seat Auditorium Grid" },
      { id: "atomic-holds", title: "3. Synchronized 10-Minute Atomic Holds" },
      { id: "payment-integrity", title: "4. Payment Flow & Webhook Verification" },
      { id: "reverse-proxy", title: "5. Production Deployment & Edge Security" },
      { id: "takeaways", title: "6. Engineering Takeaways" },
    ],
    content: [
      {
        id: "overview",
        heading: "1. The Core Concurrency Problem",
        paragraphs: [
          "When developing an online cinema ticket booking platform like CineBook, the single hardest challenge isn't rendering a movie catalog or styling a checkout page—it is handling concurrency. If two users click on seat 'D8' at the exact same millisecond, what happens?",
          "In naive implementations, both users proceed to checkout, leading to an inevitable double-booking disaster when both payments clear. In CineBook V2, my goal was to engineer a robust, reliable reservation engine that eliminates this race condition entirely at the database layer.",
        ],
      },
      {
        id: "seat-matrix",
        heading: "2. The 128-Seat Auditorium Grid",
        paragraphs: [
          "The interactive seat map is built across 8 rows (A to H) and 16 columns, providing 128 individually addressable seats per showtime. The auditorium is divided into three distinct tiers: VIP Recliners (Rows A–B), Premium Prime (Rows C–E), and Standard Classic (Rows F–H).",
          "Each seat is modeled with a state machine containing four distinct states: Available, Selected (Client-side), Held (Temporary Lock), and Booked (Confirmed). The client updates optimistically while immediately requesting an atomic hold from the backend API.",
        ],
      },
      {
        id: "atomic-holds",
        heading: "3. Synchronized 10-Minute Atomic Holds",
        paragraphs: [
          "To guarantee that a seat cannot be held twice, the backend executes an atomic conditional upsert directly in PostgreSQL via Prisma ORM:",
          "INSERT INTO seat_reservations (showtime_id, seat_id, user_id, status, expires_at) VALUES ($1, $2, $3, 'HELD', NOW() + INTERVAL '10 minutes') ON CONFLICT (showtime_id, seat_id) DO UPDATE SET user_id = $3, status = 'HELD', expires_at = NOW() + INTERVAL '10 minutes' WHERE seat_reservations.status != 'BOOKED' AND (seat_reservations.expires_at < NOW() OR seat_reservations.user_id = $3);",
          "If another user attempts to lock the same seat during this 10-minute window, the query matches zero rows or triggers a conflict constraint, prompting the server to return HTTP 409 Conflict. The client immediately notifies the second user that the seat was claimed, preventing duplicate checkout flows.",
        ],
      },
      {
        id: "payment-integrity",
        heading: "4. Payment Flow & Webhook Verification",
        paragraphs: [
          "For checkout, I integrated Razorpay SDK configured in Test/Sandbox mode. To protect against client-side price tampering, all amounts are calculated and strictly enforced on the server (uniform ₹15 demo pricing = 1500 paise per ticket).",
          "Crucially, payments are verified through server-side webhook signatures. Because Express standard JSON parsers alter payload strings, I configured a raw body buffer hook (`req.rawBody`) so the HMAC-SHA256 signature verification matches the exact byte sequence transmitted by the gateway.",
        ],
      },
      {
        id: "reverse-proxy",
        heading: "5. Production Deployment & Edge Security",
        paragraphs: [
          "CineBook's frontend is deployed on Vercel, while the backend API is hosted on Render. Because cloud platforms operate behind multi-tenant reverse proxies, naive IP extraction returns the proxy's internal IP rather than the client's genuine address.",
          "I configured `trust proxy 1` tailored specifically for Render's edge architecture, ensuring that client rate limits (capping authentication attempts and rapid seat holds) apply accurately without being fooled by spoofed `X-Forwarded-For` headers.",
        ],
      },
      {
        id: "takeaways",
        heading: "6. Engineering Takeaways",
        paragraphs: [
          "Building CineBook taught me that backend reliability is the true foundation of user trust. No matter how clean your UI looks, a single double-booking bug will break user confidence. Solving this problem with atomic database transactions reinforced my interest in distributed systems and high-concurrency web architecture.",
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
      "Why ditching heavy 3D templates for clean typography, generous whitespace, honest project disclosures, and working demo links creates a far more compelling engineering portfolio.",
    tableOfContents: [
      { id: "intro", title: "1. The 30-Second Recruiter Reality" },
      { id: "clarity", title: "2. Prioritizing Clarity Over Flashy Gimmicks" },
      { id: "architecture", title: "3. Multi-Page Architecture with React Router" },
      { id: "honesty", title: "4. Honest Technical Disclosures" },
      { id: "conclusion", title: "5. Summary Checklist" },
    ],
    content: [
      {
        id: "intro",
        heading: "1. The 30-Second Recruiter Reality",
        paragraphs: [
          "Technical recruiters and hiring managers often review dozens of candidate portfolios every day. In most cases, they spend less than 30 to 60 seconds on an initial scan.",
          "If your website takes 8 seconds to load an enormous Three.js scene, traps mobile scroll gestures, or hides links behind obscure hover effects, the reviewer will simply close the tab. What recruiters actually want is immediate clarity: Who are you? What have you built? Can I test your work? Is the code accessible?",
        ],
      },
      {
        id: "clarity",
        heading: "2. Prioritizing Clarity Over Flashy Gimmicks",
        paragraphs: [
          "When rebuilding this portfolio, I transitioned from a dark, heavily animated single-page template to an editorial, typography-first multi-page architecture inspired by Claude and HackerRank.",
          "By utilizing shadcn/ui components with Tailwind CSS v4, the design achieves high contrast and readability: warm ivory in light mode, deep charcoal in dark mode, crisp borders, and generous whitespace. Every component supports keyboard focus rings and `motion-reduce:transition-none` for accessibility.",
        ],
      },
      {
        id: "architecture",
        heading: "3. Multi-Page Architecture with React Router",
        paragraphs: [
          "Single-page continuous-scroll portfolios often feel like endless marketing landing pages. Moving to dedicated routes (`/`, `/about`, `/projects`, `/journal`, `/contact`) provides distinct advantages:",
          "First, each URL is directly shareable. A recruiter interested only in project architecture can go straight to `/projects`. Second, long-form technical writing has room to breathe on `/journal` without bloating the home screen. With Vercel's rewrite rules configured, page refreshes on individual routes work seamlessly.",
        ],
      },
      {
        id: "honesty",
        heading: "4. Honest Technical Disclosures",
        paragraphs: [
          "One of the biggest mistakes entry-level developers make is inflating project descriptions—claiming thousands of active users, inventing corporate awards, or calling a partial prototype a 'complete enterprise platform.'",
          "Experienced engineers spot exaggerated claims immediately. In this portfolio, every project clearly states the verified problem solved and actual contributions. When a live deployment or public repository isn't available (such as proprietary client tools), a transparent status note is displayed instead of a fake URL.",
        ],
      },
      {
        id: "conclusion",
        heading: "5. Summary Checklist",
        paragraphs: [
          "A great engineering portfolio does not need to reinvent the wheel. It needs fast performance, accessible contrast, verified GitHub links, a working resume download, and clear writing that demonstrates genuine curiosity and problem-solving ability.",
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
      "A personal reflection on transitioning from university computer science theory to building real full-stack systems, debugging state, and learning step by step.",
    tableOfContents: [
      { id: "theory-vs-practice", title: "1. Moving Beyond Tutorial Island" },
      { id: "debugging-mindset", title: "2. Learning to Love Edge Cases" },
      { id: "accessibility", title: "3. Realizing Accessibility Is Not Optional" },
      { id: "step-by-step", title: "4. Improving Step by Step" },
    ],
    content: [
      {
        id: "theory-vs-practice",
        heading: "1. Moving Beyond Tutorial Island",
        paragraphs: [
          "As a student pursuing my B.Tech + M.Tech Dual Degree in Computer Science at Andhra University College of Engineering, I spent years studying algorithms, operating systems, and database theory. But academic coursework alone doesn't teach you how to build software that real people interact with.",
          "Early on, it was easy to fall into 'tutorial island'—following a video where everything works because all the edge cases have been edited out. The real learning only began when I closed the tutorials and started building complete projects from scratch.",
        ],
      },
      {
        id: "debugging-mindset",
        heading: "2. Learning to Love Edge Cases",
        paragraphs: [
          "Building CineBook was a major turning point for me. When you write an interactive seat selection map, you quickly realize that the real world is messy: users click buttons five times in a row, network requests drop unexpectedly, and clocks between clients and servers are never perfectly in sync.",
          "Instead of getting frustrated by bugs, I learned to view edge cases as architectural requirements. Learning how to manage optimistic state updates, cancellation tokens, and idempotent webhook handlers taught me more about JavaScript and API engineering than any textbook.",
        ],
      },
      {
        id: "accessibility",
        heading: "3. Realizing Accessibility Is Not Optional",
        paragraphs: [
          "Another eye-opening lesson was discovering accessibility. It is easy to build a stylish button using a `<div>` and a CSS hover effect, until you realize that keyboard users cannot reach it, screen readers ignore it, and people with vision impairments cannot read low-contrast text.",
          "Adopting accessible component primitives (like Radix UI and shadcn) transformed how I write HTML. Ensuring every interactive control has visible `:focus-visible` styling, proper ARIA labels, and keyboard listeners is now a non-negotiable part of my engineering checklist.",
        ],
      },
      {
        id: "step-by-step",
        heading: "4. Improving Step by Step",
        paragraphs: [
          "I am still at the beginning of my engineering career, and there is a vast amount of computer science left to explore. But having a mindset focused on curiosity, authentic problem-solving, and clean craft makes every project exciting.",
          "My goal is simple: keep building real systems, keep writing about what I learn, and improve one commit at a time.",
        ],
      },
    ],
  },
];
