import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Sparkles, Check } from "lucide-react";
import { DeltaTier } from "@shared/delta-schema";
import { cn } from "@/lib/utils";

interface DeltaTierCardProps {
  tier: DeltaTier;
}

export function DeltaTierCard({ tier }: DeltaTierCardProps) {
  const tierColors = {
    "Member": "bg-gray-500 text-white",
    "Silver Medallion": "bg-gray-300 text-gray-900",
    "Gold Medallion": "bg-yellow-500 text-gray-900",
    "Platinum Medallion": "bg-gray-400 text-gray-900",
    "Diamond Medallion": "bg-gradient-to-r from-gray-700 to-blue-900 text-white",
    "Delta 360°": "bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white",
  };

  return (
    <Card 
      className={cn(
        "h-full hover-elevate active-elevate-2 transition-all duration-300 relative overflow-hidden",
        tier.isGhost && "border-2 bg-gradient-to-br from-purple-950/20 via-indigo-950/20 to-black/20"
      )}
      style={{ 
        borderColor: tier.name.includes("Silver") ? "#C0C0C0" :
                     tier.name.includes("Gold") ? "#FFD700" :
                     tier.name.includes("Platinum") ? "#5E5E5E" :
                     tier.name.includes("Diamond") ? "#1E1E1E" :
                     tier.name.includes("360") ? "#6B46C1" :
                     "#C8102E",
        borderWidth: tier.isGhost ? undefined : "2px"
      }}
    >
      {tier.isGhost && (
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
              tierColors[tier.name as keyof typeof tierColors]
            )}
            data-testid={`badge-tier-${tier.name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <Award className="w-3 h-3 mr-1" />
            {tier.name}
          </Badge>
        </div>
        <CardTitle className="text-2xl text-[#C8102E]" data-testid={`text-tier-${tier.name.toLowerCase().replace(/\s+/g, '-')}`}>
          {tier.name === "Delta 360°" ? "Ultimate Elite Status" : tier.earningRate === 0 ? "Base Earning Rate" : `+${tier.earningRate} Bonus Miles/$`}
        </CardTitle>
        <CardDescription>
          {tier.isGhost ? (
            <span className="text-purple-600 font-semibold">
              By invitation only - Most exclusive tier
            </span>
          ) : (
            <span>
              Earn ${tier.mqd.toLocaleString()} MQDs to qualify
            </span>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          <strong className="text-[#C8102E]">+{tier.earningRate}</strong> bonus SkyMiles per dollar spent
        </div>
        <ul className="space-y-2">
          {tier.benefits.slice(0, 5).map((benefit, index) => (
            <li 
              key={index} 
              className="flex items-start gap-2 text-sm"
              data-testid={`text-benefit-${tier.name.toLowerCase().replace(/\s+/g, '-')}-${index}`}
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