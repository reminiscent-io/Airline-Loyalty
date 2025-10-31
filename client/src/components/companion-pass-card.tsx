import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Plane, Check } from "lucide-react";
import { COMPANION_PASS_THRESHOLD_FLIGHTS, COMPANION_PASS_THRESHOLD_CQP } from "@shared/schema";

export function CompanionPassCard() {
  const benefits = [
    "Bring a companion for free on every flight (just pay taxes)",
    "Valid for the rest of the earning year + the entire following year",
    "No blackout dates - use on any available seat",
    "Choose a different companion up to 3 times per year",
    "Works on both paid and award flights",
    "Companion flies free even on international routes"
  ];

  return (
    <Card 
      className="relative overflow-hidden transition-all hover-elevate border-2 border-southwest-gold"
      data-testid="card-companion-pass"
    >
      <div className="absolute top-0 right-0">
        <Badge className="rounded-none rounded-bl-lg bg-southwest-gold text-southwest-navy border-0">
          <Heart className="w-3 h-3 mr-1 fill-current" />
          Ultimate Reward
        </Badge>
      </div>
      
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <Badge 
            className="px-3 py-1 text-sm font-semibold bg-southwest-gold text-southwest-navy"
            data-testid="badge-companion-pass"
          >
            <Heart className="w-3 h-3 mr-1 fill-current" />
            Companion Pass
          </Badge>
        </div>
        <CardTitle className="text-2xl text-southwest-navy flex items-center gap-2" data-testid="text-companion-pass-title">
          <Plane className="w-5 h-5 text-southwest-blue" />
          Fly 1, Companion Flies Free
        </CardTitle>
        <CardDescription>
          <span data-testid="text-companion-pass-requirement">
            Earn {COMPANION_PASS_THRESHOLD_FLIGHTS} flights or {COMPANION_PASS_THRESHOLD_CQP.toLocaleString()} CQP in a calendar year
          </span>
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-2.5">
          {benefits.map((benefit, index) => (
            <li 
              key={index} 
              className="flex items-start gap-2 text-sm"
              data-testid={`text-benefit-companion-pass-${index}`}
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