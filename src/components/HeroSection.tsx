import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary">
      {/* Brutalist geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 top-10 h-40 w-40 rotate-12 border-4 border-accent opacity-20" />
        <div className="absolute -left-10 bottom-10 h-32 w-32 -rotate-6 border-4 border-accent opacity-20" />
        <div className="absolute top-1/3 right-1/4 h-20 w-20 rotate-45 bg-accent/10" />
        <div className="absolute bottom-1/4 left-1/3 h-16 w-16 -rotate-12 bg-accent/5" />
      </div>

      <div className="container relative mx-auto px-4 py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 border-2 border-accent bg-primary px-6 py-2 shadow-sm">
            <MapPin className="h-5 w-5 text-accent" />
            <span className="text-sm font-bold uppercase tracking-widest text-accent font-body">
              BVM Engineering Campus
            </span>
          </div>

          {/* Title with animated gradient */}
          <h1 className="mb-6 font-display text-6xl font-bold uppercase tracking-tight sm:text-7xl md:text-8xl text-brutalist-animated">
            Lost something on campus?
          </h1>

          {/* Description */}
          <p className="mb-10 text-lg text-primary-foreground/80 md:text-xl font-body max-w-2xl mx-auto">
            BVM CampusFind helps college students reconnect with their lost belongings.
            Report lost items or help others find theirs — building a helpful campus community together.
          </p>

          {/* CTA Buttons - Brutalist style */}
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link to="/report?type=lost">
              <Button
                size="lg"
                className="min-w-[200px] border-2 border-primary bg-accent text-primary font-bold uppercase tracking-wide shadow-button brutalist-hover font-body"
              >
                <Search className="mr-2 h-5 w-5" />
                Report Lost Item
              </Button>
            </Link>
            <Link to="/report?type=found">
              <Button
                size="lg"
                variant="outline"
                className="min-w-[200px] border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-primary font-bold uppercase tracking-wide brutalist-hover font-body"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Report Found Item
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}