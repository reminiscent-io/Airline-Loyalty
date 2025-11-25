import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Award, Plane, CreditCard, Building2, DollarSign, Target } from "lucide-react";
import { type UnitedCalculationResults, UNITED_TIER_CONFIGS } from "@shared/united-schema";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

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

        {/* Premier Status Progress - Dual Track Visualization */}
        {results.nextTier && nextTierConfig && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-semibold text-sm text-[#002244]">Premier Status Progress</h4>
              {results.qualifiesForNextTier && (
                <Badge className="bg-green-100 text-green-800 text-xs">
                  Qualified for {nextTierConfig.name}
                </Badge>
              )}
              {!results.qualifiesForNextTier && results.blockingRequirement === 'pqf' && (
                <Badge className="bg-amber-100 text-amber-800 text-xs">
                  PQF gate is holding this tier
                </Badge>
              )}
            </div>
            
            {/* Two Paths Info Box */}
            {'alternativePath' in nextTierConfig && nextTierConfig.alternativePath && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm">
                <div className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Two paths to {nextTierConfig.name}:</div>
                <div className="space-y-1 text-blue-800 dark:text-blue-400">
                  <div className="flex items-center gap-2">
                    <span>• PQP-only:</span>
                    <span className={results.pqpMet ? "text-green-600 font-semibold" : ""}>
                      {nextTierConfig.pqpRequired.toLocaleString()} PQP {results.pqpMet && "✓"}
                    </span>
                    <span>+</span>
                    <span className={results.pqfMetForPQPPath ? "text-green-600 font-semibold" : ""}>
                      4 PQF {results.pqfMetForPQPPath && "✓"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>• Alternative:</span>
                    <span className={results.altPathPqpMet ? "text-green-600 font-semibold" : ""}>
                      {nextTierConfig.alternativePath.pqp.toLocaleString()} PQP {results.altPathPqpMet && "✓"}
                    </span>
                    <span>+</span>
                    <span className={results.altPathPqfMet ? "text-green-600 font-semibold" : ""}>
                      {nextTierConfig.alternativePath.pqf} PQF {results.altPathPqfMet && "✓"}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {/* TRACK 1: PQP Progress with Pending Overflow */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-medium">PQP Track</span>
                <span className="font-semibold" data-testid="text-pqp-status">
                  {results.pqpMet ? (
                    <span className="text-green-600">✓ {results.totalPQP.toLocaleString()} PQP (met)</span>
                  ) : (
                    <span>{results.totalPQP.toLocaleString()} / {nextTierConfig.pqpRequired.toLocaleString()} PQP</span>
                  )}
                </span>
              </div>
              
              {/* PQP Progress Bar with Pending Overflow Visualization */}
              <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                {/* Solid fill up to requirement (or current PQP if below) */}
                <div 
                  className={cn(
                    "absolute top-0 left-0 h-full rounded-full transition-all",
                    results.pqpMet ? "bg-green-500" : "bg-[#0074C8]"
                  )}
                  style={{ 
                    width: `${Math.min(100, (Math.min(results.totalPQP, nextTierConfig.pqpRequired) / nextTierConfig.pqpRequired) * 100)}%` 
                  }}
                  data-testid="progress-pqp-solid"
                />
                
                {/* Hashed/dotted overflow when PQP > threshold but PQF < 4 */}
                {results.pqpMet && !results.pqfMetForPQPPath && results.pendingPqpOverflow > 0 && (
                  <div 
                    className="absolute top-0 h-full rounded-r-full"
                    style={{ 
                      left: '100%',
                      width: `${Math.min(20, (results.pendingPqpOverflow / nextTierConfig.pqpRequired) * 100)}%`,
                      background: 'repeating-linear-gradient(45deg, #0074C8 0, #0074C8 4px, transparent 4px, transparent 8px)',
                      opacity: 0.6
                    }}
                    data-testid="progress-pqp-pending"
                  />
                )}
              </div>
              
              {/* PQP Status Message */}
              <div className="text-xs text-muted-foreground">
                {results.pqpMet ? (
                  results.pendingPqpOverflow > 0 && !results.pqfMetForPQPPath ? (
                    <span className="text-amber-600">
                      +{results.pendingPqpOverflow.toLocaleString()} PQP overflow (waiting on PQF)
                    </span>
                  ) : (
                    <span className="text-green-600">PQP requirement met</span>
                  )
                ) : (
                  <span>{results.pqpToNextTier.toLocaleString()} more PQP needed</span>
                )}
              </div>
            </div>
            
            {/* TRACK 2: PQF Progress (4 minimum for PQP-only path) */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-medium">PQF Track (min 4 required)</span>
                <span className="font-semibold" data-testid="text-pqf-status">
                  {results.pqfMetForPQPPath ? (
                    <span className="text-green-600">✓ {results.totalPQF} PQF (met)</span>
                  ) : (
                    <span>{results.totalPQF} / 4 PQF</span>
                  )}
                </span>
              </div>
              
              {/* PQF Progress Bar */}
              <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "absolute top-0 left-0 h-full rounded-full transition-all",
                    results.pqfMetForPQPPath ? "bg-green-500" : "bg-gray-500"
                  )}
                  style={{ 
                    width: `${Math.min(100, (results.totalPQF / 4) * 100)}%` 
                  }}
                  data-testid="progress-pqf"
                />
                
                {/* Markers at each PQF */}
                {[1, 2, 3].map(i => (
                  <div 
                    key={i}
                    className="absolute top-0 h-full w-0.5 bg-white/50"
                    style={{ left: `${(i / 4) * 100}%` }}
                  />
                ))}
              </div>
              
              {/* PQF labels */}
              <div className="flex justify-between text-[10px] text-muted-foreground px-1">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span className="font-semibold">4</span>
              </div>
              
              {/* PQF Status Message */}
              <div className="text-xs text-muted-foreground">
                {results.pqfMetForPQPPath ? (
                  <span className="text-green-600">Minimum PQF requirement met</span>
                ) : (
                  <span>{results.pqfNeededForPQPPath} more PQF needed for qualification</span>
                )}
              </div>
            </div>
            
            {/* Status Summary */}
            <div className={cn(
              "p-3 rounded-lg text-sm",
              results.qualifiesForNextTier
                ? "bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300"
                : results.blockingRequirement === 'pqf'
                ? "bg-amber-50 border border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-300"
                : "bg-gray-50 border border-gray-200 text-gray-800 dark:bg-gray-900/20 dark:border-gray-700 dark:text-gray-300"
            )}>
              {results.qualifiesForNextTier ? (
                <p className="font-semibold">✅ Qualified for {nextTierConfig.name}!</p>
              ) : results.blockingRequirement === 'pqf' ? (
                <div>
                  <p className="font-semibold mb-1">PQP met, need {results.pqfNeededForPQPPath} more PQF</p>
                  <p className="text-xs opacity-80">
                    You have enough PQP but need {results.pqfNeededForPQPPath} more qualifying flights to complete the 4 PQF minimum.
                  </p>
                </div>
              ) : results.blockingRequirement === 'pqp' ? (
                <p>
                  <span className="font-semibold">Need {results.pqpToNextTier.toLocaleString()} more PQP</span>
                  <span className="text-xs ml-1">(PQF requirement met ✓)</span>
                </p>
              ) : (
                <p>
                  <span className="font-semibold">Need:</span> {results.pqpToNextTier.toLocaleString()} more PQP and {results.pqfNeededForPQPPath} more PQF
                </p>
              )}
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}