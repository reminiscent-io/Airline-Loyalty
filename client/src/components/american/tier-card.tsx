import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Check, Sparkles } from "lucide-react";
import { AMERICAN_TIER_CONFIGS, type AmericanTierStatus } from "@shared/american-schema";
import { cn } from "@/lib/utils";

interface AmericanTierCardProps {
  readonly tier: AmericanTierStatus;
  readonly highlighted?: boolean;
}

const tierColors: Record<AmericanTierStatus, string> = {
  member: "bg-gray-500 text-white",
  gold: "bg-yellow-500 text-gray-900",
  platinum: "bg-gray-400 text-gray-900",
  "platinum-pro": "bg-gradient-to-r from-gray-400 to-blue-500 text-white",
  "executive-platinum": "bg-gradient-to-r from-gray-800 to-blue-900 text-white",
  "conciergekey": "bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white",
};

const tierTitles: Record<AmericanTierStatus, string> = {
  member: "Base Tier",
  gold: "+40% Mile Bonus",
  platinum: "+60% Mile Bonus",
  "platinum-pro": "+80% Mile Bonus",
  "executive-platinum": "+120% Mile Bonus",
  "conciergekey": "Ultimate Elite Status",
};

const tierDescriptions: Record<AmericanTierStatus, string> = {
  member: "Starting tier for all members",
  gold: "",
  platinum: "",
  "platinum-pro": "",
  "executive-platinum": "",
  "conciergekey": "By invitation only - Most exclusive tier",
};

export function AmericanTierCard({ tier, highlighted = false }: Readonly<AmericanTierCardProps>) {
  const config = AMERICAN_TIER_CONFIGS[tier];
  const isGhostTier = "isGhostTier" in config && config.isGhostTier;

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all hover-elevate",
        highlighted && "border-2 border-american-blue shadow-lg",
        isGhostTier && "border-2 bg-gradient-to-br from-purple-950/20 via-indigo-950/20 to-black/20"
      )}
      data-testid={`card-tier-${tier}`}
    >
      {highlighted && (
        <div className="absolute top-0 right-0">
          <Badge className="rounded-none rounded-bl-lg bg-american-blue text-white border-0">
            Most Popular
          </Badge>
        </div>
      )}
      {isGhostTier && (
        <div className="absolute top-0 left-0">
          <Badge className="rounded-none rounded-br-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0">
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
            <Award className="w-3 h-3 mr-1" />
            {config.name}
          </Badge>
        </div>
        <CardTitle className="text-2xl text-american-navy" data-testid={`text-tier-name-${tier}`}>
          {tierTitles[tier]}
        </CardTitle>
        <CardDescription>
          {isGhostTier ? (
            <span className="text-purple-600 font-semibold" data-testid={`text-tier-requirement-${tier}`}>
              {tierDescriptions[tier]}
            </span>
          ) : tier === "member" ? (
            tierDescriptions[tier]
          ) : (
            <span data-testid={`text-tier-requirement-${tier}`}>
              Earn {config.loyaltyPointsRequired.toLocaleString()} Loyalty Points
            </span>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          <strong className="text-american-navy">{config.milesMultiplier}×</strong> miles per dollar spent
        </div>
        <ul className="space-y-2">
          {config.benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex items-start gap-2 text-sm"
            >
              <Check className="w-4 h-4 text-american-blue flex-shrink-0 mt-0.5" />
              <span className="text-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
