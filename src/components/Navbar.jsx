import React, { useState, useEffect } from 'react';
import { personalInfo, navLinks } from '../data/portfolioData';
import ThemeToggle from './ThemeToggle';
import MobileDrawer from './MobileDrawer';
import { Menu, FileDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll position for sticky background styling & active link tracking
  useEffect(() => {
    const handleScroll = () => {
      // Toggle compact/elevated glass styling on scroll
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section based on scroll offset
      const sections = ['hero', 'about', 'skills', 'projects', 'education', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`navbar-root ${isScrolled ? 'scrolled' : ''}`} id="mainNavbar">
        <div className="container nav-container">
          {/* Brand Logo & Monogram */}
          <a href="#hero" className="nav-brand" aria-label={`${personalInfo.name} Homepage`}>
            <span className="brand-monogram">{personalInfo.monogram}</span>
            <div className="brand-text">
              <span className="brand-name">{personalInfo.name}</span>
              <span className="brand-role">{personalInfo.headline}</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Primary Navigation">
            <ul className="nav-link-list">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                    >
                      {link.name}
                      {isActive && <span className="nav-active-pill" aria-hidden="true" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop Actions: Socials, Resume, ThemeToggle, Mobile Menu */}
          <div className="nav-actions">
            {/* Social Icons */}
            <div className="nav-socials">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-icon-link"
                aria-label="GitHub Profile"
                title="GitHub Profile"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-icon-link"
                aria-label="LinkedIn Profile"
                title="LinkedIn Profile"
              >
                <LinkedinIcon size={18} />
              </a>
            </div>

            {/* Direct Resume Download */}
            <a
              href={personalInfo.resumePath}
              download="Chukka_Sahithi_Resume.pdf"
              className="btn-resume-nav"
              title="Download Official Resume PDF"
            >
              <FileDown size={15} />
              <span>Resume</span>
            </a>

            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Mobile Menu Hamburger Button */}
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobileDrawer"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-in Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}
