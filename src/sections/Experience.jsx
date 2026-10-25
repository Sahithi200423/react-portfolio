import React from 'react';
import { experienceData, projectsData } from '../data/portfolioData';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  FolderGit2,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">
            <Briefcase size={13} /> Practical Milestones
          </span>
          <h2 className="section-title">
            Applied Experience &amp; <span className="gradient-text">Project Work</span>
          </h2>
          <p className="section-subtitle">
            Hands-on software development through self-directed production platforms, academic engineering, and open-source projects.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="experience-timeline-container">
          {experienceData.map((item) => (
            <div key={item.id} className="glass-card experience-card">
              <div className="exp-header-row">
                <div>
                  <h3 className="exp-role">{item.role}</h3>
                  <div className="exp-org">{item.organization}</div>
                </div>

                <div className="exp-badges-strip">
                  <span className="badge badge-purple">
                    <Calendar size={12} /> {item.period}
                  </span>
                  <span className="badge badge-cyan">{item.type}</span>
                </div>
              </div>

              <div className="exp-location-row">
                <MapPin size={14} className="location-pin-icon" />
                <span>{item.location}</span>
              </div>

              {/* Responsibilities & Achievements */}
              <ul className="exp-responsibilities-list">
                {item.responsibilities.map((resp, i) => (
                  <li key={i} className="exp-resp-item">
                    <CheckCircle2 size={16} className="resp-check-icon" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>

              {/* Verified Highlight Box: CineBook Architecture Reference */}
              <div className="exp-project-highlight">
                <div className="exp-highlight-header">
                  <div className="highlight-tag">
                    <FolderGit2 size={14} />
                    <span>Verified Project Benchmark</span>
                  </div>
                  <span className="badge badge-emerald">43 Backend Tests Passed</span>
                </div>
                <h4 className="highlight-title">{projectsData[0].title}</h4>
                <p className="highlight-desc">
                  Designed and implemented atomic seat concurrency handling in PostgreSQL, preventing double-bookings during simultaneous reservations. Integrated Razorpay test sandbox and dynamic 128-seat auditorium visual layouts.
                </p>
                <div className="highlight-actions">
                  <a
                    href={projectsData[0].liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    <span>View Live Vercel Demo</span>
                    <ExternalLink size={14} />
                  </a>
                  <a
                    href={projectsData[0].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <GithubIcon size={14} />
                    <span>Source Repository</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
