import { useState, useEffect, useCallback, useRef } from "react";
import { Calculator, DollarSign, Plane } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrencyInput } from "@/components/ui/currency-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AirlineSettingsSelector } from "@/components/compare/airline-card-selector";
import { ComparisonChart } from "@/components/compare/comparison-chart";
import { ComparisonTable } from "@/components/compare/comparison-table";
import { buildPayloads, normalizeResult } from "@/components/compare/build-payloads";
import { AIRLINES, DEFAULT_AIRLINE_SETTINGS, type AirlineKey, type AirlineSettings, type AirlineComparisonResult } from "@/components/compare/types";
import { apiRequest } from "@/lib/queryClient";
import { CREDIT_CARDS } from "@shared/schema";
import { AMERICAN_CREDIT_CARDS } from "@shared/american-schema";
import { UNITED_CREDIT_CARDS } from "@shared/united-schema";
import { deltaCreditCards } from "@shared/delta-schema";
import { JETBLUE_CREDIT_CARDS } from "@shared/jetblue-schema";
import { ATMOS_CREDIT_CARDS } from "@shared/atmos-schema";

function getCardInfo(airline: AirlineKey, cardKey: string): { name: string; annualFee: number } {
  switch (airline) {
    case "southwest": {
      const card = CREDIT_CARDS[cardKey as keyof typeof CREDIT_CARDS];
      return card ? { name: card.name, annualFee: card.annualFee } : { name: "No Card", annualFee: 0 };
    }
    case "american": {
      const card = AMERICAN_CREDIT_CARDS[cardKey as keyof typeof AMERICAN_CREDIT_CARDS];
      return card ? { name: card.name, annualFee: card.annualFee } : { name: "No Card", annualFee: 0 };
    }
    case "united": {
      const card = UNITED_CREDIT_CARDS[cardKey as keyof typeof UNITED_CREDIT_CARDS];
      return card ? { name: card.name, annualFee: card.annualFee } : { name: "No Card", annualFee: 0 };
    }
    case "delta": {
      if (cardKey === "none") return { name: "No Card", annualFee: 0 };
      const idx = (["gold", "platinum", "reserve"] as const).indexOf(cardKey as "gold" | "platinum" | "reserve");
      const card = idx >= 0 ? deltaCreditCards[idx] : null;
      return card ? { name: card.name, annualFee: card.annualFee } : { name: "No Card", annualFee: 0 };
    }
    case "jetblue": {
      const card = JETBLUE_CREDIT_CARDS[cardKey as keyof typeof JETBLUE_CREDIT_CARDS];
      return card ? { name: card.name, annualFee: card.annualFee } : { name: "No Card", annualFee: 0 };
    }
    case "atmos": {
      const card = ATMOS_CREDIT_CARDS[cardKey as keyof typeof ATMOS_CREDIT_CARDS];
      return card ? { name: card.name, annualFee: card.annualFee } : { name: "No Card", annualFee: 0 };
    }
  }
}

export default function Compare() {
  const [flightSpending, setFlightSpending] = useState("");
  const [cardSpending, setCardSpending] = useState("");
  const [includeSignUpBonus, setIncludeSignUpBonus] = useState(false);
  const [airlineSettings, setAirlineSettings] = useState<Record<AirlineKey, AirlineSettings>>(
    () => structuredClone(DEFAULT_AIRLINE_SETTINGS)
  );
  const [results, setResults] = useState<AirlineComparisonResult[]>([]);
  const [loading, setLoading] = useState(false);
  const generationRef = useRef(0);

  const handleSettingChange = useCallback(
    (airline: AirlineKey, field: keyof AirlineSettings, value: string) => {
      setAirlineSettings((prev) => ({
        ...prev,
        [airline]: { ...prev[airline], [field]: value },
      }));
    },
    []
  );

  const runComparison = useCallback(async () => {
    const flight = parseFloat(flightSpending) || 0;
    const card = parseFloat(cardSpending) || 0;

    if (flight === 0 && card === 0) {
      setResults([]);
      return;
    }

    const generation = ++generationRef.current;
    setLoading(true);

    const payloads = buildPayloads({
      flightSpending: flight,
      cardSpending: card,
      includeSignUpBonus,
      airlineSettings,
    });

    const settled = await Promise.allSettled(
      AIRLINES.map(async (airline) => {
        const payload = payloads[airline.key];
        const res = await apiRequest("POST", payload.endpoint, payload.body);
        const data = await res.json();
        const normalized = normalizeResult(airline.key, data);
        const cardInfo = getCardInfo(airline.key, airlineSettings[airline.key].creditCard);

        return {
          airlineKey: airline.key,
          airlineName: airline.name,
          returnOnSpend: normalized.returnOnSpend,
          redemptionValue: normalized.redemptionValue,
          totalCost: normalized.totalCost,
          creditCardName: cardInfo.name,
          annualFee: cardInfo.annualFee,
        } satisfies AirlineComparisonResult;
      })
    );

    // Discard stale results
    if (generation !== generationRef.current) return;

    const successful = settled
      .filter((r): r is PromiseFulfilledResult<AirlineComparisonResult> => r.status === "fulfilled")
      .map((r) => r.value);

    setResults(successful);
    setLoading(false);
  }, [flightSpending, cardSpending, includeSignUpBonus, airlineSettings]);

  // Debounced auto-calculate
  useEffect(() => {
    const timer = setTimeout(runComparison, 400);
    return () => clearTimeout(timer);
  }, [runComparison]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/70 py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Airline Rewards Comparison
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Compare return on spend across all six airlines based on your spending profile
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 space-y-8">
        {/* Shared Inputs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Your Spending Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="flight-spend" className="flex items-center gap-1.5">
                  <Plane className="w-4 h-4" />
                  Annual Flight Spend
                </Label>
                <CurrencyInput
                  id="flight-spend"
                  placeholder="$5,000"
                  value={flightSpending}
                  onChange={setFlightSpending}
                />
                <p className="text-xs text-muted-foreground">Total annual spending on airline flights</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-spend" className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" />
                  Annual Card Spend (Non-Flight)
                </Label>
                <CurrencyInput
                  id="card-spend"
                  placeholder="$10,000"
                  value={cardSpending}
                  onChange={setCardSpending}
                />
                <p className="text-xs text-muted-foreground">Annual non-flight spending on the credit card</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Checkbox
                id="signup-bonus"
                checked={includeSignUpBonus}
                onCheckedChange={(checked) => setIncludeSignUpBonus(checked === true)}
              />
              <Label htmlFor="signup-bonus" className="text-sm cursor-pointer">
                Include sign-up bonuses (first-year only)
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Per-Airline Settings */}
        <AirlineSettingsSelector airlineSettings={airlineSettings} onChange={handleSettingChange} />

        {/* Results */}
        <div className="space-y-8">
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center rounded-lg">
                <div className="text-sm text-muted-foreground animate-pulse">Calculating...</div>
              </div>
            )}
            <ComparisonChart results={results} />
          </div>
          <ComparisonTable results={results} />
        </div>
      </div>
    </div>
  );
}
