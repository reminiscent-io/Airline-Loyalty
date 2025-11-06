import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Globe, Plane, Trophy, Check } from "lucide-react";
import { UnitedTierCard } from "@/components/united/tier-card";
import { TierCarousel } from "@/components/tier-carousel";
import { UnitedCalculator } from "@/components/united/calculator";
import { UnitedResultsPanel } from "@/components/united/results-panel";
import { UnitedBenefitsTable } from "@/components/united/benefits-table";
import { UnitedCreditCardTable } from "@/components/united/credit-card-table";
import { type UnitedCalculationResults } from "@shared/united-schema";

export default function UnitedAirlines() {
  const [calculationResults, setCalculationResults] = useState<UnitedCalculationResults | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] bg-gradient-to-br from-[#002244] to-[#001833] overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <Globe className="w-8 h-8 text-[#0074C8]" />
              <Plane className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight" data-testid="text-hero-title">
              United MileagePlus
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto" data-testid="text-hero-subtitle">
              Calculate your miles, track your Premier status with PQP and PQF, and maximize your rewards
            </p>
          </div>
        </div>
        {/* Globe graphic */}
        <div className="absolute bottom-0 left-0 w-64 h-64 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-[#0074C8]">
            <circle cx="50" cy="50" r="40" />
            <ellipse cx="50" cy="50" rx="40" ry="15" />
            <ellipse cx="50" cy="50" rx="15" ry="40" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        {/* Tier Overview Section */}
        <section className="mb-16" id="tiers">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-section-tiers">
              Premier Status Tiers
            </h2>
            <p className="text-gray-600">
              Earn PQP and PQF to unlock Premier benefits and enjoy a better travel experience
            </p>
          </div>
          <TierCarousel>
            {[
              <UnitedTierCard tier="member" key="member" />,
              <UnitedTierCard tier="silver" key="silver" />,
              <UnitedTierCard tier="gold" key="gold" />,
              <UnitedTierCard tier="platinum" key="platinum" />,
              <UnitedTierCard tier="1k" key="1k" />,
              <UnitedTierCard tier="global-services" key="global-services" />
            ]}
          </TierCarousel>
        </section>

        {/* Calculator Section */}
        <section className="mb-16" id="calculator">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-section-calculator">
              MileagePlus Calculator
            </h2>
            <p className="text-gray-600">
              Calculate your miles, PQP, and PQF based on your flying and spending activity
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <UnitedCalculator onCalculate={setCalculationResults} />
            <UnitedResultsPanel results={calculationResults} />
          </div>
        </section>

        {/* Benefits Comparison Table */}
        <section className="mb-16" id="benefits">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-section-benefits">
              Premier Benefits
            </h2>
            <p className="text-gray-600">
              Compare benefits across all MileagePlus Premier status tiers
            </p>
          </div>
          <UnitedBenefitsTable />
        </section>

        {/* Credit Card Comparison */}
        <section className="mb-16" id="credit-cards">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-section-credit-cards">
              United Credit Cards
            </h2>
            <p className="text-gray-600">
              Earn PQP from card spending and accelerate your status qualification
            </p>
          </div>
          <UnitedCreditCardTable />
        </section>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p>
              This calculator provides estimates based on publicly available information. 
              Actual miles and status qualification may vary. Always check with United Airlines for the most current program rules.
            </p>
            <p className="mt-2">
              Not affiliated with United Airlines. MileagePlus® is a registered trademark of United Airlines, Inc.
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