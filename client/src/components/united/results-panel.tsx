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

        {/* Premier Status Progress - BOTH Required */}
        {results.nextTier && nextTierConfig && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-sm text-[#002244]">Premier Status Progress</h4>
              <Badge className="bg-amber-100 text-amber-800 text-xs">
                Both PQP & PQF Required
              </Badge>
            </div>
            
            {/* PQP Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  PQP Progress ({results.totalPQP.toLocaleString()} / {nextTierConfig.pqpRequired.toLocaleString()})
                </span>
                <span className="font-semibold" data-testid="text-pqp-percent">
                  {((results.totalPQP / nextTierConfig.pqpRequired) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="relative">
                <Progress 
                  value={(results.totalPQP / nextTierConfig.pqpRequired) * 100} 
                  className="h-8"
                  data-testid="progress-pqp"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-xs font-medium text-white mix-blend-difference">
                    {results.pqpToNextTier.toLocaleString()} more needed
                  </span>
                </div>
              </div>
              
              {/* PQP Tier Markers */}
              <div className="relative h-6">
                <div className="absolute inset-x-0 flex justify-between text-xs">
                  {/* Silver marker at 5,000 PQP */}
                  <div className="absolute" style={{ left: `${(5000 / 24000) * 100}%` }}>
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-2 bg-gray-400"></div>
                      <span className="text-[8px] text-muted-foreground mt-0.5">Silver</span>
                      <span className="text-[7px] text-muted-foreground">5K</span>
                    </div>
                  </div>
                  {/* Gold marker at 10,000 PQP */}
                  <div className="absolute" style={{ left: `${(10000 / 24000) * 100}%` }}>
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-2 bg-yellow-500"></div>
                      <span className="text-[8px] text-muted-foreground mt-0.5">Gold</span>
                      <span className="text-[7px] text-muted-foreground">10K</span>
                    </div>
                  </div>
                  {/* Platinum marker at 15,000 PQP */}
                  <div className="absolute" style={{ left: `${(15000 / 24000) * 100}%` }}>
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-2 bg-gray-600"></div>
                      <span className="text-[8px] text-muted-foreground mt-0.5">Plat</span>
                      <span className="text-[7px] text-muted-foreground">15K</span>
                    </div>
                  </div>
                  {/* 1K marker at 24,000 PQP */}
                  <div className="absolute" style={{ left: '100%' }}>
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-2 bg-gray-900"></div>
                      <span className="text-[8px] text-muted-foreground mt-0.5">1K</span>
                      <span className="text-[7px] text-muted-foreground">24K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* AND Connector */}
            <div className="flex items-center justify-center">
              <Badge variant="outline" className="bg-white">
                <span className="text-xs font-semibold text-amber-600">AND</span>
              </Badge>
            </div>
            
            {/* PQF Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  PQF Progress ({results.totalPQF} / {nextTierConfig.pqfRequired})
                </span>
                <span className="font-semibold" data-testid="text-pqf-percent">
                  {((results.totalPQF / nextTierConfig.pqfRequired) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="relative">
                <Progress 
                  value={(results.totalPQF / nextTierConfig.pqfRequired) * 100} 
                  className="h-8"
                  data-testid="progress-pqf"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-xs font-medium text-white mix-blend-difference">
                    {results.pqfToNextTier} more needed
                  </span>
                </div>
              </div>
              
              {/* PQF Tier Markers */}
              <div className="relative h-6">
                <div className="absolute inset-x-0 flex justify-between text-xs">
                  {/* Silver marker at 15 PQF */}
                  <div className="absolute" style={{ left: `${(15 / 60) * 100}%` }}>
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-2 bg-gray-400"></div>
                      <span className="text-[8px] text-muted-foreground mt-0.5">Silver</span>
                      <span className="text-[7px] text-muted-foreground">15</span>
                    </div>
                  </div>
                  {/* Gold marker at 30 PQF */}
                  <div className="absolute" style={{ left: `${(30 / 60) * 100}%` }}>
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-2 bg-yellow-500"></div>
                      <span className="text-[8px] text-muted-foreground mt-0.5">Gold</span>
                      <span className="text-[7px] text-muted-foreground">30</span>
                    </div>
                  </div>
                  {/* Platinum marker at 45 PQF */}
                  <div className="absolute" style={{ left: `${(45 / 60) * 100}%` }}>
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-2 bg-gray-600"></div>
                      <span className="text-[8px] text-muted-foreground mt-0.5">Plat</span>
                      <span className="text-[7px] text-muted-foreground">45</span>
                    </div>
                  </div>
                  {/* 1K marker at 60 PQF */}
                  <div className="absolute" style={{ left: '100%' }}>
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-2 bg-gray-900"></div>
                      <span className="text-[8px] text-muted-foreground mt-0.5">1K</span>
                      <span className="text-[7px] text-muted-foreground">60</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Status Summary */}
            <div className={cn(
              "p-3 rounded-lg text-sm",
              results.totalPQP >= nextTierConfig.pqpRequired && results.totalPQF >= nextTierConfig.pqfRequired
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-amber-50 border border-amber-200 text-amber-800"
            )}>
              {results.totalPQP >= nextTierConfig.pqpRequired && results.totalPQF >= nextTierConfig.pqfRequired ? (
                <p className="font-semibold">✅ Qualified for {nextTierConfig.name}!</p>
              ) : (
                <p>
                  <span className="font-semibold">Requirements:</span>{" "}
                  {results.totalPQP < nextTierConfig.pqpRequired && results.totalPQF < nextTierConfig.pqfRequired
                    ? `Need both ${results.pqpToNextTier.toLocaleString()} more PQP and ${results.pqfToNextTier} more PQF`
                    : results.totalPQP < nextTierConfig.pqpRequired
                    ? `Need ${results.pqpToNextTier.toLocaleString()} more PQP (PQF met ✓)`
                    : `Need ${results.pqfToNextTier} more PQF (PQP met ✓)`}
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
      </CardContent>
    </Card>
  );
}