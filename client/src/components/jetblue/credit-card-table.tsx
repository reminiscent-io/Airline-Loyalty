import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign, Award, Grid3X3 } from "lucide-react";

export function JetBlueCreditCardTable() {
  const creditCards = [
    { 
      name: "No Card",
      annualFee: "$0",
      jetbluePoints: "—",
      otherPoints: "—",
      mosaicBoost: "—",
      freeCheckedBag: "—",
      annualBonus: "—",
      signUpBonus: "—",
      signUpSpend: "—",
      color: "text-muted-foreground"
    },
    { 
      name: "JetBlue",
      annualFee: "$0",
      jetbluePoints: "3×",
      otherPoints: "1×",
      mosaicBoost: "No",
      freeCheckedBag: "No",
      annualBonus: "—",
      signUpBonus: "10,000",
      signUpSpend: "$1,000",
      color: "text-foreground font-semibold"
    },
    { 
      name: "JetBlue Plus",
      annualFee: "$99",
      jetbluePoints: "6×",
      otherPoints: "2× dining/grocery",
      mosaicBoost: "Yes",
      freeCheckedBag: "First bag free",
      annualBonus: "5,000 points",
      signUpBonus: "80,000",
      signUpSpend: "$1,000",
      color: "text-foreground font-semibold"
    },
    { 
      name: "JetBlue Business",
      annualFee: "$99",
      jetbluePoints: "6×",
      otherPoints: "2× office/internet",
      mosaicBoost: "Yes",
      freeCheckedBag: "First bag free",
      annualBonus: "6,000 points",
      signUpBonus: "100,000",
      signUpSpend: "$1,000",
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
                <tr className="bg-gradient-to-r from-[#002244] to-[#0099CC] text-white">
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left font-semibold rounded-tl-lg text-xs sm:text-sm whitespace-nowrap">
                    Card
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Annual Fee
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    JetBlue Points
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Other Points
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Mosaic Boost
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Free Bags
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Annual Bonus
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
                      <span className="font-semibold text-xs sm:text-sm text-[#0099CC]">{card.jetbluePoints}</span>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                      <span className="text-xs sm:text-sm">{card.otherPoints}</span>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                      {card.mosaicBoost === "Yes" ? (
                        <Badge variant="secondary" className="text-xs bg-[#FFA500]/20 text-[#FF6F00]">
                          Yes
                        </Badge>
                      ) : (
                        <span className="text-xs sm:text-sm">{card.mosaicBoost}</span>
                      )}
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                      <span className="text-xs sm:text-sm">{card.freeCheckedBag}</span>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                      <span className="text-xs sm:text-sm">{card.annualBonus}</span>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                      {card.signUpBonus !== "—" && (
                        <Badge variant="secondary" className="text-xs">
                          {card.signUpBonus} pts
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
          <Grid3X3 className="w-4 h-4 text-[#00497F]" />
          <span>JetBlue Plus and Business cards help qualify for Mosaic status with spending.</span>
        </p>
        <p className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#0099CC]" />
          <span>Earn bonus points on your card anniversary with Plus and Business cards.</span>
        </p>
        <p className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-green-600" />
          <span>All cards include 50% inflight savings on food and beverages.</span>
        </p>
      </div>
    </div>
  );
}