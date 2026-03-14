import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Check } from "lucide-react";
import { JETBLUE_TIER_CONFIGS, type JetBlueTierStatus } from "@shared/jetblue-schema";
import { cn } from "@/lib/utils";

interface JetBlueTierCardProps {
  readonly tier: JetBlueTierStatus;
  readonly highlighted?: boolean;
}

export function JetBlueTierCard({ tier, highlighted = false }: JetBlueTierCardProps) {
  const config = JETBLUE_TIER_CONFIGS[tier];

  const tierColors: Record<string, string> = {
    trueblue: "bg-jetblue-cyan text-white",
    "mosaic-1": "bg-gradient-to-r from-jetblue-mid to-jetblue-cyan text-white",
    "mosaic-2": "bg-gradient-to-r from-jetblue-navy to-jetblue-mid text-white",
    "mosaic-3": "bg-gradient-to-r from-jetblue-navy to-jetblue-orange text-white",
    "mosaic-4": "bg-gradient-to-r from-jetblue-orange to-jetblue-orange/80 text-white",
  };

  const tierBorderColors: Record<string, string> = {
    trueblue: "border-jetblue-cyan",
    "mosaic-1": "border-jetblue-mid",
    "mosaic-2": "border-jetblue-navy",
    "mosaic-3": "border-jetblue-orange",
    "mosaic-4": "border-jetblue-orange/80",
  };

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all hover-elevate",
        highlighted && "border-2 border-jetblue-cyan shadow-lg"
      )}
      data-testid={`card-tier-${tier}`}
    >
      {highlighted && (
        <div className="absolute top-0 right-0">
          <Badge className="rounded-none rounded-bl-lg bg-jetblue-cyan text-white border-0">
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
        <CardTitle className="text-2xl text-jetblue-navy" data-testid={`text-tier-name-${tier}`}>
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
            <><strong className="text-jetblue-navy">+{config.mosaicBonus}</strong> bonus points per dollar on flights</>
          )}
        </div>
        <ul className="space-y-2">
          {config.benefits.map((benefit, index) => (
            <li
              key={benefit}
              className="flex items-start gap-2 text-sm"
              data-testid={`text-benefit-${tier}-${index}`}
            >
              <Check className="w-4 h-4 text-jetblue-cyan flex-shrink-0 mt-0.5" />
              <span className="text-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}