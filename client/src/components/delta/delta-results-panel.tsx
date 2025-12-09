import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Award, TrendingUp, CreditCard, Plane, DollarSign, Check, Building2 } from "lucide-react";
import { DeltaCalculationResults, DELTA_TIER_CONFIGS } from "@shared/delta-schema";

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


  return (
    <Card className="h-full border-2 hover-elevate" style={{ borderColor: "#C8102E" }} data-testid="card-results">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <CardTitle className="flex items-center gap-2 text-2xl" style={{ color: "#C8102E" }}>
            <Award className="w-6 h-6" />
            Your Results
          </CardTitle>
          <Badge className={results.currentTier.color}>
            {results.currentTier.name}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Three Metric Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* SkyMiles */}
          <div className="p-4 bg-gradient-to-br from-[#C8102E] to-[#a0102e] rounded-xl text-white">
            <p className="text-xs font-medium opacity-90 mb-1">SkyMiles</p>
            <p className="text-2xl font-bold tracking-tight" data-testid="text-total-miles">
              {results.totalSkyMiles.toLocaleString()}
            </p>
            <p className="text-xs opacity-75 mt-1">For award bookings</p>
          </div>

          {/* MQDs */}
          <div className="p-4 bg-gradient-to-br from-[#003566] to-[#002244] rounded-xl text-white">
            <p className="text-xs font-medium opacity-90 mb-1">MQDs</p>
            <p className="text-2xl font-bold tracking-tight" data-testid="text-total-mqd">
              ${results.totalMQDs.toLocaleString()}
            </p>
            <p className="text-xs opacity-75 mt-1">Toward status</p>
          </div>

          {/* MQMs */}
          <div className="p-4 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl text-white">
            <p className="text-xs font-medium opacity-90 mb-1">MQMs</p>
            <p className="text-2xl font-bold tracking-tight" data-testid="text-mqm">
              {results.flightSkyMiles.toLocaleString()}
            </p>
            <p className="text-xs opacity-75 mt-1">Qualification Miles</p>
          </div>
        </div>

        <Separator />

        {/* Medallion Status Progress */}
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">
              Medallion Status Progress
            </p>

            {/* Progress Bar with Tier Markers */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-muted-foreground">MQD Progress</span>
                <span className="text-xs font-semibold text-foreground" data-testid="text-mqd-progress">
                  ${results.totalMQDs.toLocaleString()} / $28,000
                </span>
              </div>
              
              {/* Sequential progress bar with markers */}
              <div className="relative">
                <Progress 
                  value={(results.totalMQDs / 28000) * 100} 
                  className="h-3"
                  data-testid="progress-mqd"
                />
                {/* Tier markers - 2025 thresholds */}
                <div className="absolute top-0 left-0 w-full h-3 pointer-events-none">
                  {/* Silver marker at ~17.9% (5k/28k) */}
                  <div 
                    className="absolute top-0 h-full w-0.5 bg-background"
                    style={{ left: '17.86%' }}
                  />
                  {/* Gold marker at ~35.7% (10k/28k) */}
                  <div 
                    className="absolute top-0 h-full w-0.5 bg-background"
                    style={{ left: '35.71%' }}
                  />
                  {/* Platinum marker at ~53.6% (15k/28k) */}
                  <div 
                    className="absolute top-0 h-full w-0.5 bg-background"
                    style={{ left: '53.57%' }}
                  />
                </div>
              </div>
              
              {/* Tier labels - 2025 thresholds */}
              <div className="flex justify-between mt-1">
                <span className="text-xs text-muted-foreground">$0</span>
                <span className={`text-xs font-medium flex items-center gap-1 ${results.totalMQDs >= 5000 ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
                  {results.totalMQDs >= 5000 && (
                    <Check className="w-3 h-3 text-green-500" />
                  )}
                  <span>$5K (Silver)</span>
                </span>
                <span className={`text-xs font-medium flex items-center gap-1 ${results.totalMQDs >= 10000 ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
                  {results.totalMQDs >= 10000 && (
                    <Check className="w-3 h-3 text-green-500" />
                  )}
                  <span>$10K (Gold)</span>
                </span>
                <span className={`text-xs font-medium flex items-center gap-1 ${results.totalMQDs >= 15000 ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
                  {results.totalMQDs >= 15000 && (
                    <Check className="w-3 h-3 text-green-500" />
                  )}
                  <span>$15K (Plat)</span>
                </span>
                <span className={`text-xs font-medium flex items-center gap-1 ${results.totalMQDs >= 28000 ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
                  {results.totalMQDs >= 28000 && (
                    <Check className="w-3 h-3 text-green-500" />
                  )}
                  <span>$28K (Diam)</span>
                </span>
              </div>
              
              {/* Next tier message */}
              {results.nextTier && !results.nextTier.isGhost && (
                <p className="text-xs text-muted-foreground mt-1" data-testid="text-mqd-to-next-tier">
                  ${results.mqdToNextTier.toLocaleString()} more MQDs to {results.nextTier.name}
                </p>
              )}
              {!results.nextTier && (
                <p className="text-xs text-green-600 font-semibold mt-1">
                  ✨ Top tier achieved - Diamond Medallion!
                </p>
              )}
            </div>

            {/* Status Summary Box */}
            <div className="p-3 bg-muted/50 rounded-lg mt-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">Remember: MQDs are the primary path to elite status</p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="font-semibold text-foreground">MQDs earned from:</span>
                  <ul className="mt-1 space-y-0.5 text-muted-foreground">
                    <li>• Delta flights (fare spending)</li>
                    <li>• Delta Amex card spending</li>
                  </ul>
                </div>
                <div>
                  <span className="font-semibold text-foreground">SkyMiles earned from:</span>
                  <ul className="mt-1 space-y-0.5 text-muted-foreground">
                    <li>• All sources (flights, cards, partners)</li>
                    <li>• Used for award bookings only</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Points/MQD Breakdown */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Earnings Breakdown</p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-[#C8102E]" />
                <span className="font-medium">Flights</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">{results.flightSkyMiles.toLocaleString()} Miles</div>
                <div className="text-xs text-muted-foreground">
                  ${results.mqdFromFlights.toLocaleString()} MQDs
                </div>
              </div>
            </div>

            {(results.cardSkyMiles > 0 || results.mqdFromCard > 0 || results.mqdHeadstart > 0) && (
              <div className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#003566]" />
                  <span className="font-medium">Credit Card</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{results.cardSkyMiles.toLocaleString()} Miles</div>
                  <div className="text-xs text-muted-foreground">
                    ${(results.mqdFromCard + results.mqdHeadstart).toLocaleString()} MQDs
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

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

        <Separator />

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
      </CardContent>
    </Card>
  );
}