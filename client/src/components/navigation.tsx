import { Link, useLocation } from "wouter";
import { Plane, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const airlines = [
  { 
    path: "/southwest", 
    name: "Southwest", 
    color: "bg-southwest-blue",
    hoverColor: "hover:bg-[#253b8a]"
  },
  { 
    path: "/american", 
    name: "American", 
    color: "bg-[#0078D2]",
    hoverColor: "hover:bg-[#0060aa]"
  },
  { 
    path: "/united", 
    name: "United", 
    color: "bg-[#002244]",
    hoverColor: "hover:bg-[#001833]"
  },
  { 
    path: "/atmos", 
    name: "Atmos", 
    color: "bg-[#00667e]",
    hoverColor: "hover:bg-[#004d5f]"
  },
  { 
    path: "/jetblue", 
    name: "JetBlue", 
    color: "bg-[#002244]",
    hoverColor: "hover:bg-[#001833]"
  },
  { 
    path: "/delta", 
    name: "Delta", 
    color: "bg-[#C8102E]",
    hoverColor: "hover:bg-[#a00d25]"
  },
];

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                  className={`text-white ${location !== airline.path ? 'hover:bg-white/20' : ''}`}
                  data-testid={`link-nav-${airline.name.toLowerCase()}`}
                >
                  {airline.name}
                </Button>
              </Link>
            ))}
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