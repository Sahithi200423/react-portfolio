import React from 'react';
import { educationData } from '../data/portfolioData';
import {
  GraduationCap,
  Calendar,
  MapPin,
  BookOpen,
  Award,
  CheckCircle2,
} from 'lucide-react';

export default function Education() {
  return (
    <section className="section section-alt" id="education">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">
            <GraduationCap size={13} /> Academic Background
          </span>
          <h2 className="section-title">
            Education &amp; <span className="gradient-text">Credentials</span>
          </h2>
          <p className="section-subtitle">
            Formal computer science and engineering coursework forming the foundation of my technical practice.
          </p>
        </div>

        {/* Education Timeline / Showcase */}
        <div className="education-timeline-wrap">
          {educationData.map((edu) => (
            <div key={edu.id} className="glass-card education-card">
              <div className="edu-top-row">
                <div className="edu-heading-wrap">
                  <div className="edu-icon-badge">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h3 className="edu-degree">{edu.degree}</h3>
                    <div className="edu-institution">{edu.institution}</div>
                  </div>
                </div>

                <div className="edu-meta-badges">
                  <span className="badge badge-cyan">
                    <Calendar size={12} /> {edu.period}
                  </span>
                  <span className="badge badge-emerald">
                    <CheckCircle2 size={12} /> {edu.status}
                  </span>
                </div>
              </div>

              <div className="edu-location-row">
                <MapPin size={14} className="location-pin-icon" />
                <span>{edu.location}</span>
              </div>

              <p className="edu-description">{edu.description}</p>

              {/* Core Coursework Badges */}
              <div className="edu-coursework-wrap">
                <div className="coursework-label">
                  <BookOpen size={14} />
                  <span>Key Foundational Coursework:</span>
                </div>
                <div className="coursework-badges">
                  {edu.coursework.map((course) => (
                    <span key={course} className="badge badge-purple coursework-pill">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
