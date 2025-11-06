import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Cloud, Plane, Star, Check } from "lucide-react";
import { JetBlueTierCard } from "@/components/jetblue/tier-card";
import { TierCarousel } from "@/components/tier-carousel";
import { JetBlueCalculator } from "@/components/jetblue/calculator";
import { JetBlueResultsPanel } from "@/components/jetblue/results-panel";
import { JetBlueBenefitsTable } from "@/components/jetblue/benefits-table";
import { JetBlueCreditCardTable } from "@/components/jetblue/credit-card-table";
import { type JetBlueCalculationResults } from "@shared/jetblue-schema";

export default function JetBlue() {
  const [calculationResults, setCalculationResults] = useState<JetBlueCalculationResults | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] bg-gradient-to-br from-[#002244] via-[#00497F] to-[#0099CC] overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <Cloud className="w-8 h-8 text-white" />
              <Plane className="w-8 h-8 text-[#FFA500]" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight" data-testid="text-hero-title">
              JetBlue TrueBlue
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto" data-testid="text-hero-subtitle">
              Calculate your TrueBlue points, track your Mosaic status with tiles, and maximize your rewards
            </p>
          </div>
        </div>
        {/* Cloud graphics */}
        <div className="absolute bottom-0 left-0 w-96 h-32 opacity-10">
          <svg viewBox="0 0 100 50" className="w-full h-full fill-white">
            <ellipse cx="30" cy="30" rx="25" ry="15" />
            <ellipse cx="50" cy="35" rx="20" ry="12" />
            <ellipse cx="70" cy="30" rx="25" ry="15" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        {/* Tier Overview Section */}
        <section className="mb-16" id="tiers">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-section-tiers">
              Mosaic Status Tiers
            </h2>
            <p className="text-gray-600">
              Earn tiles and segments to unlock Mosaic benefits
            </p>
          </div>
          <TierCarousel>
            {[
              <JetBlueTierCard tier="basic" key="basic" />,
              <JetBlueTierCard tier="trueblue" key="trueblue" />,
              <JetBlueTierCard tier="mosaic" highlighted key="mosaic" />,
              <JetBlueTierCard tier="mosaic-plus" key="mosaic-plus" />,
              <JetBlueTierCard tier="mosaic-elite" key="mosaic-elite" />
            ]}
          </TierCarousel>
        </section>

        {/* Calculator Section */}
        <section className="mb-16" id="calculator">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-section-calculator">
              TrueBlue Calculator
            </h2>
            <p className="text-gray-600">
              Calculate your TrueBlue points and track Mosaic qualification
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <JetBlueCalculator onCalculate={setCalculationResults} />
            <JetBlueResultsPanel results={calculationResults} />
          </div>
        </section>

        {/* Benefits Comparison Table */}
        <section className="mb-16" id="benefits">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-section-benefits">
              Mosaic Benefits
            </h2>
            <p className="text-gray-600">
              Compare benefits across all Mosaic status tiers
            </p>
          </div>
          <JetBlueBenefitsTable />
        </section>

        {/* Credit Card Comparison */}
        <section className="mb-16" id="credit-cards">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-section-credit-cards">
              JetBlue Credit Cards
            </h2>
            <p className="text-gray-600">
              Earn bonus points and accelerate your Mosaic qualification with JetBlue cards
            </p>
          </div>
          <JetBlueCreditCardTable />
        </section>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p>
              This calculator provides estimates based on publicly available information. 
              Actual points and Mosaic qualification may vary. Always check with JetBlue for the most current program rules.
            </p>
            <p className="mt-2">
              Not affiliated with JetBlue Airways. TrueBlue® is a registered trademark of JetBlue Airways Corporation.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}