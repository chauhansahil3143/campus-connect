import { Link, useLocation } from "react-router-dom";
import { Search, MapPin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Browse Items" },
    { href: "/report", label: "Report Item" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b-4 border-accent bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-accent bg-accent shadow-xs">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <span className="font-display text-2xl uppercase tracking-wide text-brutalist-animated">
              BVM Find
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                <Button
                  variant="ghost"
                  className={`text-sm font-bold uppercase tracking-wide font-body ${
                    isActive(link.href)
                      ? "bg-accent text-primary"
                      : "text-primary-foreground hover:text-accent hover:bg-transparent"
                  }`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <Link to="/report">
              <Button className="border-2 border-primary bg-accent text-primary shadow-button brutalist-hover font-body font-bold uppercase tracking-wide">
                <Search className="mr-2 h-4 w-4" />
                Report Item
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="p-2 md:hidden border-2 border-accent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-accent" />
            ) : (
              <Menu className="h-6 w-6 text-accent" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t-2 border-accent py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className={`w-full justify-start font-body font-bold uppercase tracking-wide ${
                      isActive(link.href)
                        ? "bg-accent text-primary"
                        : "text-primary-foreground hover:text-accent"
                    }`}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
              <Link to="/report" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full border-2 border-primary bg-accent text-primary shadow-button font-body font-bold uppercase">
                  <Search className="mr-2 h-4 w-4" />
                  Report Item
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}