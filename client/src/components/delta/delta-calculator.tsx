import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calculator, CreditCard, Plane } from "lucide-react";
import { deltaCalculatorInputSchema, DeltaCalculatorInput, DeltaCalculationResults } from "@shared/delta-schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface DeltaCalculatorProps {
  onCalculate: (results: DeltaCalculationResults) => void;
}

export function DeltaCalculator({ onCalculate }: DeltaCalculatorProps) {
  const form = useForm<DeltaCalculatorInput>({
    resolver: zodResolver(deltaCalculatorInputSchema),
    defaultValues: {
      annualFlightSpend: 1000,
      currentTier: "none",
      cardType: "none",
      annualCardSpend: 0,
      fareClass: "main"
    }
  });

  const calculateMutation = useMutation({
    mutationFn: async (data: DeltaCalculatorInput) => {
      console.log("Delta Calculator: Sending data", data);
      const response = await apiRequest("POST", "/api/delta/calculate", data);
      console.log("Delta Calculator: Received response", response);
      const result = await response.json();
      return result as DeltaCalculationResults;
    },
    onSuccess: (results) => {
      console.log("Delta Calculator: onSuccess called with results", results);
      onCalculate(results);
    },
    onError: (error) => {
      console.error("Delta Calculator: Error occurred", error);
    }
  });

  const onSubmit = (data: DeltaCalculatorInput) => {
    console.log("Delta Calculator: Form submitted with data", data);
    calculateMutation.mutate(data);
  };

  return (
    <Card className="border-2 hover-elevate" style={{ borderColor: "#C8102E" }}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-2xl" style={{ color: "#C8102E" }}>
          <Calculator className="w-6 h-6" />
          SkyMiles Calculator
        </CardTitle>
        <CardDescription>
          Calculate your SkyMiles earnings and Medallion status progress
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Flight Spending Section */}
            <div className="space-y-4 p-4 rounded-lg bg-gray-50">
              <h3 className="font-semibold flex items-center gap-2 text-gray-900">
                <Plane className="w-5 h-5" />
                Delta Flight Spending
              </h3>
              
              <FormField
                control={form.control}
                name="annualFlightSpend"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Flight Spend (base fare)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                        placeholder="5000"
                        data-testid="input-flight-spend"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fareClass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Typical Fare Class</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-fare-class">
                          <SelectValue placeholder="Select fare class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="basic">Basic Economy (0x miles/MQDs)</SelectItem>
                        <SelectItem value="main">Main Cabin</SelectItem>
                        <SelectItem value="comfort">Comfort+</SelectItem>
                        <SelectItem value="first">First/Delta One</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentTier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Medallion Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-current-tier">
                          <SelectValue placeholder="Select your current status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">General Member (5x)</SelectItem>
                        <SelectItem value="silver">Silver Medallion (7x)</SelectItem>
                        <SelectItem value="gold">Gold Medallion (8x)</SelectItem>
                        <SelectItem value="platinum">Platinum Medallion (9x)</SelectItem>
                        <SelectItem value="diamond">Diamond Medallion (11x)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Credit Card Section */}
            <div className="space-y-4 p-4 rounded-lg bg-gray-50">
              <h3 className="font-semibold flex items-center gap-2 text-gray-900">
                <CreditCard className="w-5 h-5" />
                Delta Credit Card
              </h3>
              
              <FormField
                control={form.control}
                name="cardType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delta Amex Card</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-card-type">
                          <SelectValue placeholder="Select your card" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">No Delta Card</SelectItem>
                        <SelectItem value="gold">Gold ($0 MQD headstart)</SelectItem>
                        <SelectItem value="platinum">Platinum ($2.5k MQD + 1/$20)</SelectItem>
                        <SelectItem value="reserve">Reserve ($2.5k MQD + 1/$10)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="annualCardSpend"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Card Spend</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                        placeholder="10000"
                        disabled={form.watch("cardType") === "none"}
                        data-testid="input-card-spend"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              style={{ backgroundColor: "#C8102E" }}
              disabled={calculateMutation.isPending}
              data-testid="button-calculate"
            >
              {calculateMutation.isPending ? (
                <>Calculating...</>
              ) : (
                <>
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate SkyMiles & Status
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}