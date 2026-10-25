import React from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Education from './sections/Education';
import ResumeSection from './sections/ResumeSection';
import Contact from './sections/Contact';
import { personalInfo } from './data/portfolioData';

export default function App() {
  return (
    <div className="app-root">
      {/* 1. Sticky Navigation Bar with ThemeToggle & MobileDrawer */}
      <Navbar />

      {/* 2. Hero Section with 3D Visual Accents & Portrait */}
      <Hero />

      {/* 3. Main Content Sections */}
      <main>
        {/* About Section */}
        <About />

        {/* Skills Section with Category Filter */}
        <Skills />

        {/* Projects Showcase with Filter Tabs & Flagship CineBook */}
        <Projects />

        {/* Applied Experience & Project Benchmarks */}
        <Experience />

        {/* Education Credentials */}
        <Education />

        {/* Dedicated Resume Download & View Section */}
        <ResumeSection />

        {/* Stage 6: Contact Section with Validation & Supabase Integration */}
        <Contact />
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border-glass)',
          background: 'var(--bg-glass)',
          padding: '2.5rem 0',
          textAlign: 'center',
          fontSize: '0.88rem',
          color: 'var(--text-muted)',
        }}
      >
        <div className="container">
          <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.78rem' }}>
            Built with React, Vite, Three.js &amp; Modern CSS • Designed with Midnight Navy &amp; Cyan Accents
          </p>
        </div>
      </footer>
    </div>
  );
}
