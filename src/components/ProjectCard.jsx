import React, { useState } from 'react';
import { ExternalLink, Check, Activity, Layers } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function ProjectCard({ project, isFeatured = false }) {
  const [imageError, setImageError] = useState(false);

  const hasLiveDemo = project.liveUrl && project.liveUrl !== '#';
  const hasGithub = project.githubUrl && project.githubUrl !== '#';
  const hasBackendHealth = Boolean(project.backendHealthUrl);

  return (
    <article
      className={`glass-card project-card ${isFeatured ? 'project-card-featured' : ''}`}
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Project Visual Banner */}
      <div className="project-banner-wrap">
        {!imageError && project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot preview`}
            className="project-banner-img"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="project-banner-fallback">
            <Layers size={36} className="fallback-icon" />
            <span className="fallback-category">{project.category}</span>
            <span className="fallback-title">{project.title}</span>
          </div>
        )}

        {/* Floating Top Badges */}
        <div className="project-badge-overlay">
          {project.badge && (
            <span className="badge badge-cyan project-status-badge">
              {project.badge}
            </span>
          )}
          <span className="badge badge-purple project-category-badge">
            {project.category}
          </span>
        </div>
      </div>

      {/* Project Content Body */}
      <div className="project-content-body">
        <h3 className="project-title" id={`project-title-${project.id}`}>
          {project.title}
        </h3>

        <p className="project-description">{project.description}</p>

        {/* Feature Highlights List */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="project-highlights-box">
            <span className="highlights-heading">Architecture Highlights:</span>
            <ul className="highlights-list">
              {project.highlights.map((highlight, idx) => (
                <li key={idx} className="highlight-item">
                  <Check size={14} className="highlight-check" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technology Badges */}
        <div className="project-tech-pills">
          {project.technologies.map((tech) => (
            <span key={tech} className="badge badge-emerald tech-badge">
              {tech}
            </span>
          ))}
        </div>

        {/* Actions Button Strip */}
        <div className="project-actions-strip">
          {hasLiveDemo ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary project-action-btn"
              aria-label={`Open live demo for ${project.title}`}
            >
              <span>Live Application</span>
              <ExternalLink size={15} />
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="btn btn-primary project-action-btn btn-disabled"
              title="Demo link coming soon"
            >
              <span>In Development</span>
            </button>
          )}

          {hasGithub ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary project-action-btn"
              aria-label={`View source code on GitHub for ${project.title}`}
            >
              <GithubIcon size={16} />
              <span>Source Code</span>
            </a>
          ) : null}

          {hasBackendHealth && (
            <a
              href={project.backendHealthUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline project-action-btn btn-health"
              title="Check Backend Health Status on Render"
            >
              <Activity size={14} />
              <span>API Health</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
