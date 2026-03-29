import { useTheme } from "@/hooks/use-theme";

const MODERN_PATTERN =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=";

// Mid-century modern atomic starburst pattern
const RETRO_PATTERN =
  "data:image/svg+xml;base64," +
  btoa(`<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="retro" width="80" height="80" patternUnits="userSpaceOnUse">
      <g fill="none" stroke="white" stroke-opacity="0.1" stroke-width="0.8">
        <!-- Starburst center -->
        <circle cx="40" cy="40" r="3" fill="white" fill-opacity="0.08" stroke="none"/>
        <!-- Starburst rays -->
        <line x1="40" y1="28" x2="40" y2="18"/>
        <line x1="40" y1="52" x2="40" y2="62"/>
        <line x1="28" y1="40" x2="18" y2="40"/>
        <line x1="52" y1="40" x2="62" y2="40"/>
        <!-- Diagonal rays -->
        <line x1="31.5" y1="31.5" x2="24" y2="24"/>
        <line x1="48.5" y1="31.5" x2="56" y2="24"/>
        <line x1="31.5" y1="48.5" x2="24" y2="56"/>
        <line x1="48.5" y1="48.5" x2="56" y2="56"/>
        <!-- Diamond outline -->
        <path d="M40,30 L50,40 L40,50 L30,40Z"/>
      </g>
      <!-- Corner dots -->
      <circle cx="0" cy="0" r="1.5" fill="white" fill-opacity="0.06"/>
      <circle cx="80" cy="0" r="1.5" fill="white" fill-opacity="0.06"/>
      <circle cx="0" cy="80" r="1.5" fill="white" fill-opacity="0.06"/>
      <circle cx="80" cy="80" r="1.5" fill="white" fill-opacity="0.06"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#retro)"/>
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
