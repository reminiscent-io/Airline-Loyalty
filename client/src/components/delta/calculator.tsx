import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator as CalculatorIcon, Loader2, Plane, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  type DeltaCalculatorInput, 
  type DeltaCalculationResults 
} from "@shared/delta-schema";
import { Separator } from "@/components/ui/separator";

interface DeltaCalculatorProps {
  onCalculate: (results: DeltaCalculationResults) => void;
}

export function DeltaCalculator({ onCalculate }: DeltaCalculatorProps) {
  // Flight inputs
  const [annualFlightSpend, setAnnualFlightSpend] = useState<string>("1000");
  const [fareClass, setFareClass] = useState<"main-basic" | "comfort-basic" | "classic" | "refundable" | "extra">("classic");
  const [currentTier, setCurrentTier] = useState<"none" | "silver" | "gold" | "platinum" | "diamond">("none");
  
  // Credit card inputs
  const [cardType, setCardType] = useState<"none" | "gold" | "platinum" | "reserve">("none");
  const [annualCardSpend, setAnnualCardSpend] = useState<string>("0");
  
  const { toast } = useToast();

  const calculateMutation = useMutation({
    mutationFn: async (input: DeltaCalculatorInput) => {
      const response = await apiRequest("POST", "/api/delta/calculate", input);
      return await response.json() as DeltaCalculationResults;
    },
    onSuccess: (data) => {
      onCalculate(data);
    },
    onError: () => {
      toast({
        title: "Calculation Error",
        description: "Unable to calculate SkyMiles rewards. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCalculate = () => {
    const input: DeltaCalculatorInput = {
      annualFlightSpend: parseFloat(annualFlightSpend) || 0,
      fareClass,
      currentTier,
      cardType,
      annualCardSpend: parseFloat(annualCardSpend) || 0,
    };
    
    calculateMutation.mutate(input);
  };

  return (
    <Card className="border-2 border-[#C8102E]/20" data-testid="card-calculator">
      <CardHeader className="bg-gradient-to-r from-[#C8102E]/5 to-[#002D62]/5">
        <CardTitle className="flex items-center gap-2 text-[#002D62]">
          <CalculatorIcon className="w-5 h-5 text-[#C8102E]" />
          Calculate Your SkyMiles Rewards
        </CardTitle>
        <CardDescription>
          Enter your flying and spending activity to see your miles and MQDs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Flight Activity Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#002D62]">
            <Plane className="w-4 h-4 text-[#C8102E]" />
            FLIGHT ACTIVITY
          </div>
          
          <div className="space-y-4 pl-6">
            <div>
              <Label htmlFor="flight-spending">Annual Flight Spending ($)</Label>
              <Input
                id="flight-spending"
                type="number"
                value={annualFlightSpend}
                onChange={(e) => setAnnualFlightSpend(e.target.value)}
                placeholder="Enter amount"
                className="mt-1"
                data-testid="input-flight-spend"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Base fare only (excludes taxes & fees)
              </p>
            </div>

            <div>
              <Label htmlFor="fare-class">Typical Fare Class</Label>
              <Select value={fareClass} onValueChange={(value) => setFareClass(value as typeof fareClass)}>
                <SelectTrigger id="fare-class" className="mt-1" data-testid="select-fare-class">
                  <SelectValue placeholder="Select fare class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main-basic">Main Basic (0 miles/$)</SelectItem>
                  <SelectItem value="comfort-basic">Comfort Basic (2 miles/$)</SelectItem>
                  <SelectItem value="classic">Classic (5 miles/$)</SelectItem>
                  <SelectItem value="refundable">Refundable (5 miles/$)</SelectItem>
                  <SelectItem value="extra">Extra (7 miles/$)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Base miles + loyalty bonus (see status below)
              </p>
            </div>

            <div>
              <Label htmlFor="current-tier">Current Medallion Status</Label>
              <Select value={currentTier} onValueChange={(value) => setCurrentTier(value as typeof currentTier)}>
                <SelectTrigger id="current-tier" className="mt-1" data-testid="select-current-tier">
                  <SelectValue placeholder="Select your status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">General Member (+0 bonus)</SelectItem>
                  <SelectItem value="silver">Silver Medallion (+2 bonus)</SelectItem>
                  <SelectItem value="gold">Gold Medallion (+3 bonus)</SelectItem>
                  <SelectItem value="platinum">Platinum Medallion (+4 bonus)</SelectItem>
                  <SelectItem value="diamond">Diamond Medallion (+6 bonus)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        {/* Credit Card Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#002D62]">
            <CreditCard className="w-4 h-4 text-[#C8102E]" />
            CREDIT CARD
          </div>
          
          <div className="space-y-4 pl-6">
            <div>
              <Label htmlFor="credit-card">Delta SkyMiles Credit Card</Label>
              <Select value={cardType} onValueChange={(value) => setCardType(value as typeof cardType)}>
                <SelectTrigger id="credit-card" className="mt-1" data-testid="select-card-type">
                  <SelectValue placeholder="Select credit card" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Delta Card</SelectItem>
                  <SelectItem value="gold">Gold ($0 annual fee, no MQDs)</SelectItem>
                  <SelectItem value="platinum">Platinum ($250/yr, $2.5K MQD + 1/$20)</SelectItem>
                  <SelectItem value="reserve">Reserve ($550/yr, $2.5K MQD + 1/$10)</SelectItem>
                </SelectContent>
              </Select>
              {cardType !== "none" && cardType !== "gold" && (
                <p className="text-xs text-muted-foreground mt-1">
                  MQD boost: $2,500 headstart + {cardType === "platinum" ? "1 MQD per $20" : "1 MQD per $10"} spent
                </p>
              )}
            </div>

            {cardType !== "none" && (
              <div>
                <Label htmlFor="card-spending">Annual Card Spending ($)</Label>
                <Input
                  id="card-spending"
                  type="number"
                  value={annualCardSpend}
                  onChange={(e) => setAnnualCardSpend(e.target.value)}
                  placeholder="Enter amount"
                  className="mt-1"
                  data-testid="input-card-spend"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Non-flight purchases on your Delta card. MQD boosts use total card spend (flights + purchases)
                </p>
              </div>
            )}
          </div>
        </div>

        <Button 
          onClick={handleCalculate} 
          className="w-full bg-[#C8102E] hover:bg-[#A60E26] text-white"
          disabled={calculateMutation.isPending}
          data-testid="button-calculate"
        >
          {calculateMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calculating...
            </>
          ) : (
            <>
              <CalculatorIcon className="mr-2 h-4 w-4" />
              Calculate My SkyMiles Rewards
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}