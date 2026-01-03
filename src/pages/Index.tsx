import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { RecentReports } from "@/components/RecentReports";
import { Footer } from "@/components/Footer";
import { useItems } from "@/contexts/ItemsContext";

const Index = () => {
  const { items, getStats } = useItems();
  const stats = getStats();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsSection
          activeLost={stats.activeLost}
          activeFound={stats.activeFound}
          resolved={stats.resolved}
        />
        <RecentReports items={items} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
