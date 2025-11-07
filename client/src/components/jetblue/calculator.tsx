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
  type JetBlueTierStatus, 
  type JetBlueFareType, 
  type JetBlueCreditCardType, 
  type JetBlueCalculationResults, 
  type JetBlueCalculatorInput,
  JETBLUE_FARE_TYPES, 
  JETBLUE_CREDIT_CARDS 
} from "@shared/jetblue-schema";
import { Separator } from "@/components/ui/separator";

interface JetBlueCalculatorProps {
  onCalculate: (results: JetBlueCalculationResults) => void;
}

export function JetBlueCalculator({ onCalculate }: JetBlueCalculatorProps) {
  // Flight inputs
  const [flightSpending, setFlightSpending] = useState<string>("1000");
  const [fareType, setFareType] = useState<JetBlueFareType>("blue");
  const [currentTier, setCurrentTier] = useState<JetBlueTierStatus>("trueblue");
  const [segments, setSegments] = useState<string>("1");
  
  // Credit card inputs
  const [creditCard, setCreditCard] = useState<JetBlueCreditCardType>("none");
  const [cardSpending, setCardSpending] = useState<string>("0");
  const [includeSignUpBonus, setIncludeSignUpBonus] = useState(false);
  
  // Partner spending
  const [partnerSpending, setPartnerSpending] = useState<string>("0");
  
  const { toast } = useToast();

  const calculateMutation = useMutation({
    mutationFn: async (input: JetBlueCalculatorInput) => {
      const response = await apiRequest("POST", "/api/jetblue/calculate", input);
      return await response.json() as JetBlueCalculationResults;
    },
    onSuccess: (data) => {
      onCalculate(data);
    },
    onError: () => {
      toast({
        title: "Calculation Error",
        description: "Unable to calculate TrueBlue rewards. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCalculate = () => {
    const input: JetBlueCalculatorInput = {
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
    <Card className="border-2 border-[#00497F]/20" data-testid="card-calculator">
      <CardHeader className="bg-gradient-to-r from-[#002244]/5 to-[#0099CC]/5">
        <CardTitle className="flex items-center gap-2 text-[#002244]">
          <CalculatorIcon className="w-5 h-5 text-[#0099CC]" />
          Calculate Your TrueBlue Points
        </CardTitle>
        <CardDescription>
          Enter your JetBlue flying activity to see your points and Mosaic progress
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Flight Activity Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#002244]">
            <Plane className="w-4 h-4 text-[#0099CC]" />
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
                Total base fare on JetBlue flights
              </p>
            </div>

            <div>
              <Label htmlFor="fare-type">Typical Fare Type</Label>
              <Select value={fareType} onValueChange={(value) => setFareType(value as JetBlueFareType)}>
                <SelectTrigger id="fare-type" className="mt-1" data-testid="select-fare-type">
                  <SelectValue placeholder="Select fare type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(JETBLUE_FARE_TYPES).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.name} ({config.basePoints} points/$)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                All fares earn tiles (1 tile = $100 spent)
              </p>
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
                Number of flight segments (for tracking only)
              </p>
            </div>

            <div>
              <Label htmlFor="current-tier">Current Status</Label>
              <Select value={currentTier} onValueChange={(value) => setCurrentTier(value as JetBlueTierStatus)}>
                <SelectTrigger id="current-tier" className="mt-1" data-testid="select-current-tier">
                  <SelectValue placeholder="Select your status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trueblue">TrueBlue Member</SelectItem>
                  <SelectItem value="mosaic-1">Mosaic 1 (+3 points/$)</SelectItem>
                  <SelectItem value="mosaic-2">Mosaic 2 (+3 points/$)</SelectItem>
                  <SelectItem value="mosaic-3">Mosaic 3 (+3 points/$)</SelectItem>
                  <SelectItem value="mosaic-4">Mosaic 4 (+3 points/$)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        {/* Credit Card Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#002244]">
            <CreditCard className="w-4 h-4 text-[#0099CC]" />
            CREDIT CARD
          </div>
          
          <div className="space-y-4 pl-6">
            <div>
              <Label htmlFor="credit-card">JetBlue Credit Card</Label>
              <Select value={creditCard} onValueChange={(value) => setCreditCard(value as JetBlueCreditCardType)}>
                <SelectTrigger id="credit-card" className="mt-1" data-testid="select-credit-card">
                  <SelectValue placeholder="Select credit card" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(JETBLUE_CREDIT_CARDS).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.name} {config.annualFee > 0 && `($${config.annualFee}/yr)`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {creditCard !== "none" && JETBLUE_CREDIT_CARDS[creditCard].mosaicBoost && (
                <p className="text-xs text-muted-foreground mt-1">
                  Helps qualify for Mosaic status
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
                    Include sign-up bonus ({JETBLUE_CREDIT_CARDS[creditCard].signUpBonus.toLocaleString()} points after ${JETBLUE_CREDIT_CARDS[creditCard].signUpSpendRequirement.toLocaleString()} spend)
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
            <Building2 className="w-4 h-4 text-[#0099CC]" />
            PARTNER ACTIVITY
          </div>
          
          <div className="pl-6">
            <Label htmlFor="partner-spending">Partner Spending ($)</Label>
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
              Hotels, car rentals, and other partners
            </p>
          </div>
        </div>

        <Button 
          onClick={handleCalculate} 
          className="w-full bg-gradient-to-r from-[#002244] to-[#0099CC] hover:from-[#001833] hover:to-[#0077A3] text-white"
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
              Calculate My TrueBlue Points
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}