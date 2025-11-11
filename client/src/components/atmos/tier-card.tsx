import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mountain, Check, Globe } from "lucide-react";
import { ATMOS_TIER_CONFIGS, type AtmosTierStatus } from "@shared/atmos-schema";
import { cn } from "@/lib/utils";

interface AtmosTierCardProps {
  tier: AtmosTierStatus;
  highlighted?: boolean;
}

export function AtmosTierCard({ tier, highlighted = false }: AtmosTierCardProps) {
  const config = ATMOS_TIER_CONFIGS[tier];

  const tierColors = {
    member: "bg-gray-500 text-white",
    silver: "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900",
    gold: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900",
    platinum: "bg-gradient-to-r from-gray-700 to-gray-900 text-white",
    titanium: "bg-gradient-to-r from-[#7AC142] to-[#68A02E] text-white"
  };

  const tierBorderColors = {
    member: "border-gray-400",
    silver: "border-gray-400",
    gold: "border-yellow-500",
    platinum: "border-gray-700",
    titanium: "border-[#7AC142]"
  };

  const oneworldBadgeColors = {
    Ruby: "bg-red-600 text-white",
    Sapphire: "bg-blue-600 text-white",
    Emerald: "bg-emerald-600 text-white"
  };

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all hover-elevate",
        highlighted && "border-2 border-[#00467F] shadow-lg"
      )}
      data-testid={`card-tier-${tier}`}
    >
      {highlighted && (
        <div className="absolute top-0 right-0">
          <Badge className="rounded-none rounded-bl-lg bg-[#00467F] text-white border-0">
            Most Popular
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
            <Mountain className="w-3 h-3 mr-1" />
            {config.name}
          </Badge>
          {config.oneworldStatus && (
            <Badge 
              className={cn(
                "px-2 py-1 text-xs",
                oneworldBadgeColors[config.oneworldStatus]
              )}
              data-testid={`badge-oneworld-${tier}`}
            >
              <Globe className="w-3 h-3 mr-1" />
              {config.oneworldStatus}
            </Badge>
          )}
        </div>
        <CardTitle className="text-2xl text-[#00467F]" data-testid={`text-tier-name-${tier}`}>
          {tier === "member" ? (
            "Base Tier"
          ) : tier === "silver" ? (
            "+25% Point Bonus"
          ) : tier === "gold" ? (
            "+50% Point Bonus"
          ) : tier === "platinum" ? (
            "+100% Point Bonus"
          ) : (
            "+150% Point Bonus"
          )}
        </CardTitle>
        <CardDescription>
          {tier === "member" ? (
            "Starting tier for all members"
          ) : (
            <span data-testid={`text-tier-requirement-${tier}`}>
              {config.statusPointsRequired.toLocaleString()} status points
              {tier === "platinum" && " (↑ from 75K)"}
              {tier === "titanium" && " (↑ from 100K)"}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          <strong className="text-[#00467F]">
            {config.redeemablePointsMultiplier === 1 ? "1×" : 
             config.redeemablePointsMultiplier === 1.25 ? "1.25×" :
             config.redeemablePointsMultiplier === 1.5 ? "1.5×" :
             config.redeemablePointsMultiplier === 2 ? "2×" :
             "2.5×"}
          </strong> redeemable points multiplier
        </div>
        <ul className="space-y-2">
          {config.benefits.map((benefit, index) => (
            <li 
              key={index} 
              className="flex items-start gap-2 text-sm"
              data-testid={`text-benefit-${tier}-${index}`}
            >
              <Check className="w-4 h-4 text-[#7AC142] flex-shrink-0 mt-0.5" />
              <span className="text-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}