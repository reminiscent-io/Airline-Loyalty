import type { Express } from "express";
import { createServer, type Server } from "http";
import { calculatorInputSchema } from "@shared/schema";
import { calculateRewards } from "./calculator";

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

  const httpServer = createServer(app);

  return httpServer;
}
