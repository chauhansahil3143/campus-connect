import { Link } from "react-router-dom";
import { LostFoundItem } from "@/lib/types";
import { ItemCard } from "./ItemCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface RecentReportsProps {
  items: LostFoundItem[];
}

export function RecentReports({ items }: RecentReportsProps) {
  // Only show active (non-resolved) items, limit to 4
  const activeItems = items.filter((item) => !item.isResolved).slice(0, 4);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Recent Reports
            </h2>
            <p className="mt-1 text-muted-foreground">
              Latest lost and found items from the campus community
            </p>
          </div>
          <Link to="/dashboard" className="hidden sm:block">
            <Button
              variant="ghost"
              className="text-primary hover:bg-accent hover:text-accent-foreground"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Grid */}
        {activeItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {activeItems.map((item, index) => (
              <div
                key={item.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ItemCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/50 py-16">
            <p className="text-lg font-medium text-muted-foreground">
              No active reports yet
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Be the first to report a lost or found item!
            </p>
          </div>
        )}

        {/* Mobile View All */}
        <div className="mt-6 flex justify-center sm:hidden">
          <Link to="/dashboard">
            <Button className="gradient-primary text-primary-foreground shadow-button">
              View All Items
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
