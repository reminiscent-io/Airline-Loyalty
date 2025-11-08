import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Award, Plane, CreditCard, Building2, DollarSign, Luggage } from "lucide-react";
import { type JetBlueCalculationResults, JETBLUE_TIER_CONFIGS } from "@shared/jetblue-schema";
import { Separator } from "@/components/ui/separator";

interface JetBlueResultsPanelProps {
  results: JetBlueCalculationResults | null;
}

export function JetBlueResultsPanel({ results }: JetBlueResultsPanelProps) {
  if (!results) {
    return (
      <Card className="flex items-center justify-center min-h-[400px]" data-testid="card-results-empty">
        <CardContent className="text-center py-12">
          <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground text-lg">
            Enter your activity details and click "Calculate My TrueBlue Points" to see your results
          </p>
        </CardContent>
      </Card>
    );
  }

  const currentTierConfig = JETBLUE_TIER_CONFIGS[results.currentTier];
  const nextTierConfig = results.nextTier ? JETBLUE_TIER_CONFIGS[results.nextTier] : null;

  return (
    <Card className="border-2 border-[#00497F]/20" data-testid="card-results">
      <CardHeader>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <CardTitle className="text-[#002244] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#0099CC]" />
            Your Results
          </CardTitle>
          <Badge className="bg-[#00497F] text-white">
            {currentTierConfig.name}
          </Badge>
        </div>
        <CardDescription>
          Based on your activity and current status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Total Points Display */}
        <div className="p-6 bg-gradient-to-r from-[#002244] to-[#0099CC] rounded-xl text-white text-center">
          <p className="text-sm font-medium opacity-90 mb-2">Total TrueBlue Points</p>
          <p className="text-4xl font-bold tracking-tight" data-testid="text-total-points">
            {results.totalPoints.toLocaleString()}
          </p>
          <p className="text-sm opacity-75 mt-2">Points never expire</p>
        </div>

        {/* Mosaic Qualification Display */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-[#00497F]/10 to-[#00497F]/5 rounded-lg">
            <p className="text-xs font-medium text-muted-foreground mb-1">Tiles Earned</p>
            <p className="text-2xl font-bold text-[#00497F]" data-testid="text-tiles">
              {results.tilesEarned}
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-[#0099CC]/10 to-[#0099CC]/5 rounded-lg">
            <p className="text-xs font-medium text-muted-foreground mb-1">Segments</p>
            <p className="text-2xl font-bold text-[#0099CC]" data-testid="text-segments">
              {results.segmentsFlown}
            </p>
          </div>
        </div>

        <Separator />

        {/* Points Breakdown */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-[#002244]">Points Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Plane className="w-4 h-4" />
                From Flights
              </span>
              <span className="font-semibold" data-testid="text-flight-points">
                {results.flightPoints.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <CreditCard className="w-4 h-4" />
                From Credit Card
              </span>
              <span className="font-semibold" data-testid="text-card-points">
                {results.creditCardPoints.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="w-4 h-4" />
                From Partners
              </span>
              <span className="font-semibold" data-testid="text-partner-points">
                {results.partnerPoints.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <Separator />


        {/* Mosaic Status Progress */}
        {results.nextTier && nextTierConfig && (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-[#002244]">Mosaic Progress</h4>
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
                <p className="text-xs text-muted-foreground" data-testid="text-tiles-to-next-tier">
                  {results.tilesToNextTier} more tiles needed
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
          <div className="p-4 bg-gradient-to-r from-[#FFA500] to-[#FF6F00] text-white rounded-lg">
            <p className="font-semibold text-sm">
              🎉 You're at the top tier - Mosaic Elite!
            </p>
            <p className="text-xs opacity-90 mt-1">
              Enjoy unlimited Mint upgrades and all premium benefits
            </p>
          </div>
        )}

        <Separator />

        {/* Financial Analysis */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <h4 className="font-semibold text-sm text-[#002244] mb-3">Value Analysis</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Estimated Points Value (1.45¢ / pt)</span>
              <span className="font-semibold flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                <span data-testid="text-points-value">{results.pointsValue.toFixed(2)}</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Spent</span>
              <span className="font-semibold flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                <span data-testid="text-total-spent">{results.totalCost.toFixed(2)}</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Return on Spend</span>
              <span className="font-semibold text-green-600" data-testid="text-return-on-spend">
                {results.returnOnSpend.toFixed(1)}%
              </span>
            </div>
            {results.mosaicBoostApplied && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Mosaic Boost</span>
                <span className="font-semibold text-[#FFA500]">
                  Applied ✓
                </span>
              </div>
            )}
            {results.freeCheckedBagValue > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Baggage Savings</span>
                <span className="font-semibold">
                  <Luggage className="w-4 h-4 inline mr-1" />
                  ${results.freeCheckedBagValue.toFixed(0)}/year
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}