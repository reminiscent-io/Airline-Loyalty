import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Award, Heart, Plane, CreditCard, Building2, DollarSign } from "lucide-react";
import { type CalculationResults, TIER_CONFIGS } from "@shared/schema";
import { Separator } from "@/components/ui/separator";

interface ResultsPanelProps {
  results: CalculationResults | null;
}

export function ResultsPanel({ results }: ResultsPanelProps) {
  if (!results) {
    return (
      <Card className="flex items-center justify-center min-h-[400px]" data-testid="card-results-empty">
        <CardContent className="text-center py-12">
          <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground text-lg">
            Enter your activity details and click "Calculate My Rewards" to see your results
          </p>
        </CardContent>
      </Card>
    );
  }

  const currentTierConfig = TIER_CONFIGS[results.currentTier];
  const nextTierConfig = results.nextTier ? TIER_CONFIGS[results.nextTier] : null;

  return (
    <Card className="border-2 border-southwest-blue/20" data-testid="card-results">
      <CardHeader>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <CardTitle className="text-southwest-navy flex items-center gap-2">
            <Award className="w-5 h-5 text-southwest-blue" />
            Your Results
          </CardTitle>
          <Badge className="bg-southwest-blue text-white">
            {currentTierConfig.name}
          </Badge>
        </div>
        <CardDescription>
          Based on your activity and current tier status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Three Point Types Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* RR Points */}
          <div className="p-4 bg-gradient-to-br from-southwest-blue to-[#4a6bc9] rounded-xl text-white">
            <p className="text-xs font-medium opacity-90 mb-1">Rapid Rewards Points</p>
            <p className="text-2xl font-bold tracking-tight" data-testid="text-rr-points">
              {results.totalRRPoints.toLocaleString()}
            </p>
            <p className="text-xs opacity-75 mt-1">For booking flights</p>
          </div>

          {/* CQP */}
          <div className="p-4 bg-gradient-to-br from-southwest-gold/90 to-[#e6b022] rounded-xl text-white">
            <p className="text-xs font-medium opacity-90 mb-1">Companion Qualifying</p>
            <p className="text-2xl font-bold tracking-tight" data-testid="text-cqp">
              {results.totalCQP.toLocaleString()}
            </p>
            <p className="text-xs opacity-75 mt-1">Toward Companion Pass</p>
          </div>

          {/* TQP */}
          <div className="p-4 bg-gradient-to-br from-southwest-red to-[#d62f3b] rounded-xl text-white">
            <p className="text-xs font-medium opacity-90 mb-1">Tier Qualifying</p>
            <p className="text-2xl font-bold tracking-tight" data-testid="text-tqp">
              {results.totalTQP.toLocaleString()}
            </p>
            <p className="text-xs opacity-75 mt-1">Toward tier status</p>
          </div>
        </div>

        {/* Points Breakdown */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Points Breakdown</p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-southwest-blue" />
                <span className="font-medium">Flights</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">{results.flightRRPoints.toLocaleString()} RR</div>
                <div className="text-xs text-muted-foreground">
                  {results.flightCQP.toLocaleString()} CQP | {results.flightTQP.toLocaleString()} TQP
                </div>
              </div>
            </div>

            {(results.cardRRPoints > 0 || results.cardCQP > 0 || results.cardTQP > 0) && (
              <div className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-southwest-gold" />
                  <span className="font-medium">Credit Card</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{results.cardRRPoints.toLocaleString()} RR</div>
                  <div className="text-xs text-muted-foreground">
                    {results.cardCQP.toLocaleString()} CQP | {results.cardTQP.toLocaleString()} TQP
                  </div>
                </div>
              </div>
            )}

            {(results.partnerRRPoints > 0 || results.partnerCQP > 0) && (
              <div className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-southwest-red" />
                  <span className="font-medium">Partners</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{results.partnerRRPoints.toLocaleString()} RR</div>
                  <div className="text-xs text-muted-foreground">
                    {results.partnerCQP.toLocaleString()} CQP
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Financial Analysis */}
        <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-green-700 dark:text-green-400" />
            <p className="text-sm font-semibold text-green-900 dark:text-green-100">Financial Analysis</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Redemption Value</p>
              <p className="font-bold text-green-700 dark:text-green-400">${results.redemptionValue.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">At 1.4¢ per point</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Return on Spend</p>
              <p className="font-bold text-green-700 dark:text-green-400">{results.returnOnSpend.toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground">Total cost: ${results.totalCost.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Progress to Next Tier */}
        {nextTierConfig && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <p className="text-sm font-semibold text-foreground">
                  Progress to {nextTierConfig.name}
                </p>
                {results.qualifiedForNextTier && (
                  <Badge className="bg-green-600 text-white">
                    Qualified!
                  </Badge>
                )}
              </div>

              {/* By Flights */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-muted-foreground">By Flights</span>
                  <span className="text-xs font-semibold text-foreground" data-testid="text-flight-progress">
                    {results.progressToNextTier.flightsCurrent} / {results.progressToNextTier.flightsNeeded} ({results.progressToNextTier.byFlights.toFixed(0)}%)
                  </span>
                </div>
                <Progress 
                  value={results.progressToNextTier.byFlights} 
                  className="h-2.5"
                  data-testid="progress-flights"
                />
              </div>

              {/* By TQP */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-muted-foreground">By Tier Qualifying Points</span>
                  <span className="text-xs font-semibold text-foreground" data-testid="text-tqp-progress">
                    {results.progressToNextTier.tqpCurrent.toLocaleString()} / {results.progressToNextTier.tqpNeeded.toLocaleString()} ({results.progressToNextTier.byTQP.toFixed(0)}%)
                  </span>
                </div>
                <Progress 
                  value={results.progressToNextTier.byTQP} 
                  className="h-2.5"
                  data-testid="progress-tqp"
                />
              </div>
            </div>
          </div>
        )}

        {results.currentTier === "a-list-preferred" && !nextTierConfig && (
          <div className="p-4 bg-southwest-red/10 border border-southwest-red/20 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Heart className="w-4 h-4 text-southwest-red fill-southwest-red" />
              <p className="text-sm font-semibold text-southwest-red">
                You've reached the highest tier!
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Enjoy all the premium benefits of A-List Preferred status
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
