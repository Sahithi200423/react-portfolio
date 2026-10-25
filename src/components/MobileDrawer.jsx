import React, { useEffect } from 'react';
import { personalInfo, navLinks } from '../data/portfolioData';
import ThemeToggle from './ThemeToggle';
import { X, FileDown, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export default function MobileDrawer({ isOpen, onClose, activeSection }) {
  // Prevent background scrolling while drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key press to close drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="mobile-drawer-root"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Backdrop overlay */}
      <div
        className="mobile-drawer-overlay"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div className="mobile-drawer-panel">
        {/* Drawer Header */}
        <div className="mobile-drawer-header">
          <div className="mobile-drawer-brand">
            <span className="brand-monogram">{personalInfo.monogram}</span>
            <div className="brand-info">
              <span className="brand-name">{personalInfo.name}</span>
              <span className="brand-role">{personalInfo.headline}</span>
            </div>
          </div>
          <div className="mobile-drawer-actions">
            <ThemeToggle />
            <button
              type="button"
              className="drawer-close-btn"
              onClick={onClose}
              aria-label="Close navigation menu"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mobile-drawer-nav" aria-label="Mobile Navigation Links">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li key={link.name} className="mobile-nav-item">
                  <a
                    href={link.href}
                    onClick={onClose}
                    className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="active-dot" aria-hidden="true" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Drawer Footer Actions */}
        <div className="mobile-drawer-footer">
          <a
            href={personalInfo.resumePath}
            download="Chukka_Sahithi_Resume.pdf"
            className="btn btn-primary mobile-resume-btn"
            onClick={onClose}
          >
            <FileDown size={18} />
            <span>Download Resume</span>
          </a>

          <div className="mobile-social-strip">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={20} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="social-icon-btn"
              aria-label="Send Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
