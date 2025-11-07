import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";

export function JetBlueBenefitsTable() {
  const benefits = [
    { name: "Points Never Expire", trueblue: true, mosaic1: true, mosaic2: true, mosaic3: true, mosaic4: true },
    { name: "Family Pooling", trueblue: true, mosaic1: true, mosaic2: true, mosaic3: true, mosaic4: true },
    { name: "Base Points (Blue fare)", trueblue: "6/dollar", mosaic1: "6/dollar", mosaic2: "6/dollar", mosaic3: "6/dollar", mosaic4: "6/dollar" },
    { name: "Mosaic Bonus Points", trueblue: "0", mosaic1: "+3/dollar", mosaic2: "+3/dollar", mosaic3: "+3/dollar", mosaic4: "+3/dollar" },
    { name: "Free Changes/Cancellations", trueblue: "Pay fare diff", mosaic1: "Unlimited", mosaic2: "Unlimited", mosaic3: "Unlimited", mosaic4: "Unlimited" },
    { name: "Early Boarding", trueblue: false, mosaic1: true, mosaic2: true, mosaic3: true, mosaic4: true },
    { name: "Expedited Security", trueblue: false, mosaic1: true, mosaic2: true, mosaic3: true, mosaic4: true },
    { name: "Free Checked Bags", trueblue: "0", mosaic1: "2 bags", mosaic2: "2 bags", mosaic3: "3 bags", mosaic4: "3 bags" },
    { name: "Even More Space", trueblue: "$", mosaic1: "Select seats", mosaic2: "All seats free", mosaic3: "All seats free", mosaic4: "All seats free" },
    { name: "Even More Speed", trueblue: false, mosaic1: false, mosaic2: false, mosaic3: false, mosaic4: true },
    { name: "Mint Upgrades", trueblue: false, mosaic1: false, mosaic2: false, mosaic3: "4 certificates", mosaic4: "Unlimited (space available)" },
    { name: "Dedicated Phone Line", trueblue: false, mosaic1: true, mosaic2: true, mosaic3: true, mosaic4: true },
    { name: "Annual Choice Benefit", trueblue: false, mosaic1: false, mosaic2: false, mosaic3: true, mosaic4: true },
    { name: "Lounge Passes", trueblue: false, mosaic1: false, mosaic2: false, mosaic3: false, mosaic4: "4 per year" },
    { name: "TSA PreCheck Credit", trueblue: false, mosaic1: false, mosaic2: false, mosaic3: false, mosaic4: "$100" },
    { name: "Partner Benefits", trueblue: "Basic", mosaic1: "Enhanced", mosaic2: "Enhanced", mosaic3: "Premium", mosaic4: "Premium+" },
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
              <tr className="bg-gradient-to-r from-[#002244] to-[#0099CC] text-white">
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left font-semibold rounded-tl-lg text-xs sm:text-sm whitespace-nowrap">
                  Benefit
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                  TrueBlue
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap bg-[#0099CC]/20">
                  Mosaic 1
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                  Mosaic 2
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                  Mosaic 3
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap rounded-tr-lg">
                  Mosaic 4
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
                    {renderCell(benefit.trueblue)}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 text-center bg-[#0099CC]/5">
                    {renderCell(benefit.mosaic1)}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                    {renderCell(benefit.mosaic2)}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                    {renderCell(benefit.mosaic3)}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                    {renderCell(benefit.mosaic4)}
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