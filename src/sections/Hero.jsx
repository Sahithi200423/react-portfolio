import React from 'react';
import { personalInfo } from '../data/portfolioData';
import HeroCanvas3D from '../components/HeroCanvas3D';
import {
  ArrowRight,
  Send,
  FileDown,
  Sparkles,
  MapPin,
  CheckCircle2,
  Code2,
  Layers,
  Cpu,
} from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero-section-root" id="hero">
      {/* 3D Background Canvas / CSS Mesh Fallback */}
      <HeroCanvas3D />

      <div className="container hero-container">
        <div className="hero-grid">
          {/* Left Column: Text, Headline, CTAs */}
          <div className="hero-content">
            {/* Availability Pill */}
            <div className="hero-badge-wrap">
              <span className="hero-status-pill">
                <span className="status-dot" aria-hidden="true" />
                <span>{personalInfo.status}</span>
              </span>
              <span className="hero-location-pill">
                <MapPin size={13} className="location-icon" />
                <span>{personalInfo.location}</span>
              </span>
            </div>

            {/* Main Greeting & Name */}
            <div className="hero-greeting">
              <span>Hello, I'm</span>
            </div>
            <h1 className="hero-name">
              <span className="gradient-text">{personalInfo.name}</span>
            </h1>

            {/* Headline Subtitle */}
            <div className="hero-headline-role">
              <Code2 size={20} className="role-icon" />
              <span>{personalInfo.headline}</span>
            </div>

            {/* Narrative Lead Bio */}
            <p className="hero-bio">
              {personalInfo.shortBio}
            </p>

            {/* Call to Action Button Group */}
            <div className="hero-cta-group">
              <a href="#projects" className="btn btn-primary hero-btn">
                <span>Explore Projects</span>
                <ArrowRight size={17} />
              </a>

              <a href="#contact" className="btn btn-secondary hero-btn">
                <Send size={16} />
                <span>Get In Touch</span>
              </a>

              <a
                href={personalInfo.resumePath}
                download="Chukka_Sahithi_Resume.pdf"
                className="btn btn-outline hero-btn"
                title="Download Official Resume PDF"
              >
                <FileDown size={16} />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Micro Highlights Pill Row */}
            <div className="hero-tech-strip">
              <span className="tech-strip-label">Core Specializations:</span>
              <div className="tech-pills-list">
                <span className="badge badge-cyan">
                  <Sparkles size={11} /> React 19
                </span>
                <span className="badge badge-purple">JavaScript (ES6+)</span>
                <span className="badge badge-cyan">Three.js / WebGL</span>
                <span className="badge badge-emerald">PostgreSQL / Supabase</span>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Portrait with Glowing Futuristic Frame */}
          <div className="hero-portrait-col">
            <div className="portrait-container">
              {/* Ambient Glowing Halo */}
              <div className="portrait-glow-halo" aria-hidden="true" />

              {/* Floating Floating Badges */}
              <div className="floating-badge badge-top-right">
                <Layers size={14} color="var(--accent-cyan)" />
                <span>UI/UX Architecture</span>
              </div>

              <div className="floating-badge badge-bottom-left">
                <Cpu size={14} color="var(--accent-purple)" />
                <span>High Performance</span>
              </div>

              {/* Portrait Frame Card */}
              <div className="portrait-frame">
                <img
                  src={personalInfo.avatar}
                  alt={`${personalInfo.name} - ${personalInfo.headline}`}
                  className="portrait-image"
                  loading="eager"
                  onError={(e) => {
                    // Fallback in case image asset fails to load
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextElementSibling) {
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }
                  }}
                />

                {/* Accessible Monogram Fallback */}
                <div className="portrait-fallback" style={{ display: 'none' }}>
                  <span className="fallback-monogram">{personalInfo.monogram}</span>
                  <span className="fallback-name">{personalInfo.name}</span>
                </div>

                {/* Identity Verification Strip */}
                <div className="portrait-verified-strip">
                  <CheckCircle2 size={15} className="verified-check" />
                  <span className="verified-text">{personalInfo.name} • Verified Profile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
