import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import type { AirlineComparisonResult } from "./types";
import { AIRLINES } from "./types";

const chartConfig: ChartConfig = {
  roi: { label: "Return on Spend" },
  american: { label: "American", color: "hsl(207, 100%, 41%)" },
  atmos: { label: "Atmos", color: "hsl(196, 98%, 22%)" },
  delta: { label: "Delta", color: "hsl(351, 85%, 42%)" },
  jetblue: { label: "JetBlue", color: "hsl(205, 100%, 25%)" },
  southwest: { label: "Southwest", color: "hsl(230, 58%, 44%)" },
  united: { label: "United", color: "hsl(207, 100%, 13%)" },
};

interface ComparisonChartProps {
  results: AirlineComparisonResult[];
}

export function ComparisonChart({ results }: ComparisonChartProps) {
  // Sort by ROI descending
  const sorted = [...results].sort((a, b) => b.returnOnSpend - a.returnOnSpend);

  const colorMap = Object.fromEntries(AIRLINES.map((a) => [a.key, a.color]));

  const data = sorted.map((r) => ({
    airline: r.airlineName,
    airlineKey: r.airlineKey,
    roi: Math.round(r.returnOnSpend * 100) / 100,
    value: `$${Math.round(r.redemptionValue).toLocaleString()}`,
    cost: `$${Math.round(r.totalCost).toLocaleString()}`,
    fill: colorMap[r.airlineKey],
  }));

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Return on Spend Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-12">
            Enter your spending details above to compare airlines
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Return on Spend Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart data={data} layout="vertical" margin={{ left: 20, right: 40, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis
              type="number"
              tickFormatter={(v) => `${v}%`}
              domain={[0, "auto"]}
            />
            <YAxis
              type="category"
              dataKey="airline"
              width={90}
              tick={{ fontSize: 13 }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, _name, item) => (
                    <div className="space-y-1">
                      <div className="font-semibold">{value}% ROI</div>
                      <div className="text-muted-foreground text-xs">
                        Value: {item.payload.value} | Cost: {item.payload.cost}
                      </div>
                    </div>
                  )}
                />
              }
            />
            <Bar dataKey="roi" radius={[0, 4, 4, 0]}>
              {data.map((entry) => (
                <Cell key={entry.airlineKey} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
