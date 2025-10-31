import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Award, Heart } from "lucide-react";
import { type CalculationResults, TIER_CONFIGS } from "@shared/schema";

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
        <div className="flex items-center justify-between">
          <CardTitle className="text-southwest-navy flex items-center gap-2">
            <Award className="w-5 h-5 text-southwest-blue" />
            Your Results
          </CardTitle>
          <Badge className="bg-southwest-blue text-white">
            {currentTierConfig.name}
          </Badge>
        </div>
        <CardDescription>
          Based on your activity and current tier
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Points Earned */}
        <div className="p-6 bg-gradient-to-br from-southwest-blue to-[#4a6bc9] rounded-xl text-white">
          <p className="text-sm font-medium opacity-90 mb-1">Total Points Earned</p>
          <p className="text-4xl font-bold tracking-tight" data-testid="text-total-points">
            {results.totalPointsEarned.toLocaleString()}
          </p>
          <p className="text-xs opacity-75 mt-1">
            {results.flightPointsEarned.toLocaleString()} from flights + {results.creditCardPoints.toLocaleString()} from credit cards
          </p>
          {results.creditCardPoints > 0 && (
            <p className="text-xs opacity-75 mt-1 italic">
              Note: Only flight points count toward tier status
            </p>
          )}
        </div>

        {/* Progress to Next Tier */}
        {nextTierConfig && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-foreground">
                  Progress to {nextTierConfig.name}
                </p>
              </div>

              {/* By Flights */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-muted-foreground">By Flights</span>
                  <span className="text-xs font-semibold text-foreground" data-testid="text-flight-progress">
                    {results.progressToNextTier.byFlights.toFixed(0)}%
                  </span>
                </div>
                <Progress 
                  value={results.progressToNextTier.byFlights} 
                  className="h-2.5"
                  data-testid="progress-flights"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Need {nextTierConfig.qualifyingFlights} qualifying flights
                </p>
              </div>

              {/* By Points */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-muted-foreground">By Qualifying Points</span>
                  <span className="text-xs font-semibold text-foreground" data-testid="text-points-progress">
                    {results.progressToNextTier.byPoints.toFixed(0)}%
                  </span>
                </div>
                <Progress 
                  value={results.progressToNextTier.byPoints} 
                  className="h-2.5"
                  data-testid="progress-points"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Need {nextTierConfig.qualifyingPoints.toLocaleString()} qualifying points
                </p>
              </div>
            </div>
          </div>
        )}

        {results.currentTier === "a-list-preferred" && (
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
