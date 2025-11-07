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
import { type TierStatus, type FareType, type CreditCardType, type CalculationResults, type CalculatorInput, FARE_TYPES, CREDIT_CARDS } from "@shared/schema";
import { Separator } from "@/components/ui/separator";

interface CalculatorProps {
  onCalculate: (results: CalculationResults) => void;
}

export function Calculator({ onCalculate }: CalculatorProps) {
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

  const handleCalculate = () => {
    const input: CalculatorInput = {
      flightSpending: parseFloat(flightSpending) || 0,
      fareType,
      currentTier,
      flightsTaken: parseInt(flightsTaken) || 0,
      creditCard,
      cardSpending: parseFloat(cardSpending) || 0,
      includeSignUpBonus,
      includeAnnualBonus: creditCard !== "none" ? true : false,
      partnerPoints: parseFloat(partnerPoints) || 0,
    };

    calculateMutation.mutate(input);
  };

  const selectedCard = CREDIT_CARDS[creditCard];
  const showCardDetails = creditCard !== "none";

  return (
    <Card data-testid="card-calculator">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-southwest-navy">
          <CalculatorIcon className="w-5 h-5 text-southwest-blue" />
          Your Activity
        </CardTitle>
        <CardDescription>
          Enter your flight spending, credit card usage, and partner activity to calculate your rewards
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Flight Information Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-southwest-navy">
            <Plane className="w-4 h-4 text-southwest-blue" />
            <span>Flight Information</span>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fareType" className="text-sm font-semibold">
              Primary Fare Type
            </Label>
            <Select
              value={fareType}
              onValueChange={(value) => setFareType(value as FareType)}
            >
              <SelectTrigger id="fareType" data-testid="select-fare-type">
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
            <p className="text-xs text-muted-foreground">
              Fare type determines your base earning rate
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="flightSpending" className="text-sm font-semibold">
              Annual Flight Spending ($)
            </Label>
            <Input
              id="flightSpending"
              type="number"
              min="0"
              step="100"
              value={flightSpending}
              onChange={(e) => setFlightSpending(e.target.value)}
              placeholder="1000"
              className="text-base"
              data-testid="input-flight-spending"
            />
            <p className="text-xs text-muted-foreground">
              Total amount spent on Southwest flights
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentTier" className="text-sm font-semibold">
              Current Tier Status
            </Label>
            <Select
              value={currentTier}
              onValueChange={(value) => setCurrentTier(value as TierStatus)}
            >
              <SelectTrigger id="currentTier" data-testid="select-current-tier">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member" data-testid="option-tier-member">
                  Rapid Rewards Member
                </SelectItem>
                <SelectItem value="a-list" data-testid="option-tier-a-list">
                  A-List
                </SelectItem>
                <SelectItem value="a-list-preferred" data-testid="option-tier-a-list-preferred">
                  A-List Preferred
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Tier affects RR points bonus (A-List +25%, A-List Preferred +100%)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="flightsTaken" className="text-sm font-semibold">
              Qualifying Flights Taken
            </Label>
            <Input
              id="flightsTaken"
              type="number"
              min="0"
              step="1"
              value={flightsTaken}
              onChange={(e) => setFlightsTaken(e.target.value)}
              placeholder="10"
              className="text-base"
              data-testid="input-flights-taken"
            />
            <p className="text-xs text-muted-foreground">
              Number of one-way qualifying flights
            </p>
          </div>
        </div>

        <Separator />

        {/* Credit Card Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-southwest-navy">
            <CreditCard className="w-4 h-4 text-southwest-gold" />
            <span>Southwest Credit Card</span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="creditCard" className="text-sm font-semibold">
              Credit Card Type
            </Label>
            <Select
              value={creditCard}
              onValueChange={(value) => handleCreditCardChange(value as CreditCardType)}
            >
              <SelectTrigger id="creditCard" data-testid="select-credit-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(CREDIT_CARDS).map((card) => (
                  <SelectItem key={card.id} value={card.id} data-testid={`option-card-${card.id}`}>
                    {card.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {showCardDetails && (
              <p className="text-xs text-muted-foreground">
                Annual fee: ${selectedCard.annualFee} | Earn {selectedCard.pointsPerDollarSpend} pts/$ on purchases
              </p>
            )}
          </div>

          {showCardDetails && (
            <>
              <div className="space-y-2">
                <Label htmlFor="cardSpending" className="text-sm font-semibold">
                  Annual Card Spending ($)
                </Label>
                <Input
                  id="cardSpending"
                  type="number"
                  min="0"
                  step="100"
                  value={cardSpending}
                  onChange={(e) => setCardSpending(e.target.value)}
                  placeholder="0"
                  className="text-base"
                  data-testid="input-card-spending"
                />
                <p className="text-xs text-muted-foreground">
                  Non-flight purchases on your Southwest card. Sign-up bonus & TQP boosts use total card spend (flights + purchases)
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="includeSignUpBonus" 
                    checked={includeSignUpBonus}
                    onCheckedChange={(checked) => setIncludeSignUpBonus(checked as boolean)}
                    data-testid="checkbox-signup-bonus"
                  />
                  <Label htmlFor="includeSignUpBonus" className="text-sm cursor-pointer">
                    Include sign-up bonus ({selectedCard.signUpBonus.toLocaleString()} pts after ${selectedCard.signUpSpendRequirement.toLocaleString()} total spend)
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="includeAnnualBonus" 
                    checked={true}
                    disabled={true}
                    data-testid="checkbox-annual-bonus"
                  />
                  <Label htmlFor="includeAnnualBonus" className="text-sm text-muted-foreground">
                    Annual anniversary bonus ({selectedCard.annualRRBonus.toLocaleString()} RR) - included with card
                  </Label>
                </div>
              </div>
            </>
          )}
        </div>

        <Separator />

        {/* Partner Points Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-southwest-navy">
            <Building2 className="w-4 h-4 text-southwest-red" />
            <span>Partner Activity</span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="partnerPoints" className="text-sm font-semibold">
              Partner Points (Optional)
            </Label>
            <Input
              id="partnerPoints"
              type="number"
              min="0"
              step="100"
              value={partnerPoints}
              onChange={(e) => setPartnerPoints(e.target.value)}
              placeholder="0"
              className="text-base"
              data-testid="input-partner-points"
            />
            <p className="text-xs text-muted-foreground">
              Points from hotels, dining, shopping partners (count toward RR & CQP only)
            </p>
          </div>
        </div>

        <Button 
          onClick={handleCalculate} 
          className="w-full bg-southwest-blue hover:bg-southwest-blue/90 text-white"
          size="lg"
          disabled={calculateMutation.isPending}
          data-testid="button-calculate"
        >
          {calculateMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Calculating...
            </>
          ) : (
            "Calculate My Rewards"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
