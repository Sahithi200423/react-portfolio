import React, { useState } from 'react';
import { skillsData } from '../data/portfolioData';
import {
  Cpu,
  Code2,
  Server,
  Database,
  Wrench,
  Check,
  Layers,
} from 'lucide-react';

const categoryIcons = {
  frontend: Code2,
  backend: Server,
  database: Database,
  tools: Wrench,
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'database', label: 'Database & BaaS' },
    { id: 'tools', label: 'Developer Tools' },
  ];

  const filteredCategories =
    selectedCategory === 'all'
      ? skillsData.categories
      : skillsData.categories.filter((cat) => cat.id === selectedCategory);

  return (
    <section className="section" id="skills">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">
            <Cpu size={13} /> Technical Competencies
          </span>
          <h2 className="section-title">
            Skills &amp; <span className="gradient-text">Technologies</span>
          </h2>
          <p className="section-subtitle">
            Demonstrated technologies and tools I genuinely use to build responsive, scalable web applications.
          </p>
        </div>

        {/* Interactive Category Filter Tabs */}
        <div className="skills-filter-tabs" role="tablist" aria-label="Skill Categories">
          {categories.map((tab) => {
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isSelected}
                className={`skills-tab-btn ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedCategory(tab.id)}
              >
                <span>{tab.label}</span>
                {isSelected && <span className="tab-active-dot" aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        {/* Filtered Category Cards Grid */}
        <div className="skills-cards-grid">
          {filteredCategories.map((category) => {
            const IconComponent = categoryIcons[category.id] || Layers;

            return (
              <div key={category.id} className="glass-card skill-category-card">
                <div className="skill-cat-header">
                  <div className="skill-cat-icon-box">
                    <IconComponent size={22} />
                  </div>
                  <div>
                    <h3 className="skill-cat-title">{category.title}</h3>
                    <p className="skill-cat-desc">{category.description}</p>
                  </div>
                </div>

                {/* Skill Items List */}
                <div className="skill-items-container">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="skill-item-row">
                      <div className="skill-item-info">
                        <div className="skill-name-wrap">
                          <Check size={14} className="skill-check-icon" />
                          <span className="skill-name">{skill.name}</span>
                        </div>
                        <span className="badge badge-purple skill-tag">
                          {skill.tag}
                        </span>
                      </div>

                      {/* Clean visual indicator bar */}
                      <div
                        className="skill-meter-track"
                        role="progressbar"
                        aria-label={`${skill.name} competency`}
                        aria-valuenow={skill.level}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          className="skill-meter-fill"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
