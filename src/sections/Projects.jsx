import React, { useState } from 'react';
import { projectsData } from '../data/portfolioData';
import ProjectCard from '../components/ProjectCard';
import { FolderGit2, Sparkles } from 'lucide-react';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  // Extract unique categories supported by actual data
  const categories = ['All', 'Full-Stack', 'Frontend', 'AI & Frontend'];

  const filteredProjects =
    activeFilter === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section className="section section-alt" id="projects">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">
            <FolderGit2 size={13} /> Portfolio Showcase
          </span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Engineered software systems and applications focusing on responsiveness, concurrency, and clean user experience.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="projects-filter-bar" role="tablist" aria-label="Project Categories">
          {categories.map((category) => {
            const isSelected = activeFilter === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isSelected}
                className={`projects-filter-btn ${isSelected ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                <span>{category}</span>
                {isSelected && <span className="filter-active-pill" aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isFeatured={project.featured}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
