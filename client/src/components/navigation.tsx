import { Link, useLocation } from "wouter";
import { Plane, Clock, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/use-theme";

const airlines = [
  {
    path: "/american",
    name: "American",
    color: "bg-american-blue",
    hoverColor: "hover:bg-american-navy"
  },
  {
    path: "/atmos",
    name: "Atmos",
    color: "bg-atmos-teal",
    hoverColor: "hover:bg-atmos-dark"
  },
  {
    path: "/delta",
    name: "Delta",
    color: "bg-delta-red",
    hoverColor: "hover:bg-delta-navy"
  },
  {
    path: "/jetblue",
    name: "JetBlue",
    color: "bg-jetblue-navy",
    hoverColor: "hover:bg-jetblue-navy"
  },
  {
    path: "/southwest",
    name: "Southwest",
    color: "bg-southwest-blue",
    hoverColor: "hover:bg-southwest-navy"
  },
  {
    path: "/united",
    name: "United",
    color: "bg-united-navy",
    hoverColor: "hover:bg-united-navy"
  },
];

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // For home page, use a neutral color
  const currentAirline = location === "/"
    ? { color: "bg-primary", hoverColor: "hover:bg-primary/90" }
    : airlines.find(a => a.path === location) || { color: "bg-primary", hoverColor: "hover:bg-primary/90" };

  return (
    <nav className={`sticky top-0 z-50 ${currentAirline.color} text-white shadow-lg transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and title */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity">
              <Plane className="w-6 h-6" />
              <span className="font-bold text-lg">Loyalty Calculator</span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-2">
            {airlines.map((airline) => (
              <Link key={airline.path} href={airline.path}>
                <Button
                  variant={location === airline.path ? "secondary" : "ghost"}
                  className={`text-white ${location === airline.path ? '' : 'hover:bg-white/20'}`}
                  data-testid={`link-nav-${airline.name.toLowerCase()}`}
                >
                  {airline.name}
                </Button>
              </Link>
            ))}
            {/* Theme toggle */}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-white/30">
              <Clock className="w-4 h-4 text-white/70" />
              <span className="text-xs text-white/70 font-medium">Retro</span>
              <Switch
                checked={theme === "retro"}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-amber-600"
                aria-label="Toggle retro aviation theme"
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            {/* Mobile theme toggle */}
            <div className="flex items-center justify-between px-4 py-2 mb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-white/70" />
                <span className="text-sm text-white/90">Retro Theme</span>
              </div>
              <Switch
                checked={theme === "retro"}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-amber-600"
                aria-label="Toggle retro aviation theme"
              />
            </div>
            {airlines.map((airline) => (
              <Link
                key={airline.path}
                href={airline.path}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div
                  className={`block px-4 py-2 rounded-md text-white transition-colors ${
                    location === airline.path
                      ? 'bg-white/20'
                      : 'hover:bg-white/10'
                  }`}
                  data-testid={`link-mobile-nav-${airline.name.toLowerCase()}`}
                >
                  {airline.name}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
