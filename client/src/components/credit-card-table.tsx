import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, DollarSign, Award, Gift } from "lucide-react";

export function CreditCardTable() {
  const creditCards = [
    { 
      name: "No Card",
      annualFee: "$0",
      rrPerDollar: "—",
      tqpPer5k: "—",
      annualBonusRR: "—",
      signUpBonusRR: "—",
      signUpSpend: "—",
      color: "text-muted-foreground"
    },
    { 
      name: "Plus",
      annualFee: "$99",
      rrPerDollar: "1x",
      tqpPer5k: "—",
      annualBonusRR: "+3,000",
      signUpBonusRR: "+85,000",
      signUpSpend: "$3,000",
      color: "text-foreground font-semibold"
    },
    { 
      name: "Premier",
      annualFee: "$149",
      rrPerDollar: "1x",
      tqpPer5k: "+1,500",
      annualBonusRR: "+6,000",
      signUpBonusRR: "+85,000",
      signUpSpend: "$3,000",
      color: "text-foreground font-semibold"
    },
    { 
      name: "Priority",
      annualFee: "$229",
      rrPerDollar: "1x",
      tqpPer5k: "+2,500",
      annualBonusRR: "+7,500",
      signUpBonusRR: "+85,000",
      signUpSpend: "$3,000",
      color: "text-foreground font-semibold"
    },
    { 
      name: "Business Premier",
      annualFee: "$149",
      rrPerDollar: "1x",
      tqpPer5k: "+2,000",
      annualBonusRR: "+6,000",
      signUpBonusRR: "+60,000",
      signUpSpend: "$3,000",
      color: "text-foreground font-semibold"
    },
    { 
      name: "Business Performance",
      annualFee: "$299",
      rrPerDollar: "1x",
      tqpPer5k: "+2,500",
      annualBonusRR: "+9,000",
      signUpBonusRR: "+80,000",
      signUpSpend: "$5,000",
      color: "text-foreground font-semibold"
    }
  ];

  return (
    <div className="space-y-6" data-testid="card-credit-comparison">
      {/* Desktop view - full table */}
      <div className="hidden lg:block">
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-southwest-blue text-white">
                  <th className="px-4 py-4 text-left font-semibold rounded-tl-lg whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      <span>Credit Card</span>
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center font-semibold whitespace-nowrap">Annual Fee</th>
                  <th className="px-4 py-4 text-center font-semibold whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span>RR Per $1</span>
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center font-semibold whitespace-nowrap">TQP/$5k</th>
                  <th className="px-4 py-4 text-center font-semibold whitespace-nowrap bg-southwest-gold/20">
                    <div className="flex items-center justify-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>Annual Bonus</span>
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center font-semibold whitespace-nowrap rounded-tr-lg" colSpan={2}>
                    <div className="flex items-center justify-center gap-2">
                      <Gift className="w-4 h-4" />
                      <span>Sign-Up Bonus</span>
                    </div>
                  </th>
                </tr>
                <tr className="bg-southwest-blue/90 text-white text-xs">
                  <th className="px-4 py-2"></th>
                  <th className="px-4 py-2"></th>
                  <th className="px-4 py-2"></th>
                  <th className="px-4 py-2"></th>
                  <th className="px-4 py-2 text-center bg-southwest-gold/20">RR and CQP Points</th>
                  <th className="px-4 py-2 text-center">RR and CQP Points</th>
                  <th className="px-4 py-2 text-center">Min Spend</th>
                </tr>
              </thead>
              <tbody>
                {creditCards.map((card, index) => (
                  <tr 
                    key={card.name}
                    className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}
                    data-testid={`row-card-${index}`}
                  >
                    <td className={`px-4 py-3 text-sm font-medium ${card.color}`}>
                      {card.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-center font-semibold">
                      {card.annualFee}
                    </td>
                    <td className="px-4 py-3 text-sm text-center">
                      {card.rrPerDollar}
                    </td>
                    <td className="px-4 py-3 text-sm text-center font-semibold text-accent">
                      {card.tqpPer5k}
                    </td>
                    <td className="px-4 py-3 text-sm text-center bg-southwest-gold/5">
                      {card.annualBonusRR}
                    </td>
                    <td className="px-4 py-3 text-sm text-center">
                      {card.signUpBonusRR}
                    </td>
                    <td className="px-4 py-3 text-sm text-center">
                      {card.signUpSpend}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      </div>

      {/* Tablet view - cards with key info */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
        {creditCards.map((card, index) => (
          <Card 
            key={card.name} 
            className="hover-elevate"
            data-testid={`tablet-card-${index}`}
          >
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className={`font-semibold text-lg ${card.color}`}>
                  {card.name}
                </h3>
                <span className="text-sm font-semibold">{card.annualFee}/yr</span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">RR per $1</span>
                  <span className="font-medium">{card.rrPerDollar}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">TQP per $5k</span>
                  <span className="font-medium text-accent">{card.tqpPer5k}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Annual Bonus</span>
                  <span className="font-medium">{card.annualBonusRR} RR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sign-Up Bonus</span>
                  <span className="font-medium">{card.signUpBonusRR}</span>
                </div>
                {card.signUpSpend !== "—" && (
                  <div className="text-xs text-muted-foreground text-right">
                    After {card.signUpSpend} spend
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile view - stacked cards */}
      <div className="md:hidden space-y-3">
        {creditCards.map((card, index) => (
          <Card 
            key={card.name}
            className="hover-elevate"
            data-testid={`mobile-card-${index}`}
          >
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className={`font-semibold text-lg ${card.color}`}>
                  {card.name}
                </h3>
                <span className="text-sm font-semibold">{card.annualFee}/yr</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">RR per $1</p>
                  <p className="font-medium">{card.rrPerDollar}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">TQP per $5k</p>
                  <p className="font-medium text-accent">{card.tqpPer5k}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Annual Bonus</p>
                  <p className="font-medium">{card.annualBonusRR} RR</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Sign-Up Bonus</p>
                  <p className="font-medium">{card.signUpBonusRR}</p>
                </div>
              </div>
              
              {card.signUpSpend !== "—" && (
                <p className="text-xs text-muted-foreground text-center">
                  Sign-up bonus after {card.signUpSpend} spend in 3 months
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info note */}
      <div className="text-xs text-muted-foreground text-center p-4 bg-muted/30 rounded-lg">
        <p>All points earned from credit card spending count toward both RR (Rapid Rewards) and CQP (Companion Pass).</p>
        <p className="mt-1">TQP boosts are awarded for every $5,000 in total credit card spending (flights + purchases).</p>
      </div>
    </div>
  );
}