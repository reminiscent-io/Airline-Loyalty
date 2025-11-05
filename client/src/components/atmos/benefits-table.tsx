import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";

export function AtmosBenefitsTable() {
  const benefits = [
    { name: "Miles Never Expire", member: true, mvp: true, gold: true, gold75k: true, gold100k: true },
    { name: "Award Seat Availability", member: "Standard", mvp: "Standard", gold: "Enhanced", gold75k: "Premium", gold100k: "Premium" },
    { name: "Mileage Earning Bonus", member: "0%", mvp: "+50%", gold: "+100%", gold75k: "+125%", gold100k: "+150%" },
    { name: "Premium Seats at Check-in", member: false, mvp: true, gold: true, gold75k: true, gold100k: true },
    { name: "Preferred Seats at Booking", member: false, mvp: false, gold: true, gold75k: true, gold100k: true },
    { name: "Priority Check-in", member: false, mvp: true, gold: true, gold75k: true, gold100k: true },
    { name: "Priority Security", member: false, mvp: false, gold: true, gold75k: true, gold100k: true },
    { name: "Priority Boarding", member: false, mvp: true, gold: true, gold75k: true, gold100k: true },
    { name: "Free Checked Bags", member: "0", mvp: "2 bags", gold: "2 bags", gold75k: "3 bags", gold100k: "3 bags" },
    { name: "Same-Day Changes", member: "$50", mvp: "Free", gold: "Free", gold75k: "Free", gold100k: "Free" },
    { name: "Complimentary Upgrades", member: false, mvp: false, gold: "At check-in", gold75k: "At booking (U)", gold100k: "Unlimited (U)" },
    { name: "Upgrade Certificates", member: false, mvp: false, gold: false, gold75k: "4 per year", gold100k: "Unlimited" },
    { name: "Lounge Discount", member: false, mvp: false, gold: false, gold75k: "50% off", gold100k: "50% off" },
    { name: "Annual Bonus Miles", member: false, mvp: false, gold: false, gold75k: "50,000", gold100k: false },
    { name: "Choice Benefit", member: false, mvp: false, gold: false, gold75k: false, gold100k: "Yes" },
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
              <tr className="bg-gradient-to-r from-[#00467F] to-[#7AC142] text-white">
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left font-semibold rounded-tl-lg text-xs sm:text-sm whitespace-nowrap">
                  Benefit
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                  Member
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                  MVP
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap bg-yellow-500/20">
                  MVP Gold
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                  Gold 75K
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap rounded-tr-lg">
                  Gold 100K
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
                    {renderCell(benefit.mvp)}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 text-center bg-yellow-500/5">
                    {renderCell(benefit.gold)}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                    {renderCell(benefit.gold75k)}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                    {renderCell(benefit.gold100k)}
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