import * as React from "react";
import { Link } from "react-router-dom";
import { journalArticles } from "@/data/journalArticles";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Calendar, Clock, ArrowRight, Search, X, AlertCircle } from "lucide-react";

export default function Journal() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const categories = [
    { id: "All", label: "All Topics" },
    { id: "System Architecture", label: "Systems & Concurrency" },
    { id: "Portfolio Engineering", label: "Portfolio Engineering" },
    { id: "Learning Journey", label: "Learning Journey" },
  ];

  // Filter articles by category and search query
  const filteredArticles = journalArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === "" ||
      article.title.toLowerCase().includes(query) ||
      article.summary.toLowerCase().includes(query) ||
      article.tags.some((tag) => tag.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20 space-y-12">
      {/* 1. Page Header */}
      <section className="space-y-4">
        <Badge variant="outline" className="font-mono text-xs">
          Personal Notes &amp; Case Studies
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
          Developer Journal
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Honest technical reflections, architecture decisions from building real web applications like CineBook, 
          and lessons learned as an entry-level software engineer.
        </p>

        {/* Draft Notice Banner */}
        <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs text-amber-700 dark:text-amber-300">
          <AlertCircle size={14} className="shrink-0" />
          <span>
            <strong>Author Note:</strong> Initial case studies are in <em>Draft Review</em> status pending final publication sign-off.
          </span>
        </div>
      </section>

      {/* 2. Search & Category Filter Toolbar */}
      <section className="space-y-4 border-t border-border/80 pt-8">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Real-time search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search notes, tags, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-8 h-9 text-xs sm:text-sm bg-background border-border"
              aria-label="Search journal articles"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                aria-label="Clear search query"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Result Count Indicator */}
          <span className="text-xs font-mono text-muted-foreground self-center">
            Showing {filteredArticles.length} of {journalArticles.length} entries
          </span>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Journal Topic Categories">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
              className="text-xs h-8 cursor-pointer transition-colors"
              role="tab"
              aria-selected={selectedCategory === cat.id}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </section>

      {/* 3. Articles List */}
      <section className="space-y-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <Card
              key={article.slug}
              className="border-border hover:border-foreground/30 transition-all duration-200 group"
            >
              <CardHeader className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
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

                  {/* Status Indicator */}
                  <Badge variant="outline" className="border-amber-500/40 text-amber-600 dark:text-amber-400 font-mono text-[11px]">
                    ● {article.status}
                  </Badge>
                </div>

                <CardTitle className="text-xl sm:text-2xl font-bold leading-snug">
                  <Link
                    to={`/journal/${article.slug}`}
                    className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    {article.title}
                  </Link>
                </CardTitle>

                <CardDescription className="text-sm leading-relaxed text-foreground/80">
                  {article.summary}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/60">
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="tech">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <Button variant="ghost" size="sm" asChild className="text-xs group-hover:translate-x-0.5 transition-transform">
                    <Link to={`/journal/${article.slug}`}>
                      Read Case Study <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          /* Empty State */
          <div className="rounded-xl border border-dashed border-border p-12 text-center space-y-4 bg-secondary/20">
            <BookOpen className="mx-auto h-8 w-8 text-muted-foreground/60" />
            <div className="space-y-1">
              <h3 className="font-semibold text-foreground text-base">
                No entries found
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
                No articles matched your query "{searchQuery}". Try searching for another topic or clear the filter.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-xs cursor-pointer"
            >
              Reset Search &amp; Filters
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
