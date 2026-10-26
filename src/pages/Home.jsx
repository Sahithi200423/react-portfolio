import * as React from "react";
import { Link } from "react-router-dom";
import { personalInfo, projectsData } from "@/data/portfolioData";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, ExternalLink, Code2, Sparkles, MapPin, Layers, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

export default function Home() {
  const cinebook = projectsData.find((p) => p.id === "cinebook") || projectsData[0];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20 space-y-20">
      {/* 1. Refined Hero Layout with Portrait & Generous Whitespace */}
      <section className="space-y-8">
        {/* Availability status badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-foreground/90 font-medium">{personalInfo.status}</span>
          <span className="text-border">•</span>
          <span className="inline-flex items-center gap-1">
            <MapPin size={12} /> {personalInfo.location}
          </span>
        </div>

        {/* Hero Content Grid: Introduction + Subtle Portrait */}
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-8 md:gap-12">
          <div className="space-y-4 flex-1">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
              Hello, I'm {personalInfo.name}.
            </h1>
            <p className="text-lg sm:text-xl font-medium text-foreground/85 leading-snug">
              Frontend developer &amp; web application engineer focused on concurrency, interactive graphics, and clean design.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              I am an Engineering Graduate in Computer Science and Engineering from Andhra University College of Engineering (A). 
              I design and build production-ready systems that pair robust architecture with editorial, accessible interfaces.
            </p>

            {/* Clear Primary Navigation CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Button asChild className="cursor-pointer">
                <Link to="/projects">
                  View Projects
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="cursor-pointer">
                <Link to="/about">About &amp; Journey</Link>
              </Button>
              <Button variant="ghost" asChild className="cursor-pointer">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>

          {/* Portrait Framing (No distortion, elegant subtle border) */}
          <div className="shrink-0 self-start md:self-center">
            <div className="relative group">
              <img
                src={personalInfo.avatar}
                alt={personalInfo.name}
                className="h-32 w-32 sm:h-44 sm:w-44 rounded-2xl object-cover object-center border border-border shadow-xs transition-transform duration-300 motion-reduce:transition-none group-hover:scale-[1.02]"
              />
              <div className="absolute -bottom-2 -right-2 hidden sm:flex items-center gap-1.5 bg-background border border-border px-2.5 py-1 rounded-md shadow-xs text-[11px] font-mono text-muted-foreground">
                <Terminal size={12} className="text-primary" />
                <span>AUCE (A)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Project Spotlight: CineBook */}
      <section className="border-t border-border/80 pt-14 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
              Featured Case Study
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {cinebook.title}
            </h2>
          </div>
          <Button variant="ghost" size="sm" asChild className="text-xs">
            <Link to="/projects">
              All Projects ({projectsData.length}) <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <Card className="border-border hover:border-foreground/30 transition-all duration-200">
          <CardHeader className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Badge variant="default" className="font-mono text-xs">
                {cinebook.category}
              </Badge>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                ★ Atomic Seat Locking Concurrency
              </span>
            </div>
            <CardDescription className="text-sm sm:text-base leading-relaxed text-foreground/80">
              {cinebook.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Verified Technical Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 rounded-lg bg-secondary/40 p-4 border border-border/60 text-xs">
              {cinebook.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">{highlight}</span>
                </div>
              ))}
            </div>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {cinebook.technologies.map((tech) => (
                <Badge key={tech} variant="tech">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex flex-wrap items-center gap-3 pt-3 border-t border-border/60">
            {cinebook.liveUrl && cinebook.liveUrl !== "#" && (
              <Button size="sm" asChild>
                <a href={cinebook.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                  Live Platform Demo
                </a>
              </Button>
            )}
            {cinebook.githubUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={cinebook.githubUrl} target="_blank" rel="noopener noreferrer">
                  <GithubIcon size={14} className="mr-1.5" />
                  GitHub Repository
                </a>
              </Button>
            )}
          </CardFooter>
        </Card>
      </section>

      {/* 3. Currently Learning & Building (Verified Data) */}
      <section className="border-t border-border/80 pt-14 space-y-6">
        <div className="space-y-1">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Work in Progress
          </span>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Currently Building &amp; Exploring
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="border-border bg-secondary/20">
            <CardHeader className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold">
                <Code2 size={14} />
                <span>BUILDING</span>
              </div>
              <CardTitle className="text-base">High-Concurrency API Hardening</CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                Refining seat-hold timeouts and transactional rollbacks in CineBook to ensure zero race conditions under concurrent client simulations.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border bg-secondary/20">
            <CardHeader className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold">
                <Layers size={14} />
                <span>EXPLORING</span>
              </div>
              <CardTitle className="text-base">Modern React 19 &amp; Design Systems</CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                Investigating React 19 optimistic UI patterns, Tailwind CSS v4 performance, and building accessible, keyboard-first web components.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* 4. Recent Developer Journal Preview */}
      <section className="border-t border-border/80 pt-14 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
              From the Desk
            </span>
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Developer Notes &amp; Technical Journal
            </h2>
          </div>
          <Button variant="ghost" size="sm" asChild className="text-xs">
            <Link to="/journal">
              Read All Notes <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <Card className="border-border hover:border-foreground/30 transition-all duration-200">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <span>OCT 20, 2026</span>
              <span>•</span>
              <span>ARCHITECTURE</span>
              <span>•</span>
              <span>6 MIN READ</span>
            </div>
            <CardTitle className="text-lg sm:text-xl">
              <Link to="/journal/building-cinebook-movie-booking-architecture" className="hover:text-primary transition-colors">
                Building CineBook: Lessons from a Movie Booking Project
              </Link>
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed text-muted-foreground">
              A deep dive into how I engineered CineBook's concurrency model: preventing double-booking through optimistic UI updates, atomic PostgreSQL transactions, and automated hold timeouts.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
    </div>
  );
}
