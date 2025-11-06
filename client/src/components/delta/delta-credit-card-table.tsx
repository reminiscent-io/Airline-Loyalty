import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Gift, Star } from "lucide-react";
import { deltaCreditCards } from "@shared/delta-schema";

export function DeltaCreditCardTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Delta SkyMiles® American Express Cards
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Card</TableHead>
                <TableHead>Annual Fee</TableHead>
                <TableHead>MQD Benefits</TableHead>
                <TableHead>Earning Rates</TableHead>
                <TableHead>Sign-up Bonus</TableHead>
                <TableHead>Key Benefits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deltaCreditCards.map((card, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" style={{ color: "#C8102E" }} />
                      {card.name}
                    </div>
                  </TableCell>
                  <TableCell>${card.annualFee}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {card.mqdHeadstart > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          ${card.mqdHeadstart.toLocaleString()} Headstart
                        </Badge>
                      )}
                      {card.mqdEarnRate > 0 && (
                        <div className="text-sm">
                          1 MQD/${(1/card.mqdEarnRate).toFixed(0)} spent
                        </div>
                      )}
                      {card.mqdHeadstart === 0 && card.mqdEarnRate === 0 && (
                        <span className="text-sm text-muted-foreground">No MQD earning</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div>{card.skyMilesEarnRate.delta}x Delta</div>
                      <div>{card.skyMilesEarnRate.restaurants}x Restaurants</div>
                      <div>{card.skyMilesEarnRate.other}x Other</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Gift className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{card.signupBonus}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <ul className="space-y-1">
                      {card.benefits.slice(0, 3).map((benefit, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-1">
                          <Star className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: "#C8102E" }} />
                          {benefit}
                        </li>
                      ))}
                    </ul>
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