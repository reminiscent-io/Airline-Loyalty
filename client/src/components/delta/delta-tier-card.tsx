import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Sparkles } from "lucide-react";
import { DeltaTier } from "@shared/delta-schema";
import { cn } from "@/lib/utils";

interface DeltaTierCardProps {
  tier: DeltaTier;
}

export function DeltaTierCard({ tier }: DeltaTierCardProps) {
  return (
    <Card 
      className={cn(
        "h-full hover-elevate active-elevate-2 transition-all duration-300",
        tier.isGhost && "relative overflow-visible"
      )}
      style={{ 
        borderColor: tier.name.includes("Silver") ? "#C0C0C0" :
                     tier.name.includes("Gold") ? "#FFD700" :
                     tier.name.includes("Platinum") ? "#5E5E5E" :
                     tier.name.includes("Diamond") ? "#1E1E1E" :
                     tier.name.includes("360") ? "#6B46C1" :
                     "#C8102E",
        borderWidth: "2px"
      }}
    >
      {tier.isGhost && (
        <>
          {/* Animated gradient background for ghost tier */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-purple-600/10 rounded-lg animate-pulse" />
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 via-transparent to-purple-600/20 animate-shimmer" />
          </div>
        </>
      )}

      <CardHeader className={cn(
        "pb-4 relative z-10",
        tier.isGhost && tier.color
      )}>
        <div className="flex items-center justify-between">
          <Award 
            className="w-8 h-8" 
            style={{ 
              color: tier.name.includes("Silver") ? "#C0C0C0" :
                     tier.name.includes("Gold") ? "#FFD700" :
                     tier.name.includes("Platinum") ? "#5E5E5E" :
                     tier.name.includes("Diamond") ? "#1E1E1E" :
                     tier.name.includes("360") ? "#6B46C1" :
                     "#C8102E"
            }} 
          />
          {tier.isGhost && (
            <Badge 
              variant="secondary" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              Invitation Only
            </Badge>
          )}
        </div>
        <h3 className="text-xl font-bold mt-3" data-testid={`text-tier-${tier.name.toLowerCase().replace(/\s+/g, '-')}`}>
          {tier.name}
        </h3>
        <div className="flex items-baseline gap-2 mt-1">
          {!tier.isGhost && (
            <p className="text-sm text-muted-foreground">
              ${tier.mqd.toLocaleString()} MQDs
            </p>
          )}
          {tier.isGhost && (
            <p className="text-sm font-medium text-purple-600">
              By invitation only
            </p>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="mb-4">
          <span className="text-sm text-muted-foreground">Earning Rate</span>
          <p className="text-lg font-bold" style={{ color: "#003566" }}>
            {tier.earningRate}x SkyMiles per $1
          </p>
        </div>
        
        <div className="space-y-2">
          <span className="text-sm font-semibold">Key Benefits:</span>
          <ul className="space-y-1">
            {tier.benefits.slice(0, 5).map((benefit, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start">
                <span className="mr-1">•</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}