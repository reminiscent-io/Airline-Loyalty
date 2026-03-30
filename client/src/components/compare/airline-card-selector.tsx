import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings2 } from "lucide-react";
import { CREDIT_CARDS } from "@shared/schema";
import { AMERICAN_CREDIT_CARDS } from "@shared/american-schema";
import { UNITED_CREDIT_CARDS } from "@shared/united-schema";
import { deltaCreditCards } from "@shared/delta-schema";
import { JETBLUE_CREDIT_CARDS } from "@shared/jetblue-schema";
import { ATMOS_CREDIT_CARDS } from "@shared/atmos-schema";
import type { AirlineKey, AirlineSettings } from "./types";

interface DropdownOption {
  value: string;
  label: string;
}

// --- Credit Card options ---

function getCardOptions(airline: AirlineKey): DropdownOption[] {
  switch (airline) {
    case "southwest":
      return Object.entries(CREDIT_CARDS).map(([key, c]) => ({
        value: key,
        label: c.annualFee > 0 ? `${c.name} ($${c.annualFee}/yr)` : c.name,
      }));
    case "american":
      return Object.entries(AMERICAN_CREDIT_CARDS).map(([key, c]) => ({
        value: key,
        label: c.annualFee > 0 ? `${c.name} ($${c.annualFee}/yr)` : c.name,
      }));
    case "united":
      return Object.entries(UNITED_CREDIT_CARDS).map(([key, c]) => ({
        value: key,
        label: c.annualFee > 0 ? `${c.name} ($${c.annualFee}/yr)` : c.name,
      }));
    case "delta":
      return [
        { value: "none", label: "No Card" },
        ...deltaCreditCards.map((c, i) => ({
          value: (["gold", "platinum", "reserve"] as const)[i],
          label: `${c.name} ($${c.annualFee}/yr)`,
        })),
      ];
    case "jetblue":
      return Object.entries(JETBLUE_CREDIT_CARDS).map(([key, c]) => ({
        value: key,
        label: c.annualFee > 0 ? `${c.name} ($${c.annualFee}/yr)` : c.name,
      }));
    case "atmos":
      return Object.entries(ATMOS_CREDIT_CARDS).map(([key, c]) => ({
        value: key,
        label: c.annualFee > 0 ? `${c.name} ($${c.annualFee}/yr)` : c.name,
      }));
  }
}

// --- Fare type options per airline ---

function getFareOptions(airline: AirlineKey): DropdownOption[] {
  switch (airline) {
    case "southwest":
      return [
        { value: "basic", label: "Basic (2 pts/$)" },
        { value: "choice", label: "Choice (6 pts/$)" },
        { value: "choice-preferred", label: "Choice Preferred (10 pts/$)" },
        { value: "choice-extra", label: "Choice Extra (14 pts/$)" },
      ];
    case "american":
      return [
        { value: "basic-economy", label: "Basic Economy (2x)" },
        { value: "main-cabin", label: "Main Cabin (5x)" },
        { value: "premium-economy", label: "Premium Economy (5x)" },
        { value: "business", label: "Business (5x)" },
        { value: "first", label: "First (5x)" },
      ];
    case "united":
      return [
        { value: "basic-economy", label: "Basic Economy (5x, No PQF)" },
        { value: "economy", label: "Economy (5x)" },
        { value: "economy-plus", label: "Economy Plus (5x)" },
        { value: "premium-plus", label: "Premium Plus (5x)" },
        { value: "business", label: "Business (5x)" },
        { value: "first", label: "First (5x)" },
      ];
    case "delta":
      return [
        { value: "main-basic", label: "Basic Economy (0x)" },
        { value: "comfort-basic", label: "Main Cabin (2x)" },
        { value: "classic", label: "Comfort+ (5x)" },
        { value: "refundable", label: "First/Delta One (5x)" },
        { value: "extra", label: "Extra (7x)" },
      ];
    case "jetblue":
      return [
        { value: "blue-basic", label: "Blue Basic (2 pts/$)" },
        { value: "blue", label: "Blue (6 pts/$)" },
        { value: "blue-plus", label: "Blue Plus (6 pts/$)" },
        { value: "blue-extra", label: "Blue Extra (6 pts/$)" },
        { value: "mint", label: "Mint (6 pts/$)" },
      ];
    case "atmos":
      return [
        { value: "basic-economy", label: "Basic Economy (30%)" },
        { value: "main-cabin", label: "Main Cabin (100%)" },
        { value: "main-cabin-flex", label: "Main Cabin Flex (125%)" },
        { value: "premium-economy", label: "Premium Economy (150%)" },
        { value: "business", label: "Business (175%)" },
        { value: "first", label: "First (200%)" },
      ];
  }
}

