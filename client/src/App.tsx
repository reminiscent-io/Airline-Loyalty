import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/navigation";
import Home from "@/pages/home";
import Southwest from "@/pages/southwest";
import AmericanAirlines from "@/pages/american-airlines";
import UnitedAirlines from "@/pages/united-airlines";
import Atmos from "@/pages/atmos";
import JetBlue from "@/pages/jetblue";
import DeltaAirlines from "@/pages/delta-airlines";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/southwest" component={Southwest} />
      <Route path="/american" component={AmericanAirlines} />
      <Route path="/united" component={UnitedAirlines} />
      <Route path="/atmos" component={Atmos} />
      <Route path="/jetblue" component={JetBlue} />
      <Route path="/delta" component={DeltaAirlines} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen">
          <Navigation />
          <Router />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
