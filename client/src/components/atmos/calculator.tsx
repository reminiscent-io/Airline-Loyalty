import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calculator as CalculatorIcon, Loader2, Plane, CreditCard, Building2, Trophy, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  type AtmosTierStatus,
  type AtmosFareBucket,
  type AtmosEarningMethod,
  type AtmosCreditCardType, 
  type AtmosCalculationResults, 
  type AtmosCalculatorInput,
  ATMOS_FARE_BUCKETS,
  ATMOS_CREDIT_CARDS 
} from "@shared/atmos-schema";
import { Separator } from "@/components/ui/separator";

interface AtmosCalculatorProps {
  onCalculate: (results: AtmosCalculationResults) => void;
}

export function AtmosCalculator({ onCalculate }: AtmosCalculatorProps) {
  // Earning method
  const [earningMethod, setEarningMethod] = useState<AtmosEarningMethod>("spend");
  
  // Flight inputs
  const [flightSpending, setFlightSpending] = useState<string>("1000");
  const [flightDistance, setFlightDistance] = useState<string>("5000");
  const [segments, setSegments] = useState<string>("1");
  const [fareBucket, setFareBucket] = useState<AtmosFareBucket>("main-cabin");
  const [isInternational, setIsInternational] = useState(false);
  const [currentTier, setCurrentTier] = useState<AtmosTierStatus>("member");
  
  // Credit card inputs
  const [creditCard, setCreditCard] = useState<AtmosCreditCardType>("none");
  const [cardSpending, setCardSpending] = useState<string>("0");
  const [includeSignUpBonus, setIncludeSignUpBonus] = useState(false);
  
  // Partner and award inputs
  const [partnerSpending, setPartnerSpending] = useState<string>("0");
  const [awardPointsRedeemed, setAwardPointsRedeemed] = useState<string>("0");
  
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
      earningMethod,
      flightSpending: parseFloat(flightSpending) || 0,
      flightDistance: parseFloat(flightDistance) || 0,
      segments: parseInt(segments) || 0,
      fareBucket,
      isInternational,
      currentTier,
      creditCard,
      cardSpending: parseFloat(cardSpending) || 0,
      includeSignUpBonus,
      partnerSpending: parseFloat(partnerSpending) || 0,
      awardPointsRedeemed: parseFloat(awardPointsRedeemed) || 0,
    };
    
    calculateMutation.mutate(input);
  };


  return (
    <Card className="border-2 border-[#014A6E]/20" data-testid="card-calculator">
      <CardHeader className="bg-gradient-to-r from-[#014A6E]/5 to-[#7B1E7A]/5">
        <CardTitle className="flex items-center gap-2 text-[#014A6E]">
          <CalculatorIcon className="w-5 h-5 text-[#01628C]" />
          Calculate Your Atmos Points (2026 Program)
        </CardTitle>
        <CardDescription>
          Enter your flying activity to see your redeemable and status points
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        
        {/* Earning Method Selection */}
        <div className="p-4 bg-gradient-to-r from-[#014A6E]/5 to-[#7B1E7A]/5 rounded-lg">
          <Label htmlFor="earning-method" className="text-sm font-semibold text-[#014A6E]">
            Points Earning Method
          </Label>
          <Select value={earningMethod} onValueChange={(value) => setEarningMethod(value as AtmosEarningMethod)}>
            <SelectTrigger id="earning-method" className="mt-2" data-testid="select-earning-method">
              <SelectValue placeholder="Select earning method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">Distance-Based (1 point per mile)</SelectItem>
              <SelectItem value="spend">Spend-Based (1 point per dollar)</SelectItem>
              <SelectItem value="segment">Segment-Based (500 points per segment)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-2">
            Choose how you prefer to earn points on your flights
          </p>
        </div>

        <Separator />

        {/* Flight Activity Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#014A6E]">
            <Plane className="w-4 h-4 text-[#01628C]" />
            FLIGHT ACTIVITY
          </div>
          
          <div className="space-y-4 pl-6">
            {/* Dynamic input based on earning method */}
            {earningMethod === "distance" && (
              <div>
                <Label htmlFor="flight-distance">Total Flight Distance (miles)</Label>
                <Input
                  id="flight-distance"
                  type="number"
                  value={flightDistance}
                  onChange={(e) => setFlightDistance(e.target.value)}
                  placeholder="Enter miles flown"
                  className="mt-1"
                  data-testid="input-flight-distance"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Total miles flown on Alaska/Hawaiian flights
                </p>
              </div>
            )}
            
            {earningMethod === "spend" && (
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
            )}
            
            {earningMethod === "segment" && (
              <div>
                <Label htmlFor="segments">Number of Flight Segments</Label>
                <Input
                  id="segments"
                  type="number"
                  value={segments}
                  onChange={(e) => setSegments(e.target.value)}
                  placeholder="Enter number of segments"
                  className="mt-1"
                  data-testid="input-segments"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Each segment earns 500 points
                </p>
              </div>
            )}

            <div>
              <Label htmlFor="fare-class">Fare Class</Label>
              <Select value={fareBucket} onValueChange={(value) => setFareBucket(value as AtmosFareBucket)}>
                <SelectTrigger id="fare-class" className="mt-1" data-testid="select-fare-class">
                  <SelectValue placeholder="Select fare class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic-economy">Basic Economy (30% earning)</SelectItem>
                  <SelectItem value="main-cabin">Main Cabin (100% earning)</SelectItem>
                  <SelectItem value="main-cabin-flex">Main Cabin Flexible (125% earning)</SelectItem>
                  <SelectItem value="premium-economy">Premium Economy (150% earning)</SelectItem>
                  <SelectItem value="business">Business Class (175% earning)</SelectItem>
                  <SelectItem value="first">First Class (200% earning)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                {fareBucket === "first" && isInternational 
                  ? "First Class earns 350% on international flights" 
                  : ATMOS_FARE_BUCKETS[fareBucket].description}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="international"
                checked={isInternational}
                onCheckedChange={(checked) => setIsInternational(checked as boolean)}
                data-testid="checkbox-international"
              />
              <Label htmlFor="international" className="text-sm font-normal cursor-pointer flex items-center gap-2">
                <Globe className="w-4 h-4" />
                International Flight (First class earns 350% on international)
              </Label>
            </div>

            <div>
              <Label htmlFor="current-tier">Current Elite Status</Label>
              <Select value={currentTier} onValueChange={(value) => setCurrentTier(value as AtmosTierStatus)}>
                <SelectTrigger id="current-tier" className="mt-1" data-testid="select-current-tier">
                  <SelectValue placeholder="Select your status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Basic Member (No bonus)</SelectItem>
                  <SelectItem value="silver">Atmos Silver (25% bonus)</SelectItem>
                  <SelectItem value="gold">Atmos Gold (50% bonus)</SelectItem>
                  <SelectItem value="platinum">Atmos Platinum (100% bonus)</SelectItem>
                  <SelectItem value="titanium">Atmos Titanium (150% bonus)</SelectItem>
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
            CREDIT CARD (2026 LINEUP)
          </div>
          
          <div className="space-y-4 pl-6">
            <div>
              <Label htmlFor="credit-card">Atmos Credit Card</Label>
              <Select value={creditCard} onValueChange={(value) => setCreditCard(value as AtmosCreditCardType)}>
                <SelectTrigger id="credit-card" className="mt-1" data-testid="select-credit-card">
                  <SelectValue placeholder="Select credit card" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Card</SelectItem>
                  <SelectItem value="summit">Atmos Summit Visa Infinite ($395/yr)</SelectItem>
                  <SelectItem value="ascent">Atmos Ascent Visa Signature ($95/yr)</SelectItem>
                  <SelectItem value="business">Atmos Business Visa ($95/yr)</SelectItem>
                  <SelectItem value="hawaiian-consumer">Hawaiian World Elite Barclays ($99/yr)</SelectItem>
                  <SelectItem value="hawaiian-boh">Hawaiian Bank of Hawaii ($99/yr)</SelectItem>
                </SelectContent>
              </Select>
              {creditCard !== "none" && ATMOS_CREDIT_CARDS[creditCard].companionFare && (
                <p className="text-xs text-muted-foreground mt-1">
                  Includes: {ATMOS_CREDIT_CARDS[creditCard].companionFare}
                </p>
              )}
              {creditCard === "summit" && (
                <p className="text-xs text-muted-foreground mt-1">
                  Includes: 8 Alaska Lounge passes per year
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
                    Include sign-up bonus ({ATMOS_CREDIT_CARDS[creditCard].signUpBonus.toLocaleString()} points after ${ATMOS_CREDIT_CARDS[creditCard].signUpSpendRequirement.toLocaleString()} spend)
                  </Label>
                </div>
              </>
            )}
          </div>
        </div>

        <Separator />

        {/* Partner & Award Activity */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#014A6E]">
            <Building2 className="w-4 h-4 text-[#01628C]" />
            PARTNER & AWARD ACTIVITY
          </div>
          
          <div className="space-y-4 pl-6">
            <div>
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
            
            <div>
              <Label htmlFor="award-points">Award Points Redeemed</Label>
              <Input
                id="award-points"
                type="number"
                value={awardPointsRedeemed}
                onChange={(e) => setAwardPointsRedeemed(e.target.value)}
                placeholder="Enter points"
                className="mt-1"
                data-testid="input-award-points"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Earn 1 status point per 100 award points redeemed
              </p>
            </div>
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
              Calculate My Atmos Points
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}