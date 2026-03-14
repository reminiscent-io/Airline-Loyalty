import { useTheme } from "@/hooks/use-theme";

const MODERN_PATTERN =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=";

// Art deco sunburst / fan pattern
const RETRO_PATTERN =
  "data:image/svg+xml;base64," +
  btoa(`<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="deco" width="120" height="120" patternUnits="userSpaceOnUse">
      <g fill="none" stroke="white" stroke-opacity="0.08" stroke-width="1">
        <path d="M60,120 L0,60"/>
        <path d="M60,120 L10,40"/>
        <path d="M60,120 L20,20"/>
        <path d="M60,120 L30,5"/>
        <path d="M60,120 L40,0"/>
        <path d="M60,120 L50,0"/>
        <path d="M60,120 L60,0"/>
        <path d="M60,120 L70,0"/>
        <path d="M60,120 L80,0"/>
        <path d="M60,120 L90,5"/>
        <path d="M60,120 L100,20"/>
        <path d="M60,120 L110,40"/>
        <path d="M60,120 L120,60"/>
        <circle cx="60" cy="120" r="30"/>
        <circle cx="60" cy="120" r="55"/>
        <circle cx="60" cy="120" r="80"/>
        <circle cx="60" cy="120" r="105"/>
      </g>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#deco)"/>
</svg>`);

export function HeroPattern() {
  const { theme } = useTheme();
  const pattern = theme === "retro" ? RETRO_PATTERN : MODERN_PATTERN;

  return (
    <div
      className="absolute inset-0 opacity-30"
      style={{ backgroundImage: `url('${pattern}')` }}
    />
  );
}
