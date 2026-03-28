import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, DollarSign, Award, Gift } from "lucide-react";

export function SouthwestCreditCardTable() {
  const creditCards = [
    { 
      name: "No Card",
      annualFee: "$0",
      rrFlights: "—",
      rrNonFlights: "—",
      tqpPer5k: "—",
      annualBonusRR: "—",
      annualBonusCQP: "—",
      signUpBonusRR: "—",
      signUpSpend: "—",
      color: "text-muted-foreground"
    },
    { 
      name: "Plus",
      annualFee: "$99",
      rrFlights: "+2",
      rrNonFlights: "1x",
      tqpPer5k: "—",
      annualBonusRR: "+3,000",
      annualBonusCQP: "+13,000",
      signUpBonusRR: "+85,000",
      signUpSpend: "$3,000",
      color: "text-foreground font-semibold"
    },
    { 
      name: "Premier",
      annualFee: "$149",
      rrFlights: "+3",
      rrNonFlights: "1x",
      tqpPer5k: "+1,500",
      annualBonusRR: "+6,000",
      annualBonusCQP: "+16,000",
      signUpBonusRR: "+85,000",
      signUpSpend: "$3,000",
      color: "text-foreground font-semibold"
    },
    { 
      name: "Priority",
      annualFee: "$229",
      rrFlights: "+4",
      rrNonFlights: "1x",
      tqpPer5k: "+2,500",
      annualBonusRR: "+7,500",
      annualBonusCQP: "+17,500",
      signUpBonusRR: "+85,000",
      signUpSpend: "$3,000",
      color: "text-foreground font-semibold"
    },
    { 
      name: "Business Premier",
      annualFee: "$149",
      rrFlights: "+3",
      rrNonFlights: "1x",
      tqpPer5k: "+2,000",
      annualBonusRR: "+6,000",
      annualBonusCQP: "+16,000",
      signUpBonusRR: "+60,000",
      signUpSpend: "$3,000",
      color: "text-foreground font-semibold"
    },
    { 
      name: "Business Performance",
      annualFee: "$299",
      rrFlights: "+4",
      rrNonFlights: "2x",
      tqpPer5k: "+2,500",
      annualBonusRR: "+9,000",
      annualBonusCQP: "+19,000",
      signUpBonusRR: "+80,000",
      signUpSpend: "$5,000",
      color: "text-foreground font-semibold"
    }
  ];

  return (
    <div className="space-y-6" data-testid="card-credit-comparison">
      {/* Table view for all screen sizes */}
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
                  <th className="px-4 py-4 text-center font-semibold whitespace-nowrap" colSpan={2}>
                    <div className="flex items-center justify-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span>RR pts per $1</span>
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center font-semibold whitespace-nowrap">TQP/$5k</th>
                  <th className="px-4 py-4 text-center font-semibold whitespace-nowrap bg-southwest-gold/20" colSpan={2}>
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
                  <th className="px-4 py-2 text-center">SW Flights</th>
                  <th className="px-4 py-2 text-center">Non-Flights</th>
                  <th className="px-4 py-2"></th>
                  <th className="px-4 py-2 text-center bg-southwest-gold/20">RR Points</th>
                  <th className="px-4 py-2 text-center bg-southwest-gold/20">CQP Points</th>
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
                    <td className="px-4 py-3 text-sm text-center font-semibold text-primary">
                      {card.rrFlights}
                    </td>
                    <td className="px-4 py-3 text-sm text-center">
                      {card.rrNonFlights}
                    </td>
                    <td className="px-4 py-3 text-sm text-center font-semibold text-accent">
                      {card.tqpPer5k}
                    </td>
                    <td className="px-4 py-3 text-sm text-center bg-southwest-gold/5">
                      {card.annualBonusRR}
                    </td>
                    <td className="px-4 py-3 text-sm text-center bg-southwest-gold/5 font-semibold">
                      {card.annualBonusCQP}
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

      {/* Info note */}
      <div className="text-xs text-muted-foreground text-center p-4 bg-muted/30 rounded-lg">
        <p>SW Flights bonus points are earned in addition to base fare earn rate and tier multiplier.</p>
        <p className="mt-1">All points from credit card spending count toward both RR (Rapid Rewards) and CQP (Companion Pass).</p>
        <p className="mt-1">TQP boosts are awarded for every $5,000 in total credit card spending (flights + purchases).</p>
      </div>
    </div>
  );
}