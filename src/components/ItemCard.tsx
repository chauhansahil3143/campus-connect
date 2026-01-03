import { LostFoundItem } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Mail, Check, CheckCircle2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ItemCardProps {
  item: LostFoundItem;
  onContact?: () => void;
  onMarkResolved?: (id: string) => void;
}

export function ItemCard({ item, onContact, onMarkResolved }: ItemCardProps) {
  const handleContact = () => {
    if (onContact) {
      onContact();
    } else {
      window.location.href = `mailto:${item.contactEmail}?subject=Regarding your ${item.status} item: ${item.title}`;
    }
  };

  const handleMarkResolved = () => {
    if (onMarkResolved) {
      onMarkResolved(item.id);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover">
      {/* Claimed Badge */}
      {item.isResolved && (
        <div className="absolute right-3 top-3 z-10">
          <Badge className="bg-claimed text-claimed-foreground gap-1 px-2 py-1">
            <CheckCircle2 className="h-3 w-3" />
            Claimed
          </Badge>
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Status Badge */}
        <div className="mb-3 flex items-center gap-2">
          {item.status === "lost" ? (
            <Badge variant="destructive" className="gap-1 font-medium">
              <MapPin className="h-3 w-3" />
              Lost
            </Badge>
          ) : (
            <Badge className="gap-1 bg-success text-success-foreground font-medium">
              <Check className="h-3 w-3" />
              Found
            </Badge>
          )}
          <Badge variant="secondary" className="text-xs font-normal">
            {item.category}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-lg font-semibold text-card-foreground line-clamp-1">
          {item.title}
        </h3>

        {/* Description */}
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>

        {/* Meta Info */}
        <div className="mb-4 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="line-clamp-1">{item.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
        </div>

        {/* Action Buttons */}
        {!item.isResolved && (
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleContact}
              className="w-full gradient-primary text-primary-foreground shadow-button hover:opacity-90 transition-opacity"
            >
              <Mail className="mr-2 h-4 w-4" />
              Contact Owner
            </Button>
            
            {onMarkResolved && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full border-success/30 text-success hover:bg-success/10 hover:text-success"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Mark as Claimed
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Mark item as claimed?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will mark "{item.title}" as successfully reunited with its owner. 
                      The item will be moved to resolved items and hidden from active listings.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleMarkResolved}
                      className="gradient-primary text-primary-foreground"
                    >
                      Yes, mark as claimed
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        )}

        {item.isResolved && (
          <div className="flex items-center justify-center gap-2 rounded-lg bg-muted py-2.5 text-sm font-medium text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-claimed" />
            Successfully Reunited
          </div>
        )}
      </div>
    </div>
  );
}
