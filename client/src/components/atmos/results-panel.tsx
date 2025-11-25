import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Award, Plane, CreditCard, Building2, DollarSign, Ticket, Trophy, Sparkles, Coffee, Check } from "lucide-react";
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
            Enter your activity details and click "Calculate My Atmos Points" to see your results
          </p>
        </CardContent>
      </Card>
    );
  }

  const currentTierConfig = ATMOS_TIER_CONFIGS[results.currentTier];
  const nextTierConfig = results.nextTier ? ATMOS_TIER_CONFIGS[results.nextTier] : null;

  // Format earning method display
  const getEarningMethodDisplay = () => {
    switch (results.earningMethodUsed) {
      case "distance":
        return "Distance-Based";
      case "spend":
        return "Spend-Based";
      case "segment":
        return "Segment-Based";
      default:
        return results.earningMethodUsed;
    }
  };

  return (
    <Card className="border-2 border-[#00467F]/20" data-testid="card-results">
      <CardHeader>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <CardTitle className="text-[#00467F] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#7AC142]" />
            Your 2026 Atmos Results
          </CardTitle>
          <Badge className="bg-[#00467F] text-white">
            {currentTierConfig.name}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-2">
          Earning Method: <Badge variant="outline" className="text-xs">
            {getEarningMethodDisplay()} • {results.baseEarningRate}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Points Display - Split into two types */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-gradient-to-r from-[#00467F] to-[#0066CC] rounded-xl text-white">
            <p className="text-xs font-medium opacity-90 mb-2">Redeemable Points</p>
            <p className="text-3xl font-bold tracking-tight" data-testid="text-redeemable-points">
              {results.totalRedeemablePoints.toLocaleString()}
            </p>
            <p className="text-xs opacity-75 mt-2">For award flights</p>
          </div>
          
          <div className="p-6 bg-gradient-to-r from-[#7AC142] to-[#68A02E] rounded-xl text-white">
            <p className="text-xs font-medium opacity-90 mb-2">Status Points</p>
            <p className="text-3xl font-bold tracking-tight" data-testid="text-status-points">
              {results.totalStatusPoints.toLocaleString()}
            </p>
            <p className="text-xs opacity-75 mt-2">For elite status</p>
          </div>
        </div>

        {/* Head Start Bonus Display (if applicable) */}
        {results.headStartBonus > 0 && (
          <div className="p-4 bg-gradient-to-r from-[#7B1E7A]/10 to-[#014A6E]/10 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm">
                <Sparkles className="w-4 h-4 text-[#7B1E7A]" />
                <span className="font-semibold">Head Start Bonus</span>
                <Badge variant="outline" className="text-xs">
                  {results.currentTier === "platinum" ? "Platinum" : "Titanium"}
                </Badge>
              </span>
              <span className="font-bold text-[#7B1E7A]" data-testid="text-head-start-bonus">
                +{results.headStartBonus.toLocaleString()} status points
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Automatic yearly boost for top-tier members
            </p>
          </div>
        )}

        <Separator />

        {/* Points Breakdown */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-[#00467F]">Points Breakdown</h4>
          
          {/* Redeemable Points */}
          <div className="pl-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">Redeemable Points</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Plane className="w-4 h-4" />
                  From Flights
                </span>
                <span className="font-semibold" data-testid="text-flight-redeemable-points">
                  {results.flightRedeemablePoints.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <CreditCard className="w-4 h-4" />
                  From Credit Card
                </span>
                <span className="font-semibold" data-testid="text-card-redeemable-points">
                  {results.creditCardRedeemablePoints.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="w-4 h-4" />
                  From Partners
                </span>
                <span className="font-semibold" data-testid="text-partner-redeemable-points">
                  {results.partnerRedeemablePoints.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          
          {/* Status Points */}
          <div className="pl-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">Status Points</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Plane className="w-4 h-4" />
                  From Flights
                </span>
                <span className="font-semibold" data-testid="text-flight-status-points">
                  {results.flightStatusPoints.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <CreditCard className="w-4 h-4" />
                  From Credit Card
                </span>
                <span className="font-semibold" data-testid="text-card-status-points">
                  {results.creditCardStatusPoints.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Trophy className="w-4 h-4" />
                  From Award Redemptions
                </span>
                <span className="font-semibold" data-testid="text-award-status-points">
                  {results.awardRedemptionStatusPoints.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Elite Status Requalification Progress - Shows all tiers like Delta */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-[#00467F]">Status Requalification Progress</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Status Points Earned</span>
              <span className="font-semibold" data-testid="text-total-status-display">
                {results.totalStatusPoints.toLocaleString()} / 135,000
              </span>
            </div>
            
            {/* Progress bar with tier markers */}
            <div className="relative">
              <Progress 
                value={Math.min(100, (results.totalStatusPoints / 135000) * 100)} 
                className="h-3"
                data-testid="progress-requalification"
              />
              {/* Tier markers on the progress bar */}
              <div className="absolute top-0 left-0 w-full h-3 pointer-events-none">
                {/* Silver marker at 14.8% (20k/135k) */}
                <div 
                  className="absolute top-0 h-full w-0.5 bg-background"
                  style={{ left: `${(20000/135000) * 100}%` }}
                />
                {/* Gold marker at 29.6% (40k/135k) */}
                <div 
                  className="absolute top-0 h-full w-0.5 bg-background"
                  style={{ left: `${(40000/135000) * 100}%` }}
                />
                {/* Platinum marker at 59.3% (80k/135k) */}
                <div 
                  className="absolute top-0 h-full w-0.5 bg-background"
                  style={{ left: `${(80000/135000) * 100}%` }}
                />
              </div>
            </div>
            
            {/* Tier labels with checkmarks */}
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">0</span>
              <span className={`text-xs font-medium flex items-center gap-1 ${results.totalStatusPoints >= 20000 ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
                {results.totalStatusPoints >= 20000 && (
                  <Check className="w-3 h-3 text-green-500" />
                )}
                <span>20K (Silver)</span>
              </span>
              <span className={`text-xs font-medium flex items-center gap-1 ${results.totalStatusPoints >= 40000 ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
                {results.totalStatusPoints >= 40000 && (
                  <Check className="w-3 h-3 text-green-500" />
                )}
                <span>40K (Gold)</span>
              </span>
              <span className={`text-xs font-medium flex items-center gap-1 ${results.totalStatusPoints >= 80000 ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
                {results.totalStatusPoints >= 80000 && (
                  <Check className="w-3 h-3 text-green-500" />
                )}
                <span>80K (Plat)</span>
              </span>
              <span className={`text-xs font-medium flex items-center gap-1 ${results.totalStatusPoints >= 135000 ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
                {results.totalStatusPoints >= 135000 && (
                  <Check className="w-3 h-3 text-green-500" />
                )}
                <span>135K (Titan)</span>
              </span>
            </div>
            
            {/* Next tier message */}
            {results.nextTier && nextTierConfig ? (
              <p className="text-xs text-muted-foreground mt-1" data-testid="text-status-points-to-next-tier">
                {results.statusPointsToNextTier.toLocaleString()} more status points to {nextTierConfig.name}
              </p>
            ) : (
              <p className="text-xs text-green-600 font-semibold mt-1">
                Top tier achieved - Atmos Titanium!
              </p>
            )}
          </div>
        </div>

        <Separator />

        {/* Financial Analysis */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <h4 className="font-semibold text-sm text-[#00467F] mb-3">Value Analysis</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Estimated Points Value (1.6¢ / point)</span>
              <span className="font-semibold flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                <span data-testid="text-points-value">{results.pointsValue.toFixed(2)}</span>
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
            {results.loungeAccessValue > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Lounge Access Value</span>
                <span className="font-semibold text-[#014A6E] flex items-center gap-1">
                  <Coffee className="w-4 h-4" />
                  <span data-testid="text-lounge-value">${results.loungeAccessValue.toFixed(0)}/year</span>
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
      </CardContent>
    </Card>
  );
}