import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3 } from "lucide-react";
import type { AirlineComparisonResult } from "./types";
import { AIRLINES } from "./types";

interface ComparisonTableProps {
  results: AirlineComparisonResult[];
}

export function ComparisonTable({ results }: ComparisonTableProps) {
  const sorted = [...results].sort((a, b) => b.returnOnSpend - a.returnOnSpend);
  const colorMap = Object.fromEntries(AIRLINES.map((a) => [a.key, a.color]));

  if (sorted.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Detailed Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Airline</TableHead>
                <TableHead>Credit Card</TableHead>
                <TableHead className="text-right">Annual Fee</TableHead>
                <TableHead className="text-right">Points/Miles Value</TableHead>
                <TableHead className="text-right">Total Cost</TableHead>
                <TableHead className="text-right">ROI</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((r, i) => (
                <TableRow key={r.airlineKey}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: colorMap[r.airlineKey] }}
                      />
                      {r.airlineName}
                      {i === 0 && (
                        <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full font-semibold">
                          Best
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{r.creditCardName}</TableCell>
                  <TableCell className="text-right">
                    {r.annualFee > 0 ? `$${r.annualFee}` : "—"}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${Math.round(r.redemptionValue).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    ${Math.round(r.totalCost).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {r.returnOnSpend.toFixed(1)}%
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
