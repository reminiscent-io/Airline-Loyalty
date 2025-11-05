import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mountain, Check } from "lucide-react";
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
    mvp: "bg-[#00467F] text-white",
    "mvp-gold": "bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900",
    "mvp-gold-75k": "bg-gradient-to-r from-amber-500 to-amber-600 text-white",
    "mvp-gold-100k": "bg-gradient-to-r from-[#7AC142] to-[#68A02E] text-white",
  };

  const tierBorderColors = {
    member: "border-gray-400",
    mvp: "border-[#00467F]",
    "mvp-gold": "border-yellow-500",
    "mvp-gold-75k": "border-amber-500",
    "mvp-gold-100k": "border-[#7AC142]",
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
        </div>
        <CardTitle className="text-2xl text-[#00467F]" data-testid={`text-tier-name-${tier}`}>
          {tier === "member" ? (
            "Base Tier"
          ) : tier === "mvp" ? (
            "+50% Mile Bonus"
          ) : tier === "mvp-gold" ? (
            "+100% Mile Bonus"
          ) : tier === "mvp-gold-75k" ? (
            "+125% Mile Bonus"
          ) : (
            "+150% Mile Bonus"
          )}
        </CardTitle>
        <CardDescription>
          {tier === "member" ? (
            "Starting tier for all members"
          ) : (
            <span data-testid={`text-tier-requirement-${tier}`}>
              {config.milesRequired.toLocaleString()} miles or {config.segmentsRequired} segments
            </span>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          <strong className="text-[#00467F]">{config.milesMultiplier}×</strong> miles per dollar spent
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