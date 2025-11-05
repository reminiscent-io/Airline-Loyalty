import type { Express } from "express";
import { createServer, type Server } from "http";
import { calculatorInputSchema } from "@shared/schema";
import { calculateRewards } from "./calculator";
import { americanCalculatorInputSchema } from "@shared/american-schema";
import { calculateAmericanRewards } from "./american-calculator";
import { unitedCalculatorInputSchema } from "@shared/united-schema";
import { calculateUnitedRewards } from "./united-calculator";

export async function registerRoutes(app: Express): Promise<Server> {
  // Southwest Rapid Rewards Calculator API
  app.post("/api/calculate", async (req, res) => {
    try {
      const input = calculatorInputSchema.parse(req.body);
      const results = calculateRewards(input);
      res.json(results);
    } catch (error) {
      res.status(400).json({ 
        error: "Invalid input", 
        details: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // American Airlines AAdvantage Calculator API
  app.post("/api/american/calculate", async (req, res) => {
    try {
      const input = americanCalculatorInputSchema.parse(req.body);
      const results = calculateAmericanRewards(input);
      res.json(results);
    } catch (error) {
      res.status(400).json({ 
        error: "Invalid input", 
        details: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // United Airlines MileagePlus Calculator API
  app.post("/api/united/calculate", async (req, res) => {
    try {
      const input = unitedCalculatorInputSchema.parse(req.body);
      const results = calculateUnitedRewards(input);
      res.json(results);
    } catch (error) {
      res.status(400).json({ 
        error: "Invalid input", 
        details: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
