import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Award, Plane, CreditCard, Building2, DollarSign } from "lucide-react";
import { type AmericanCalculationResults, AMERICAN_TIER_CONFIGS } from "@shared/american-schema";
import { Separator } from "@/components/ui/separator";

interface AmericanResultsPanelProps {
  results: AmericanCalculationResults | null;
}

export function AmericanResultsPanel({ results }: AmericanResultsPanelProps) {
  if (!results) {
    return (
      <Card className="flex items-center justify-center min-h-[400px]" data-testid="card-results-empty">
        <CardContent className="text-center py-12">
          <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground text-lg">
            Enter your activity details and click "Calculate My AAdvantage Rewards" to see your results
          </p>
        </CardContent>
      </Card>
    );
  }

  const currentTierConfig = AMERICAN_TIER_CONFIGS[results.currentTier];
  const nextTierConfig = results.nextTier ? AMERICAN_TIER_CONFIGS[results.nextTier] : null;

  return (
    <Card className="border-2 border-[#0078D2]/20" data-testid="card-results">
      <CardHeader>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <CardTitle className="text-[#00325b] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#0078D2]" />
            Your Results
          </CardTitle>
          <Badge className="bg-[#0078D2] text-white">
            {currentTierConfig.name}
          </Badge>
        </div>
        <CardDescription>
          Based on your activity and current elite status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Two Point Types Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* AAdvantage Miles */}
          <div className="p-4 bg-gradient-to-br from-[#0078D2] to-[#00325b] rounded-xl text-white">
            <p className="text-xs font-medium opacity-90 mb-1">AAdvantage Miles</p>
            <p className="text-2xl font-bold tracking-tight" data-testid="text-aadvantage-miles">
              {results.totalMiles.toLocaleString()}
            </p>
            <p className="text-xs opacity-75 mt-1">For booking flights</p>
          </div>

          {/* Loyalty Points */}
          <div className="p-4 bg-gradient-to-br from-[#C8102E] to-[#8b0020] rounded-xl text-white">
            <p className="text-xs font-medium opacity-90 mb-1">Loyalty Points</p>
            <p className="text-2xl font-bold tracking-tight" data-testid="text-loyalty-points">
              {results.totalLoyaltyPoints.toLocaleString()}
            </p>
            <p className="text-xs opacity-75 mt-1">For elite status</p>
          </div>
        </div>

        <Separator />

        {/* Points Breakdown */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-[#00325b]">Miles Breakdown</h4>
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

        {/* Loyalty Points Breakdown */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-[#00325b]">Loyalty Points Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Plane className="w-4 h-4" />
                From Flights
              </span>
              <span className="font-semibold" data-testid="text-flight-lp">
                {results.flightLoyaltyPoints.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <CreditCard className="w-4 h-4" />
                From Card Spending
              </span>
              <span className="font-semibold" data-testid="text-card-lp">
                {results.cardLoyaltyPoints.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Financial Analysis */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <h4 className="font-semibold text-sm text-[#00325b] mb-3">Value Analysis</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Estimated Miles Value (1.45¢ / mile)</span>
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
          </div>
        </div>

        <Separator />

        {/* Elite Status Progress */}
        {results.nextTier && nextTierConfig && (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-[#00325b]">Elite Status Progress</h4>
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
              <p className="text-xs text-muted-foreground" data-testid="text-lp-to-next-tier">
                {results.loyaltyPointsToNextTier.toLocaleString()} more Loyalty Points needed
              </p>
            </div>
          </div>
        )}

        {/* Top Tier Message */}
        {!results.nextTier && (
          <div className="p-4 bg-gradient-to-br from-gray-800 to-blue-900 text-white rounded-lg">
            <p className="font-semibold text-sm">
              🎉 You're at the top tier - Executive Platinum!
            </p>
            <p className="text-xs opacity-90 mt-1">
              Enjoy the highest level of benefits and privileges
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}