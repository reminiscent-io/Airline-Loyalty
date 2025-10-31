import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Heart, Plane, Trophy, Check } from "lucide-react";
import { TierCard } from "@/components/tier-card";
import { Calculator } from "@/components/calculator";
import { ResultsPanel } from "@/components/results-panel";
import { CompanionPassTracker } from "@/components/companion-pass-tracker";
import { BenefitsTable } from "@/components/benefits-table";
import { TIER_CONFIGS, type TierStatus, type CalculationResults } from "@shared/schema";

export default function Home() {
  const [calculationResults, setCalculationResults] = useState<CalculationResults | null>(null);

  return (
    <div className="min-h-screen bg-southwest-lightgray">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] bg-gradient-to-br from-southwest-blue to-[#4a6bc9] overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-southwest-red fill-southwest-red" />
              <Plane className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight" data-testid="text-hero-title">
              Southwest Rapid Rewards Calculator
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto" data-testid="text-hero-subtitle">
              Calculate your points, track your tier progress, and discover how close you are to earning a Companion Pass
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        {/* Tier Overview Section */}
        <section className="mb-16" id="tiers">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-southwest-navy mb-3 flex items-center justify-center gap-2" data-testid="text-tier-section-title">
              <Trophy className="w-8 h-8 text-southwest-gold" />
              Membership Tiers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compare benefits and see what you can earn with each tier level
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TierCard tier="member" />
            <TierCard tier="a-list" highlighted />
            <TierCard tier="a-list-preferred" />
          </div>
        </section>

        {/* Calculator Section */}
        <section className="mb-16" id="calculator">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-southwest-navy mb-3" data-testid="text-calculator-section-title">
              Calculate Your Rewards
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enter your flight spending and activity to see your points and tier progress
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Calculator onCalculate={setCalculationResults} />
            <ResultsPanel results={calculationResults} />
          </div>
        </section>

        {/* Companion Pass Section */}
        <section className="mb-16" id="companion-pass">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-southwest-navy mb-3 flex items-center justify-center gap-2" data-testid="text-companion-section-title">
              <Heart className="w-8 h-8 text-southwest-red fill-southwest-red" />
              Companion Pass Progress
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Earn 135,000 qualifying points in a calendar year to bring a companion on every flight for free
            </p>
          </div>

          <CompanionPassTracker results={calculationResults} />
        </section>

        {/* Benefits Comparison Table */}
        <section className="mb-16" id="benefits">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-southwest-navy mb-3" data-testid="text-benefits-section-title">
              Benefits Comparison
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See all the perks and benefits available at each tier level
            </p>
          </div>

          <BenefitsTable />
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-southwest-red fill-southwest-red" />
            <p className="text-sm text-muted-foreground">
              Unofficial calculator for Southwest Airlines Rapid Rewards program
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            This tool is not affiliated with Southwest Airlines. Points and benefits are subject to change.
          </p>
        </footer>
      </div>
    </div>
  );
}
