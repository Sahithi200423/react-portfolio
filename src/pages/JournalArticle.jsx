import * as React from "react";
import { useParams, Link } from "react-router-dom";
import { journalArticles } from "@/data/journalArticles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, AlertCircle, Bookmark, Share2, Check } from "lucide-react";

export default function JournalArticle() {
  const { slug } = useParams();
  const [copied, setCopied] = React.useState(false);

  // Find article by slug
  const article = journalArticles.find((a) => a.slug === slug);

  // Handle share link copy
  const handleCopyLink = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 404 fallback if article slug is not found
  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center space-y-6">
        <Badge variant="outline" className="font-mono text-xs">
          Article Not Found
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          We couldn't find that journal entry
        </h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          The article you are looking for may have been moved, renamed, or is currently undergoing draft review.
        </p>
        <Button asChild>
          <Link to="/journal">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Developer Journal
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20 space-y-12">
      {/* 1. Back Navigation & Action Bar */}
      <div className="flex items-center justify-between border-b border-border/80 pb-4">
        <Button variant="ghost" size="sm" asChild className="text-xs -ml-2 text-muted-foreground hover:text-foreground">
          <Link to="/journal">
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            Back to All Entries
          </Link>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="text-xs h-8 cursor-pointer"
          title="Copy article link"
        >
          {copied ? (
            <>
              <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
              Link Copied
            </>
          ) : (
            <>
              <Share2 className="mr-1.5 h-3.5 w-3.5" />
              Share
            </>
          )}
        </Button>
      </div>

      {/* 2. Article Header */}
      <header className="space-y-4">
        {/* Status Callout Banner: Explicitly Marked as Draft */}
        <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs text-amber-700 dark:text-amber-300">
          <AlertCircle size={14} className="shrink-0" />
          <span className="font-medium">{article.statusNotice}</span>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground">
            <Badge variant="secondary" className="font-mono text-xs uppercase">
              {article.category}
            </Badge>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar size={13} /> {article.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={13} /> {article.readingTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground leading-[1.2]">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {article.summary}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="tech">
              #{tag}
            </Badge>
          ))}
        </div>
      </header>

      {/* 3. Table of Contents (for structured reading) */}
      {article.tableOfContents && article.tableOfContents.length > 0 && (
        <Card className="border-border bg-secondary/30">
          <CardHeader className="py-4">
            <CardTitle className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Bookmark size={13} className="text-primary" />
              Table of Contents
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-1.5 text-xs sm:text-sm">
              {article.tableOfContents.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-muted-foreground hover:text-foreground hover:underline transition-colors block py-0.5"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* 4. Article Body Content */}
      <article className="space-y-10 text-foreground/90 leading-relaxed text-sm sm:text-base">
        {article.content.map((section) => (
          <section key={section.id} id={section.id} className="space-y-4 scroll-mt-24">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground border-b border-border/60 pb-2">
              {section.heading}
            </h2>
            <div className="space-y-3.5 text-foreground/85">
              {section.paragraphs.map((p, pIdx) => {
                // Check if paragraph is a SQL code query block
                if (p.startsWith("INSERT INTO")) {
                  return (
                    <div
                      key={pIdx}
                      className="overflow-x-auto rounded-lg border border-border bg-secondary/60 p-4 font-mono text-xs text-foreground my-4 leading-normal"
                    >
                      <code>{p}</code>
                    </div>
                  );
                }
                return <p key={pIdx} className="leading-relaxed">{p}</p>;
              })}
            </div>
          </section>
        ))}
      </article>

      {/* 5. Article Footer & Navigation */}
      <footer className="border-t border-border/80 pt-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-border bg-secondary/20 p-6">
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground text-sm">
              Enjoyed this case study?
            </h3>
            <p className="text-xs text-muted-foreground">
              Feel free to reach out with thoughts, questions, or software opportunities.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/projects">View Projects</Link>
            </Button>
          </div>
        </div>

        <div className="pt-2 text-center">
          <Button variant="ghost" size="sm" asChild className="text-xs text-muted-foreground hover:text-foreground">
            <Link to="/journal">
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
              Back to Developer Journal
            </Link>
          </Button>
        </div>
      </footer>
    </div>
  );
}
