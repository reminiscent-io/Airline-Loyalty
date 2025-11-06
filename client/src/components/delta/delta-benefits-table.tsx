import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";
import { deltaBenefits } from "@shared/delta-schema";

export function DeltaBenefitsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medallion Status Benefits Comparison</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Benefit</TableHead>
                <TableHead className="text-center">General Member</TableHead>
                <TableHead className="text-center bg-gray-50">Silver</TableHead>
                <TableHead className="text-center bg-yellow-50">Gold</TableHead>
                <TableHead className="text-center bg-gray-50">Platinum</TableHead>
                <TableHead className="text-center bg-gray-100">Diamond</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deltaBenefits.map((benefit, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{benefit.category}</TableCell>
                  <TableCell className="text-center">
                    {benefit.general === "—" ? (
                      <X className="w-4 h-4 text-gray-300 mx-auto" />
                    ) : benefit.general.includes("✓") ? (
                      <Check className="w-4 h-4 text-green-600 mx-auto" />
                    ) : (
                      benefit.general
                    )}
                  </TableCell>
                  <TableCell className="text-center bg-gray-50">
                    {benefit.silver === "—" ? (
                      <X className="w-4 h-4 text-gray-300 mx-auto" />
                    ) : benefit.silver.includes("✓") ? (
                      <Check className="w-4 h-4 text-green-600 mx-auto" />
                    ) : (
                      benefit.silver
                    )}
                  </TableCell>
                  <TableCell className="text-center bg-yellow-50">
                    {benefit.gold === "—" ? (
                      <X className="w-4 h-4 text-gray-300 mx-auto" />
                    ) : benefit.gold.includes("✓") ? (
                      <Check className="w-4 h-4 text-green-600 mx-auto" />
                    ) : (
                      benefit.gold
                    )}
                  </TableCell>
                  <TableCell className="text-center bg-gray-50">
                    {benefit.platinum === "—" ? (
                      <X className="w-4 h-4 text-gray-300 mx-auto" />
                    ) : benefit.platinum.includes("✓") ? (
                      <Check className="w-4 h-4 text-green-600 mx-auto" />
                    ) : (
                      benefit.platinum
                    )}
                  </TableCell>
                  <TableCell className="text-center bg-gray-100">
                    {benefit.diamond === "—" ? (
                      <X className="w-4 h-4 text-gray-300 mx-auto" />
                    ) : benefit.diamond.includes("✓") ? (
                      <Check className="w-4 h-4 text-green-600 mx-auto" />
                    ) : (
                      benefit.diamond
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}