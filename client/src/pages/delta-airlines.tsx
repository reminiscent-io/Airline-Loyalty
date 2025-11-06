import { useState } from "react";
import { DeltaCalculator } from "@/components/delta/delta-calculator";
import { DeltaResultsPanel } from "@/components/delta/delta-results-panel";
import { DeltaBenefitsTable } from "@/components/delta/delta-benefits-table";
import { DeltaCreditCardTable } from "@/components/delta/delta-credit-card-table";
import { DeltaTierCard } from "@/components/delta/delta-tier-card";
import { TierCarousel } from "@/components/tier-carousel";
import { deltaTiers, DeltaCalculationResults } from "@shared/delta-schema";
import { Plane } from "lucide-react";

export default function DeltaAirlines() {
  const [calculationResults, setCalculationResults] = useState<DeltaCalculationResults | null>(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F7F8FA" }}>
      <div className="container mx-auto px-4 py-8 pb-16">
        {/* Header */}
        <div 
          className="text-center mb-12 p-12 rounded-2xl relative overflow-hidden"
          style={{ 
            background: "linear-gradient(135deg, #C8102E 0%, #003566 100%)"
          }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)`
            }} />
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
                <Plane className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3" data-testid="text-page-title">
              Delta SkyMiles® Calculator
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Calculate your SkyMiles earnings and track your Medallion Status progress
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-white text-sm">Status based on MQDs only</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-white text-sm">5-11x earning rates</span>
              </div>
            </div>
          </div>
        </div>

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