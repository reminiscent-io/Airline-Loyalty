import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { TIER_CONFIGS } from "@shared/schema";

export function BenefitsTable() {
  const benefits = [
    { name: "Points Don't Expire", member: true, aList: true, aListPreferred: true },
    { name: "No Blackout Dates", member: true, aList: true, aListPreferred: true },
    { name: "Rapid Rewards Points Earning Bonus", member: "0%", aList: "+25%", aListPreferred: "+100%" },
    { name: "Priority Boarding", member: "—", aList: "Group 5+ (from Jan 27 2026)", aListPreferred: "Group 2+ (from Jan 27 2026)" },
    { name: "Preferred Boarding Position", member: "—", aList: "—", aListPreferred: "A1–A15 (through Jan 26 2026)" },
    { name: "Free Same-Day Standby", member: false, aList: true, aListPreferred: true },
    { name: "Free Same-Day Confirmed Change", member: false, aList: true, aListPreferred: true },
    { name: "Free Premium Drink", member: "—", aList: "—", aListPreferred: "On flights > 175 miles" },
    { name: "Upgraded Boardings", member: "—", aList: "—", aListPreferred: "4 per year" },
    { name: "Free Checked Bags", member: false, aList: "1 bag", aListPreferred: "2 bags" },
    { name: "Priority Lanes & Express Security", member: false, aList: true, aListPreferred: true },
    { name: "Dedicated Customer Service Line", member: false, aList: true, aListPreferred: "Dedicated Preferred Line" },
  ];

  const renderCell = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-southwest-green mx-auto" data-testid="icon-check" />
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
              <tr className="bg-southwest-blue text-white">
                <th className="px-4 md:px-6 py-4 text-left font-semibold rounded-tl-lg">
                  Benefit
                </th>
                <th className="px-4 md:px-6 py-4 text-center font-semibold">
                  Member
                </th>
                <th className="px-4 md:px-6 py-4 text-center font-semibold bg-southwest-gold/20">
                  A-List
                </th>
                <th className="px-4 md:px-6 py-4 text-center font-semibold rounded-tr-lg">
                  A-List Preferred
                </th>
              </tr>
            </thead>
            <tbody>
              {benefits.map((benefit, index) => (
                <tr 
                  key={benefit.name}
                  className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-950/30" : "bg-white dark:bg-gray-900/20"}
                  data-testid={`row-benefit-${index}`}
                >
                  <td className="px-4 md:px-6 py-3.5 text-sm font-medium text-foreground">
                    {benefit.name}
                  </td>
                  <td className="px-4 md:px-6 py-3.5 text-sm text-center">
                    {renderCell(benefit.member)}
                  </td>
                  <td className={`px-4 md:px-6 py-3.5 text-sm text-center ${index % 2 === 0 ? "bg-southwest-gold/10" : "bg-southwest-gold/5"}`}>
                    {renderCell(benefit.aList)}
                  </td>
                  <td className="px-4 md:px-6 py-3.5 text-sm text-center">
                    {renderCell(benefit.aListPreferred)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile-friendly stacked view */}
        <div className="md:hidden p-4 space-y-4">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.name}
              className="border rounded-lg p-4 space-y-3"
              data-testid={`mobile-benefit-${index}`}
            >
              <p className="font-semibold text-foreground">{benefit.name}</p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <p className="text-muted-foreground mb-1">Member</p>
                  {renderCell(benefit.member)}
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground mb-1">A-List</p>
                  {renderCell(benefit.aList)}
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground mb-1">A-List Pref</p>
                  {renderCell(benefit.aListPreferred)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
