import { Package, Search, CheckCircle } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: "destructive" | "success" | "primary";
}

function StatCard({ icon, value, label, color }: StatCardProps) {
  const colorStyles = {
    destructive: "bg-destructive/10 text-destructive",
    success: "bg-success/10 text-success",
    primary: "bg-primary/10 text-primary",
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover">
      <div
        className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${colorStyles[color]}`}
      >
        {icon}
      </div>
      <span className="text-3xl font-bold text-card-foreground">{value}</span>
      <span className="mt-1 text-sm text-muted-foreground">{label}</span>
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
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            icon={<Package className="h-6 w-6" />}
            value={activeLost}
            label="Active Lost Items"
            color="destructive"
          />
          <StatCard
            icon={<Search className="h-6 w-6" />}
            value={activeFound}
            label="Active Found Items"
            color="success"
          />
          <StatCard
            icon={<CheckCircle className="h-6 w-6" />}
            value={resolved}
            label="Resolved Items"
            color="primary"
          />
        </div>
      </div>
    </section>
  );
}
