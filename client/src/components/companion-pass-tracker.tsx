import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Star } from "lucide-react";
import { type CalculationResults, COMPANION_PASS_THRESHOLD } from "@shared/schema";

interface CompanionPassTrackerProps {
  results: CalculationResults | null;
}

export function CompanionPassTracker({ results }: CompanionPassTrackerProps) {
  const progress = results?.companionPassProgress || 0;
  const qualified = results?.companionPassQualified || false;
  const pointsEarned = results?.totalPointsEarned || 0;
  const pointsNeeded = COMPANION_PASS_THRESHOLD - pointsEarned;

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
        {/* Visual Progress */}
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-foreground">
              Your Progress
            </span>
            <span className="text-sm font-bold text-southwest-red" data-testid="text-companion-progress">
              {progress.toFixed(0)}%
            </span>
          </div>
          <Progress 
            value={progress} 
            className="h-4"
            data-testid="progress-companion-pass"
          />
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>0</span>
            <span className="font-semibold">135,000 points</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-southwest-lightgray rounded-lg border">
            <p className="text-xs font-medium text-muted-foreground mb-1">Points Earned</p>
            <p className="text-2xl font-bold text-southwest-navy" data-testid="text-companion-earned">
              {pointsEarned.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-southwest-lightgray rounded-lg border">
            <p className="text-xs font-medium text-muted-foreground mb-1">Points Needed</p>
            <p className="text-2xl font-bold text-southwest-navy" data-testid="text-companion-needed">
              {qualified ? "0" : Math.max(0, pointsNeeded).toLocaleString()}
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
                  <li>• Earn 135,000 qualifying points in a calendar year</li>
                  <li>• Qualifying points include flight revenue and Southwest credit card spend</li>
                  <li>• Once earned, valid through end of following year</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
