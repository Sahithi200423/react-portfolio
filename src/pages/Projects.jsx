import * as React from "react";
import { projectsData } from "@/data/portfolioData";
import { Card } from "@/components/ui/card";
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
  Calculator,
  Droplets,
  FileDown,
  ShieldCheck,
} from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

export default function Projects() {
  const [filter, setFilter] = React.useState("all");
  const [isCinebookModalOpen, setIsCinebookModalOpen] = React.useState(false);
  const [isGroundwaterModalOpen, setIsGroundwaterModalOpen] = React.useState(false);

  const categories = [
    { id: "all", label: "All Featured Projects" },
    { id: "Full-Stack", label: "Full-Stack Architecture" },
    { id: "Calculators", label: "Engineering & Calculators" },
  ];

  const cinebook = projectsData.find((p) => p.id === "cinebook") || projectsData[0];
  const groundwater = projectsData.find((p) => p.id === "groundwater") || projectsData[1];

  const showCinebook = filter === "all" || filter === "Full-Stack";
  const showGroundwater = filter === "all" || filter === "Full-Stack" || filter === "Calculators";

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20 space-y-16">
      {/* 1. Page Header & Category Filter */}
      <section className="space-y-6">
        <div className="space-y-3">
          <Badge variant="outline" className="font-mono text-xs">
            Software Architecture &amp; Production Systems
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Featured Projects
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Full-stack web applications, atomic concurrency systems, and domain-specific engineering calculators. 
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
      {showCinebook && cinebook && (
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
                  <Dialog open={isCinebookModalOpen} onOpenChange={setIsCinebookModalOpen}>
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

      {/* 3. Global Groundwater Consultants Featured Project Spotlight */}
      {showGroundwater && groundwater && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Droplets size={13} className="text-primary" />
              Featured Enterprise Platform
            </span>
            <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-medium">
              ★ 5 Engineering Domain Calculators
            </span>
          </div>

          <Card className="border-border hover:border-foreground/30 transition-all duration-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8">
              {/* Left Column: Calculators Architectural Showcase Card */}
              <div className="lg:col-span-5 space-y-3">
                <div className="rounded-lg border border-border/80 bg-secondary/30 p-5 space-y-3.5">
                  <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                    <Calculator className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-foreground text-sm">
                      5 Hydrogeological Calculators
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs">
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-foreground block text-[11px]">Groundwater Recharge Calculator</strong>
                        <span className="text-muted-foreground text-[11px]">Soil permeability &amp; runoff volume modeling</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-foreground block text-[11px]">Rainwater Harvesting Calculator</strong>
                        <span className="text-muted-foreground text-[11px]">Catchment area &amp; annual yield forecasting</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-foreground block text-[11px]">Water Requirement Calculator</strong>
                        <span className="text-muted-foreground text-[11px]">Per-capita &amp; industrial demand analysis</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-foreground block text-[11px]">Project Cost Estimator</strong>
                        <span className="text-muted-foreground text-[11px]">Budgeting with instant client-side jsPDF export</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-foreground block text-[11px]">Hydraulic Unit Converter</strong>
                        <span className="text-muted-foreground text-[11px]">Flux, volume, permeability, and pressure</span>
                      </div>
                    </li>
                  </ul>

                  <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                    <span>Export format:</span>
                    <span className="inline-flex items-center gap-1 text-primary font-medium">
                      <FileDown size={12} /> Client jsPDF Report
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg border border-border/60 bg-secondary/20 flex items-center gap-2.5 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>10-View Administrative Subsystem with Supabase data integration</span>
                </div>
              </div>

              {/* Right Column: Platform Details & Actions */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="default" className="text-xs font-mono">
                      {groundwater.category}
                    </Badge>
                    <Badge variant="secondary" className="text-xs font-mono">
                      {groundwater.badge}
                    </Badge>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    {groundwater.title}
                  </h2>

                  <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                    {groundwater.summary}
                  </p>

                  {/* Problem & Contribution Breakdown */}
                  <div className="space-y-3 rounded-lg bg-secondary/40 p-4 border border-border/60 text-xs">
                    <div>
                      <span className="font-semibold text-foreground uppercase tracking-wider text-[11px] block">
                        Problem Addressed:
                      </span>
                      <p className="text-muted-foreground mt-0.5 leading-relaxed">
                        {groundwater.problemSolved}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border/40">
                      <span className="font-semibold text-foreground uppercase tracking-wider text-[11px] block">
                        My Contribution &amp; Architecture:
                      </span>
                      <p className="text-muted-foreground mt-0.5 leading-relaxed">
                        {groundwater.myContribution}
                      </p>
                    </div>
                  </div>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {groundwater.technologies.map((tech) => (
                      <Badge key={tech} variant="tech">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions: Source Code and Deep Architecture Modal */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border/60">
                  <div className="flex flex-wrap items-center gap-3">
                    {groundwater.githubUrl && (
                      <Button size="sm" asChild className="cursor-pointer">
                        <a href={groundwater.githubUrl} target="_blank" rel="noopener noreferrer">
                          <GithubIcon size={14} className="mr-1.5" />
                          Source Code
                        </a>
                      </Button>
                    )}

                    {/* Architecture Modal Trigger */}
                    <Dialog open={isGroundwaterModalOpen} onOpenChange={setIsGroundwaterModalOpen}>
                      <DialogTrigger asChild>
                        <Button variant="secondary" size="sm" className="cursor-pointer">
                          <Layers className="mr-1.5 h-3.5 w-3.5" />
                          View Architecture &amp; Calculators
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-2xl">
                        <DialogHeader className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="default" className="text-xs">
                              Global Groundwater Consultants
                            </Badge>
                            <span className="text-xs font-mono text-muted-foreground">
                              Technical Implementation Specs
                            </span>
                          </div>
                          <DialogTitle className="text-xl sm:text-2xl">
                            Domain Calculators &amp; Architecture Model
                          </DialogTitle>
                          <DialogDescription className="text-xs sm:text-sm">
                            Implementation details of hydrogeological calculators, PDF export, and administrative subsystem.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-5 py-3 text-xs sm:text-sm leading-relaxed text-foreground/85">
                          {/* 1. Calculators */}
                          <div className="space-y-1.5 rounded-lg border border-border p-3.5 bg-secondary/30">
                            <div className="flex items-center gap-2 font-semibold text-foreground">
                              <Calculator className="h-4 w-4 text-primary" />
                              <span>1. Five Specialized Domain Calculators</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {groundwater.architecture.calculators}
                            </p>
                          </div>

                          {/* 2. Admin Subsystem */}
                          <div className="space-y-1.5 rounded-lg border border-border p-3.5 bg-secondary/30">
                            <div className="flex items-center gap-2 font-semibold text-foreground">
                              <Database className="h-4 w-4 text-primary" />
                              <span>2. 10-View Admin Operations Subsystem</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {groundwater.architecture.adminSubsystem}
                            </p>
                          </div>

                          {/* 3. Workflows */}
                          <div className="space-y-1.5 rounded-lg border border-border p-3.5 bg-secondary/30">
                            <div className="flex items-center gap-2 font-semibold text-foreground">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              <span>3. Client Consultation &amp; Emergency Workflows</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {groundwater.architecture.workflows}
                            </p>
                          </div>

                          {/* 4. Tech Stack */}
                          <div className="space-y-1.5 rounded-lg border border-border p-3.5 bg-secondary/30">
                            <div className="flex items-center gap-2 font-semibold text-foreground">
                              <Sliders className="h-4 w-4 text-primary" />
                              <span>4. Technical Stack &amp; Tools</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {groundwater.architecture.stack}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-border">
                          {groundwater.githubUrl && (
                            <Button size="sm" asChild>
                              <a href={groundwater.githubUrl} target="_blank" rel="noopener noreferrer">
                                <GithubIcon size={14} className="mr-1.5" />
                                View Repository on GitHub
                              </a>
                            </Button>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Availability Note */}
                  {groundwater.availabilityNote && (
                    <span className="text-[11px] font-mono text-muted-foreground italic flex items-center gap-1">
                      <Info size={12} className="shrink-0" />
                      {groundwater.availabilityNote}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </section>
      )}
    </div>
  );
}
