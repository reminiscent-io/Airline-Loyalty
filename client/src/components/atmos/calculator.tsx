import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calculator as CalculatorIcon, Loader2, Plane, CreditCard, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  type AtmosTierStatus, 
  type AtmosFareType, 
  type AtmosCreditCardType, 
  type AtmosCalculationResults, 
  type AtmosCalculatorInput,
  ATMOS_FARE_TYPES, 
  ATMOS_CREDIT_CARDS 
} from "@shared/atmos-schema";
import { Separator } from "@/components/ui/separator";

interface AtmosCalculatorProps {
  onCalculate: (results: AtmosCalculationResults) => void;
}

export function AtmosCalculator({ onCalculate }: AtmosCalculatorProps) {
  // Flight inputs
  const [flightSpending, setFlightSpending] = useState<string>("1000");
  const [fareType, setFareType] = useState<AtmosFareType>("main");
  const [currentTier, setCurrentTier] = useState<AtmosTierStatus>("member");
  const [segments, setSegments] = useState<string>("1");
  
  // Credit card inputs
  const [creditCard, setCreditCard] = useState<AtmosCreditCardType>("none");
  const [cardSpending, setCardSpending] = useState<string>("0");
  const [includeSignUpBonus, setIncludeSignUpBonus] = useState(false);
  
  // Partner spending
  const [partnerSpending, setPartnerSpending] = useState<string>("0");
  
  const { toast } = useToast();

  const calculateMutation = useMutation({
    mutationFn: async (input: AtmosCalculatorInput) => {
      const response = await apiRequest("POST", "/api/atmos/calculate", input);
      return await response.json() as AtmosCalculationResults;
    },
    onSuccess: (data) => {
      onCalculate(data);
    },
    onError: () => {
      toast({
        title: "Calculation Error",
        description: "Unable to calculate Atmos rewards. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCalculate = () => {
    const input: AtmosCalculatorInput = {
      flightSpending: parseFloat(flightSpending) || 0,
      fareType,
      currentTier,
      segments: parseInt(segments) || 0,
      creditCard,
      cardSpending: parseFloat(cardSpending) || 0,
      includeSignUpBonus,
      partnerSpending: parseFloat(partnerSpending) || 0,
    };
    
    calculateMutation.mutate(input);
  };

  return (
    <Card className="border-2 border-[#014A6E]/20" data-testid="card-calculator">
      <CardHeader className="bg-gradient-to-r from-[#014A6E]/5 to-[#7B1E7A]/5">
        <CardTitle className="flex items-center gap-2 text-[#014A6E]">
          <CalculatorIcon className="w-5 h-5 text-[#01628C]" />
          Calculate Your Atmos Rewards
        </CardTitle>
        <CardDescription>
          Enter your flying activity to see your miles and elite progress
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Flight Activity Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#014A6E]">
            <Plane className="w-4 h-4 text-[#01628C]" />
            FLIGHT ACTIVITY
          </div>
          
          <div className="space-y-4 pl-6">
            <div>
              <Label htmlFor="flight-spending">Annual Flight Spending ($)</Label>
              <Input
                id="flight-spending"
                type="number"
                value={flightSpending}
                onChange={(e) => setFlightSpending(e.target.value)}
                placeholder="Enter amount"
                className="mt-1"
                data-testid="input-flight-spending"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Total spent on Alaska/Hawaiian flights
              </p>
            </div>

            <div>
              <Label htmlFor="fare-type">Typical Fare Type</Label>
              <Select value={fareType} onValueChange={(value) => setFareType(value as AtmosFareType)}>
                <SelectTrigger id="fare-type" className="mt-1" data-testid="select-fare-type">
                  <SelectValue placeholder="Select fare type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ATMOS_FARE_TYPES).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.name} ({config.baseMultiplier}× base miles)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="segments">Flight Segments</Label>
              <Input
                id="segments"
                type="number"
                value={segments}
                onChange={(e) => setSegments(e.target.value)}
                placeholder="Enter number"
                className="mt-1"
                data-testid="input-segments"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Number of flight segments for elite qualification
              </p>
            </div>

            <div>
              <Label htmlFor="current-tier">Current Elite Status</Label>
              <Select value={currentTier} onValueChange={(value) => setCurrentTier(value as AtmosTierStatus)}>
                <SelectTrigger id="current-tier" className="mt-1" data-testid="select-current-tier">
                  <SelectValue placeholder="Select your status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Basic Member (5× miles)</SelectItem>
                  <SelectItem value="mvp">MVP (7× miles)</SelectItem>
                  <SelectItem value="mvp-gold">MVP Gold (8× miles)</SelectItem>
                  <SelectItem value="mvp-gold-75k">MVP Gold 75K (9.25× miles)</SelectItem>
                  <SelectItem value="mvp-gold-100k">MVP Gold 100K (10× miles)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        {/* Credit Card Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#014A6E]">
            <CreditCard className="w-4 h-4 text-[#01628C]" />
            CREDIT CARD
          </div>
          
          <div className="space-y-4 pl-6">
            <div>
              <Label htmlFor="credit-card">Alaska/Hawaiian Credit Card</Label>
              <Select value={creditCard} onValueChange={(value) => setCreditCard(value as AtmosCreditCardType)}>
                <SelectTrigger id="credit-card" className="mt-1" data-testid="select-credit-card">
                  <SelectValue placeholder="Select credit card" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ATMOS_CREDIT_CARDS).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.name} {config.annualFee > 0 && `($${config.annualFee}/yr)`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {creditCard !== "none" && ATMOS_CREDIT_CARDS[creditCard].companionFare && (
                <p className="text-xs text-muted-foreground mt-1">
                  Includes annual companion fare benefit
                </p>
              )}
            </div>

            {creditCard !== "none" && (
              <>
                <div>
                  <Label htmlFor="card-spending">Annual Card Spending ($)</Label>
                  <Input
                    id="card-spending"
                    type="number"
                    value={cardSpending}
                    onChange={(e) => setCardSpending(e.target.value)}
                    placeholder="Enter amount"
                    className="mt-1"
                    data-testid="input-card-spending"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Total spending on all purchases
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="signup-bonus"
                    checked={includeSignUpBonus}
                    onCheckedChange={(checked) => setIncludeSignUpBonus(checked as boolean)}
                    data-testid="checkbox-signup-bonus"
                  />
                  <Label htmlFor="signup-bonus" className="text-sm font-normal cursor-pointer">
                    Include sign-up bonus ({ATMOS_CREDIT_CARDS[creditCard].signUpBonus.toLocaleString()} miles after ${ATMOS_CREDIT_CARDS[creditCard].signUpSpendRequirement.toLocaleString()} spend)
                  </Label>
                </div>
              </>
            )}
          </div>
        </div>

        <Separator />

        {/* Partner Activity */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#014A6E]">
            <Building2 className="w-4 h-4 text-[#01628C]" />
            PARTNER ACTIVITY
          </div>
          
          <div className="pl-6">
            <Label htmlFor="partner-spending">Partner Airline Spending ($)</Label>
            <Input
              id="partner-spending"
              type="number"
              value={partnerSpending}
              onChange={(e) => setPartnerSpending(e.target.value)}
              placeholder="Enter amount"
              className="mt-1"
              data-testid="input-partner-spending"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Oneworld and other partner airlines
            </p>
          </div>
        </div>

        <Button 
          onClick={handleCalculate} 
          className="w-full bg-gradient-to-r from-[#014A6E] to-[#7B1E7A] hover:from-[#013A5E] hover:to-[#6B0E6A] text-white"
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
              Calculate My Atmos Rewards
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}