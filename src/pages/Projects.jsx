import * as React from "react";
import { projectsData } from "@/data/portfolioData";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ExternalLink,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  Lock,
  Database,
  Sliders,
  ShieldCheck,
  FileCode,
} from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

export default function Projects() {
  const [filter, setFilter] = React.useState("all");
  const [isCaseStudyOpen, setIsCaseStudyOpen] = React.useState(false);

  const categories = [
    { id: "all", label: "All Systems" },
    { id: "Full-Stack", label: "Full-Stack" },
    { id: "Web Apps", label: "Web Applications" },
    { id: "Data Science", label: "Data Science & Tools" },
  ];

  const cinebook = projectsData.find((p) => p.id === "cinebook") || projectsData[0];
  const otherProjects = projectsData.filter((p) => p.id !== "cinebook");

  const filteredOtherProjects =
    filter === "all"
      ? otherProjects
      : otherProjects.filter((p) => p.category === filter);

  const showCinebook = filter === "all" || filter === "Full-Stack";

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20 space-y-16">
      {/* 1. Page Header & Category Filter */}
      <section className="space-y-6">
        <div className="space-y-3">
          <Badge variant="outline" className="font-mono text-xs">
            Software Architecture &amp; Systems
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Featured Projects
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Production-oriented full-stack web applications, atomic concurrency systems, and technical tools. 
            All details reflect verified codebases and implemented functionality.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2" role="tablist" aria-label="Project Categories">
          {categories.map((c) => (
            <Button
              key={c.id}
              variant={filter === c.id ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(c.id)}
              className="text-xs h-8 cursor-pointer transition-colors"
              role="tab"
              aria-selected={filter === c.id}
            >
              {c.label}
            </Button>
          ))}
        </div>
      </section>

      {/* 2. CineBook Featured Case Study Spotlight */}
      {showCinebook && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={13} className="text-primary" />
              Flagship Production Project
            </span>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
              ★ Active Vercel Deployment
            </span>
          </div>

          <Card className="border-border hover:border-foreground/30 transition-all duration-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8">
              {/* Left Column: Visual Screenshot Preview */}
              <div className="lg:col-span-5 space-y-3">
                <div className="overflow-hidden rounded-lg border border-border/70 bg-muted/40">
                  <img
                    src={cinebook.image}
                    alt="CineBook platform preview showing movie catalog and booking screen"
                    className="w-full h-auto object-cover object-top transition-transform duration-300 hover:scale-[1.02] motion-reduce:transition-none"
                    loading="lazy"
                  />
                </div>

                {/* Sub-preview: Interactive Auditorium Seats */}
                {cinebook.seatsImage && (
                  <div className="overflow-hidden rounded-lg border border-border/70 bg-muted/40">
                    <img
                      src={cinebook.seatsImage}
                      alt="CineBook 128-seat interactive auditorium seat map"
                      className="w-full h-auto object-cover object-center"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>

              {/* Right Column: Case Study Details */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="default" className="text-xs font-mono">
                      {cinebook.category}
                    </Badge>
                    <Badge variant="secondary" className="text-xs font-mono">
                      {cinebook.badge}
                    </Badge>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    {cinebook.title}
                  </h2>

                  <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                    {cinebook.summary}
                  </p>

                  {/* Problem & Contribution Breakdown */}
                  <div className="space-y-3 rounded-lg bg-secondary/40 p-4 border border-border/60 text-xs">
                    <div>
                      <span className="font-semibold text-foreground uppercase tracking-wider text-[11px] block">
                        Problem Addressed:
                      </span>
                      <p className="text-muted-foreground mt-0.5 leading-relaxed">
                        {cinebook.problemSolved}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border/40">
                      <span className="font-semibold text-foreground uppercase tracking-wider text-[11px] block">
                        My Contribution &amp; Architecture:
                      </span>
                      <p className="text-muted-foreground mt-0.5 leading-relaxed">
                        {cinebook.myContribution}
                      </p>
                    </div>
                  </div>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cinebook.technologies.map((tech) => (
                      <Badge key={tech} variant="tech">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions: Live Demo, Source Code, and Deep Architecture Modal */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/60">
                  {cinebook.liveUrl && (
                    <Button size="sm" asChild className="cursor-pointer">
                      <a href={cinebook.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                        Launch Live Platform
                      </a>
                    </Button>
                  )}

                  {cinebook.githubUrl && (
                    <Button variant="outline" size="sm" asChild className="cursor-pointer">
                      <a href={cinebook.githubUrl} target="_blank" rel="noopener noreferrer">
                        <GithubIcon size={14} className="mr-1.5" />
                        Source Code
                      </a>
                    </Button>
                  )}

                  {/* Deep Architecture Modal Trigger */}
                  <Dialog open={isCaseStudyOpen} onOpenChange={setIsCaseStudyOpen}>
                    <DialogTrigger asChild>
                      <Button variant="secondary" size="sm" className="cursor-pointer">
                        <Layers className="mr-1.5 h-3.5 w-3.5" />
                        View Architecture Specs
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-2xl">
                      <DialogHeader className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="default" className="text-xs">
                            CineBook V2 Architecture
                          </Badge>
                          <span className="text-xs font-mono text-muted-foreground">
                            Verified Source Documentation
                          </span>
                        </div>
                        <DialogTitle className="text-xl sm:text-2xl">
                          Technical Architecture &amp; Concurrency Model
                        </DialogTitle>
                        <DialogDescription className="text-xs sm:text-sm">
                          Detailed implementation specifications of CineBook's reservation engine.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-5 py-3 text-xs sm:text-sm leading-relaxed text-foreground/85">
                        {/* 1. Booking Flow */}
                        <div className="space-y-1.5 rounded-lg border border-border p-3.5 bg-secondary/30">
                          <div className="flex items-center gap-2 font-semibold text-foreground">
                            <Sliders className="h-4 w-4 text-primary" />
                            <span>1. End-to-End Booking Flow</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {cinebook.architecture.bookingFlow}
                          </p>
                        </div>

                        {/* 2. Interactive Seat Selection */}
                        <div className="space-y-1.5 rounded-lg border border-border p-3.5 bg-secondary/30">
                          <div className="flex items-center gap-2 font-semibold text-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span>2. 128-Seat Auditorium Layout</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {cinebook.architecture.seatSelection}
                          </p>
                        </div>

                        {/* 3. Concurrency & Seat Locking */}
                        <div className="space-y-1.5 rounded-lg border border-border p-3.5 bg-secondary/30">
                          <div className="flex items-center gap-2 font-semibold text-foreground">
                            <Lock className="h-4 w-4 text-primary" />
                            <span>3. Concurrency &amp; Atomic Seat Holds</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {cinebook.architecture.concurrency}
                          </p>
                        </div>

                        {/* 4. Database & Payment Verification */}
                        <div className="space-y-1.5 rounded-lg border border-border p-3.5 bg-secondary/30">
                          <div className="flex items-center gap-2 font-semibold text-foreground">
                            <Database className="h-4 w-4 text-primary" />
                            <span>4. Database &amp; Payment Integrity</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {cinebook.architecture.database}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-border">
                        <Button size="sm" asChild>
                          <a href={cinebook.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                            Open Live Demo
                          </a>
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* 3. Other Engineered Systems */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            Additional Applications
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Web Applications &amp; Analytical Systems
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOtherProjects.map((project) => (
            <Card
              key={project.id}
              className="flex flex-col justify-between border-border hover:border-foreground/30 transition-all duration-200 overflow-hidden"
            >
              <div className="space-y-4">
                {/* Visual Preview where available */}
                {project.image ? (
                  <div className="overflow-hidden border-b border-border/70 bg-muted/30">
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot preview`}
                      className="w-full h-48 object-cover object-top transition-transform duration-300 hover:scale-[1.02] motion-reduce:transition-none"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  /* Placeholder Architectural Badge for projects without image */
                  <div className="h-48 border-b border-border/70 bg-secondary/30 flex flex-col items-center justify-center p-6 text-center space-y-2">
                    <FileCode className="h-10 w-10 text-muted-foreground/60" />
                    <span className="text-xs font-mono font-medium text-foreground">
                      Enterprise Consulting Portal
                    </span>
                    <span className="text-[11px] text-muted-foreground max-w-xs">
                      5 Technical Hydrogeological Calculators &amp; jsPDF Summary Export
                    </span>
                  </div>
                )}

                <div className="p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge variant="secondary" className="text-xs font-mono">
                      {project.category}
                    </Badge>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {project.badge}
                    </span>
                  </div>

                  <CardTitle className="text-xl font-bold leading-snug">
                    {project.title}
                  </CardTitle>

                  <CardDescription className="text-sm leading-relaxed text-foreground/80">
                    {project.description}
                  </CardDescription>

                  {/* Problem Solved & Contribution */}
                  <div className="space-y-2 rounded-md bg-secondary/40 p-3.5 border border-border/60 text-xs">
                    <div>
                      <span className="font-semibold text-foreground text-[11px] block">
                        Problem Addressed:
                      </span>
                      <p className="text-muted-foreground mt-0.5 leading-relaxed">
                        {project.problemSolved}
                      </p>
                    </div>
                    <div className="pt-1.5 border-t border-border/40">
                      <span className="font-semibold text-foreground text-[11px] block">
                        Implementation Contribution:
                      </span>
                      <p className="text-muted-foreground mt-0.5 leading-relaxed">
                        {project.myContribution}
                      </p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {project.highlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-primary font-bold">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="tech">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions / Honest Link Availability Notice */}
              <CardFooter className="flex flex-wrap items-center justify-between gap-2 p-6 pt-0 border-t border-border/50">
                <div className="flex flex-wrap items-center gap-2">
                  {project.liveUrl ? (
                    <Button size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                        Live Demo
                      </a>
                    </Button>
                  ) : null}

                  {project.githubUrl ? (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <GithubIcon size={14} className="mr-1.5" />
                        Source Code
                      </a>
                    </Button>
                  ) : null}
                </div>

                {/* Visible status indicator when link is unavailable */}
                {project.availabilityNote && (
                  <span className="text-[11px] font-mono text-muted-foreground italic flex items-center gap-1">
                    <Info size={12} className="shrink-0" />
                    {project.availabilityNote}
                  </span>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
