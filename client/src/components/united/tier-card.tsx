import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Check, Sparkles } from "lucide-react";
import { UNITED_TIER_CONFIGS, type UnitedTierStatus } from "@shared/united-schema";
import { cn } from "@/lib/utils";

interface UnitedTierCardProps {
  tier: UnitedTierStatus;
  highlighted?: boolean;
}

export function UnitedTierCard({ tier, highlighted = false }: UnitedTierCardProps) {
  const config = UNITED_TIER_CONFIGS[tier];
  const isGhostTier = config.isGhostTier || false;

  const tierColors = {
    member: "bg-gray-500 text-white",
    silver: "bg-gray-400 text-gray-900",
    gold: "bg-yellow-500 text-gray-900",
    platinum: "bg-gradient-to-r from-gray-400 to-gray-600 text-white",
    "1k": "bg-gradient-to-r from-gray-900 to-blue-900 text-white",
    "global-services": "bg-gradient-to-br from-indigo-950 via-blue-950 to-purple-950 text-white",
  };

  const tierBorderColors = {
    member: "border-gray-400",
    silver: "border-gray-400",
    gold: "border-yellow-500",
    platinum: "border-gray-600",
    "1k": "border-gray-900",
    "global-services": "border-indigo-500",
  };

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all hover-elevate",
        highlighted && "border-2 border-[#0074C8] shadow-lg",
        isGhostTier && "border-2 bg-gradient-to-br from-indigo-950/20 via-blue-950/20 to-purple-950/20"
      )}
      data-testid={`card-tier-${tier}`}
    >
      {highlighted && (
        <div className="absolute top-0 right-0">
          <Badge className="rounded-none rounded-bl-lg bg-[#0074C8] text-white border-0">
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
        <CardTitle className="text-2xl text-[#002244]" data-testid={`text-tier-name-${tier}`}>
          {tier === "member" ? (
            "Base Tier"
          ) : tier === "silver" ? (
            "+2 Bonus Miles/Dollar"
          ) : tier === "gold" ? (
            "+3 Bonus Miles/Dollar"
          ) : tier === "platinum" ? (
            "+4 Bonus Miles/Dollar"
          ) : tier === "global-services" ? (
            "Ultimate Elite Status"
          ) : (
            "+6 Bonus Miles/Dollar"
          )}
        </CardTitle>
        <CardDescription>
          {tier === "member" ? (
            "Starting tier for all members"
          ) : isGhostTier ? (
            <span className="text-indigo-600 font-semibold" data-testid={`text-tier-requirement-${tier}`}>
              By invitation only - Most exclusive tier
            </span>
          ) : (
            <span data-testid={`text-tier-requirement-${tier}`}>
              {config.pqpRequired.toLocaleString()} PQP or {config.pqfRequired} PQF
            </span>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          Up to <strong className="text-[#002244]">
            {tier === "member" ? (
              "5"
            ) : tier === "silver" ? (
              "7"
            ) : tier === "gold" ? (
              "8"
            ) : tier === "platinum" ? (
              "9"
            ) : tier === "1k" ? (
              "11"
            ) : (
              "11"
            )}
          </strong> total miles per dollar
        </div>
        <ul className="space-y-2">
          {config.benefits.map((benefit, index) => (
            <li 
              key={index} 
              className="flex items-start gap-2 text-sm"
              data-testid={`text-benefit-${tier}-${index}`}
            >
              <Check className="w-4 h-4 text-[#0074C8] flex-shrink-0 mt-0.5" />
              <span className="text-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}