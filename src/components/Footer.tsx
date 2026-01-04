import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t-4 border-accent bg-primary py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center border-2 border-accent bg-accent shadow-xs">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <span className="font-display text-xl uppercase tracking-wide">
              <span className="text-primary-foreground">BVM</span>
              <span className="text-accent">Find</span>
            </span>
          </Link>

          {/* Copyright */}
          <p className="text-sm text-primary-foreground/70 font-body font-medium uppercase tracking-wide">
            © {new Date().getFullYear()} BVM CampusFind. Birla Vishvakarma Mahavidyalaya.
          </p>
        </div>
      </div>
    </footer>
  );
}