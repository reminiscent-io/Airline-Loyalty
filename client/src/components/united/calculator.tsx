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
  type UnitedTierStatus, 
  type UnitedFareType, 
  type UnitedCreditCardType, 
  type UnitedCalculationResults, 
  type UnitedCalculatorInput,
  UNITED_FARE_TYPES, 
  UNITED_CREDIT_CARDS 
} from "@shared/united-schema";
import { Separator } from "@/components/ui/separator";

interface UnitedCalculatorProps {
  onCalculate: (results: UnitedCalculationResults) => void;
}

export function UnitedCalculator({ onCalculate }: UnitedCalculatorProps) {
  // Flight inputs
  const [flightSpending, setFlightSpending] = useState<string>("1000");
  const [fareType, setFareType] = useState<UnitedFareType>("economy");
  const [currentTier, setCurrentTier] = useState<UnitedTierStatus>("member");
  const [flightsTaken, setFlightsTaken] = useState<string>("1");
  
  // Credit card inputs
  const [creditCard, setCreditCard] = useState<UnitedCreditCardType>("none");
  const [cardSpending, setCardSpending] = useState<string>("0");
  const [includeSignUpBonus, setIncludeSignUpBonus] = useState(false);
  
  // Partner spending
  const [partnerSpending, setPartnerSpending] = useState<string>("0");
  
  const { toast } = useToast();

  const calculateMutation = useMutation({
    mutationFn: async (input: UnitedCalculatorInput) => {
      const response = await apiRequest("POST", "/api/united/calculate", input);
      return await response.json() as UnitedCalculationResults;
    },
    onSuccess: (data) => {
      onCalculate(data);
    },
    onError: () => {
      toast({
        title: "Calculation Error",
        description: "Unable to calculate MileagePlus rewards. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCalculate = () => {
    const input: UnitedCalculatorInput = {
      flightSpending: parseFloat(flightSpending) || 0,
      fareType,
      currentTier,
      flightsTaken: parseInt(flightsTaken) || 0,
      creditCard,
      cardSpending: parseFloat(cardSpending) || 0,
      includeSignUpBonus,
      partnerSpending: parseFloat(partnerSpending) || 0,
    };
    
    calculateMutation.mutate(input);
  };

  return (
    <Card className="border-2 border-[#002244]/20" data-testid="card-calculator">
      <CardHeader className="bg-gradient-to-r from-[#002244]/5 to-[#0074C8]/5">
        <CardTitle className="flex items-center gap-2 text-[#002244]">
          <CalculatorIcon className="w-5 h-5 text-[#0074C8]" />
          Calculate Your MileagePlus Rewards
        </CardTitle>
        <CardDescription>
          Enter your flying and spending activity to see your miles, PQP, and PQF
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Flight Activity Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#002244]">
            <Plane className="w-4 h-4 text-[#0074C8]" />
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
                Qualifying spend (base fare + surcharges, excludes taxes)
              </p>
            </div>

            <div>
              <Label htmlFor="fare-type">Typical Fare Type</Label>
              <Select value={fareType} onValueChange={(value) => setFareType(value as UnitedFareType)}>
                <SelectTrigger id="fare-type" className="mt-1" data-testid="select-fare-type">
                  <SelectValue placeholder="Select fare type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(UNITED_FARE_TYPES).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.name} (5 base miles/dollar{!config.pqfEligible && ", No PQF"})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="flights-taken">Number of Flights</Label>
              <Input
                id="flights-taken"
                type="number"
                value={flightsTaken}
                onChange={(e) => setFlightsTaken(e.target.value)}
                placeholder="Enter number"
                className="mt-1"
                data-testid="input-flights-taken"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Segments flown (for PQF calculation)
              </p>
            </div>

            <div>
              <Label htmlFor="current-tier">Current Premier Status</Label>
              <Select value={currentTier} onValueChange={(value) => setCurrentTier(value as UnitedTierStatus)}>
                <SelectTrigger id="current-tier" className="mt-1" data-testid="select-current-tier">
                  <SelectValue placeholder="Select your status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">MileagePlus Member (+0 bonus miles)</SelectItem>
                  <SelectItem value="silver">Premier Silver (+2 bonus miles)</SelectItem>
                  <SelectItem value="gold">Premier Gold (+3 bonus miles)</SelectItem>
                  <SelectItem value="platinum">Premier Platinum (+4 bonus miles)</SelectItem>
                  <SelectItem value="1k">Premier 1K (+6 bonus miles)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        {/* Credit Card Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#002244]">
            <CreditCard className="w-4 h-4 text-[#0074C8]" />
            CREDIT CARD
          </div>
          
          <div className="space-y-4 pl-6">
            <div>
              <Label htmlFor="credit-card">United Credit Card</Label>
              <Select value={creditCard} onValueChange={(value) => setCreditCard(value as UnitedCreditCardType)}>
                <SelectTrigger id="credit-card" className="mt-1" data-testid="select-credit-card">
                  <SelectValue placeholder="Select credit card" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(UNITED_CREDIT_CARDS).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.name} {config.annualFee > 0 && `($${config.annualFee}/yr)`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {creditCard !== "none" && (
                <p className="text-xs text-muted-foreground mt-1">
                  PQP: {UNITED_CREDIT_CARDS[creditCard].pqpPerDollar > 0 
                    ? `1 PQP per $${Math.round(1/UNITED_CREDIT_CARDS[creditCard].pqpPerDollar)} spent`
                    : "No PQP earn"} 
                  {UNITED_CREDIT_CARDS[creditCard].pqpCap > 0 && ` (cap: ${UNITED_CREDIT_CARDS[creditCard].pqpCap.toLocaleString()})`}
                  {UNITED_CREDIT_CARDS[creditCard].annualPQPBonus > 0 && ` + ${UNITED_CREDIT_CARDS[creditCard].annualPQPBonus.toLocaleString()} annual bonus`}
                </p>
              )}
            </div>

            {creditCard !== "none" && (
              <>
                <div>
                  <Label htmlFor="card-spending">Non-flight spending ($)</Label>
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
                    Card spending excluding United flight purchases
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
                    Include sign-up bonus ({UNITED_CREDIT_CARDS[creditCard].signUpBonus.toLocaleString()} miles after ${UNITED_CREDIT_CARDS[creditCard].signUpSpendRequirement.toLocaleString()} spend)
                  </Label>
                </div>
              </>
            )}
          </div>
        </div>

        <Separator />

        {/* Partner Activity */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#002244]">
            <Building2 className="w-4 h-4 text-[#0074C8]" />
            PARTNER ACTIVITY
          </div>
          
          <div className="pl-6">
            <Label htmlFor="partner-spending">Partner Flight Spending ($)</Label>
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
              Star Alliance and other partner airlines
            </p>
          </div>
        </div>

        <Button 
          onClick={handleCalculate} 
          className="w-full bg-[#002244] hover:bg-[#001833] text-white"
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
              Calculate My MileagePlus Rewards
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}