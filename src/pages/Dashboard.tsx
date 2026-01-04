import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ItemCard } from "@/components/ItemCard";
import { useItems } from "@/contexts/ItemsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, ItemCategory, ItemStatus } from "@/lib/types";
import { Search, Filter, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { items, markAsResolved } = useItems();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<ItemStatus | "all" | "resolved">("all");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Special handling for "resolved" status filter
      if (selectedStatus === "resolved") {
        if (!item.isResolved) return false;
      } else {
        // For other statuses, hide resolved items
        if (item.isResolved) return false;
        
        // Filter by status (lost/found)
        if (selectedStatus !== "all" && item.status !== selectedStatus) {
          return false;
        }
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !item.title.toLowerCase().includes(query) &&
          !item.description.toLowerCase().includes(query) &&
          !item.location.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      // Filter by category
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [items, searchQuery, selectedCategory, selectedStatus]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedStatus("all");
  };

  const hasActiveFilters =
    searchQuery || selectedCategory !== "all" || selectedStatus !== "all";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Browse <span className="text-gold-gradient">Items</span>
            </h1>
            <p className="mt-1 text-muted-foreground font-body">
              Search and filter lost and found items from the campus community
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search items by title, description, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 font-body"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as ItemCategory | "all")}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground font-body focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                {/* Status Filter */}
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as ItemStatus | "all" | "resolved")}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground font-body focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All Status</option>
                  <option value="lost">Lost</option>
                  <option value="found">Found</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="mt-4 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground hover:text-foreground font-body"
                >
                  <X className="mr-1 h-4 w-4" />
                  Clear filters
                </Button>
              </div>
            )}
          </div>

          {/* Results Count */}
          <p className="mb-4 text-sm text-muted-foreground font-body">
            Showing {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""}
          </p>

          {/* Items Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ItemCard 
                    item={item} 
                    onMarkResolved={(id) => {
                      markAsResolved(id);
                      toast({
                        title: "Item marked as claimed!",
                        description: "The item has been moved to resolved items.",
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/50 py-16">
              <Search className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <p className="text-lg font-medium text-muted-foreground">No items found</p>
              <p className="mt-1 text-sm text-muted-foreground font-body">
                Try adjusting your search or filters
              </p>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  className="mt-4 font-body"
                  onClick={clearFilters}
                >
                  Clear all filters
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
