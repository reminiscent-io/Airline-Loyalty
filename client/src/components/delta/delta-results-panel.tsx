import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Award, TrendingUp, CreditCard, Plane, DollarSign } from "lucide-react";
import { DeltaCalculationResults } from "@shared/delta-schema";

interface DeltaResultsPanelProps {
  results: DeltaCalculationResults | null;
}

export function DeltaResultsPanel({ results }: DeltaResultsPanelProps) {
  if (!results) {
    return (
      <Card className="h-full flex items-center justify-center border-2" style={{ borderColor: "#C8102E" }} data-testid="card-results-empty">
        <CardContent>
          <p className="text-muted-foreground text-center">
            Enter your information and click Calculate to see your results
          </p>
        </CardContent>
      </Card>
    );
  }

  const progressToNext = results.nextTier 
    ? Math.min(100, Math.round((results.totalMQDs / results.nextTier.mqd) * 100))
    : 100;

  return (
    <Card className="h-full border-2 hover-elevate" style={{ borderColor: "#C8102E" }} data-testid="card-results">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-2xl" style={{ color: "#C8102E" }}>
          <Award className="w-6 h-6" />
          Your Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total SkyMiles */}
        <div className="p-4 rounded-lg text-center" style={{ backgroundColor: "#F7F7F7" }}>
          <p className="text-sm text-muted-foreground mb-1">Total SkyMiles Earned</p>
          <p className="text-3xl font-bold" style={{ color: "#C8102E" }} data-testid="text-total-miles">
            {results.totalSkyMiles.toLocaleString()}
          </p>
          <div className="flex justify-center gap-4 mt-2 text-sm">
            <span className="flex items-center gap-1">
              <Plane className="w-4 h-4" />
              {results.flightSkyMiles.toLocaleString()} from flights
            </span>
            {results.cardSkyMiles > 0 && (
              <span className="flex items-center gap-1">
                <CreditCard className="w-4 h-4" />
                {results.cardSkyMiles.toLocaleString()} from card
              </span>
            )}
          </div>
        </div>

        {/* MQD Progress */}
        <div className="p-4 rounded-lg" style={{ backgroundColor: "#F7F7F7" }}>
          <p className="text-sm text-muted-foreground mb-1">Total MQDs</p>
          <p className="text-2xl font-bold mb-3" style={{ color: "#003566" }} data-testid="text-total-mqd">
            ${results.totalMQDs.toLocaleString()}
          </p>
          
          <div className="space-y-1 text-sm">
            {results.mqdFromFlights > 0 && (
              <div className="flex justify-between">
                <span>Flight MQDs:</span>
                <span className="font-semibold">${results.mqdFromFlights.toLocaleString()}</span>
              </div>
            )}
            {results.mqdHeadstart > 0 && (
              <div className="flex justify-between">
                <span>Card Headstart:</span>
                <span className="font-semibold">${results.mqdHeadstart.toLocaleString()}</span>
              </div>
            )}
            {results.mqdFromCard > 0 && (
              <div className="flex justify-between">
                <span>Card Spending:</span>
                <span className="font-semibold">${results.mqdFromCard.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Status Achievement */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Achievable Status</span>
              <Badge 
                className={results.achievableTier.color}
                data-testid="badge-achievable-tier"
              >
                {results.achievableTier.name}
              </Badge>
            </div>
            {results.nextTier && !results.nextTier.isGhost && (
              <>
                <Progress value={progressToNext} className="h-2 mb-2" />
                <p className="text-sm text-muted-foreground">
                  ${results.mqdToNextTier.toLocaleString()} more MQDs needed for {results.nextTier.name}
                </p>
              </>
            )}
            {progressToNext === 100 && !results.nextTier && (
              <p className="text-sm font-semibold" style={{ color: "#068D42" }}>
                Highest tier achieved! 🎉
              </p>
            )}
          </div>
        </div>

        {/* Financial Analysis */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <h4 className="font-semibold text-sm text-[#C8102E] mb-3">Value Analysis</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Estimated Miles Value ({results.redemptionDiscountApplied ? '1.29¢' : '1.1¢'} / mile)
              </span>
              <span className="font-semibold flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                <span data-testid="text-miles-value">{results.milesValue.toFixed(2)}</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Return on Spend</span>
              <span className="font-semibold text-green-600" data-testid="text-return-on-spend">
                {results.returnOnSpend.toFixed(1)}%
              </span>
            </div>
            {results.redemptionDiscountApplied && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Cardholder Benefit</span>
                <span className="font-semibold text-[#003566]">
                  15% discount on redemptions ✓
                </span>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Earning Rate */}
        <div className="p-3 rounded-lg bg-gradient-to-r from-red-50 to-blue-50 border border-red-200">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4" style={{ color: "#C8102E" }} />
            <span className="text-sm font-semibold">Loyalty Bonus</span>
          </div>
          <p className="text-lg font-bold" style={{ color: "#003566" }} data-testid="text-earning-rate">
            +{results.currentTier.earningRate} bonus SkyMiles per $1
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Total earning = base fare rate + loyalty bonus
          </p>
        </div>
      </CardContent>
    </Card>
  );
}