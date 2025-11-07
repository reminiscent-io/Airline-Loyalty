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

  const tierColors: Record<string, string> = {
    trueblue: "bg-[#0099CC] text-white",
    "mosaic-1": "bg-gradient-to-r from-[#00497F] to-[#0099CC] text-white",
    "mosaic-2": "bg-gradient-to-r from-[#002244] to-[#00497F] text-white",
    "mosaic-3": "bg-gradient-to-r from-[#002244] to-[#FFA500] text-white",
    "mosaic-4": "bg-gradient-to-r from-[#FFA500] to-[#FF6F00] text-white",
  };

  const tierBorderColors: Record<string, string> = {
    trueblue: "border-[#0099CC]",
    "mosaic-1": "border-[#00497F]",
    "mosaic-2": "border-[#002244]",
    "mosaic-3": "border-[#FFA500]",
    "mosaic-4": "border-[#FF6F00]",
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
          {tier === "trueblue" ? (
            "Base Member"
          ) : (
            `+${config.mosaicBonus} Points/Dollar`
          )}
        </CardTitle>
        <CardDescription>
          {tier === "trueblue" ? (
            "No qualification required"
          ) : (
            <span data-testid={`text-tier-requirement-${tier}`}>
              {config.tilesRequired} tiles required
            </span>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          {tier === "trueblue" ? (
            <>Base points earn rates apply</>
          ) : (
            <><strong className="text-[#002244]">+{config.mosaicBonus}</strong> bonus points per dollar on flights</>
          )}
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