import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";

export function UnitedBenefitsTable() {
  const benefits = [
    { name: "Miles Don't Expire", member: true, silver: true, gold: true, platinum: true, "1k": true },
    { name: "Award Flight Flexibility", member: true, silver: true, gold: true, platinum: true, "1k": true },
    { name: "Mileage Earning Bonus", member: "0%", silver: "+40%", gold: "+60%", platinum: "+80%", "1k": "+120%" },
    { name: "Economy Plus at Check-in", member: false, silver: "When available", gold: true, platinum: true, "1k": true },
    { name: "Economy Plus at Booking", member: false, silver: false, gold: true, platinum: true, "1k": true },
    { name: "Preferred Seats", member: false, silver: false, gold: false, platinum: true, "1k": true },
    { name: "Priority Check-in", member: false, silver: true, gold: true, platinum: true, "1k": true },
    { name: "Priority Security", member: false, silver: false, gold: true, platinum: true, "1k": true },
    { name: "Priority Boarding", member: false, silver: "Group 2", gold: "Group 1", platinum: "Group 1", "1k": "Group 1" },
    { name: "Free Checked Bags", member: false, silver: "1 bag", gold: "2 bags", platinum: "3 bags", "1k": "3 bags (70lbs)" },
    { name: "Same-Day Changes", member: "$75", silver: "Free", gold: "Free + Confirmed", platinum: "Free + Confirmed", "1k": "Free + Confirmed" },
    { name: "Complimentary Upgrades", member: false, silver: false, gold: "Select routes", platinum: "Most routes", "1k": "Highest priority" },
    { name: "United Club Passes", member: false, silver: false, gold: false, platinum: false, "1k": "2 one-time passes" },
    { name: "Global Services Consideration", member: false, silver: false, gold: false, platinum: false, "1k": true },
    { name: "Dedicated Phone Line", member: false, silver: true, gold: true, platinum: true, "1k": "1K desk" },
    { name: "Award Fee Waivers", member: false, silver: false, gold: "Close-in booking", platinum: "Multiple fees", "1k": "All fees" },
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
              <tr className="bg-[#002244] text-white">
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left font-semibold rounded-tl-lg text-xs sm:text-sm whitespace-nowrap">
                  Benefit
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                  Member
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                  Silver
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap bg-yellow-500/20">
                  Gold
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                  Platinum
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap rounded-tr-lg">
                  1K
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
                  <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                    {renderCell(benefit.silver)}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 text-center bg-yellow-500/5">
                    {renderCell(benefit.gold)}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                    {renderCell(benefit.platinum)}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                    {renderCell(benefit["1k"])}
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