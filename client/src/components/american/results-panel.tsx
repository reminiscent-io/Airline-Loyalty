import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Award, Plane, CreditCard, Building2, DollarSign, Check } from "lucide-react";
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

  // Determine next year's status based on current Loyalty Points
  const getNextYearStatus = (loyaltyPoints: number) => {
    if (loyaltyPoints >= 200000) return "executive-platinum";
    if (loyaltyPoints >= 125000) return "platinum-pro";
    if (loyaltyPoints >= 75000) return "platinum";
    if (loyaltyPoints >= 40000) return "gold";
    return "member";
  };

  const nextYearStatus = getNextYearStatus(results.totalLoyaltyPoints);
  const nextYearStatusConfig = AMERICAN_TIER_CONFIGS[nextYearStatus];

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
        
        {/* Two Point Types Display - Loyalty Points FIRST and BIGGER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Loyalty Points - THE Status Currency */}
          <div className="p-5 bg-gradient-to-br from-[#C8102E] to-[#8b0020] rounded-xl text-white shadow-lg">
            <p className="text-xs font-bold opacity-90 mb-2 uppercase tracking-wide">Loyalty Points</p>
            <p className="text-3xl font-bold tracking-tight" data-testid="text-loyalty-points">
              {results.totalLoyaltyPoints.toLocaleString()}
            </p>
            <p className="text-sm font-semibold opacity-90 mt-2">✨ THE Status Currency</p>
            <p className="text-xs opacity-75">Only way to earn elite status</p>
          </div>

          {/* AAdvantage Miles - For Booking */}
          <div className="p-4 bg-gradient-to-br from-[#0078D2] to-[#00325b] rounded-xl text-white">
            <p className="text-xs font-medium opacity-90 mb-1">AAdvantage Miles</p>
            <p className="text-2xl font-bold tracking-tight" data-testid="text-aadvantage-miles">
              {results.totalMiles.toLocaleString()}
            </p>
            <p className="text-xs opacity-75 mt-1">For booking award flights</p>
          </div>
        </div>

        <Separator />

        {/* Elite Status Progress - Simplified with Tier Markers */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <p className="text-sm font-semibold text-foreground">
              Elite Status Progress (via Loyalty Points)
            </p>
            <div className="flex gap-4 flex-wrap">
              {/* Current Year Status */}
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">This Year</span>
                <Badge 
                  className={
                    results.currentTier === "executive-platinum" ? "bg-gray-800 text-white" :
                    results.currentTier === "platinum-pro" ? "bg-purple-700 text-white" :
                    results.currentTier === "platinum" ? "bg-gray-600 text-white" :
                    results.currentTier === "gold" ? "bg-yellow-600 text-white" :
                    "bg-[#0078D2] text-white"
                  }
                >
                  <Award className="w-3 h-3 mr-1" />
                  {currentTierConfig.name}
                </Badge>
              </div>
              
              {/* Next Year Status */}
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">Next Year</span>
                <Badge 
                  className={
                    nextYearStatus === "executive-platinum" ? "bg-gray-800 text-white" :
                    nextYearStatus === "platinum-pro" ? "bg-purple-700 text-white" :
                    nextYearStatus === "platinum" ? "bg-gray-600 text-white" :
                    nextYearStatus === "gold" ? "bg-yellow-600 text-white" :
                    "bg-[#0078D2] text-white"
                  }
                >
                  <Award className="w-3 h-3 mr-1" />
                  {nextYearStatusConfig.name}
                </Badge>
              </div>
            </div>
          </div>

          {/* Progress Bar with Tier Markers */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-muted-foreground">Loyalty Points Progress</span>
              <span className="text-xs font-semibold text-foreground" data-testid="text-lp-progress">
                {results.totalLoyaltyPoints.toLocaleString()} / 200,000 LP
              </span>
            </div>
            
            {/* Sequential progress bar with markers */}
            <div className="relative">
              <Progress 
                value={(results.totalLoyaltyPoints / 200000) * 100} 
                className="h-3"
                data-testid="progress-loyalty-points"
              />
              {/* Tier markers */}
              <div className="absolute top-0 left-0 w-full h-3 pointer-events-none">
                {/* Gold marker at 20% (40k/200k) */}
                <div 
                  className="absolute top-0 h-full w-0.5 bg-background"
                  style={{ left: '20%' }}
                />
                {/* Platinum marker at 37.5% (75k/200k) */}
                <div 
                  className="absolute top-0 h-full w-0.5 bg-background"
                  style={{ left: '37.5%' }}
                />
                {/* Platinum Pro marker at 62.5% (125k/200k) */}
                <div 
                  className="absolute top-0 h-full w-0.5 bg-background"
                  style={{ left: '62.5%' }}
                />
              </div>
            </div>
            
            {/* Tier labels */}
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">0</span>
              <span className={`text-xs font-medium flex items-center gap-1 ${results.totalLoyaltyPoints >= 40000 ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
                {results.totalLoyaltyPoints >= 40000 && (
                  <Check className="w-3 h-3 text-green-500" />
                )}
                <span>40K (Gold)</span>
              </span>
              <span className={`text-xs font-medium flex items-center gap-1 ${results.totalLoyaltyPoints >= 75000 ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
                {results.totalLoyaltyPoints >= 75000 && (
                  <Check className="w-3 h-3 text-green-500" />
                )}
                <span>75K (Platinum)</span>
              </span>
              <span className={`text-xs font-medium flex items-center gap-1 ${results.totalLoyaltyPoints >= 125000 ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
                {results.totalLoyaltyPoints >= 125000 && (
                  <Check className="w-3 h-3 text-green-500" />
                )}
                <span>125K (Pro)</span>
              </span>
              <span className={`text-xs font-medium flex items-center gap-1 ${results.totalLoyaltyPoints >= 200000 ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
                {results.totalLoyaltyPoints >= 200000 && (
                  <Check className="w-3 h-3 text-green-500" />
                )}
                <span>200K (Exec)</span>
              </span>
            </div>
            
            {/* Next tier message */}
            {results.nextTier && nextTierConfig && (
              <p className="text-xs text-muted-foreground mt-1" data-testid="text-lp-to-next-tier">
                {results.loyaltyPointsToNextTier.toLocaleString()} more Loyalty Points to {nextTierConfig.name}
              </p>
            )}
            {!results.nextTier && (
              <p className="text-xs text-green-600 font-semibold mt-1">
                ✨ Top tier achieved - Executive Platinum!
              </p>
            )}
          </div>

          {/* Status Summary Box */}
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs font-medium text-muted-foreground mb-2">Remember: Loyalty Points is the ONLY path to elite status</p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-semibold text-foreground">Loyalty Points earned from:</span>
                <ul className="mt-1 space-y-0.5 text-muted-foreground">
                  <li>• Flights on American Airlines</li>
                  <li>• AAdvantage credit card spending</li>
                </ul>
              </div>
              <div>
                <span className="font-semibold text-foreground">Miles earned from:</span>
                <ul className="mt-1 space-y-0.5 text-muted-foreground">
                  <li>• All sources (flights, cards, partners)</li>
                  <li>• Used for award bookings only</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Combined Points Breakdown - Simplified */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Points Breakdown</p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-[#0078D2]" />
                <span className="font-medium">Flights</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">{results.flightMiles.toLocaleString()} Miles</div>
                <div className="text-xs text-muted-foreground">
                  {results.flightLoyaltyPoints.toLocaleString()} LP
                </div>
              </div>
            </div>

            {(results.creditCardMiles > 0 || results.cardLoyaltyPoints > 0) && (
              <div className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#C8102E]" />
                  <span className="font-medium">Credit Card</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{results.creditCardMiles.toLocaleString()} Miles</div>
                  <div className="text-xs text-muted-foreground">
                    {results.cardLoyaltyPoints.toLocaleString()} LP
                  </div>
                </div>
              </div>
            )}

            {results.partnerMiles > 0 && (
              <div className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#00325b]" />
                  <span className="font-medium">Partners</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{results.partnerMiles.toLocaleString()} Miles</div>
                  <div className="text-xs text-muted-foreground">
                    0 LP <span className="opacity-60">(no LP from partners)</span>
                  </div>
                </div>
              </div>
            )}
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
      </CardContent>
    </Card>
  );
}