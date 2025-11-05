import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Award, Plane, CreditCard, Building2, DollarSign, Ticket } from "lucide-react";
import { type AtmosCalculationResults, ATMOS_TIER_CONFIGS } from "@shared/atmos-schema";
import { Separator } from "@/components/ui/separator";

interface AtmosResultsPanelProps {
  results: AtmosCalculationResults | null;
}

export function AtmosResultsPanel({ results }: AtmosResultsPanelProps) {
  if (!results) {
    return (
      <Card className="flex items-center justify-center min-h-[400px]" data-testid="card-results-empty">
        <CardContent className="text-center py-12">
          <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground text-lg">
            Enter your activity details and click "Calculate My Atmos Rewards" to see your results
          </p>
        </CardContent>
      </Card>
    );
  }

  const currentTierConfig = ATMOS_TIER_CONFIGS[results.currentTier];
  const nextTierConfig = results.nextTier ? ATMOS_TIER_CONFIGS[results.nextTier] : null;

  return (
    <Card className="border-2 border-[#00467F]/20" data-testid="card-results">
      <CardHeader>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <CardTitle className="text-[#00467F] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#7AC142]" />
            Your Results
          </CardTitle>
          <Badge className="bg-[#00467F] text-white">
            {currentTierConfig.name}
          </Badge>
        </div>
        <CardDescription>
          Based on your activity and current elite status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Total Miles Display */}
        <div className="p-6 bg-gradient-to-r from-[#00467F] to-[#7AC142] rounded-xl text-white text-center">
          <p className="text-sm font-medium opacity-90 mb-2">Total Miles Earned</p>
          <p className="text-4xl font-bold tracking-tight" data-testid="text-total-miles">
            {results.totalMiles.toLocaleString()}
          </p>
          <p className="text-sm opacity-75 mt-2">Redeemable Miles</p>
        </div>

        {/* Elite Qualification Display */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-[#00467F]/10 to-[#00467F]/5 rounded-lg">
            <p className="text-xs font-medium text-muted-foreground mb-1">Elite Miles</p>
            <p className="text-2xl font-bold text-[#00467F]" data-testid="text-elite-miles">
              {results.eliteQualifyingMiles.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-[#7AC142]/10 to-[#7AC142]/5 rounded-lg">
            <p className="text-xs font-medium text-muted-foreground mb-1">Elite Segments</p>
            <p className="text-2xl font-bold text-[#7AC142]" data-testid="text-elite-segments">
              {results.eliteQualifyingSegments}
            </p>
          </div>
        </div>

        <Separator />

        {/* Miles Breakdown */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-[#00467F]">Miles Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Plane className="w-4 h-4" />
                From Flights
              </span>
              <span className="font-semibold" data-testid="text-flight-miles">
                {results.flightMiles.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <CreditCard className="w-4 h-4" />
                From Credit Card
              </span>
              <span className="font-semibold" data-testid="text-card-miles">
                {results.creditCardMiles.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="w-4 h-4" />
                From Partners
              </span>
              <span className="font-semibold" data-testid="text-partner-miles">
                {results.partnerMiles.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Financial Analysis */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <h4 className="font-semibold text-sm text-[#00467F] mb-3">Value Analysis</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Estimated Miles Value</span>
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
            {results.companionFareAvailable && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Companion Fare</span>
                <span className="font-semibold text-[#7AC142]">
                  <Ticket className="w-4 h-4 inline mr-1" />
                  Available
                </span>
              </div>
            )}
            {results.freeCheckedBagValue > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Baggage Savings</span>
                <span className="font-semibold">
                  ${results.freeCheckedBagValue.toFixed(0)}/year
                </span>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Elite Status Progress */}
        {results.nextTier && nextTierConfig && (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-[#00467F]">Elite Status Progress</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress to {nextTierConfig.name}</span>
                <span className="font-semibold" data-testid="text-percent-to-next-tier">
                  {results.percentToNextTier.toFixed(0)}%
                </span>
              </div>
              <Progress 
                value={results.percentToNextTier} 
                className="h-2"
                data-testid="progress-next-tier"
              />
              <div className="grid grid-cols-2 gap-2">
                <p className="text-xs text-muted-foreground" data-testid="text-miles-to-next-tier">
                  {results.milesToNextTier.toLocaleString()} more miles needed
                </p>
                <p className="text-xs text-muted-foreground text-right" data-testid="text-segments-to-next-tier">
                  {results.segmentsToNextTier} more segments needed
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Top Tier Message */}
        {!results.nextTier && (
          <div className="p-4 bg-gradient-to-r from-[#7AC142] to-[#68A02E] text-white rounded-lg">
            <p className="font-semibold text-sm">
              🎉 You're at the top tier - MVP Gold 100K!
            </p>
            <p className="text-xs opacity-90 mt-1">
              Enjoy the highest level of benefits and choice perks
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}