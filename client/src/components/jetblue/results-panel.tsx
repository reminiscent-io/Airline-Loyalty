import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Award, Plane, CreditCard, Building2, DollarSign, Luggage, Check } from "lucide-react";
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
        
        {/* Three Metric Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* TrueBlue Points */}
          <div className="p-4 bg-gradient-to-br from-[#002244] to-[#001833] rounded-xl text-white">
            <p className="text-xs font-medium opacity-90 mb-1">TrueBlue Points</p>
            <p className="text-2xl font-bold tracking-tight" data-testid="text-total-points">
              {results.totalPoints.toLocaleString()}
            </p>
            <p className="text-xs opacity-75 mt-1">Never expire</p>
          </div>

          {/* Tiles */}
          <div className="p-4 bg-gradient-to-br from-[#0099CC] to-[#0077aa] rounded-xl text-white">
            <p className="text-xs font-medium opacity-90 mb-1">Tiles</p>
            <p className="text-2xl font-bold tracking-tight" data-testid="text-tiles">
              {results.tilesEarned}
            </p>
            <p className="text-xs opacity-75 mt-1">Toward Mosaic</p>
          </div>

          {/* Points Value */}
          <div className="p-4 bg-gradient-to-br from-[#FFA500] to-[#FF8800] rounded-xl text-white">
            <p className="text-xs font-medium opacity-90 mb-1">Points Value</p>
            <p className="text-2xl font-bold tracking-tight" data-testid="text-points-value">
              ${results.pointsValue.toFixed(0)}
            </p>
            <p className="text-xs opacity-75 mt-1">@ 1.3¢ per point</p>
          </div>
        </div>

        <Separator />

        {/* Mosaic Status Progress */}
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">
              Mosaic Status Progress
            </p>

            {/* Progress Bar with Tier Markers */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-muted-foreground">Tiles Progress</span>
                <span className="text-xs font-semibold text-foreground" data-testid="text-tiles-progress">
                  {results.tilesEarned} / 250 tiles
                </span>
              </div>
              
              {/* Sequential progress bar with markers */}
              <div className="relative">
                <Progress 
                  value={(results.tilesEarned / 250) * 100} 
                  className="h-3"
                  data-testid="progress-tiles"
                />
                {/* Tier markers */}
                <div className="absolute top-0 left-0 w-full h-3 pointer-events-none">
                  {/* Mosaic 1 marker at 20% (50/250) */}
                  <div 
                    className="absolute top-0 h-full w-0.5 bg-background"
                    style={{ left: '20%' }}
                  />
                  {/* Mosaic 2 marker at 40% (100/250) */}
                  <div 
                    className="absolute top-0 h-full w-0.5 bg-background"
                    style={{ left: '40%' }}
                  />
                  {/* Mosaic 3 marker at 60% (150/250) */}
                  <div 
                    className="absolute top-0 h-full w-0.5 bg-background"
                    style={{ left: '60%' }}
                  />
                </div>
              </div>
              
              {/* Tier labels */}
              <div className="flex justify-between mt-1">
                <span className="text-xs text-muted-foreground">0</span>
                <span className={`text-xs font-medium flex items-center gap-1 ${results.tilesEarned >= 50 ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
                  {results.tilesEarned >= 50 && (
                    <Check className="w-3 h-3 text-green-500" />
                  )}
                  <span>50 (M1)</span>
                </span>
                <span className={`text-xs font-medium flex items-center gap-1 ${results.tilesEarned >= 100 ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
                  {results.tilesEarned >= 100 && (
                    <Check className="w-3 h-3 text-green-500" />
                  )}
                  <span>100 (M2)</span>
                </span>
                <span className={`text-xs font-medium flex items-center gap-1 ${results.tilesEarned >= 150 ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
                  {results.tilesEarned >= 150 && (
                    <Check className="w-3 h-3 text-green-500" />
                  )}
                  <span>150 (M3)</span>
                </span>
                <span className={`text-xs font-medium flex items-center gap-1 ${results.tilesEarned >= 250 ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
                  {results.tilesEarned >= 250 && (
                    <Check className="w-3 h-3 text-green-500" />
                  )}
                  <span>250 (M4)</span>
                </span>
              </div>
              
              {/* Next tier message */}
              {results.nextTier && nextTierConfig && (
                <p className="text-xs text-muted-foreground mt-1" data-testid="text-tiles-to-next-tier">
                  {results.tilesToNextTier} more tiles to {nextTierConfig.name}
                </p>
              )}
              {!results.nextTier && (
                <p className="text-xs text-green-600 font-semibold mt-1">
                  ✨ Top tier achieved - Mosaic 4!
                </p>
              )}
            </div>

            {/* Status Summary Box */}
            <div className="p-3 bg-muted/50 rounded-lg mt-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">How to earn Mosaic tiles</p>
              <div className="text-xs">
                <span className="font-semibold text-foreground">Tiles earned from spending:</span>
                <ul className="mt-1 space-y-0.5 text-muted-foreground">
                  <li>• 1 tile per $100 spent on JetBlue flights</li>
                  <li>• 1 tile per $1,000 spent on JetBlue Plus/Business card</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Points Breakdown */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Points & Tiles Breakdown</p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-[#002244]" />
                <span className="font-medium">Flights</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">{results.flightPoints.toLocaleString()} Points</div>
                <div className="text-xs text-muted-foreground">
                  {Math.floor(results.tilesEarned)} tiles
                </div>
              </div>
            </div>

            {results.creditCardPoints > 0 && (
              <div className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#0099CC]" />
                  <span className="font-medium">Credit Card</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{results.creditCardPoints.toLocaleString()} Points</div>
                  <div className="text-xs text-muted-foreground">
                    {results.mosaicBoostApplied ? "+3 bonus/dollar" : "No bonus"}
                  </div>
                </div>
              </div>
            )}

            {results.partnerPoints > 0 && (
              <div className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#FFA500]" />
                  <span className="font-medium">Partners</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{results.partnerPoints.toLocaleString()} Points</div>
                  <div className="text-xs text-muted-foreground">
                    0 tiles (partners don't earn tiles)
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

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