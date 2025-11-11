import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calculator as CalculatorIcon, Plane, CreditCard, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/use-debounce";
import { apiRequest } from "@/lib/queryClient";
import { 
  type AmericanTierStatus, 
  type AmericanFareType, 
  type AmericanCreditCardType, 
  type AmericanCalculationResults, 
  type AmericanCalculatorInput,
  AMERICAN_FARE_TYPES, 
  AMERICAN_CREDIT_CARDS 
} from "@shared/american-schema";
import { Separator } from "@/components/ui/separator";

interface AmericanCalculatorProps {
  onCalculate: (results: AmericanCalculationResults) => void;
}

export function AmericanCalculator({ onCalculate }: AmericanCalculatorProps) {
  // Flight inputs
  const [flightSpending, setFlightSpending] = useState<string>("1000");
  const [fareType, setFareType] = useState<AmericanFareType>("main-cabin");
  const [currentTier, setCurrentTier] = useState<AmericanTierStatus>("member");
  const [flightsTaken, setFlightsTaken] = useState<string>("1");
  
  // Credit card inputs
  const [creditCard, setCreditCard] = useState<AmericanCreditCardType>("none");
  const [cardSpending, setCardSpending] = useState<string>("0");
  const [includeSignUpBonus, setIncludeSignUpBonus] = useState(false);
  
  // Partner spending
  const [partnerSpending, setPartnerSpending] = useState<string>("0");
  
  // Debounce text input values
  const debouncedFlightSpending = useDebounce(flightSpending, 300);
  const debouncedCardSpending = useDebounce(cardSpending, 300);
  const debouncedPartnerSpending = useDebounce(partnerSpending, 300);
  
  const { toast } = useToast();

  const calculateMutation = useMutation({
    mutationFn: async (input: AmericanCalculatorInput) => {
      const response = await apiRequest("POST", "/api/american/calculate", input);
      return await response.json() as AmericanCalculationResults;
    },
    onSuccess: (data) => {
      onCalculate(data);
    },
    onError: () => {
      toast({
        title: "Calculation Error",
        description: "Unable to calculate AAdvantage rewards. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Automatic calculation on value changes
  useEffect(() => {
    const input: AmericanCalculatorInput = {
      flightSpending: parseFloat(debouncedFlightSpending) || 0,
      fareType,
      currentTier,
      creditCard,
      cardSpending: parseFloat(debouncedCardSpending) || 0,
      includeSignUpBonus,
      partnerSpending: parseFloat(debouncedPartnerSpending) || 0,
    };
    
    calculateMutation.mutate(input);
  }, [
    debouncedFlightSpending,
    debouncedCardSpending,
    debouncedPartnerSpending,
    fareType,
    currentTier,
    creditCard,
    includeSignUpBonus,
  ]);

  return (
    <Card className="border-2 border-[#0078D2]/20" data-testid="card-calculator">
      <CardHeader className="bg-gradient-to-r from-[#0078D2]/5 to-[#C8102E]/5">
        <CardTitle className="flex items-center gap-2 text-[#00325b]">
          <CalculatorIcon className="w-5 h-5 text-[#0078D2]" />
          Calculate Your AAdvantage Rewards
        </CardTitle>
        <CardDescription>
          Enter your flying and spending activity to see your miles and Loyalty Points
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Flight Activity Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#00325b]">
            <Plane className="w-4 h-4 text-[#0078D2]" />
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
                Base fare only (excludes taxes & fees)
              </p>
            </div>

            <div>
              <Label htmlFor="fare-type">Typical Fare Type</Label>
              <Select value={fareType} onValueChange={(value) => setFareType(value as AmericanFareType)}>
                <SelectTrigger id="fare-type" className="mt-1" data-testid="select-fare-type">
                  <SelectValue placeholder="Select fare type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(AMERICAN_FARE_TYPES).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.name} ({config.baseMultiplier}× miles)
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
                Segments flown (for EQS calculation)
              </p>
            </div>

            <div>
              <Label htmlFor="current-tier">Current Elite Status</Label>
              <Select value={currentTier} onValueChange={(value) => setCurrentTier(value as AmericanTierStatus)}>
                <SelectTrigger id="current-tier" className="mt-1" data-testid="select-current-tier">
                  <SelectValue placeholder="Select your status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">AAdvantage Member (+0% bonus)</SelectItem>
                  <SelectItem value="gold">Gold (+40% bonus)</SelectItem>
                  <SelectItem value="platinum">Platinum (+60% bonus)</SelectItem>
                  <SelectItem value="platinum-pro">Platinum Pro (+80% bonus)</SelectItem>
                  <SelectItem value="executive-platinum">Executive Platinum (+120% bonus)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        {/* Credit Card Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#00325b]">
            <CreditCard className="w-4 h-4 text-[#0078D2]" />
            CREDIT CARD
          </div>
          
          <div className="space-y-4 pl-6">
            <div>
              <Label htmlFor="credit-card">AAdvantage Credit Card</Label>
              <Select value={creditCard} onValueChange={(value) => setCreditCard(value as AmericanCreditCardType)}>
                <SelectTrigger id="credit-card" className="mt-1" data-testid="select-credit-card">
                  <SelectValue placeholder="Select credit card" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(AMERICAN_CREDIT_CARDS).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.name} {config.annualFee > 0 && `($${config.annualFee}/yr)`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                    Non-flight purchases
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
                    Include sign-up bonus ({AMERICAN_CREDIT_CARDS[creditCard].signUpBonus.toLocaleString()} miles after ${AMERICAN_CREDIT_CARDS[creditCard].signUpSpendRequirement.toLocaleString()} spend)
                  </Label>
                </div>
              </>
            )}
          </div>
        </div>

        <Separator />

        {/* Partner Activity */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#00325b]">
            <Building2 className="w-4 h-4 text-[#0078D2]" />
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
              Oneworld and other partner airlines
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}