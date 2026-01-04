import { Package, Search, CheckCircle } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: "destructive" | "success" | "primary";
}

function StatCard({ icon, value, label, color }: StatCardProps) {
  const colorStyles = {
    destructive: "border-destructive bg-destructive/5 text-destructive",
    success: "border-success bg-success/5 text-success",
    primary: "border-accent bg-accent/5 text-accent",
  };

  return (
    <div className="flex flex-col items-center justify-center border-4 border-border bg-card p-8 shadow-card transition-all duration-150 hover:shadow-card-hover hover:-translate-x-1 hover:-translate-y-1">
      <div
        className={`mb-4 flex h-14 w-14 items-center justify-center border-2 ${colorStyles[color]}`}
      >
        {icon}
      </div>
      <span className="font-display text-5xl text-card-foreground">{value}</span>
      <span className="mt-2 text-sm font-bold uppercase tracking-widest text-muted-foreground font-body">{label}</span>
    </div>
  );
}

interface StatsSectionProps {
  activeLost: number;
  activeFound: number;
  resolved: number;
}

export function StatsSection({ activeLost, activeFound, resolved }: StatsSectionProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-4xl uppercase text-center text-foreground mb-10">
          Campus <span className="text-brutalist-animated">Statistics</span>
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <StatCard
            icon={<Package className="h-7 w-7" />}
            value={activeLost}
            label="Active Lost"
            color="destructive"
          />
          <StatCard
            icon={<Search className="h-7 w-7" />}
            value={activeFound}
            label="Active Found"
            color="success"
          />
          <StatCard
            icon={<CheckCircle className="h-7 w-7" />}
            value={resolved}
            label="Resolved"
            color="primary"
          />
        </div>
      </div>
    </section>
  );
}