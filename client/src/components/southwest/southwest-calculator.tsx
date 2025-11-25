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
import { type TierStatus, type FareType, type CreditCardType, type CalculationResults, type CalculatorInput, FARE_TYPES, CREDIT_CARDS } from "@shared/schema";
import { Separator } from "@/components/ui/separator";

interface SouthwestCalculatorProps {
  onCalculate: (results: CalculationResults) => void;
}

export function SouthwestCalculator({ onCalculate }: SouthwestCalculatorProps) {
  // Flight inputs
  const [flightSpending, setFlightSpending] = useState<string>("1000");
  const [fareType, setFareType] = useState<FareType>("choice");
  const [currentTier, setCurrentTier] = useState<TierStatus>("member");
  const [flightsTaken, setFlightsTaken] = useState<string>("1");
  
  // Credit card inputs
  const [creditCard, setCreditCard] = useState<CreditCardType>("none");
  const [cardSpending, setCardSpending] = useState<string>("0");
  const [includeSignUpBonus, setIncludeSignUpBonus] = useState(false);
  const [includeAnnualBonus, setIncludeAnnualBonus] = useState(false);
  
  // Handle credit card change - clear card spending when switching to "none"
  const handleCreditCardChange = (value: CreditCardType) => {
    setCreditCard(value);
    if (value === "none") {
      setCardSpending("0");
      setIncludeSignUpBonus(false);
    }
  };
  
  // Partner points
  const [partnerPoints, setPartnerPoints] = useState<string>("0");
  
  // Debounce text input values
  const debouncedFlightSpending = useDebounce(flightSpending, 300);
  const debouncedFlightsTaken = useDebounce(flightsTaken, 300);
  const debouncedCardSpending = useDebounce(cardSpending, 300);
  const debouncedPartnerPoints = useDebounce(partnerPoints, 300);
  
  const { toast } = useToast();

  const calculateMutation = useMutation({
    mutationFn: async (input: CalculatorInput) => {
      const response = await apiRequest("POST", "/api/calculate", input);
      return await response.json() as CalculationResults;
    },
    onSuccess: (data) => {
      onCalculate(data);
    },
    onError: () => {
      toast({
        title: "Calculation Error",
        description: "Unable to calculate rewards. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Automatic calculation on value changes
  useEffect(() => {
    const input: CalculatorInput = {
      flightSpending: parseFloat(debouncedFlightSpending) || 0,
      fareType,
      currentTier,
      flightsTaken: parseInt(debouncedFlightsTaken) || 0,
      creditCard,
      cardSpending: parseFloat(debouncedCardSpending) || 0,
      includeSignUpBonus,
      includeAnnualBonus: creditCard !== "none" ? true : false,
      partnerPoints: parseFloat(debouncedPartnerPoints) || 0,
    };

    calculateMutation.mutate(input);
  }, [
    debouncedFlightSpending,
    debouncedFlightsTaken,
    debouncedCardSpending,
    debouncedPartnerPoints,
    fareType,
    currentTier,
    creditCard,
    includeSignUpBonus,
  ]);

  const selectedCard = CREDIT_CARDS[creditCard];
  const showCardDetails = creditCard !== "none";

  return (
    <Card className="border-2 border-southwest-blue/20" data-testid="card-calculator">
      <CardHeader className="bg-gradient-to-r from-southwest-blue/5 to-southwest-red/5">
        <CardTitle className="flex items-center gap-2 text-southwest-navy">
          <CalculatorIcon className="w-5 h-5 text-southwest-blue" />
          Calculate Your Rapid Rewards
        </CardTitle>
        <CardDescription>
          Enter your flying and spending activity to see your points and tier progress
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        
        {/* Flight Information Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-southwest-navy">
            <Plane className="w-4 h-4 text-southwest-blue" />
            FLIGHT ACTIVITY
          </div>
          
          <div className="space-y-4 pl-6">
            <div>
              <Label htmlFor="fareType">Primary Fare Type</Label>
              <Select
                value={fareType}
                onValueChange={(value) => setFareType(value as FareType)}
              >
                <SelectTrigger id="fareType" className="mt-1" data-testid="select-fare-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(FARE_TYPES).map((fare) => (
                    <SelectItem key={fare.id} value={fare.id} data-testid={`option-fare-${fare.id}`}>
                      {fare.name} ({fare.pointsPerDollar} pts/$)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Fare type determines your base earning rate
              </p>
            </div>

            <div>
              <Label htmlFor="flightSpending">Annual Flight Spending ($)</Label>
              <Input
                id="flightSpending"
                type="number"
                min="0"
                step="100"
                value={flightSpending}
                onChange={(e) => setFlightSpending(e.target.value)}
                placeholder="Enter amount"
                className="mt-1"
                data-testid="input-flight-spending"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Total amount spent on Southwest flights
              </p>
            </div>

            <div>
              <Label htmlFor="currentTier">Current Tier Status</Label>
              <Select
                value={currentTier}
                onValueChange={(value) => setCurrentTier(value as TierStatus)}
              >
                <SelectTrigger id="currentTier" className="mt-1" data-testid="select-current-tier">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member" data-testid="option-tier-member">
                    Rapid Rewards Member (+0% bonus)
                  </SelectItem>
                  <SelectItem value="a-list" data-testid="option-tier-a-list">
                    A-List (+25% bonus)
                  </SelectItem>
                  <SelectItem value="a-list-preferred" data-testid="option-tier-a-list-preferred">
                    A-List Preferred (+100% bonus)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="flightsTaken">Qualifying Flights Taken</Label>
              <Input
                id="flightsTaken"
                type="number"
                min="0"
                step="1"
                value={flightsTaken}
                onChange={(e) => setFlightsTaken(e.target.value)}
                placeholder="Enter number"
                className="mt-1"
                data-testid="input-flights-taken"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Number of one-way qualifying flights
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Credit Card Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-southwest-navy">
            <CreditCard className="w-4 h-4 text-southwest-gold" />
            CREDIT CARD
          </div>

          <div className="space-y-4 pl-6">
            <div>
              <Label htmlFor="creditCard">Southwest Credit Card</Label>
              <Select
                value={creditCard}
                onValueChange={(value) => handleCreditCardChange(value as CreditCardType)}
              >
                <SelectTrigger id="creditCard" className="mt-1" data-testid="select-credit-card">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(CREDIT_CARDS).map((card) => (
                    <SelectItem key={card.id} value={card.id} data-testid={`option-card-${card.id}`}>
                      {card.name} {card.annualFee > 0 && `($${card.annualFee}/yr)`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {showCardDetails && (
                <p className="text-xs text-muted-foreground mt-1">
                  Earn {selectedCard.pointsPerDollarSpend} pts/$ on purchases
                </p>
              )}
            </div>

            {showCardDetails && (
              <>
                <div>
                  <Label htmlFor="cardSpending">Annual Card Spending ($)</Label>
                  <Input
                    id="cardSpending"
                    type="number"
                    min="0"
                    step="100"
                    value={cardSpending}
                    onChange={(e) => setCardSpending(e.target.value)}
                    placeholder="Enter amount"
                    className="mt-1"
                    data-testid="input-card-spending"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Non-flight purchases on your Southwest card
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="includeSignUpBonus" 
                    checked={includeSignUpBonus}
                    onCheckedChange={(checked) => setIncludeSignUpBonus(checked as boolean)}
                    data-testid="checkbox-signup-bonus"
                  />
                  <Label htmlFor="includeSignUpBonus" className="text-sm font-normal cursor-pointer">
                    Include sign-up bonus ({selectedCard.signUpBonus.toLocaleString()} pts after ${selectedCard.signUpSpendRequirement.toLocaleString()} spend)
                  </Label>
                </div>
              </>
            )}
          </div>
        </div>

        <Separator />

        {/* Partner Points Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-southwest-navy">
            <Building2 className="w-4 h-4 text-southwest-red" />
            PARTNER ACTIVITY
          </div>

          <div className="pl-6">
            <Label htmlFor="partnerPoints">Partner Points</Label>
            <Input
              id="partnerPoints"
              type="number"
              min="0"
              step="100"
              value={partnerPoints}
              onChange={(e) => setPartnerPoints(e.target.value)}
              placeholder="Enter amount"
              className="mt-1"
              data-testid="input-partner-points"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Points from hotels, dining, shopping partners
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
