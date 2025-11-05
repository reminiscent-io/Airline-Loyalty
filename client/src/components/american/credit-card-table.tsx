import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign, Award, Gift } from "lucide-react";

export function AmericanCreditCardTable() {
  const creditCards = [
    { 
      name: "No Card",
      annualFee: "$0",
      aaMiles: "—",
      otherMiles: "—",
      loyaltyPoints: "—",
      annualBonus: "—",
      signUpBonus: "—",
      signUpSpend: "—",
      color: "text-muted-foreground"
    },
    { 
      name: "Aviator Red",
      annualFee: "$99",
      aaMiles: "2×",
      otherMiles: "1×",
      loyaltyPoints: "$1 → 1 LP",
      annualBonus: "Free Checked Bag",
      signUpBonus: "60,000",
      signUpSpend: "$1,000",
      color: "text-foreground font-semibold"
    },
    { 
      name: "Aviator Silver",
      annualFee: "$195",
      aaMiles: "3×",
      otherMiles: "2×",
      loyaltyPoints: "$1 → 1 LP",
      annualBonus: "+10,000 LP annually",
      signUpBonus: "75,000",
      signUpSpend: "$2,500",
      color: "text-foreground font-semibold"
    },
    { 
      name: "Aviator Business",
      annualFee: "$99",
      aaMiles: "2×",
      otherMiles: "1×",
      loyaltyPoints: "$1 → 1 LP",
      annualBonus: "Free Checked Bag",
      signUpBonus: "65,000",
      signUpSpend: "$2,000",
      color: "text-foreground font-semibold"
    },
    { 
      name: "Citi Platinum",
      annualFee: "$99",
      aaMiles: "2×",
      otherMiles: "1×",
      loyaltyPoints: "$1 → 1 LP",
      annualBonus: "Free Checked Bag",
      signUpBonus: "75,000",
      signUpSpend: "$4,000",
      color: "text-foreground font-semibold"
    },
    { 
      name: "Citi Executive",
      annualFee: "$595",
      aaMiles: "4×",
      otherMiles: "2×",
      loyaltyPoints: "$1 → 1 LP",
      annualBonus: "Admirals Club + 10,000 LP",
      signUpBonus: "100,000",
      signUpSpend: "$10,000",
      color: "text-foreground font-semibold"
    }
  ];

  return (
    <div className="space-y-6" data-testid="card-credit-comparison">
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0078D2] text-white">
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left font-semibold rounded-tl-lg text-xs sm:text-sm whitespace-nowrap">
                    Card
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Annual Fee
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    AA Miles
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Other Miles
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Loyalty Points
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Annual Benefits
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Sign-up Bonus
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap rounded-tr-lg">
                    Min. Spend
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {creditCards.map((card, index) => (
                  <tr 
                    key={index}
                    className={index === 0 ? "" : "hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"}
                    data-testid={`row-card-${index}`}
                  >
                    <td className={`px-3 sm:px-4 md:px-6 py-3 text-xs sm:text-sm ${card.color}`}>
                      {card.name}
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                      <span className="font-semibold text-xs sm:text-sm">{card.annualFee}</span>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                      <span className="font-semibold text-xs sm:text-sm text-[#0078D2]">{card.aaMiles}</span>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                      <span className="text-xs sm:text-sm">{card.otherMiles}</span>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                      <span className="text-xs sm:text-sm">{card.loyaltyPoints}</span>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                      <span className="text-xs sm:text-sm">{card.annualBonus}</span>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                      {card.signUpBonus !== "—" && (
                        <Badge variant="secondary" className="text-xs">
                          {card.signUpBonus} miles
                        </Badge>
                      )}
                      {card.signUpBonus === "—" && <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                      <span className="text-xs sm:text-sm">{card.signUpSpend}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <div className="text-sm text-muted-foreground space-y-1">
        <p className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-[#0078D2]" />
          <span>All miles earned on credit cards count as both AAdvantage miles and Loyalty Points (base miles only, not category bonuses).</span>
        </p>
        <p className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#C8102E]" />
          <span>Elite status bonuses apply only to flight purchases, not credit card spending.</span>
        </p>
        <p className="flex items-center gap-2">
          <Gift className="w-4 h-4 text-green-600" />
          <span>Sign-up bonuses are one-time offers for new cardholders who meet spending requirements.</span>
        </p>
      </div>
    </div>
  );
}