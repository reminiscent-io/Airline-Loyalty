import type { Express } from "express";
import { createServer, type Server } from "http";
import { calculatorInputSchema } from "@shared/schema";
import { calculateRewards } from "./southwest-calculator";
import { americanCalculatorInputSchema } from "@shared/american-schema";
import { calculateAmericanRewards } from "./american-calculator";
import { unitedCalculatorInputSchema } from "@shared/united-schema";
import { calculateUnitedRewards } from "./united-calculator";
import { atmosCalculatorInputSchema } from "@shared/atmos-schema";
import { calculateAtmosRewards } from "./atmos-calculator";
import { jetblueCalculatorInputSchema } from "@shared/jetblue-schema";
import { calculateJetBlueRewards } from "./jetblue-calculator";
import { deltaCalculatorInputSchema } from "@shared/delta-schema";
import { calculateDelta } from "./delta-calculator";

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

  // Atmos (Alaska + Hawaiian) Calculator API
  app.post("/api/atmos/calculate", async (req, res) => {
    try {
      const input = atmosCalculatorInputSchema.parse(req.body);
      const results = calculateAtmosRewards(input);
      res.json(results);
    } catch (error) {
      res.status(400).json({ 
        error: "Invalid input", 
        details: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // JetBlue TrueBlue Calculator API
  app.post("/api/jetblue/calculate", async (req, res) => {
    try {
      const input = jetblueCalculatorInputSchema.parse(req.body);
      const results = calculateJetBlueRewards(input);
      res.json(results);
    } catch (error) {
      res.status(400).json({ 
        error: "Invalid input", 
        details: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // Delta SkyMiles Calculator API
  app.post("/api/delta/calculate", async (req, res) => {
    try {
      const input = deltaCalculatorInputSchema.parse(req.body);
      const results = calculateDelta(input);
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
