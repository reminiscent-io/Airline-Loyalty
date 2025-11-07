import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Award, Plane, CreditCard, Building2, DollarSign, Target } from "lucide-react";
import { type UnitedCalculationResults, UNITED_TIER_CONFIGS } from "@shared/united-schema";
import { Separator } from "@/components/ui/separator";

interface UnitedResultsPanelProps {
  results: UnitedCalculationResults | null;
}

export function UnitedResultsPanel({ results }: UnitedResultsPanelProps) {
  if (!results) {
    return (
      <Card className="flex items-center justify-center min-h-[400px]" data-testid="card-results-empty">
        <CardContent className="text-center py-12">
          <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground text-lg">
            Enter your activity details and click "Calculate My MileagePlus Rewards" to see your results
          </p>
        </CardContent>
      </Card>
    );
  }

  const currentTierConfig = UNITED_TIER_CONFIGS[results.currentTier];
  const nextTierConfig = results.nextTier ? UNITED_TIER_CONFIGS[results.nextTier] : null;

  return (
    <Card className="border-2 border-[#002244]/20" data-testid="card-results">
      <CardHeader>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <CardTitle className="text-[#002244] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#0074C8]" />
            Your Results
          </CardTitle>
          <Badge className="bg-[#002244] text-white">
            {currentTierConfig.name}
          </Badge>
        </div>
        <CardDescription>
          Based on your activity and current Premier status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Three Point Types Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Award Miles */}
          <div className="p-4 bg-gradient-to-br from-[#002244] to-[#001833] rounded-xl text-white">
            <p className="text-xs font-medium opacity-90 mb-1">Award Miles</p>
            <p className="text-2xl font-bold tracking-tight" data-testid="text-award-miles">
              {results.totalMiles.toLocaleString()}
            </p>
            <p className="text-xs opacity-75 mt-1">For booking flights</p>
          </div>

          {/* PQP */}
          <div className="p-4 bg-gradient-to-br from-[#0074C8] to-[#0056a3] rounded-xl text-white">
            <p className="text-xs font-medium opacity-90 mb-1">PQP</p>
            <p className="text-2xl font-bold tracking-tight" data-testid="text-pqp">
              {results.totalPQP.toLocaleString()}
            </p>
            <p className="text-xs opacity-75 mt-1">Qualifying Points</p>
          </div>

          {/* PQF */}
          <div className="p-4 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl text-white">
            <p className="text-xs font-medium opacity-90 mb-1">PQF</p>
            <p className="text-2xl font-bold tracking-tight" data-testid="text-pqf">
              {results.totalPQF}
            </p>
            <p className="text-xs opacity-75 mt-1">Qualifying Flights</p>
          </div>
        </div>

        <Separator />

        {/* Miles Breakdown */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-[#002244]">Miles Breakdown</h4>
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

        {/* PQP Breakdown */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-[#002244]">PQP Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Plane className="w-4 h-4" />
                From Flights
              </span>
              <span className="font-semibold" data-testid="text-flight-pqp">
                {results.flightPQP.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <CreditCard className="w-4 h-4" />
                From Card Spending
              </span>
              <span className="font-semibold" data-testid="text-card-pqp">
                {results.cardPQP.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="w-4 h-4" />
                From Partners
              </span>
              <span className="font-semibold" data-testid="text-partner-pqp">
                {results.partnerPQP.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Financial Analysis */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <h4 className="font-semibold text-sm text-[#002244] mb-3">Value Analysis</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Estimated Miles Value (1.22¢ / mile)</span>
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

        {/* Premier Status Progress */}
        {results.nextTier && nextTierConfig && (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-[#002244]">Premier Status Progress</h4>
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
                <p className="text-xs text-muted-foreground" data-testid="text-pqp-to-next-tier">
                  {results.pqpToNextTier.toLocaleString()} more PQP needed
                </p>
                <p className="text-xs text-muted-foreground text-right" data-testid="text-pqf-to-next-tier">
                  {results.pqfToNextTier} more PQF needed
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Top Tier Message */}
        {!results.nextTier && (
          <div className="p-4 bg-gradient-to-br from-gray-900 to-blue-900 text-white rounded-lg">
            <p className="font-semibold text-sm">
              🎉 You're at the top tier - Premier 1K!
            </p>
            <p className="text-xs opacity-90 mt-1">
              Enjoy the highest level of benefits and Global Services consideration
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}