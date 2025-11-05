import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Check } from "lucide-react";
import { JETBLUE_TIER_CONFIGS, type JetBlueTierStatus } from "@shared/jetblue-schema";
import { cn } from "@/lib/utils";

interface JetBlueTierCardProps {
  tier: JetBlueTierStatus;
  highlighted?: boolean;
}

export function JetBlueTierCard({ tier, highlighted = false }: JetBlueTierCardProps) {
  const config = JETBLUE_TIER_CONFIGS[tier];

  const tierColors = {
    basic: "bg-gray-500 text-white",
    trueblue: "bg-[#0099CC] text-white",
    mosaic: "bg-gradient-to-r from-[#00497F] to-[#0099CC] text-white",
    "mosaic-plus": "bg-gradient-to-r from-[#002244] to-[#00497F] text-white",
    "mosaic-elite": "bg-gradient-to-r from-[#FFA500] to-[#FF6F00] text-white",
  };

  const tierBorderColors = {
    basic: "border-gray-400",
    trueblue: "border-[#0099CC]",
    mosaic: "border-[#00497F]",
    "mosaic-plus": "border-[#002244]",
    "mosaic-elite": "border-[#FFA500]",
  };

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all hover-elevate",
        highlighted && "border-2 border-[#0099CC] shadow-lg"
      )}
      data-testid={`card-tier-${tier}`}
    >
      {highlighted && (
        <div className="absolute top-0 right-0">
          <Badge className="rounded-none rounded-bl-lg bg-[#0099CC] text-white border-0">
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
            <Cloud className="w-3 h-3 mr-1" />
            {config.name}
          </Badge>
        </div>
        <CardTitle className="text-2xl text-[#002244]" data-testid={`text-tier-name-${tier}`}>
          {tier === "basic" ? (
            "Base Tier"
          ) : tier === "trueblue" ? (
            "5× Points"
          ) : tier === "mosaic" ? (
            "+2 Points/Dollar"
          ) : tier === "mosaic-plus" ? (
            "+3 Points/Dollar"
          ) : (
            "+5 Points/Dollar"
          )}
        </CardTitle>
        <CardDescription>
          {tier === "basic" || tier === "trueblue" ? (
            "No qualification required"
          ) : (
            <span data-testid={`text-tier-requirement-${tier}`}>
              {config.tilesRequired} tiles or {config.segmentsRequired} segments
            </span>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          <strong className="text-[#002244]">{config.pointsMultiplier}×</strong> points per dollar spent
        </div>
        <ul className="space-y-2">
          {config.benefits.map((benefit, index) => (
            <li 
              key={index} 
              className="flex items-start gap-2 text-sm"
              data-testid={`text-benefit-${tier}-${index}`}
            >
              <Check className="w-4 h-4 text-[#0099CC] flex-shrink-0 mt-0.5" />
              <span className="text-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}