import { useState } from "react";
import { DeltaCalculator } from "@/components/delta/calculator";
import { DeltaResultsPanel } from "@/components/delta/delta-results-panel";
import { DeltaBenefitsTable } from "@/components/delta/delta-benefits-table";
import { DeltaCreditCardTable } from "@/components/delta/delta-credit-card-table";
import { DeltaTierCard } from "@/components/delta/delta-tier-card";
import { TierCarousel } from "@/components/tier-carousel";
import { deltaTiers, DeltaCalculationResults } from "@shared/delta-schema";
import { Plane, Shield } from "lucide-react";

export default function DeltaAirlines() {
  const [calculationResults, setCalculationResults] = useState<DeltaCalculationResults | null>(null);

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] bg-gradient-to-br from-[#C8102E] to-[#002D62] overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <Shield className="w-8 h-8 text-white" />
              <Plane className="w-8 h-8 text-[#C8102E]" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight" data-testid="text-hero-title">
              Delta SkyMiles
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto" data-testid="text-hero-subtitle">
              Calculate your SkyMiles earnings, track your Medallion Status progress with MQDs only
            </p>
          </div>
        </div>
        {/* Delta triangle graphic */}
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
            <polygon points="50,10 90,90 10,90" />
          </svg>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">

        {/* Tier Cards */}
        <section className="mb-16" id="tiers">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-section-tiers">
              Medallion Status Tiers
            </h2>
            <p className="text-gray-600">
              Earn elite status entirely through MQDs - no mile or segment requirements
            </p>
          </div>

          <TierCarousel>
            {deltaTiers.map((tier) => (
              <DeltaTierCard key={tier.name} tier={tier} />
            ))}
          </TierCarousel>
        </section>

        {/* Calculator Section */}
        <section className="mb-16" id="calculator">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-section-calculator">
              Calculate Your Earnings
            </h2>
            <p className="text-gray-600">
              See how your spending translates to SkyMiles and Medallion status
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DeltaCalculator onCalculate={setCalculationResults} />
            <DeltaResultsPanel results={calculationResults} />
          </div>
        </section>

        {/* Benefits Comparison Table */}
        <section className="mb-16" id="benefits">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-section-benefits">
              Medallion Benefits
            </h2>
            <p className="text-gray-600">
              Compare benefits across all Medallion status tiers
            </p>
          </div>
          <DeltaBenefitsTable />
        </section>

        {/* Credit Card Comparison */}
        <section className="mb-16" id="credit-cards">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-section-credit-cards">
              Delta Credit Cards
            </h2>
            <p className="text-gray-600">
              Accelerate your status earning with Delta SkyMiles American Express cards
            </p>
          </div>
          <DeltaCreditCardTable />
        </section>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p>
              This calculator provides estimates based on publicly available information. 
              Actual miles and status qualification may vary. Always check with Delta for the most current program rules.
            </p>
            <p className="mt-2">
              Not affiliated with Delta Air Lines. SkyMiles® is a registered trademark of Delta Air Lines, Inc.
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