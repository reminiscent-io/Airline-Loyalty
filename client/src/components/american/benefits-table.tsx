import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";

export function AmericanBenefitsTable() {
  const benefits = [
    { name: "Miles Don't Expire (with activity)", member: true, gold: true, platinum: true, platinumPro: true, executivePlatinum: true },
    { name: "No Blackout Dates", member: true, gold: true, platinum: true, platinumPro: true, executivePlatinum: true },
    { name: "Mileage Earning Bonus", member: "0%", gold: "+40%", platinum: "+60%", platinumPro: "+80%", executivePlatinum: "+120%" },
    { name: "Complimentary Main Cabin Extra", member: false, gold: "When available", platinum: true, platinumPro: true, executivePlatinum: true },
    { name: "Complimentary Preferred Seats", member: false, gold: false, platinum: true, platinumPro: true, executivePlatinum: true },
    { name: "Priority Check-in", member: false, gold: true, platinum: true, platinumPro: true, executivePlatinum: true },
    { name: "Priority Security (TSA PreCheck)", member: false, gold: false, platinum: true, platinumPro: true, executivePlatinum: true },
    { name: "Priority Boarding", member: false, gold: "Group 4", platinum: "Group 3", platinumPro: "Group 2", executivePlatinum: "Group 1" },
    { name: "Free Checked Bags", member: false, gold: "1 bag", platinum: "2 bags", platinumPro: "3 bags", executivePlatinum: "3 bags" },
    { name: "Same-Day Standby", member: "$0 (purchase req)", gold: "Free", platinum: "Free", platinumPro: "Free", executivePlatinum: "Free + Confirmed" },
    { name: "Complimentary Upgrades", member: false, gold: "500 miles", platinum: "500 miles", platinumPro: "900 miles", executivePlatinum: "Unlimited + 4 SWUs" },
    { name: "Admirals Club Access", member: false, gold: false, platinum: false, platinumPro: false, executivePlatinum: "When flying AA" },
    { name: "Flagship Lounge Access", member: false, gold: false, platinum: false, platinumPro: false, executivePlatinum: "International/Transcon" },
    { name: "Dedicated Phone Line", member: false, gold: true, platinum: true, platinumPro: true, executivePlatinum: "Executive desk" },
    { name: "Award Redeposit Fee Waived", member: false, gold: false, platinum: true, platinumPro: true, executivePlatinum: true },
  ];

  const renderCell = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-green-600 mx-auto" data-testid="icon-check" />
      ) : (
        <X className="w-5 h-5 text-muted-foreground/30 mx-auto" data-testid="icon-x" />
      );
    }
    if (value === "—") {
      return <span className="text-muted-foreground/50">—</span>;
    }
    return <span className="font-semibold text-foreground text-xs md:text-sm">{value}</span>;
  };

  return (
    <Card data-testid="card-benefits-table">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0078D2] text-white">
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left font-semibold rounded-tl-lg text-xs sm:text-sm whitespace-nowrap">
                  Benefit
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                  Member
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap bg-yellow-500/20">
                  Gold
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                  Platinum
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                  Platinum Pro
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap rounded-tr-lg">
                  Executive Platinum
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {benefits.map((benefit, index) => (
                <tr 
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  data-testid={`row-benefit-${index}`}
                >
                  <td className="px-3 sm:px-4 md:px-6 py-3 text-xs sm:text-sm font-medium text-foreground">
                    {benefit.name}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                    {renderCell(benefit.member)}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 text-center bg-yellow-500/5">
                    {renderCell(benefit.gold)}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                    {renderCell(benefit.platinum)}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                    {renderCell(benefit.platinumPro)}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                    {renderCell(benefit.executivePlatinum)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}