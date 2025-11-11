import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign, Award, Ticket, Plane, Globe } from "lucide-react";

export function AtmosCreditCardTable() {
  const creditCards = [
    { 
      name: "No Card",
      issuer: "—",
      annualFee: "$0",
      airlinePoints: "—",
      otherPoints: "—",
      statusPoints: "—",
      companionFare: "—",
      signUpBonus: "—",
      signUpSpend: "—",
      loungeAccess: "—",
      isPremium: false
    },
    { 
      name: "Summit Visa Infinite",
      issuer: "Bank of America",
      annualFee: "$395",
      airlinePoints: "3× points",
      otherPoints: "3× dining, 3× ALL foreign",
      statusPoints: "1 per $2 spent (no cap)",
      companionFare: "Global Companion (25K/100K pts)",
      signUpBonus: "80,000 pts",
      signUpSpend: "$4,000",
      loungeAccess: "8 Alaska Lounge passes/year",
      isPremium: true
    },
    { 
      name: "Ascent Visa Signature",
      issuer: "Bank of America",
      annualFee: "$95",
      airlinePoints: "3× points",
      otherPoints: "2× gas/EV, transit, streaming",
      statusPoints: "1 per $3 spent (no cap)",
      companionFare: "$99 + taxes",
      signUpBonus: "60,000 pts",
      signUpSpend: "$3,000",
      loungeAccess: "—",
      isPremium: false
    },
    { 
      name: "Business Visa",
      issuer: "Bank of America",
      annualFee: "$95",
      airlinePoints: "3× points",
      otherPoints: "2× gas/EV, shipping, transit",
      statusPoints: "1 per $3 spent (no cap)",
      companionFare: "$99 annually",
      signUpBonus: "60,000 pts",
      signUpSpend: "$4,000",
      loungeAccess: "—",
      isPremium: false
    },
    { 
      name: "Hawaiian World Elite",
      issuer: "Barclays",
      annualFee: "$99",
      airlinePoints: "3× points",
      otherPoints: "2× gas, dining, grocery",
      statusPoints: "NO status points",
      companionFare: "$100 discount",
      signUpBonus: "70,000 pts",
      signUpSpend: "$2,000",
      loungeAccess: "—",
      isPremium: false
    },
    { 
      name: "Hawaiian BoH",
      issuer: "Bank of Hawaii",
      annualFee: "$99",
      airlinePoints: "3× points",
      otherPoints: "2× gas, dining, grocery",
      statusPoints: "NO status points",
      companionFare: "$100 discount",
      signUpBonus: "60,000 pts",
      signUpSpend: "$2,000",
      loungeAccess: "—",
      isPremium: false
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
                    Airline Points
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Other Categories
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Status Points
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Companion Fare
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Sign-up Bonus
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap rounded-tr-lg">
                    Lounge Access
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
                    <td className="px-3 sm:px-4 md:px-6 py-3">
                      <div>
                        <div className={`text-xs sm:text-sm font-semibold ${card.isPremium ? 'text-purple-700' : 'text-foreground'}`}>
                          {card.name}
                        </div>
                        <div className="text-[10px] text-muted-foreground">{card.issuer}</div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                      <span className={`font-semibold text-xs sm:text-sm ${card.annualFee === "$395" ? 'text-purple-700' : ''}`}>
                        {card.annualFee}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                      <span className="font-semibold text-xs sm:text-sm text-[#00467F]">{card.airlinePoints}</span>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                      <span className="text-xs sm:text-sm">{card.otherPoints}</span>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                      {card.statusPoints !== "—" && card.statusPoints !== "NO status points" ? (
                        <Badge variant="outline" className="text-xs bg-green-50 border-green-600">
                          {card.statusPoints}
                        </Badge>
                      ) : card.statusPoints === "NO status points" ? (
                        <Badge variant="outline" className="text-xs bg-red-50 border-red-600">
                          {card.statusPoints}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
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
                      {card.signUpBonus !== "—" && (
                        <div>
                          <Badge variant="secondary" className="text-xs">
                            {card.signUpBonus}
                          </Badge>
                          <div className="text-[10px] text-muted-foreground mt-1">
                            {card.signUpSpend}
                          </div>
                        </div>
                      )}
                      {card.signUpBonus === "—" && <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                      {card.loungeAccess !== "—" ? (
                        <Badge variant="outline" className="text-xs bg-blue-50 border-blue-600">
                          {card.loungeAccess}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Key Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-green-200 bg-green-50/30">
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-green-600" />
              Status Points Earning (2026)
            </h3>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• <strong>Summit:</strong> 1 status point per $2 spent (no cap)</li>
              <li>• <strong>Ascent/Business:</strong> 1 status point per $3 spent (no cap in 2026)</li>
              <li>• <strong>Summit bonus:</strong> 10,000 anniversary status points</li>
              <li>• <strong>Hawaiian cards:</strong> NO status points earned</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-purple-200 bg-purple-50/30">
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-600" />
              Summit Premium Benefits
            </h3>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Global Companion Award (25K points)</li>
              <li>• 2nd Global Companion at $60K spend (100K pts)</li>
              <li>• 3× points on ALL foreign purchases</li>
              <li>• Primary rental car coverage</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
      <div className="text-sm text-muted-foreground space-y-1">
        <p className="flex items-center gap-2">
          <Plane className="w-4 h-4 text-[#00467F]" />
          <span>All cards include free first checked bag and priority boarding</span>
        </p>
        <p className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-[#7AC142]" />
          <span>Bank of America cardholders get 10% bonus on all points with eligible banking relationship</span>
        </p>
        <p className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-orange-600" />
          <span>Only Bank of America cards (Summit, Ascent, Business) earn status points toward elite tiers</span>
        </p>
      </div>
    </div>
  );
}