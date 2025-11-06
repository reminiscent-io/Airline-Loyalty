import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Award, Plane, Trophy, Check } from "lucide-react";
import { AmericanTierCard } from "@/components/american/tier-card";
import { TierCarousel } from "@/components/tier-carousel";
import { AmericanCalculator } from "@/components/american/calculator";
import { AmericanResultsPanel } from "@/components/american/results-panel";
import { AmericanBenefitsTable } from "@/components/american/benefits-table";
import { AmericanCreditCardTable } from "@/components/american/credit-card-table";
import { type AmericanCalculationResults } from "@shared/american-schema";

export default function AmericanAirlines() {
  const [calculationResults, setCalculationResults] = useState<AmericanCalculationResults | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] bg-gradient-to-br from-[#0078D2] to-[#00325b] overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <Plane className="w-8 h-8 text-white" />
              <div className="text-4xl font-bold text-white">AA</div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight" data-testid="text-hero-title">
              American AAdvantage
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto" data-testid="text-hero-subtitle">
              Calculate your miles, track your Loyalty Points for status, and maximize your rewards with American Airlines
            </p>
          </div>
        </div>
        {/* Decorative tail graphic */}
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
            <path d="M 10 50 Q 30 30, 50 50 T 90 50 L 90 100 L 10 100 Z"/>
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
              Earn Loyalty Points to unlock elite benefits and enjoy a better travel experience
            </p>
          </div>
          <TierCarousel>
            {[
              <AmericanTierCard tier="member" key="member" />,
              <AmericanTierCard tier="gold" highlighted key="gold" />,
              <AmericanTierCard tier="platinum" key="platinum" />,
              <AmericanTierCard tier="platinum-pro" key="platinum-pro" />,
              <AmericanTierCard tier="executive-platinum" key="executive-platinum" />,
              <AmericanTierCard tier="conciergekey" key="conciergekey" />
            ]}
          </TierCarousel>
        </section>

        {/* Calculator Section */}
        <section className="mb-16" id="calculator">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-section-calculator">
              AAdvantage Calculator
            </h2>
            <p className="text-gray-600">
              Calculate your miles and Loyalty Points based on your flying and spending activity
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AmericanCalculator onCalculate={setCalculationResults} />
            <AmericanResultsPanel results={calculationResults} />
          </div>
        </section>

        {/* Benefits Comparison Table */}
        <section className="mb-16" id="benefits">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-section-benefits">
              Elite Status Benefits
            </h2>
            <p className="text-gray-600">
              Compare benefits across all AAdvantage elite status tiers
            </p>
          </div>
          <AmericanBenefitsTable />
        </section>

        {/* Credit Card Comparison */}
        <section className="mb-16" id="credit-cards">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-section-credit-cards">
              AAdvantage Credit Cards
            </h2>
            <p className="text-gray-600">
              Accelerate your earning with co-branded credit cards
            </p>
          </div>
          <AmericanCreditCardTable />
        </section>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p>
              This calculator provides estimates based on publicly available information. 
              Actual miles and status qualification may vary. Always check with American Airlines for the most current program rules.
            </p>
            <p className="mt-2">
              Not affiliated with American Airlines. AAdvantage® is a registered trademark of American Airlines, Inc.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}