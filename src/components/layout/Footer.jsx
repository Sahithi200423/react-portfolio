import * as React from "react";
import { Link } from "react-router-dom";
import { personalInfo } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background/50 text-muted-foreground transition-colors">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 pb-8">
          {/* Identity Column */}
          <div className="space-y-3 md:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-semibold text-foreground tracking-tight text-base"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-primary font-mono text-xs text-primary-foreground font-bold">
                {personalInfo.monogram}
              </span>
              {personalInfo.name}
            </Link>
            <p className="text-xs max-w-sm leading-relaxed text-muted-foreground">
              {personalInfo.shortBio}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-foreground/80 font-medium">
                {personalInfo.status}
              </span>
            </div>
          </div>

          {/* Site Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-foreground transition-colors">
                  About &amp; Background
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-foreground transition-colors">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link to="/journal" className="hover:text-foreground transition-colors">
                  Developer Journal
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-foreground transition-colors">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Social */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Connect
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <GithubIcon size={14} />
                  <span>GitHub</span>
                  <ArrowUpRight size={12} className="text-muted-foreground/60" />
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <LinkedinIcon size={14} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={12} className="text-muted-foreground/60" />
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.socials.email}
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <Mail size={14} />
                  <span>Email</span>
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.resumePath}
                  download="Chukka_Sahithi_resume.pdf"
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <span>Resume (PDF)</span>
                  <ArrowUpRight size={12} className="text-muted-foreground/60" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-border pt-6 text-[11px] gap-2">
          <p>© {currentYear} {personalInfo.name}. All rights reserved.</p>
          <p className="text-muted-foreground/80 font-mono">
            Minimalist Architecture • React &amp; shadcn/ui
          </p>
        </div>
      </div>
    </footer>
  );
}
