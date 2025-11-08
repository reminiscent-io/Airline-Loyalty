import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Sparkles, Check, Plane } from "lucide-react";
import { DeltaTierType, DELTA_TIER_CONFIGS } from "@shared/delta-schema";
import { cn } from "@/lib/utils";

interface DeltaTierCardProps {
  tier: DeltaTierType;
  highlighted?: boolean;
}

export function DeltaTierCard({ tier, highlighted = false }: DeltaTierCardProps) {
  const config = DELTA_TIER_CONFIGS[tier];
  const isGhostTier = (config as any).isGhostTier || false;

  const tierColors = {
    member: "bg-gray-500 text-white",
    silver: "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900",
    gold: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900",
    platinum: "bg-gradient-to-r from-gray-500 to-gray-600 text-white",
    diamond: "bg-gradient-to-r from-gray-800 to-blue-900 text-white",
    "delta-360": "bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white",
  };

  const tierBorderColors = {
    member: "border-gray-400",
    silver: "border-gray-400",
    gold: "border-yellow-500",
    platinum: "border-gray-600",
    diamond: "border-gray-800",
    "delta-360": "border-purple-500",
  };

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all hover-elevate",
        highlighted && "border-2 border-[#C8102E] shadow-lg",
        isGhostTier && "border-2 bg-gradient-to-br from-purple-950/20 via-indigo-950/20 to-black/20"
      )}
      data-testid={`card-tier-${tier}`}
    >
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
            <Plane className="w-3 h-3 mr-1" />
            {config.name}
          </Badge>
        </div>
        <CardTitle className="text-2xl text-[#C8102E]" data-testid={`text-tier-name-${tier}`}>
          {tier === "member" ? (
            "Base Tier"
          ) : tier === "silver" ? (
            "+2 Bonus Miles/Dollar"
          ) : tier === "gold" ? (
            "+3 Bonus Miles/Dollar"
          ) : tier === "platinum" ? (
            "+4 Bonus Miles/Dollar"
          ) : tier === "diamond" ? (
            "+6 Bonus Miles/Dollar"
          ) : (
            "Ultimate Elite Status"
          )}
        </CardTitle>
        <CardDescription>
          {tier === "member" ? (
            "Starting tier for all members"
          ) : isGhostTier ? (
            <span className="text-purple-600 font-semibold">
              By invitation only - Most exclusive tier
            </span>
          ) : (
            <span data-testid={`text-tier-requirement-${tier}`}>
              Earn ${config.mqdRequired.toLocaleString()} MQDs to qualify
            </span>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          Up to <strong className="text-[#C8102E]">
            {tier === "member" ? (
              "5"
            ) : tier === "silver" ? (
              "7"
            ) : tier === "gold" ? (
              "8"
            ) : tier === "platinum" ? (
              "9"
            ) : tier === "diamond" ? (
              "11"
            ) : (
              "11"
            )}
          </strong> total miles per dollar
        </div>
        <ul className="space-y-2.5">
          {config.benefits.map((benefit, index) => (
            <li 
              key={index} 
              className="flex items-start gap-2 text-sm"
              data-testid={`text-benefit-${tier}-${index}`}
            >
              <Check className="w-4 h-4 text-[#C8102E] flex-shrink-0 mt-0.5" />
              <span className="text-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}