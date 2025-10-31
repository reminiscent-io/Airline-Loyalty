import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator as CalculatorIcon, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { type TierStatus, type CalculationResults, type CalculatorInput } from "@shared/schema";

interface CalculatorProps {
  onCalculate: (results: CalculationResults) => void;
}

export function Calculator({ onCalculate }: CalculatorProps) {
  const [flightSpending, setFlightSpending] = useState<string>("1000");
  const [currentTier, setCurrentTier] = useState<TierStatus>("member");
  const [flightsTaken, setFlightsTaken] = useState<string>("10");
  const [creditCardPoints, setCreditCardPoints] = useState<string>("0");
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
      currentTier,
      flightsTaken: parseInt(flightsTaken) || 0,
      creditCardPoints: parseFloat(creditCardPoints) || 0,
    };

    calculateMutation.mutate(input);
  };

  return (
    <Card data-testid="card-calculator">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-southwest-navy">
          <CalculatorIcon className="w-5 h-5 text-southwest-blue" />
          Your Activity
        </CardTitle>
        <CardDescription>
          Enter your flight spending and activity to calculate your rewards
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
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

        <div className="space-y-2">
          <Label htmlFor="creditCardPoints" className="text-sm font-semibold">
            Credit Card Points (Optional)
          </Label>
          <Input
            id="creditCardPoints"
            type="number"
            min="0"
            step="1000"
            value={creditCardPoints}
            onChange={(e) => setCreditCardPoints(e.target.value)}
            placeholder="0"
            className="text-base"
            data-testid="input-credit-card-points"
          />
          <p className="text-xs text-muted-foreground">
            Points earned from Southwest credit cards
          </p>
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
