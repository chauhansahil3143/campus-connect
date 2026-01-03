import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useItems } from "@/contexts/ItemsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { categories, ItemCategory, ItemStatus } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Search, Upload, CheckCircle } from "lucide-react";

const ReportItem = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addItem } = useItems();
  const { toast } = useToast();

  const defaultType = searchParams.get("type") as ItemStatus | null;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Electronics" as ItemCategory,
    status: (defaultType || "lost") as ItemStatus,
    location: "",
    date: new Date().toISOString().split("T")[0],
    contactEmail: "",
    contactName: "",
    imageUrl: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a brief delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Default image if none provided
    const finalImageUrl =
      formData.imageUrl ||
      "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=400&h=300&fit=crop";

    addItem({
      ...formData,
      imageUrl: finalImageUrl,
      isResolved: false,
    });

    toast({
      title: "Item reported successfully!",
      description: `Your ${formData.status} item has been added to the listings.`,
    });

    setIsSubmitting(false);
    navigate("/dashboard");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container mx-auto max-w-2xl px-4">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground">Report an Item</h1>
            <p className="mt-2 text-muted-foreground">
              Fill out the form below to report a lost or found item
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-border bg-card p-6 shadow-card sm:p-8"
          >
            {/* Status Selection */}
            <div className="mb-6">
              <Label className="mb-3 block text-sm font-medium">What are you reporting?</Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, status: "lost" }))}
                  className={`flex items-center justify-center gap-2 rounded-lg border-2 p-4 transition-all ${
                    formData.status === "lost"
                      ? "border-destructive bg-destructive/10 text-destructive"
                      : "border-border text-muted-foreground hover:border-destructive/50"
                  }`}
                >
                  <Search className="h-5 w-5" />
                  <span className="font-medium">Lost Item</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, status: "found" }))}
                  className={`flex items-center justify-center gap-2 rounded-lg border-2 p-4 transition-all ${
                    formData.status === "found"
                      ? "border-success bg-success/10 text-success"
                      : "border-border text-muted-foreground hover:border-success/50"
                  }`}
                >
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">Found Item</span>
                </button>
              </div>
            </div>

            {/* Title */}
            <div className="mb-4">
              <Label htmlFor="title">Item Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Black iPhone 15 Pro"
                required
                className="mt-1.5"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the item in detail. Include any distinguishing features..."
                required
                className="mt-1.5 min-h-[100px]"
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="mb-4">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Main Library, 2nd Floor"
                required
                className="mt-1.5"
              />
            </div>

            {/* Date */}
            <div className="mb-4">
              <Label htmlFor="date">Date {formData.status === "lost" ? "Lost" : "Found"} *</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="mt-1.5"
              />
            </div>

            {/* Contact Info */}
            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="contactName">Your Name *</Label>
                <Input
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">Your Email *</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="john@university.edu"
                  required
                  className="mt-1.5"
                />
              </div>
            </div>

            {/* Image URL (Optional) */}
            <div className="mb-6">
              <Label htmlFor="imageUrl">Image URL (Optional)</Label>
              <div className="mt-1.5 flex items-center gap-2">
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1"
                />
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground">
                  <Upload className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Paste a URL to an image of the item. A default image will be used if left empty.
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full gradient-primary text-primary-foreground shadow-button hover:opacity-90 transition-opacity"
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Submit Report
                </>
              )}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReportItem;
