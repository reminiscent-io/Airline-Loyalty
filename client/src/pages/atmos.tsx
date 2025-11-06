import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Mountain, Flower2, Trophy, Check } from "lucide-react";
import { AtmosTierCard } from "@/components/atmos/tier-card";
import { TierCarousel } from "@/components/tier-carousel";
import { AtmosCalculator } from "@/components/atmos/calculator";
import { AtmosResultsPanel } from "@/components/atmos/results-panel";
import { AtmosBenefitsTable } from "@/components/atmos/benefits-table";
import { AtmosCreditCardTable } from "@/components/atmos/credit-card-table";
import { type AtmosCalculationResults } from "@shared/atmos-schema";

export default function Atmos() {
  const [calculationResults, setCalculationResults] = useState<AtmosCalculationResults | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] bg-gradient-to-br from-[#014A6E] via-[#01628C] to-[#7B1E7A] overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <Mountain className="w-8 h-8 text-cyan-300" />
              <Flower2 className="w-8 h-8 text-pink-300" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight" data-testid="text-hero-title">
              Atmos Rewards
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto" data-testid="text-hero-subtitle">
              The combined power of Alaska and Hawaiian Airlines loyalty programs
            </p>
          </div>
        </div>
        {/* Mountain and wave graphics */}
        <div className="absolute bottom-0 left-0 w-96 h-64 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
            <polygon points="0,100 50,20 100,100" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-32 opacity-10">
          <svg viewBox="0 0 100 50" className="w-full h-full fill-white">
            <path d="M0,25 Q25,0 50,25 T100,25 L100,50 L0,50 Z" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        {/* Tier Overview Section */}
        <section className="mb-16" id="tiers">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-section-tiers">
              Elite Status Tiers
            </h2>
            <p className="text-gray-600">
              Earn elite qualifying miles and segments to unlock premium benefits
            </p>
          </div>
          <TierCarousel>
            {[
              <AtmosTierCard tier="member" key="member" />,
              <AtmosTierCard tier="mvp" key="mvp" />,
              <AtmosTierCard tier="mvp-gold" key="mvp-gold" />,
              <AtmosTierCard tier="mvp-gold-75k" key="mvp-gold-75k" />,
              <AtmosTierCard tier="mvp-gold-100k" key="mvp-gold-100k" />
            ]}
          </TierCarousel>
        </section>

        {/* Calculator Section */}
        <section className="mb-16" id="calculator">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-section-calculator">
              Atmos Calculator
            </h2>
            <p className="text-gray-600">
              Calculate your miles and track progress toward elite status
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AtmosCalculator onCalculate={setCalculationResults} />
            <AtmosResultsPanel results={calculationResults} />
          </div>
        </section>

        {/* Benefits Comparison Table */}
        <section className="mb-16" id="benefits">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-section-benefits">
              Elite Benefits Comparison
            </h2>
            <p className="text-gray-600">
              Compare benefits across all Atmos elite status tiers
            </p>
          </div>
          <AtmosBenefitsTable />
        </section>

        {/* Credit Card Comparison */}
        <section className="mb-16" id="credit-cards">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-section-credit-cards">
              Atmos Credit Cards
            </h2>
            <p className="text-gray-600">
              Choose from Alaska or Hawaiian branded cards for maximum rewards
            </p>
          </div>
          <AtmosCreditCardTable />
        </section>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p>
              This calculator provides estimates based on the merged Alaska and Hawaiian Airlines programs. 
              Actual miles and elite qualification may vary. Check with the airlines for current program rules.
            </p>
            <p className="mt-2">
              Not affiliated with Alaska Airlines or Hawaiian Airlines. Atmos is a conceptual merged program.
            </p>
            <p className="mt-4 text-xs">
              All data as of November 2025
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}