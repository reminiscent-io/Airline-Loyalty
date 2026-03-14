import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Check, Sparkles } from "lucide-react";
import { UNITED_TIER_CONFIGS, type UnitedTierStatus } from "@shared/united-schema";
import { cn } from "@/lib/utils";

const tierColors: Record<UnitedTierStatus, string> = {
  member: "bg-gray-500 text-white",
  silver: "bg-gray-400 text-gray-900",
  gold: "bg-yellow-500 text-gray-900",
  platinum: "bg-gradient-to-r from-gray-400 to-gray-600 text-white",
  "1k": "bg-gradient-to-r from-gray-900 to-blue-900 text-white",
  "global-services": "bg-gradient-to-br from-indigo-950 via-blue-950 to-purple-950 text-white",
};

const tierSubtitles: Record<UnitedTierStatus, string> = {
  member: "Base Tier",
  silver: "+2 Bonus Miles/Dollar",
  gold: "+3 Bonus Miles/Dollar",
  platinum: "+4 Bonus Miles/Dollar",
  "1k": "+6 Bonus Miles/Dollar",
  "global-services": "Ultimate Elite Status",
};

const tierMilesPerDollar: Record<UnitedTierStatus, string> = {
  member: "5",
  silver: "7",
  gold: "8",
  platinum: "9",
  "1k": "11",
  "global-services": "11",
};

interface UnitedTierCardProps {
  readonly tier: UnitedTierStatus;
  readonly highlighted?: boolean;
}

export function UnitedTierCard({ tier, highlighted = false }: UnitedTierCardProps) {
  const config = UNITED_TIER_CONFIGS[tier];
  const isGhostTier = 'isGhostTier' in config && config.isGhostTier;

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all hover-elevate",
        highlighted && "border-2 border-united-blue shadow-lg",
        isGhostTier && "border-2 bg-gradient-to-br from-indigo-950/20 via-blue-950/20 to-purple-950/20"
      )}
      data-testid={`card-tier-${tier}`}
    >
      {highlighted && (
        <div className="absolute top-0 right-0">
          <Badge className="rounded-none rounded-bl-lg bg-united-blue text-white border-0">
            Most Popular
          </Badge>
        </div>
      )}
      {isGhostTier && (
        <div className="absolute top-0 left-0">
          <Badge className="rounded-none rounded-br-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-0">
            <Sparkles className="w-3 h-3 mr-1" />
            Invitation Only
          </Badge>
        </div>
      )}

      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <Badge
            className={cn(
              "px-3 py-1 text-sm font-semibold",
              tierColors[tier]
            )}
            data-testid={`badge-tier-${tier}`}
          >
            <Globe className="w-3 h-3 mr-1" />
            {config.name}
          </Badge>
        </div>
        <CardTitle className="text-2xl text-united-navy" data-testid={`text-tier-name-${tier}`}>
          {tierSubtitles[tier]}
        </CardTitle>
        <CardDescription>
          {tier === "member" && "Starting tier for all members"}
          {tier !== "member" && isGhostTier && (
            <span className="text-indigo-600 font-semibold" data-testid={`text-tier-requirement-${tier}`}>
              By invitation only - Most exclusive tier
            </span>
          )}
          {tier !== "member" && !isGhostTier && (
            <span data-testid={`text-tier-requirement-${tier}`}>
              {config.pqpRequired.toLocaleString()} PQP + 4 PQF
              {'alternativePath' in config && config.alternativePath && (
                <> or {config.alternativePath.pqp.toLocaleString()} PQP + {config.alternativePath.pqf} PQF</>
              )}
            </span>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          Up to <strong className="text-united-navy">
            {tierMilesPerDollar[tier]}
          </strong> total miles per dollar
        </div>
        <ul className="space-y-2">
          {config.benefits.map((benefit, index) => (
            <li
              key={benefit}
              className="flex items-start gap-2 text-sm"
              data-testid={`text-benefit-${tier}-${index}`}
            >
              <Check className="w-4 h-4 text-united-blue flex-shrink-0 mt-0.5" />
              <span className="text-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}