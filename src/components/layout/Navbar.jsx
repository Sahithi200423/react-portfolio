import * as React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, FileDown, ArrowUpRight } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";
import ThemeToggle from "@/components/ThemeToggle";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Journal", path: "/journal" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/85 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Wordmark / Brand */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md p-1"
          aria-label={`${personalInfo.name} - Home`}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary font-mono text-xs font-bold text-primary-foreground shadow-sm">
            {personalInfo.monogram}
          </span>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-foreground group-hover:text-foreground/80 transition-colors">
              {personalInfo.name}
            </span>
            <span className="text-[11px] text-muted-foreground hidden sm:inline-block">
              AU CSE Dual-Degree
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-1 text-sm"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-md px-3 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "bg-secondary text-foreground font-medium shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions: Socials, Resume, ThemeToggle, Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Social Links (Desktop) */}
          <div className="hidden sm:flex items-center gap-1 text-muted-foreground">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2 hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2 hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <LinkedinIcon size={16} />
            </a>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Sheet Trigger */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-foreground"
                  aria-label="Open Navigation Menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 sm:w-80 p-6 flex flex-col justify-between">
                <div className="space-y-6">
                  <SheetHeader className="text-left space-y-1">
                    <SheetTitle className="text-base font-semibold">
                      {personalInfo.name}
                    </SheetTitle>
                    <p className="text-xs text-muted-foreground">
                      Frontend Developer &amp; CSE Graduate
                    </p>
                  </SheetHeader>

                  {/* Mobile Nav Links */}
                  <nav className="flex flex-col gap-1.5 pt-2" aria-label="Mobile Navigation">
                    {NAV_ITEMS.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
                            isActive
                              ? "bg-secondary font-medium text-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                          }`
                        }
                      >
                        {item.name}
                        {location.pathname === item.path && (
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        )}
                      </NavLink>
                    ))}
                  </nav>
                </div>

                {/* Mobile Drawer Bottom Section */}
                <div className="border-t border-border pt-4 space-y-3">
                  <a
                    href={personalInfo.resumePath}
                    download="Chukka_Sahithi_resume.pdf"
                    className="flex items-center justify-center gap-2 w-full rounded-md bg-secondary py-2 text-xs font-medium text-foreground hover:bg-secondary/80 transition-colors"
                  >
                    <FileDown size={14} />
                    Download Resume
                  </a>
                  <div className="flex items-center justify-center gap-4 text-muted-foreground pt-1">
                    <a
                      href={personalInfo.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 hover:text-foreground"
                      aria-label="GitHub"
                    >
                      <GithubIcon size={16} />
                    </a>
                    <a
                      href={personalInfo.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 hover:text-foreground"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon size={16} />
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
