import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">For Campus Community</span>
          </div>

          {/* Title */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Lost something on{" "}
            <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
              campus?
            </span>
          </h1>

          {/* Description */}
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            CampusFind helps college students reconnect with their lost belongings.
            Report lost items or help others find theirs — building a helpful campus community together.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/report?type=lost">
              <Button
                size="lg"
                className="gradient-primary min-w-[180px] text-primary-foreground shadow-button hover:opacity-90 transition-opacity"
              >
                <Search className="mr-2 h-5 w-5" />
                Report Lost Item
              </Button>
            </Link>
            <Link to="/report?type=found">
              <Button
                size="lg"
                variant="outline"
                className="min-w-[180px] border-primary/30 text-primary hover:bg-accent hover:text-accent-foreground"
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
