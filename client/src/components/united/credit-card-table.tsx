import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign, Award, Target } from "lucide-react";

export function UnitedCreditCardTable() {
  const creditCards = [
    { 
      name: "No Card",
      annualFee: "$0",
      unitedMiles: "—",
      otherMiles: "—",
      pqpEarn: "—",
      pqpCap: "—",
      annualBonus: "—",
      signUpBonus: "—",
      signUpSpend: "—",
      color: "text-muted-foreground"
    },
    { 
      name: "Explorer",
      annualFee: "$95",
      unitedMiles: "2×",
      otherMiles: "1×",
      pqpEarn: "$20 → 1",
      pqpCap: "1,000",
      annualBonus: "Free bag + Priority",
      signUpBonus: "60,000",
      signUpSpend: "$3,000",
      color: "text-foreground font-semibold"
    },
    { 
      name: "Quest",
      annualFee: "$250",
      unitedMiles: "3×",
      otherMiles: "2×",
      pqpEarn: "$20 → 1",
      pqpCap: "18,000",
      annualBonus: "Free bag + $125 credit",
      signUpBonus: "80,000",
      signUpSpend: "$5,000",
      color: "text-foreground font-semibold"
    },
    { 
      name: "Club",
      annualFee: "$525",
      unitedMiles: "4×",
      otherMiles: "2×",
      pqpEarn: "$15 → 1",
      pqpCap: "28,000",
      annualBonus: "United Club + Free bags",
      signUpBonus: "100,000",
      signUpSpend: "$5,000",
      color: "text-foreground font-semibold"
    },
    { 
      name: "Club Business",
      annualFee: "$525",
      unitedMiles: "4×",
      otherMiles: "2×",
      pqpEarn: "$15 → 1",
      pqpCap: "28,000",
      annualBonus: "United Club + Free bags",
      signUpBonus: "100,000",
      signUpSpend: "$5,000",
      color: "text-foreground font-semibold"
    },
    { 
      name: "Business",
      annualFee: "$99",
      unitedMiles: "2×",
      otherMiles: "1×",
      pqpEarn: "$20 → 1",
      pqpCap: "3,000",
      annualBonus: "Free bag + Priority",
      signUpBonus: "75,000",
      signUpSpend: "$5,000",
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
                <tr className="bg-[#002244] text-white">
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left font-semibold rounded-tl-lg text-xs sm:text-sm whitespace-nowrap">
                    Card
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Annual Fee
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    United Miles
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Other Miles
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    PQP Earn
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    PQP Cap
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
                      <span className="font-semibold text-xs sm:text-sm text-[#0074C8]">{card.unitedMiles}</span>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                      <span className="text-xs sm:text-sm">{card.otherMiles}</span>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                      <span className="text-xs sm:text-sm font-semibold text-[#002244]">{card.pqpEarn}</span>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                      <span className="text-xs sm:text-sm">{card.pqpCap}</span>
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
          <Target className="w-4 h-4 text-[#002244]" />
          <span>PQP earned from credit card spending counts toward all Premier tiers including 1K.</span>
        </p>
        <p className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#0074C8]" />
          <span>Elite status bonuses apply only to United flight purchases, not general card spending.</span>
        </p>
        <p className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-green-600" />
          <span>All cards include free first checked bag and priority boarding when flying United.</span>
        </p>
      </div>
    </div>
  );
}