import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";

export function JetBlueBenefitsTable() {
  const benefits = [
    { name: "Points Never Expire", basic: true, trueblue: true, mosaic: true, plus: true, elite: true },
    { name: "Family Pooling", basic: false, trueblue: true, mosaic: true, plus: true, elite: true },
    { name: "Points per Dollar", basic: "3", trueblue: "5", mosaic: "7", plus: "8", elite: "10" },
    { name: "Free Changes/Cancellations", basic: "Pay fare diff", trueblue: "Pay fare diff", mosaic: "Unlimited", plus: "Unlimited", elite: "Unlimited" },
    { name: "Early Boarding", basic: false, trueblue: false, mosaic: true, plus: true, elite: true },
    { name: "Expedited Security", basic: false, trueblue: false, mosaic: true, plus: true, elite: true },
    { name: "Free Checked Bags", basic: "0", trueblue: "0", mosaic: "2 bags", plus: "3 bags", elite: "3 bags" },
    { name: "Even More Space", basic: "$", trueblue: "$", mosaic: "Select seats", plus: "All seats free", elite: "All seats free" },
    { name: "Even More Speed", basic: false, trueblue: false, mosaic: false, plus: false, elite: true },
    { name: "Mint Upgrades", basic: false, trueblue: false, mosaic: false, plus: "4 certificates", elite: "Unlimited (space available)" },
    { name: "Dedicated Phone Line", basic: false, trueblue: false, mosaic: true, plus: true, elite: true },
    { name: "Annual Choice Benefit", basic: false, trueblue: false, mosaic: false, plus: true, elite: true },
    { name: "Lounge Passes", basic: false, trueblue: false, mosaic: false, plus: false, elite: "4 per year" },
    { name: "TSA PreCheck Credit", basic: false, trueblue: false, mosaic: false, plus: false, elite: "$100" },
    { name: "Partner Benefits", basic: "Basic", trueblue: "Basic", mosaic: "Enhanced", plus: "Premium", elite: "Premium+" },
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
                  Basic
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                  TrueBlue
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap bg-[#0099CC]/20">
                  Mosaic
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                  Mosaic+
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap rounded-tr-lg">
                  Elite
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
                    {renderCell(benefit.basic)}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                    {renderCell(benefit.trueblue)}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 text-center bg-[#0099CC]/5">
                    {renderCell(benefit.mosaic)}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                    {renderCell(benefit.plus)}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 text-center">
                    {renderCell(benefit.elite)}
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