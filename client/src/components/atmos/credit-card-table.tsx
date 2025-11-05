import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign, Award, Ticket } from "lucide-react";

export function AtmosCreditCardTable() {
  const creditCards = [
    { 
      name: "No Card",
      annualFee: "$0",
      airlineMiles: "—",
      otherMiles: "—",
      companionFare: "—",
      freeCheckedBag: "—",
      signUpBonus: "—",
      signUpSpend: "—",
      color: "text-muted-foreground"
    },
    { 
      name: "Alaska Personal",
      annualFee: "$95",
      airlineMiles: "3×",
      otherMiles: "1×",
      companionFare: "$99+taxes",
      freeCheckedBag: "First bag free",
      signUpBonus: "60,000",
      signUpSpend: "$3,000",
      color: "text-foreground font-semibold"
    },
    { 
      name: "Alaska Business",
      annualFee: "$95",
      airlineMiles: "3×",
      otherMiles: "2× gas/shipping",
      companionFare: "$99+taxes",
      freeCheckedBag: "First bag free",
      signUpBonus: "70,000",
      signUpSpend: "$4,000",
      color: "text-foreground font-semibold"
    },
    { 
      name: "Hawaiian Personal",
      annualFee: "$99",
      airlineMiles: "3×",
      otherMiles: "2× gas/grocery",
      companionFare: "—",
      freeCheckedBag: "First bag free",
      signUpBonus: "70,000",
      signUpSpend: "$2,000",
      color: "text-foreground font-semibold"
    },
    { 
      name: "Hawaiian Business",
      annualFee: "$99",
      airlineMiles: "3×",
      otherMiles: "2× dining/office",
      companionFare: "—",
      freeCheckedBag: "First bag free",
      signUpBonus: "80,000",
      signUpSpend: "$2,000",
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
                <tr className="bg-gradient-to-r from-[#00467F] to-[#7AC142] text-white">
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left font-semibold rounded-tl-lg text-xs sm:text-sm whitespace-nowrap">
                    Card
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Annual Fee
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Airline Miles
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Other Miles
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Companion Fare
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Free Bags
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
                      <span className="font-semibold text-xs sm:text-sm text-[#00467F]">{card.airlineMiles}</span>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                      <span className="text-xs sm:text-sm">{card.otherMiles}</span>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                      {card.companionFare !== "—" ? (
                        <Badge variant="secondary" className="text-xs">
                          {card.companionFare}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                      <span className="text-xs sm:text-sm">{card.freeCheckedBag}</span>
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
          <Ticket className="w-4 h-4 text-[#00467F]" />
          <span>Alaska cards include annual companion fare from $99 plus taxes after card anniversary.</span>
        </p>
        <p className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#7AC142]" />
          <span>Elite bonuses apply to base miles earned on Alaska and Hawaiian flights.</span>
        </p>
        <p className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-green-600" />
          <span>All cards include first checked bag free and priority boarding.</span>
        </p>
      </div>
    </div>
  );
}