import React from 'react';
import { personalInfo, educationData } from '../data/portfolioData';
import confetti from 'canvas-confetti';
import {
  FileText,
  FileDown,
  ExternalLink,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Code2,
  Mail,
} from 'lucide-react';

export default function ResumeSection() {
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#00f2fe', '#8a2be2', '#10b981', '#ffffff'],
      });
    } catch (e) {
      // Graceful fallback if canvas-confetti is blocked
    }
  };

  return (
    <section className="section" id="resume">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">
            <FileText size={13} /> Official Document
          </span>
          <h2 className="section-title">
            Curriculum <span className="gradient-text">Vitae</span>
          </h2>
          <p className="section-subtitle">
            Download or view my verified credentials, academic qualifications, and technical competencies.
          </p>
        </div>

        {/* Resume Glassmorphic Card Showcase */}
        <div className="glass-card resume-showcase-card">
          <div className="resume-grid">
            {/* Left Column: Quick Snapshot */}
            <div className="resume-snapshot-col">
              <div className="resume-badge-row">
                <span className="badge badge-cyan">
                  <CheckCircle2 size={12} /> Official PDF Document
                </span>
                <span className="badge badge-emerald">Verified Information</span>
              </div>

              <h3 className="resume-candidate-name">{personalInfo.name}</h3>
              <div className="resume-candidate-role">{personalInfo.headline}</div>

              <p className="resume-summary-text">
                Computer Science and Engineering dual-degree scholar at {educationData[0].institution}. Focused on creating clean, responsive, and reliable web applications that unite solid architecture with modern design aesthetics.
              </p>

              {/* Verified Highlights Checklist */}
              <div className="resume-highlights-list">
                <div className="resume-highlight-item">
                  <GraduationCap size={16} className="highlight-icon cyan" />
                  <div>
                    <strong>{educationData[0].degree}</strong>
                    <span>{educationData[0].institution} • {educationData[0].period}</span>
                  </div>
                </div>

                <div className="resume-highlight-item">
                  <Code2 size={16} className="highlight-icon purple" />
                  <div>
                    <strong>Key Technical Practice</strong>
                    <span>React, Modern JavaScript (ES6+), Three.js WebGL, PostgreSQL, REST APIs</span>
                  </div>
                </div>

                <div className="resume-highlight-item">
                  <Mail size={16} className="highlight-icon emerald" />
                  <div>
                    <strong>Direct Inquiries</strong>
                    <span>{personalInfo.email} • {personalInfo.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Download Actions & Document Preview */}
            <div className="resume-action-col">
              <div className="resume-doc-preview-box">
                <div className="doc-preview-icon-wrap">
                  <FileText size={48} className="doc-icon" />
                  <span className="doc-type-tag">PDF</span>
                </div>
                <div className="doc-details">
                  <span className="doc-filename">Chukka_Sahithi_Resume.pdf</span>
                  <span className="doc-filesize">Verified 163 KB Document</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="resume-buttons-group">
                <a
                  href={personalInfo.resumePath}
                  download="Chukka_Sahithi_Resume.pdf"
                  onClick={triggerConfetti}
                  className="btn btn-primary resume-main-btn"
                  title="Download Official Resume PDF"
                >
                  <FileDown size={18} />
                  <span>Download Resume (PDF)</span>
                </a>

                <a
                  href={personalInfo.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary resume-sub-btn"
                  title="Open Resume PDF in New Tab"
                >
                  <span>Open in Browser</span>
                  <ExternalLink size={16} />
                </a>
              </div>

              <div className="resume-security-note">
                <Sparkles size={13} color="var(--accent-cyan)" />
                <span>Original verified PDF without third-party tracking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
