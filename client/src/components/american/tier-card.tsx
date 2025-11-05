import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Check } from "lucide-react";
import { AMERICAN_TIER_CONFIGS, type AmericanTierStatus } from "@shared/american-schema";
import { cn } from "@/lib/utils";

interface AmericanTierCardProps {
  tier: AmericanTierStatus;
  highlighted?: boolean;
}

export function AmericanTierCard({ tier, highlighted = false }: AmericanTierCardProps) {
  const config = AMERICAN_TIER_CONFIGS[tier];

  const tierColors = {
    member: "bg-gray-500 text-white",
    gold: "bg-yellow-500 text-gray-900",
    platinum: "bg-gray-400 text-gray-900",
    "platinum-pro": "bg-gradient-to-r from-gray-400 to-blue-500 text-white",
    "executive-platinum": "bg-gradient-to-r from-gray-800 to-blue-900 text-white",
  };

  const tierBorderColors = {
    member: "border-gray-400",
    gold: "border-yellow-500",
    platinum: "border-gray-400",
    "platinum-pro": "border-blue-500",
    "executive-platinum": "border-gray-800",
  };

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all hover-elevate",
        highlighted && "border-2 border-[#0078D2] shadow-lg"
      )}
      data-testid={`card-tier-${tier}`}
    >
      {highlighted && (
        <div className="absolute top-0 right-0">
          <Badge className="rounded-none rounded-bl-lg bg-[#0078D2] text-white border-0">
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
            <Award className="w-3 h-3 mr-1" />
            {config.name}
          </Badge>
        </div>
        <CardTitle className="text-2xl text-[#00325b]" data-testid={`text-tier-name-${tier}`}>
          {tier === "member" ? (
            "Base Tier"
          ) : tier === "gold" ? (
            "+40% Mile Bonus"
          ) : tier === "platinum" ? (
            "+60% Mile Bonus"
          ) : tier === "platinum-pro" ? (
            "+80% Mile Bonus"
          ) : (
            "+120% Mile Bonus"
          )}
        </CardTitle>
        <CardDescription>
          {tier === "member" ? (
            "Starting tier for all members"
          ) : (
            <span data-testid={`text-tier-requirement-${tier}`}>
              Earn {config.loyaltyPointsRequired.toLocaleString()} Loyalty Points
            </span>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          <strong className="text-[#00325b]">{config.milesMultiplier}×</strong> miles per dollar spent
        </div>
        <ul className="space-y-2">
          {config.benefits.map((benefit, index) => (
            <li 
              key={index} 
              className="flex items-start gap-2 text-sm"
              data-testid={`text-benefit-${tier}-${index}`}
            >
              <Check className="w-4 h-4 text-[#0078D2] flex-shrink-0 mt-0.5" />
              <span className="text-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}