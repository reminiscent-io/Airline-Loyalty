import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mountain, Flower2, Trophy, Check, Globe, MapPin, Utensils, Home, Users, Heart } from "lucide-react";
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
              Atmos Rewards 2026
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto" data-testid="text-hero-subtitle">
              The unified Alaska + Hawaiian Airlines loyalty program launching in 2026
            </p>
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-white/80">
              <Badge className="bg-white/20 text-white border-white/30">
                <Check className="w-3 h-3 mr-1" />
                Choose Your Earning Path
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30">
                <Check className="w-3 h-3 mr-1" />
                Free Starlink Wi-Fi
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30">
                <Check className="w-3 h-3 mr-1" />
                Status Points System
              </Badge>
            </div>
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
              Earn status points to unlock premium benefits (2026 Program)
            </p>
          </div>
          <TierCarousel>
            {[
              <AtmosTierCard tier="member" key="member" />,
              <AtmosTierCard tier="silver" key="silver" />,
              <AtmosTierCard tier="gold" key="gold" />,
              <AtmosTierCard tier="platinum" key="platinum" />,
              <AtmosTierCard tier="titanium" key="titanium" />
            ]}
          </TierCarousel>
        </section>

        {/* Communities Section (New for 2026) */}
        <section className="mb-16" id="communities">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-section-communities">
              Atmos Communities
            </h2>
            <p className="text-gray-600">
              Choose interest-based communities for personalized perks (launching 2026)
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Flower2 className="w-5 h-5 text-pink-500" />
                  Huaka'i by Hawaiian
                </CardTitle>
                <CardDescription>For Hawaii residents</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">50% bonus points on neighbor island travel</p>
              </CardContent>
            </Card>
            
            <Card className="hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Mountain className="w-5 h-5 text-blue-600" />
                  Club 49
                </CardTitle>
                <CardDescription>For Alaska residents</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Special fares and exclusive benefits for Alaska locals</p>
              </CardContent>
            </Card>
            
            <Card className="hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Globe className="w-5 h-5 text-green-600" />
                  Global Locals
                </CardTitle>
                <CardDescription>For non-US members</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Enhanced international partner benefits</p>
              </CardContent>
            </Card>
            
            <Card className="hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Utensils className="w-5 h-5 text-orange-600" />
                  Culinary Journeys
                </CardTitle>
                <CardDescription>For food enthusiasts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Priority dining reservations and food tour discounts</p>
              </CardContent>
            </Card>
            
            <Card className="hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="w-5 h-5 text-purple-600" />
                  Active Escapes
                </CardTitle>
                <CardDescription>For adventure seekers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Special gear allowances and activity partner discounts</p>
              </CardContent>
            </Card>
            
            <Card className="hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-indigo-600" />
                  Families On the Go
                </CardTitle>
                <CardDescription>For traveling families</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Family boarding priority and kids fly free promotions</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="mb-16" id="calculator">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-section-calculator">
              Atmos Calculator
            </h2>
            <p className="text-gray-600">
              Calculate your points and track progress toward elite status
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
              Summit and Ascent cards earn status points • Hawaiian cards don't earn status
            </p>
          </div>
          <AtmosCreditCardTable />
        </section>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p>
              This calculator provides estimates based on the 2026 Atmos Rewards program changes. 
              Actual points and elite qualification may vary. Check with the airlines for official program rules.
            </p>
            <p className="mt-2">
              Not affiliated with Alaska Airlines or Hawaiian Airlines. This tool models the announced 2026 program changes.
            </p>
            <p className="mt-4 text-xs">
              Program details as of January 2026 • Titanium tier requires 135K points (up from 100K) • Platinum requires 80K points (up from 75K)
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}