// --- Tier/status options per airline ---

function getTierOptions(airline: AirlineKey): DropdownOption[] {
  switch (airline) {
    case "southwest":
      return [
        { value: "member", label: "Member (+0%)" },
        { value: "a-list", label: "A-List (+25%)" },
        { value: "a-list-preferred", label: "A-List Preferred (+100%)" },
      ];
    case "american":
      return [
        { value: "member", label: "Member (+0%)" },
        { value: "gold", label: "Gold (+40%)" },
        { value: "platinum", label: "Platinum (+60%)" },
        { value: "platinum-pro", label: "Platinum Pro (+80%)" },
        { value: "executive-platinum", label: "Executive Platinum (+120%)" },
      ];
    case "united":
      return [
        { value: "member", label: "Member" },
        { value: "silver", label: "Silver (+2 bonus)" },
        { value: "gold", label: "Gold (+3 bonus)" },
        { value: "platinum", label: "Platinum (+4 bonus)" },
        { value: "1k", label: "1K (+6 bonus)" },
      ];
    case "delta":
      return [
        { value: "none", label: "General Member" },
        { value: "silver", label: "Silver (+2 bonus)" },
        { value: "gold", label: "Gold (+3 bonus)" },
        { value: "platinum", label: "Platinum (+4 bonus)" },
        { value: "diamond", label: "Diamond (+6 bonus)" },
      ];
    case "jetblue":
      return [
        { value: "trueblue", label: "TrueBlue Member" },
        { value: "mosaic-1", label: "Mosaic 1 (+3 pts/$)" },
        { value: "mosaic-2", label: "Mosaic 2 (+3 pts/$)" },
        { value: "mosaic-3", label: "Mosaic 3 (+3 pts/$)" },
        { value: "mosaic-4", label: "Mosaic 4 (+3 pts/$)" },
      ];
    case "atmos":
      return [
        { value: "member", label: "Member (No bonus)" },
        { value: "silver", label: "Silver (+25%)" },
        { value: "gold", label: "Gold (+50%)" },
        { value: "platinum", label: "Platinum (+100%)" },
        { value: "titanium", label: "Titanium (+150%)" },
      ];
  }
}

const airlineAccentColors: Record<AirlineKey, string> = {
  american: "bg-american-blue",
  atmos: "bg-atmos-teal",
  delta: "bg-delta-red",
  jetblue: "bg-jetblue-mid",
  southwest: "bg-southwest-blue",
  united: "bg-united-navy",
};

const airlineLabels: Record<AirlineKey, string> = {
  american: "American",
  atmos: "Atmos",
  delta: "Delta",
  jetblue: "JetBlue",
  southwest: "Southwest",
  united: "United",
};

interface AirlineSettingsSelectorProps {
  airlineSettings: Record<AirlineKey, AirlineSettings>;
  onChange: (airline: AirlineKey, field: keyof AirlineSettings, value: string) => void;
}

export function AirlineSettingsSelector({ airlineSettings, onChange }: AirlineSettingsSelectorProps) {
  const airlines: AirlineKey[] = ["american", "atmos", "delta", "jetblue", "southwest", "united"];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings2 className="w-5 h-5" />
          Per-Airline Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {airlines.map((airline) => {
            const settings = airlineSettings[airline];
            const cardOptions = getCardOptions(airline);
            const fareOptions = getFareOptions(airline);
            const tierOptions = getTierOptions(airline);

            return (
              <div key={airline} className="space-y-3 p-3 rounded-lg border bg-card">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${airlineAccentColors[airline]}`} />
                  <span className="font-semibold text-sm">{airlineLabels[airline]}</span>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Fare Type</label>
                  <Select
                    value={settings.fareType}
                    onValueChange={(v) => onChange(airline, "fareType", v)}
                  >
                    <SelectTrigger className="w-full h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fareOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value} className="text-xs">
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Status Tier</label>
                  <Select
                    value={settings.tier}
                    onValueChange={(v) => onChange(airline, "tier", v)}
                  >
                    <SelectTrigger className="w-full h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tierOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value} className="text-xs">
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Credit Card</label>
                  <Select
                    value={settings.creditCard}
                    onValueChange={(v) => onChange(airline, "creditCard", v)}
                  >
                    <SelectTrigger className="w-full h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cardOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value} className="text-xs">
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
