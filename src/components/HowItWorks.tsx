import { FileText, Search, MessageSquare, CheckCircle } from "lucide-react";

interface StepProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Step({ number, icon, title, description }: StepProps) {
  return (
    <div className="relative flex flex-col items-center text-center">
      {/* Step number badge */}
      <div className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center border-2 border-accent bg-primary font-display text-lg text-accent">
        {number}
      </div>
      
      {/* Icon container */}
      <div className="mb-4 flex h-16 w-16 items-center justify-center border-4 border-border bg-card shadow-card">
        <div className="text-accent">{icon}</div>
      </div>
      
      {/* Title */}
      <h3 className="mb-2 font-display text-2xl uppercase tracking-wide text-card-foreground">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-sm text-muted-foreground font-body leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export function HowItWorks() {
  const steps = [
    {
      icon: <FileText className="h-7 w-7" />,
      title: "Report Item",
      description: "Fill out a simple form with details about your lost or found item including location and description.",
    },
    {
      icon: <Search className="h-7 w-7" />,
      title: "Browse Listings",
      description: "Search through active listings to find matches. Filter by category, date, or location.",
    },
    {
      icon: <MessageSquare className="h-7 w-7" />,
      title: "Connect",
      description: "Use the provided contact information to reach out and verify ownership of the item.",
    },
    {
      icon: <CheckCircle className="h-7 w-7" />,
      title: "Reunite",
      description: "Meet up safely on campus to return the item and mark the case as resolved.",
    },
  ];

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-4xl uppercase text-center mb-4 text-brutalist-animated">
          How It Works
        </h2>
        <p className="text-center text-muted-foreground font-body mb-12 max-w-2xl mx-auto">
          Our simple 4-step process helps you reconnect with your lost belongings quickly and efficiently.
        </p>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Step
              key={index}
              number={index + 1}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
