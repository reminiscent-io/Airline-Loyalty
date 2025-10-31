import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { TIER_CONFIGS } from "@shared/schema";

export function BenefitsTable() {
  const benefits = [
    { name: "Points Don't Expire", member: true, aList: true, aListPreferred: true },
    { name: "No Blackout Dates", member: true, aList: true, aListPreferred: true },
    { name: "RR Points Earning Bonus", member: "0%", aList: "+25%", aListPreferred: "+100%" },
    { name: "Priority Boarding", member: false, aList: true, aListPreferred: true },
    { name: "Preferred Boarding Position", member: false, aList: false, aListPreferred: "1-15" },
    { name: "Free Same-Day Standby", member: false, aList: true, aListPreferred: true },
    { name: "Free Same-Day Confirmed Change", member: false, aList: true, aListPreferred: true },
    { name: "Free Premium Drink", member: false, aList: false, aListPreferred: true },
    { name: "Upgraded Boardings", member: false, aList: false, aListPreferred: "4 per year" },
  ];

  const renderCell = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-southwest-green mx-auto" data-testid="icon-check" />
      ) : (
        <X className="w-5 h-5 text-muted-foreground/30 mx-auto" data-testid="icon-x" />
      );
    }
    return <span className="font-semibold text-foreground">{value}</span>;
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
                  className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}
                  data-testid={`row-benefit-${index}`}
                >
                  <td className="px-4 md:px-6 py-3.5 text-sm font-medium text-foreground">
                    {benefit.name}
                  </td>
                  <td className="px-4 md:px-6 py-3.5 text-sm text-center">
                    {renderCell(benefit.member)}
                  </td>
                  <td className="px-4 md:px-6 py-3.5 text-sm text-center bg-southwest-gold/5">
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
