import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ItemCard } from "@/components/ItemCard";
import { useItems } from "@/contexts/ItemsContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { categories, ItemCategory, ItemStatus } from "@/lib/types";
import { Search, Filter, X } from "lucide-react";

const Dashboard = () => {
  const { items } = useItems();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<ItemStatus | "all">("all");
  const [showResolved, setShowResolved] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Filter by resolved status
      if (!showResolved && item.isResolved) return false;

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

      // Filter by status
      if (selectedStatus !== "all" && item.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [items, searchQuery, selectedCategory, selectedStatus, showResolved]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedStatus("all");
    setShowResolved(false);
  };

  const hasActiveFilters =
    searchQuery || selectedCategory !== "all" || selectedStatus !== "all" || showResolved;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Browse Items</h1>
            <p className="mt-1 text-muted-foreground">
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
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as ItemCategory | "all")}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
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
                  onChange={(e) => setSelectedStatus(e.target.value as ItemStatus | "all")}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All Status</option>
                  <option value="lost">Lost</option>
                  <option value="found">Found</option>
                </select>
              </div>
            </div>

            {/* Show Resolved Checkbox */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="showResolved"
                  checked={showResolved}
                  onCheckedChange={(checked) => setShowResolved(checked as boolean)}
                />
                <label
                  htmlFor="showResolved"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Show resolved items
                </label>
              </div>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="mr-1 h-4 w-4" />
                  Clear filters
                </Button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <p className="mb-4 text-sm text-muted-foreground">
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
                  <ItemCard item={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/50 py-16">
              <Search className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <p className="text-lg font-medium text-muted-foreground">No items found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search or filters
              </p>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  className="mt-4"
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
