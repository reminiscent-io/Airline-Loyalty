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

        {/* Combined A-List and A-List Preferred Progress */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <p className="text-sm font-semibold text-foreground">
                Tier Status Progress
              </p>
              <div className="flex gap-2 flex-wrap">
                {/* Show badges for A-List qualification */}
                {(results.currentTier === "a-list-preferred" || 
                  results.totalTQP >= TIER_CONFIGS["a-list"].qualifyingTQP || 
                  results.progressToNextTier.flightsCurrent >= TIER_CONFIGS["a-list"].qualifyingFlights) && (
                  <Badge className="bg-southwest-gold text-southwest-navy">
                    <Award className="w-3 h-3 mr-1" />
                    A-List {results.currentTier === "a-list" ? "Current" : "Qualified"}
                  </Badge>
                )}
                {/* Show badges for A-List Preferred qualification */}
                {(results.totalTQP >= TIER_CONFIGS["a-list-preferred"].qualifyingTQP || 
                  results.progressToNextTier.flightsCurrent >= TIER_CONFIGS["a-list-preferred"].qualifyingFlights) && (
                  <Badge className="bg-southwest-red text-white">
                    <Award className="w-3 h-3 mr-1" />
                    A-List Preferred {results.currentTier === "a-list-preferred" ? "Current" : "Qualified"}
                  </Badge>
                )}
              </div>
            </div>

            {/* Unified Progress Tracking */}
            {(() => {
              const aListFlights = TIER_CONFIGS["a-list"].qualifyingFlights;
              const aListTQP = TIER_CONFIGS["a-list"].qualifyingTQP;
              const aListPreferredFlights = TIER_CONFIGS["a-list-preferred"].qualifyingFlights;
              const aListPreferredTQP = TIER_CONFIGS["a-list-preferred"].qualifyingTQP;
              
              // Calculate progress for both tiers
              const flightProgressAList = Math.min(100, (results.progressToNextTier.flightsCurrent / aListFlights) * 100);
              const tqpProgressAList = Math.min(100, (results.totalTQP / aListTQP) * 100);
              const flightProgressPreferred = Math.min(100, (results.progressToNextTier.flightsCurrent / aListPreferredFlights) * 100);
              const tqpProgressPreferred = Math.min(100, (results.totalTQP / aListPreferredTQP) * 100);

              // Determine which progress to show prominently
              const hasAList = flightProgressAList >= 100 || tqpProgressAList >= 100;
              const hasAListPreferred = flightProgressPreferred >= 100 || tqpProgressPreferred >= 100;

              return (
                <>
                  {/* By Flights */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-muted-foreground">By Flights</span>
                      <span className="text-xs font-semibold text-foreground" data-testid="text-flight-progress-combined">
                        {results.progressToNextTier.flightsCurrent} flights
                      </span>
                    </div>
                    
                    {/* Dual progress bars for flights */}
                    <div className="space-y-2">
                      <div className="relative">
                        <Progress 
                          value={flightProgressAList} 
                          className="h-2.5"
                          data-testid="progress-flights-alist"
                        />
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-muted-foreground">A-List: {aListFlights}</span>
                          <span className="text-xs font-medium">{flightProgressAList.toFixed(0)}%</span>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <Progress 
                          value={flightProgressPreferred} 
                          className="h-2.5"
                          data-testid="progress-flights-preferred"
                        />
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-muted-foreground">Preferred: {aListPreferredFlights}</span>
                          <span className="text-xs font-medium">{flightProgressPreferred.toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* By TQP */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-muted-foreground">By Tier Qualifying Points</span>
                      <span className="text-xs font-semibold text-foreground" data-testid="text-tqp-progress-combined">
                        {results.totalTQP.toLocaleString()} TQP
                      </span>
                    </div>
                    
                    {/* Dual progress bars for TQP */}
                    <div className="space-y-2">
                      <div className="relative">
                        <Progress 
                          value={tqpProgressAList} 
                          className="h-2.5"
                          data-testid="progress-tqp-alist"
                        />
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-muted-foreground">A-List: {aListTQP.toLocaleString()}</span>
                          <span className="text-xs font-medium">{tqpProgressAList.toFixed(0)}%</span>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <Progress 
                          value={tqpProgressPreferred} 
                          className="h-2.5"
                          data-testid="progress-tqp-preferred"
                        />
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-muted-foreground">Preferred: {aListPreferredTQP.toLocaleString()}</span>
                          <span className="text-xs font-medium">{tqpProgressPreferred.toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Qualification Summary */}
                  <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Qualification Thresholds:</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${hasAList ? 'bg-green-500' : 'bg-muted-foreground/30'}`}></div>
                        <span className={hasAList ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
                          A-List: {aListFlights} flights OR {aListTQP.toLocaleString()} TQP
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${hasAListPreferred ? 'bg-green-500' : 'bg-muted-foreground/30'}`}></div>
                        <span className={hasAListPreferred ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
                          A-List Preferred: {aListPreferredFlights} flights OR {aListPreferredTQP.toLocaleString()} TQP
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>

        <Separator />

        {/* Companion Pass Progress */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Heart className="w-4 h-4 text-southwest-red fill-southwest-red" />
                Companion Pass Progress
              </p>
              {results.companionPassQualified && (
                <Badge className="bg-southwest-gold text-southwest-navy">
                  <Heart className="w-3 h-3 mr-1" />
                  Qualified!
                </Badge>
              )}
            </div>

            {/* By Flights */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-muted-foreground">By Flights</span>
                <span className="text-xs font-semibold text-foreground" data-testid="text-flight-progress-cp">
                  {results.companionPassProgress.flightsCurrent} / {results.companionPassProgress.flightsNeeded} ({results.companionPassProgress.byFlights.toFixed(0)}%)
                </span>
              </div>
              <Progress 
                value={results.companionPassProgress.byFlights} 
                className="h-2.5"
                data-testid="progress-flights-cp"
              />
            </div>

            {/* By CQP */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-muted-foreground">By Companion Qualifying Points</span>
                <span className="text-xs font-semibold text-foreground" data-testid="text-cqp-progress-cp">
                  {results.companionPassProgress.cqpCurrent.toLocaleString()} / {results.companionPassProgress.cqpNeeded.toLocaleString()} ({results.companionPassProgress.byCQP.toFixed(0)}%)
                </span>
              </div>
              <Progress 
                value={results.companionPassProgress.byCQP} 
                className="h-2.5"
                data-testid="progress-cqp-cp"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
