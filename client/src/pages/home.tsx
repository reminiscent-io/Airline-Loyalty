import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Plane, TrendingUp, Users, Gift, Globe, Sparkles } from "lucide-react";

const airlines = [
  {
    name: "American Airlines",
    path: "/american",
    icon: Globe,
    color: "from-[#0078D2] to-[#4a9fe7]",
    description: "AAdvantage miles and Loyalty Points calculator",
    features: ["Elite Qualifying Miles", "Loyalty Points", "Systemwide Upgrades"]
  },
  {
    name: "Atmos Airways",
    path: "/atmos",
    icon: Sparkles,
    color: "from-[#014A6E] to-[#01628C]",
    description: "2026 program with new status points system",
    features: ["Status Points", "Redeemable Points", "Communities Benefits"]
  },
  {
    name: "Delta Air Lines",
    path: "/delta",
    icon: TrendingUp,
    color: "from-[#003366] to-[#004080]",
    description: "SkyMiles and Medallion Status calculator",
    features: ["Medallion Qualification Miles", "Medallion Qualification Dollars", "SkyMiles Earnings"]
  },
  {
    name: "JetBlue",
    path: "/jetblue",
    icon: Gift,
    color: "from-[#003876] to-[#0056b3]",
    description: "TrueBlue points and Mosaic status calculator",
    features: ["TrueBlue Points", "Mosaic Qualification", "Tiles Progress"]
  },
  {
    name: "Southwest Airlines",
    path: "/southwest",
    icon: Plane,
    color: "from-[#304CB2] to-[#4a6bc9]",
    description: "Rapid Rewards points calculator with Companion Pass tracker",
    features: ["Tier Qualifying Points", "Companion Pass Progress", "Credit Card Bonuses"]
  },
  {
    name: "United Airlines",
    path: "/united",
    icon: Users,
    color: "from-[#0033A1] to-[#3366cc]",
    description: "MileagePlus Premier status tracker and PQP calculator",
    features: ["Premier Qualifying Points", "Premier Qualifying Flights", "Plus Points"]
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10">
            <Plane className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Airline Rewards Calculator
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Calculate your points, track elite status progression, and maximize rewards across  major airline loyalty programs
          </p>
        </div>
      </section>

      {/* Airlines Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {airlines.map((airline) => {
            const Icon = airline.icon;
            return (
              <Link key={airline.path} href={airline.path}>
                <Card className="h-full transition-all duration-200 hover-elevate cursor-pointer border-2">
                  <CardHeader>
                    <div className={`inline-flex items-center justify-center w-12 h-12 mb-3 rounded-lg bg-gradient-to-br ${airline.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{airline.name}</CardTitle>
                    <CardDescription className="mt-2">
                      {airline.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {airline.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Use Our Calculators?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get accurate, real-time calculations for major airline loyalty programs in one place
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-Time Calculations</h3>
            <p className="text-sm text-muted-foreground">
              Instant updates as you type, showing exactly how your spending translates to rewards
            </p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Elite Status Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Visual progress bars and tier comparisons to track your journey to elite status
            </p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10">
              <Gift className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Credit Card Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Compare co-branded credit cards and calculate sign-up bonuses to maximize earnings
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}