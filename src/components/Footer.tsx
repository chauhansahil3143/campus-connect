import { MapPin, Instagram, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const socialLinks = [
    { icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com/bvmcampusfind", label: "Instagram" },
    { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com/bvmcampusfind", label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/company/bvmcampusfind", label: "LinkedIn" },
    { icon: <Mail className="h-5 w-5" />, href: "mailto:campusfind@bvm.edu.in", label: "Email" },
  ];

  return (
    <footer className="border-t-4 border-accent bg-primary py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-accent bg-accent shadow-xs">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <span className="font-display text-2xl uppercase tracking-wide text-brutalist-animated">
              BVM Find
            </span>
          </Link>

          {/* Tagline */}
          <p className="text-sm text-primary-foreground/80 font-body text-center max-w-md">
            Helping the BVM Engineering community reunite with their lost belongings.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center border-2 border-accent text-accent hover:bg-accent hover:text-primary transition-colors duration-150"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full max-w-xs h-0.5 bg-accent/30" />

          {/* Copyright */}
          <p className="text-xs text-primary-foreground/60 font-body font-medium uppercase tracking-wide text-center">
            © {new Date().getFullYear()} BVM CampusFind. Birla Vishvakarma Mahavidyalaya.
          </p>
        </div>
      </div>
    </footer>
  );
}