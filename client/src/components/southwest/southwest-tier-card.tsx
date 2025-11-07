import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Check } from "lucide-react";
import { TIER_CONFIGS, type TierStatus } from "@shared/schema";
import { cn } from "@/lib/utils";

interface SouthwestTierCardProps {
  tier: TierStatus;
  highlighted?: boolean;
}

export function SouthwestTierCard({ tier, highlighted = false }: SouthwestTierCardProps) {
  const config = TIER_CONFIGS[tier];

  const tierColors = {
    member: "bg-secondary text-secondary-foreground",
    "a-list": "bg-southwest-gold text-southwest-navy",
    "a-list-preferred": "bg-southwest-red text-white",
  };

  const tierBorderColors = {
    member: "border-secondary",
    "a-list": "border-southwest-gold",
    "a-list-preferred": "border-southwest-red",
  };

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all hover-elevate",
        highlighted && "border-2 border-southwest-blue shadow-lg"
      )}
      data-testid={`card-tier-${tier}`}
    >
      {highlighted && (
        <div className="absolute top-0 right-0">
          <Badge className="rounded-none rounded-bl-lg bg-southwest-blue text-white border-0">
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
            {tier === "a-list" || tier === "a-list-preferred" ? (
              <Heart className="w-3 h-3 mr-1 fill-current" />
            ) : null}
            {config.name}
          </Badge>
        </div>
        <CardTitle className="text-2xl text-southwest-navy" data-testid={`text-tier-name-${tier}`}>
          {tier === "member" ? (
            "Base Tier"
          ) : tier === "a-list" ? (
            "+25% RR Bonus"
          ) : (
            "+100% RR Bonus"
          )}
        </CardTitle>
        <CardDescription>
          {tier === "member" ? (
            "Starting tier for all members"
          ) : (
            <span data-testid={`text-tier-requirement-${tier}`}>
              Earn {config.qualifyingFlights} flights or {config.qualifyingTQP.toLocaleString()} TQP
            </span>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-2.5">
          {config.benefits.map((benefit, index) => (
            <li 
              key={index} 
              className="flex items-start gap-2 text-sm"
              data-testid={`text-benefit-${tier}-${index}`}
            >
              <Check className="w-4 h-4 text-southwest-green flex-shrink-0 mt-0.5" />
              <span className="text-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
