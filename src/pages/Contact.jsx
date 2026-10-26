import * as React from "react";
import { personalInfo } from "@/data/portfolioData";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import confetti from "canvas-confetti";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

export default function Contact() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = React.useState({});
  const [status, setStatus] = React.useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = React.useState("");

  // Client-side field validation with accessibility
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!formData.name.trim()) {
      errors.name = "Please provide your name.";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters.";
    }

    if (!formData.email.trim()) {
      errors.email = "Please provide your email address.";
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address (e.g. name@domain.com).";
    }

    if (!formData.subject.trim()) {
      errors.subject = "Please provide a subject line.";
    } else if (formData.subject.trim().length < 3) {
      errors.subject = "Subject must be at least 3 characters.";
    }

    if (!formData.message.trim()) {
      errors.message = "Please write a message.";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear individual field error as user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() || status === "submitting") {
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    // Branch 1: Supabase configured with live credentials
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from("messages").insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim(),
          },
        ]);

        if (error) throw error;

        // Never display success unless database insertion actually succeeded
        setStatus("success");
        setStatusMessage(
          "Thank you! Your message was submitted successfully to the database. I will review it and get back to you shortly."
        );
        setFormData({ name: "", email: "", subject: "", message: "" });

        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
          });
        } catch (_) {}
      } catch (err) {
        console.error("Supabase submission error:", err);
        setStatus("error");
        setStatusMessage(
          `Unable to deliver message: ${err.message || "Network error"}. Please email directly at ${personalInfo.email}.`
        );
      }
    } else {
      // Branch 2: Safe fallback mode when env variables are not yet configured
      setStatus("error");
      setStatusMessage(
        `Supabase live credentials are not detected in environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY). Please reach out directly via email at ${personalInfo.email} or through LinkedIn.`
      );
    }
  };

  const directMailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
    formData.subject || "Collaboration / Job Inquiry"
  )}&body=${encodeURIComponent(formData.message || "")}`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20 space-y-12">
      {/* 1. Page Header */}
      <section className="space-y-4">
        <Badge variant="outline" className="font-mono text-xs">
          Direct Inquiries &amp; Collaboration
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
          Let’s Connect
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
          I am always open to exploring frontend engineering roles, collaborative software projects, 
          and technical discussions about web architecture. Drop a note below or reach out directly.
        </p>

        {/* Availability Status */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-foreground/90 font-medium">{personalInfo.status}</span>
          <span className="text-border">•</span>
          <span className="inline-flex items-center gap-1">
            <MapPin size={12} /> {personalInfo.location}
          </span>
        </div>
      </section>

      {/* 2. Contact Grid: Channels Sidebar & Form Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-border/80 pt-10">
        {/* Left Column: Direct Communication Channels */}
        <div className="md:col-span-4 space-y-6">
          <Card className="border-border">
            <CardHeader className="space-y-3 pb-4">
              <CardTitle className="text-base font-semibold">
                Direct Channels
              </CardTitle>
              <CardDescription className="text-xs">
                Feel free to connect directly through any of these verified channels:
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-0 text-xs text-muted-foreground">
              {/* Email */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-border/60">
                <Mail className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div className="space-y-0.5 min-w-0">
                  <span className="block font-medium text-foreground text-xs">Email</span>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="block text-muted-foreground hover:text-foreground hover:underline truncate text-xs"
                    title={`Send email to ${personalInfo.email}`}
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-border/60">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="block font-medium text-foreground text-xs">Location</span>
                  <span className="text-xs">{personalInfo.location}</span>
                  <span className="block text-[11px] text-muted-foreground">AUCE (A) CSE Graduate</span>
                </div>
              </div>

              {/* Social Channels List */}
              <div className="pt-2 space-y-2 border-t border-border/60">
                <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
                  Professional Profiles:
                </span>

                <div className="flex flex-col gap-1.5">
                  <a
                    href={personalInfo.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-md hover:bg-secondary border border-border/40 text-foreground transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <LinkedinIcon size={15} />
                      <span className="text-xs font-medium">LinkedIn Profile</span>
                    </span>
                    <ArrowUpRight size={13} className="text-muted-foreground" />
                  </a>

                  <a
                    href={personalInfo.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-md hover:bg-secondary border border-border/40 text-foreground transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <GithubIcon size={15} />
                      <span className="text-xs font-medium">GitHub Repositories</span>
                    </span>
                    <ArrowUpRight size={13} className="text-muted-foreground" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Contact Message Form */}
        <div className="md:col-span-8">
          <Card className="border-border">
            <CardHeader className="space-y-1.5">
              <CardTitle className="text-xl font-bold">
                Send a Message
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Your message is stored securely in my Supabase database.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {/* Success Notification Banner */}
              {status === "success" && (
                <div
                  className="mb-6 flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-700 dark:text-emerald-300"
                  role="status"
                  aria-live="polite"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-semibold block">Message Submitted Successfully</span>
                    <span>{statusMessage}</span>
                  </div>
                </div>
              )}

              {/* Error / Fallback Notification Banner */}
              {status === "error" && (
                <div
                  className="mb-6 flex flex-col gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-xs text-destructive"
                  role="alert"
                  aria-live="assertive"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{statusMessage}</span>
                  </div>
                  <div className="pt-2 border-t border-destructive/20">
                    <Button variant="outline" size="sm" asChild className="text-xs h-7">
                      <a href={directMailtoLink}>
                        <Mail className="mr-1.5 h-3.5 w-3.5" />
                        Send Direct Email via Client
                      </a>
                    </Button>
                  </div>
                </div>
              )}

              {/* Accessible Form */}
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-medium text-foreground flex items-center justify-between"
                    >
                      <span>Your Name <span className="text-destructive">*</span></span>
                    </label>
                    <Input
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Chen"
                      disabled={status === "submitting"}
                      aria-required="true"
                      aria-invalid={Boolean(formErrors.name)}
                      aria-describedby={formErrors.name ? "name-error" : undefined}
                      className={formErrors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {formErrors.name && (
                      <span id="name-error" role="alert" className="text-[11px] text-destructive block">
                        {formErrors.name}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-medium text-foreground flex items-center justify-between"
                    >
                      <span>Email Address <span className="text-destructive">*</span></span>
                    </label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@example.com"
                      disabled={status === "submitting"}
                      aria-required="true"
                      aria-invalid={Boolean(formErrors.email)}
                      aria-describedby={formErrors.email ? "email-error" : undefined}
                      className={formErrors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {formErrors.email && (
                      <span id="email-error" role="alert" className="text-[11px] text-destructive block">
                        {formErrors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject Line */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="text-xs font-medium text-foreground flex items-center justify-between"
                  >
                    <span>Subject Line <span className="text-destructive">*</span></span>
                  </label>
                  <Input
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Frontend Role / CineBook Discussion / Collaboration"
                    disabled={status === "submitting"}
                    aria-required="true"
                    aria-invalid={Boolean(formErrors.subject)}
                    aria-describedby={formErrors.subject ? "subject-error" : undefined}
                    className={formErrors.subject ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                  {formErrors.subject && (
                    <span id="subject-error" role="alert" className="text-[11px] text-destructive block">
                      {formErrors.subject}
                    </span>
                  )}
                </div>

                {/* Message Body */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-medium text-foreground flex items-center justify-between"
                  >
                    <span>Your Message <span className="text-destructive">*</span></span>
                    <span className="text-[10px] text-muted-foreground font-mono">min 10 chars</span>
                  </label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your note, questions, or opportunity details here..."
                    disabled={status === "submitting"}
                    aria-required="true"
                    aria-invalid={Boolean(formErrors.message)}
                    aria-describedby={formErrors.message ? "message-error" : undefined}
                    className={formErrors.message ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                  {formErrors.message && (
                    <span id="message-error" role="alert" className="text-[11px] text-destructive block">
                      {formErrors.message}
                    </span>
                  )}
                </div>

                {/* Submit Action Button with Protection Against Repeated Submissions */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <Button
                    type="submit"
                    disabled={status === "submitting"}
                    className="cursor-pointer font-medium"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting Message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <span className="text-[11px] text-muted-foreground">
                    Protected by client validation &amp; Supabase RLS.
                  </span>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
