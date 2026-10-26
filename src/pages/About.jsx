import * as React from "react";
import { Link } from "react-router-dom";
import { personalInfo, aboutData, educationData, skillsData } from "@/data/portfolioData";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileDown, GraduationCap, MapPin, Code2, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20 space-y-16">
      {/* 1. Header & Identity Summary */}
      <section className="space-y-4">
        <Badge variant="outline" className="font-mono text-xs">
          About &amp; Background
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
          About Sahithi Chukka
        </h1>
        <p className="text-lg sm:text-xl font-medium text-foreground/80 leading-relaxed max-w-2xl">
          {aboutData.headline}
        </p>

        {/* Quick Identity Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/40 px-2.5 py-1">
            <MapPin size={13} className="text-primary" />
            Visakhapatnam, Andhra Pradesh, India
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/40 px-2.5 py-1">
            <GraduationCap size={13} className="text-primary" />
            AUCE (A) B.Tech CSE — Graduated
          </span>
        </div>
      </section>

      {/* 2. Authentic Engineering Narrative */}
      <section className="space-y-6 border-t border-border/80 pt-10">
        <div className="space-y-1">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Background &amp; Philosophy
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            How I Approach Software Engineering
          </h2>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 text-foreground/85 leading-relaxed text-sm sm:text-base">
          <p>
            I completed my engineering degree in Computer Science and Engineering at 
            <strong> Andhra University College of Engineering (Autonomous)</strong> in Visakhapatnam. 
            My technical focus grew from a curiosity about how robust backends communicate with smooth, interactive frontends.
          </p>
          <p>
            Rather than simply creating static UI mockups, I believe in learning by building full systems from end to end. 
            When developing my flagship project, <strong>CineBook</strong>, I dove deep into distributed transaction challenges: 
            how to handle real-time seat locks so two users never buy the same seat at the exact same second, how to structure 
            state rollbacks gracefully, and how to make the checkout flow intuitive and accessible across screen sizes.
          </p>
          <p>
            I value clean typography, thoughtful whitespace, and semantic code that prioritizes real human usability over unnecessary visual noise.
          </p>
        </div>

        {/* Core Interests Tags */}
        <div className="pt-2 space-y-2">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">
            Core Areas of Interest:
          </span>
          <div className="flex flex-wrap gap-2">
            {aboutData.interests.map((interest) => (
              <Badge key={interest} variant="secondary" className="text-xs py-1 px-3">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Verified Education Credentials */}
      <section className="space-y-6 border-t border-border/80 pt-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
              Academic Background
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              Education &amp; Credentials
            </h2>
          </div>
          <Button variant="outline" size="sm" asChild className="cursor-pointer">
            <a href={personalInfo.resumePath} download="Chukka_Sahithi_resume.pdf">
              <FileDown className="mr-1.5 h-3.5 w-3.5" />
              Download Official Resume
            </a>
          </Button>
        </div>

        <div className="space-y-4">
          {educationData.map((edu) => (
            <Card key={edu.id} className="border-border">
              <CardHeader className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <CardTitle className="text-base sm:text-lg font-bold">
                    {edu.degree}
                  </CardTitle>
                  <span className="text-xs font-mono text-muted-foreground bg-secondary/60 px-2 py-0.5 rounded-md self-start sm:self-auto">
                    {edu.period} • {edu.status}
                  </span>
                </div>
                <CardDescription className="font-medium text-foreground/80 text-sm">
                  {edu.institution}
                </CardDescription>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin size={12} />
                  <span>{edu.location}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 pt-0">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {edu.description}
                </p>

                {edu.coursework && (
                  <div className="space-y-1.5 pt-2 border-t border-border/60">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">
                      Core Academic Coursework:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((course) => (
                        <Badge key={course} variant="tech">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Compact Skills Matrix (Verified Skills Data) */}
      <section className="space-y-6 border-t border-border/80 pt-10">
        <div className="space-y-1">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Technical Toolchain
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Code2 className="h-6 w-6 text-primary" />
            Skills &amp; Technologies
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Technologies and tools I work with daily across frontend, backend logic, and development workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skillsData.categories.map((cat) => (
            <Card key={cat.id} className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center justify-between">
                  <span>{cat.title}</span>
                  <span className="text-[10px] font-mono text-muted-foreground font-normal">
                    {cat.skills.length} skills
                  </span>
                </CardTitle>
                <CardDescription className="text-xs">{cat.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <Badge key={skill.name} variant="tech" className="text-xs">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. Resume & Professional Profiles */}
      <section className="border-t border-border/80 pt-10 space-y-4">
        <div className="space-y-1">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Profiles &amp; Documents
          </span>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Connect &amp; View Resume
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button asChild className="cursor-pointer">
            <a href={personalInfo.resumePath} download="Chukka_Sahithi_resume.pdf">
              <FileDown className="mr-1.5 h-4 w-4" />
              Download Resume (PDF)
            </a>
          </Button>

          <Button variant="outline" asChild className="cursor-pointer">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5"
            >
              <GithubIcon size={15} />
              <span>GitHub Profile</span>
              <ArrowUpRight size={13} className="text-muted-foreground" />
            </a>
          </Button>

          <Button variant="outline" asChild className="cursor-pointer">
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5"
            >
              <LinkedinIcon size={15} />
              <span>LinkedIn Profile</span>
              <ArrowUpRight size={13} className="text-muted-foreground" />
            </a>
          </Button>

          <Button variant="ghost" asChild className="cursor-pointer">
            <Link to="/contact">Send a Message</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
