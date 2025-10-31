import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Star } from "lucide-react";
import { type CalculationResults, COMPANION_PASS_THRESHOLD_FLIGHTS, COMPANION_PASS_THRESHOLD_CQP } from "@shared/schema";

interface CompanionPassTrackerProps {
  results: CalculationResults | null;
}

export function CompanionPassTracker({ results }: CompanionPassTrackerProps) {
  if (!results) {
    return (
      <Card className="border-2 border-southwest-red/20" data-testid="card-companion-pass">
        <CardHeader>
          <CardTitle className="text-southwest-navy flex items-center gap-2">
            <Heart className="w-6 h-6 text-southwest-red fill-southwest-red" />
            Companion Pass
          </CardTitle>
          <CardDescription>
            Bring a companion on every Southwest flight for just taxes and fees
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8 text-muted-foreground">
          Calculate your rewards to see your Companion Pass progress
        </CardContent>
      </Card>
    );
  }

  const qualified = results.companionPassQualified;
  const progressByFlights = results.companionPassProgress.byFlights;
  const progressByCQP = results.companionPassProgress.byCQP;
  const flightsCurrent = results.companionPassProgress.flightsCurrent;
  const flightsNeeded = results.companionPassProgress.flightsNeeded;
  const cqpCurrent = results.companionPassProgress.cqpCurrent;
  const cqpNeeded = results.companionPassProgress.cqpNeeded;

  return (
    <Card className="border-2 border-southwest-red/20" data-testid="card-companion-pass">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-southwest-navy flex items-center gap-2">
            <Heart className="w-6 h-6 text-southwest-red fill-southwest-red" />
            Companion Pass
          </CardTitle>
          {qualified && (
            <Badge className="bg-southwest-green text-white gap-1.5">
              <Star className="w-3 h-3 fill-white" />
              Qualified!
            </Badge>
          )}
        </div>
        <CardDescription>
          Bring a companion on every Southwest flight for just taxes and fees
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Two qualification paths */}
        <div className="space-y-4">
          {/* By Flights */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">
                By Flights
              </span>
              <span className="text-sm font-bold text-southwest-red" data-testid="text-companion-flights-progress">
                {flightsCurrent} / {flightsNeeded} ({progressByFlights.toFixed(0)}%)
              </span>
            </div>
            <Progress 
              value={progressByFlights} 
              className="h-3"
              data-testid="progress-companion-flights"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Fly {flightsNeeded} qualifying flights in a calendar year
            </p>
          </div>

          {/* By CQP */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">
                By Companion Qualifying Points
              </span>
              <span className="text-sm font-bold text-southwest-red" data-testid="text-companion-cqp-progress">
                {cqpCurrent.toLocaleString()} / {cqpNeeded.toLocaleString()} ({progressByCQP.toFixed(0)}%)
              </span>
            </div>
            <Progress 
              value={progressByCQP} 
              className="h-3"
              data-testid="progress-companion-cqp"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Earn {cqpNeeded.toLocaleString()} CQP from flights, credit cards, and partners
            </p>
          </div>
        </div>

        {/* Status Message */}
        {qualified ? (
          <div className="p-4 bg-southwest-green/10 border border-southwest-green/20 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-5 h-5 text-southwest-green" />
              <p className="text-sm font-semibold text-southwest-green">
                Congratulations! You've earned the Companion Pass
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Your companion can fly with you for free (taxes & fees only) for the rest of this year and all of next year
            </p>
          </div>
        ) : (
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-start gap-2">
              <Heart className="w-4 h-4 text-southwest-red fill-southwest-red flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  How to Qualify
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Earn {cqpNeeded.toLocaleString()} CQP <strong>OR</strong> fly {flightsNeeded} qualifying flights in a calendar year</li>
                  <li>• CQP earned from flights, credit card spend, annual bonuses, and partners</li>
                  <li>• Once earned, valid through end of following year</li>
                  <li>• Companion can be changed up to 3 times per year</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
