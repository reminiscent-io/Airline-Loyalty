import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";

export function AtmosBenefitsTable() {
  const benefits = [
    { name: "Points Never Expire", member: true, silver: true, gold: true, platinum: true, titanium: true },
    { name: "Award Seat Availability", member: "Standard", silver: "Standard", gold: "Enhanced", platinum: "Premium", titanium: "Premium+" },
    { name: "Point Earning Bonus", member: "0%", silver: "+25%", gold: "+50%", platinum: "+100%", titanium: "+150%" },
    { name: "Oneworld Status", member: false, silver: "Ruby", gold: "Sapphire", platinum: "Emerald", titanium: "Emerald" },
    { name: "Free Starlink Wi-Fi", member: true, silver: true, gold: true, platinum: true, titanium: true },
    { name: "Premium Seats at Check-in", member: false, silver: true, gold: true, platinum: true, titanium: true },
    { name: "Preferred Seats at Booking", member: false, silver: true, gold: true, platinum: true, titanium: true },
    { name: "Priority Check-in", member: false, silver: true, gold: true, platinum: true, titanium: true },
    { name: "Priority Security", member: false, silver: false, gold: true, platinum: true, titanium: true },
    { name: "Priority Boarding", member: false, silver: "Group A", gold: "Group A", platinum: "Group A", titanium: "First" },
    { name: "Free Checked Bags", member: "0", silver: "1 bag", gold: "2 bags", platinum: "3 bags", titanium: "3 bags" },
    { name: "Guests Free Bags", member: false, silver: "Up to 6", gold: "Up to 6", platinum: "Up to 6", titanium: "Up to 8" },
    { name: "Same-Day Changes", member: "$50", silver: "$25", gold: "Free", platinum: "Free", titanium: "Free" },
    { name: "Complimentary Upgrades", member: false, silver: "Space avail", gold: "72hr waitlist", platinum: "120hr waitlist", titanium: "Highest priority" },
    { name: "Companion Upgrades", member: false, silver: false, gold: false, platinum: "+1 guest", titanium: "+2 guests" },
    { name: "Global Business Upgrades", member: false, silver: false, gold: false, platinum: false, titanium: "Day-of (2026)" },
    { name: "Complimentary Main Cabin", member: false, silver: false, gold: false, platinum: "Drink/chocolate", titanium: "Full meal" },
    { name: "International Lounges", member: false, silver: false, gold: "When flying OW", platinum: "Business lounges", titanium: "First lounges" },
    { name: "CLEAR Plus Discount", member: false, silver: false, gold: false, platinum: false, titanium: "Yes" },
    { name: "Avis President's Club", member: false, silver: false, gold: false, platinum: false, titanium: "Status match" },
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
                  Silver
                  <div className="text-[10px] font-normal">20K pts</div>
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                  Gold
                  <div className="text-[10px] font-normal">40K pts</div>
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                  Platinum
                  <div className="text-[10px] font-normal">80K pts</div>
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold rounded-tr-lg text-xs sm:text-sm whitespace-nowrap">
                  Titanium
                  <div className="text-[10px] font-normal">135K pts</div>
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
                  <td className="px-3 sm:px-4 md:px-6 py-3 text-center bg-gray-50/50">
                    {renderCell(benefit.silver)}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 text-center bg-yellow-50/30">
                    {renderCell(benefit.gold)}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 text-center bg-gray-100/50">
                    {renderCell(benefit.platinum)}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 text-center bg-green-50/30">
                    {renderCell(benefit.titanium)}
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