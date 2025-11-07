import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Award, Heart, Plane, CreditCard, Building2, DollarSign, Check } from "lucide-react";
import { type CalculationResults, TIER_CONFIGS } from "@shared/schema";
import { Separator } from "@/components/ui/separator";

interface SouthwestResultsPanelProps {
  results: CalculationResults | null;
}

export function SouthwestResultsPanel({ results }: SouthwestResultsPanelProps) {
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

        {/* Value Analysis */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <h4 className="font-semibold text-sm text-[#304CB2] mb-3">Value Analysis</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Estimated Points Value (1.4¢ / pt)</span>
              <span className="font-semibold flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                <span data-testid="text-points-value">{(results.redemptionValue).toFixed(2)}</span>
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

        {/* Combined A-List and A-List Preferred Progress */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <p className="text-sm font-semibold text-foreground">
                Tier Status Progress
              </p>
              <div className="flex gap-4 flex-wrap">
                {/* This Year Status */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">This Year</span>
                  <Badge 
                    className={
                      results.currentTier === "a-list-preferred" ? "bg-southwest-red text-white" :
                      results.currentTier === "a-list" ? "bg-southwest-gold text-southwest-navy" :
                      "bg-gray-500 text-white"
                    }
                  >
                    <Award className="w-3 h-3 mr-1" />
                    {currentTierConfig.name}
                  </Badge>
                </div>
                
                {/* Next Year Status based on qualification */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">Next Year</span>
                  {(() => {
                    const flights = results.progressToNextTier.flightsCurrent;
                    const tqp = results.totalTQP;
                    
                    // Determine next year's qualification
                    let nextYearStatus = "Rapid Rewards Member";
                    let badgeClass = "bg-gray-500 text-white";
                    
                    if (flights >= TIER_CONFIGS["a-list-preferred"].qualifyingFlights || 
                        tqp >= TIER_CONFIGS["a-list-preferred"].qualifyingTQP) {
                      nextYearStatus = "A-List Preferred";
                      badgeClass = "bg-southwest-red text-white";
                    } else if (flights >= TIER_CONFIGS["a-list"].qualifyingFlights || 
                               tqp >= TIER_CONFIGS["a-list"].qualifyingTQP) {
                      nextYearStatus = "A-List";
                      badgeClass = "bg-southwest-gold text-southwest-navy";
                    }
                    
                    return (
                      <Badge className={badgeClass}>
                        <Award className="w-3 h-3 mr-1" />
                        {nextYearStatus}
                      </Badge>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Sequential Progress Tracking */}
            {(() => {
              const aListFlights = TIER_CONFIGS["a-list"].qualifyingFlights;
              const aListTQP = TIER_CONFIGS["a-list"].qualifyingTQP;
              const aListPreferredFlights = TIER_CONFIGS["a-list-preferred"].qualifyingFlights;
              const aListPreferredTQP = TIER_CONFIGS["a-list-preferred"].qualifyingTQP;
              
              const currentFlights = results.progressToNextTier.flightsCurrent;
              const currentTQP = results.totalTQP;
              
              // Calculate sequential progress for flights (0-40 scale)
              let flightProgress = 0;
              let flightProgressLabel = "";
              let flightNextMilestone = "";
              
              if (currentFlights < aListFlights) {
                // Member working towards A-List
                flightProgress = (currentFlights / aListPreferredFlights) * 100;
                flightProgressLabel = `Member → A-List`;
                flightNextMilestone = `${aListFlights - currentFlights} flights to A-List`;
              } else if (currentFlights < aListPreferredFlights) {
                // A-List qualified, working towards Preferred
                flightProgress = (currentFlights / aListPreferredFlights) * 100;
                flightProgressLabel = `A-List → A-List Preferred`;
                flightNextMilestone = `${aListPreferredFlights - currentFlights} flights to A-List Preferred`;
              } else {
                // A-List Preferred qualified
                flightProgress = 100;
                flightProgressLabel = `A-List Preferred Achieved`;
                flightNextMilestone = `Qualified for A-List Preferred`;
              }
              
              // Calculate sequential progress for TQP (0-70000 scale)
              let tqpProgress = 0;
              let tqpProgressLabel = "";
              let tqpNextMilestone = "";
              
              if (currentTQP < aListTQP) {
                // Member working towards A-List
                tqpProgress = (currentTQP / aListPreferredTQP) * 100;
                tqpProgressLabel = `Member → A-List`;
                tqpNextMilestone = `${(aListTQP - currentTQP).toLocaleString()} TQP to A-List`;
              } else if (currentTQP < aListPreferredTQP) {
                // A-List qualified, working towards Preferred
                tqpProgress = (currentTQP / aListPreferredTQP) * 100;
                tqpProgressLabel = `A-List → A-List Preferred`;
                tqpNextMilestone = `${(aListPreferredTQP - currentTQP).toLocaleString()} TQP to A-List Preferred`;
              } else {
                // A-List Preferred qualified
                tqpProgress = 100;
                tqpProgressLabel = `A-List Preferred Achieved`;
                tqpNextMilestone = `Qualified for A-List Preferred`;
              }

              return (
                <>
                  {/* By Flights - Sequential Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-muted-foreground">Progress by Flights</span>
                      <span className="text-xs font-semibold text-foreground" data-testid="text-flight-progress-combined">
                        {currentFlights} / {aListPreferredFlights} flights
                      </span>
                    </div>
                    
                    {/* Sequential progress bar with markers */}
                    <div className="relative">
                      <Progress 
                        value={flightProgress} 
                        className="h-3"
                        data-testid="progress-flights-sequential"
                      />
                      {/* Tier markers */}
                      <div className="absolute top-0 left-0 w-full h-3 pointer-events-none">
                        {/* A-List marker at 50% (20/40) */}
                        <div 
                          className="absolute top-0 h-full w-0.5 bg-background"
                          style={{ left: `${(aListFlights / aListPreferredFlights) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">0</span>
                      <span className={`text-xs font-medium flex items-center gap-1 ${currentFlights >= aListFlights ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
                        {currentFlights >= aListFlights && (
                          <Check className="w-3 h-3 text-green-500 inline-block" />
                        )}
                        <span>{aListFlights} (A-List)</span>
                      </span>
                      <span className={`text-xs font-medium flex items-center gap-1 ${currentFlights >= aListPreferredFlights ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
                        {currentFlights >= aListPreferredFlights && (
                          <Check className="w-3 h-3 text-green-500 inline-block" />
                        )}
                        <span>{aListPreferredFlights} (Preferred)</span>
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{flightNextMilestone}</p>
                  </div>

                  {/* By TQP - Sequential Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-muted-foreground">Progress by Tier Qualifying Points</span>
                      <span className="text-xs font-semibold text-foreground" data-testid="text-tqp-progress-combined">
                        {currentTQP.toLocaleString()} / {aListPreferredTQP.toLocaleString()} TQP
                      </span>
                    </div>
                    
                    {/* Sequential progress bar with markers */}
                    <div className="relative">
                      <Progress 
                        value={tqpProgress} 
                        className="h-3"
                        data-testid="progress-tqp-sequential"
                      />
                      {/* Tier markers */}
                      <div className="absolute top-0 left-0 w-full h-3 pointer-events-none">
                        {/* A-List marker at 50% (35000/70000) */}
                        <div 
                          className="absolute top-0 h-full w-0.5 bg-background"
                          style={{ left: `${(aListTQP / aListPreferredTQP) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">0</span>
                      <span className={`text-xs font-medium flex items-center gap-1 ${currentTQP >= aListTQP ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
                        {currentTQP >= aListTQP && (
                          <Check className="w-3 h-3 text-green-500 inline-block" />
                        )}
                        <span>{(aListTQP/1000).toFixed(0)}K (A-List)</span>
                      </span>
                      <span className={`text-xs font-medium flex items-center gap-1 ${currentTQP >= aListPreferredTQP ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
                        {currentTQP >= aListPreferredTQP && (
                          <Check className="w-3 h-3 text-green-500 inline-block" />
                        )}
                        <span>{(aListPreferredTQP/1000).toFixed(0)}K (Preferred)</span>
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{tqpNextMilestone}</p>
                  </div>
                  
                  {/* Tier Status Summary */}
                  <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Status Summary:</p>
                    <div className="space-y-2 text-xs">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <div className={`font-semibold ${currentFlights < aListFlights && currentTQP < aListTQP ? 'text-foreground' : 'text-muted-foreground'}`}>
                            Member
                          </div>
                          <div className="text-muted-foreground">0-19 flights</div>
                          <div className="text-muted-foreground">0-34,999 TQP</div>
                        </div>
                        <div className="text-center">
                          <div className={`font-semibold ${(currentFlights >= aListFlights || currentTQP >= aListTQP) && currentFlights < aListPreferredFlights && currentTQP < aListPreferredTQP ? 'text-southwest-gold' : 'text-muted-foreground'}`}>
                            A-List
                          </div>
                          <div className="text-muted-foreground">20-39 flights</div>
                          <div className="text-muted-foreground">35,000-69,999 TQP</div>
                        </div>
                        <div className="text-center">
                          <div className={`font-semibold ${currentFlights >= aListPreferredFlights || currentTQP >= aListPreferredTQP ? 'text-southwest-red' : 'text-muted-foreground'}`}>
                            A-List Preferred
                          </div>
                          <div className="text-muted-foreground">40+ flights</div>
                          <div className="text-muted-foreground">70,000+ TQP</div>
                        </div>
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
