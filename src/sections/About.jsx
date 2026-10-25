import React from 'react';
import { personalInfo, aboutData } from '../data/portfolioData';
import {
  User,
  Sparkles,
  Layout,
  Terminal,
  Database,
  Eye,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
} from 'lucide-react';

const specialtyPillars = [
  {
    icon: Layout,
    title: 'Component-Driven Frontend',
    tag: '01 / ARCHITECTURE',
    color: 'cyan',
    description:
      'Designing clean, modular user interfaces with React, modern CSS, and reusable components that scale efficiently and look polished on every screen.',
  },
  {
    icon: Eye,
    title: 'Interactive 3D & Micro-Interactions',
    tag: '02 / EXPERIENCE',
    color: 'purple',
    description:
      'Incorporating subtle 3D visuals using Three.js and fluid CSS transitions to make web applications feel dynamic, engaging, and alive without being overwhelming.',
  },
  {
    icon: Database,
    title: 'Full-Stack & Concurrency Awareness',
    tag: '03 / SYSTEMS',
    color: 'emerald',
    description:
      'Engineering practical solutions like CineBook with atomic database locking, API endpoints in Node/Express, and secure integrations with PostgreSQL and Supabase.',
  },
  {
    icon: Terminal,
    title: 'Accessibility & Clean Standards',
    tag: '04 / FOUNDATION',
    color: 'cyan',
    description:
      'Prioritizing high readability, accessible focus rings, keyboard navigation, and fast loading speeds adhering to modern web best practices.',
  },
];

export default function About() {
  return (
    <section className="section section-alt" id="about">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">
            <User size={13} /> Profile &amp; Foundation
          </span>
          <h2 className="section-title">
            About <span className="gradient-text">{personalInfo.name}</span>
          </h2>
          <p className="section-subtitle">
            {aboutData.headline}
          </p>
        </div>

        {/* Narrative & Quick Profile Summary Card */}
        <div className="glass-card about-intro-card">
          <div className="about-intro-grid">
            {/* Left Story Narrative */}
            <div className="about-narrative-text">
              <h3 className="about-subheading">
                Engineering with Curiosity, Precision &amp; Modern Design
              </h3>
              {aboutData.paragraphs.map((p, idx) => (
                <p key={idx} className="about-p">
                  {p}
                </p>
              ))}

              {/* Core Interests List */}
              <div className="about-interests-box">
                <span className="interests-label">Areas of Ongoing Focus:</span>
                <div className="interests-tags">
                  {aboutData.interests.map((interest) => (
                    <span key={interest} className="badge badge-purple">
                      <Sparkles size={11} /> {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Meta Credentials Sidebar */}
            <div className="about-meta-panel">
              <div className="meta-block">
                <div className="meta-icon-row">
                  <GraduationCap size={16} className="meta-icon cyan" />
                  <span className="meta-title">Academic Program</span>
                </div>
                <strong className="meta-value">{aboutData.educationSummary.degree}</strong>
                <span className="meta-sub">{aboutData.educationSummary.university}</span>
              </div>

              <div className="meta-block">
                <div className="meta-icon-row">
                  <HeartHandshake size={16} className="meta-icon purple" />
                  <span className="meta-title">Professional Direction</span>
                </div>
                <strong className="meta-value">Frontend Developer</strong>
                <span className="meta-sub">Web Application &amp; UI Engineering</span>
              </div>

              <div className="meta-block">
                <div className="meta-icon-row">
                  <CheckCircle2 size={16} className="meta-icon emerald" />
                  <span className="meta-title">Availability</span>
                </div>
                <strong className="meta-value status-available">
                  {personalInfo.status}
                </strong>
                <span className="meta-sub">{personalInfo.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Architectural Specialty Pillars */}
        <div className="about-pillars-grid">
          {specialtyPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="glass-card pillar-card">
                <div className="pillar-header">
                  <div className={`pillar-icon-box ${pillar.color}`}>
                    <Icon size={20} />
                  </div>
                  <span className="pillar-tag">{pillar.tag}</span>
                </div>
                <h4 className="pillar-title">{pillar.title}</h4>
                <p className="pillar-desc">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
