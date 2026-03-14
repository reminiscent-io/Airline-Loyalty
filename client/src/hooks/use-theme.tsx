import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Theme = "modern" | "retro";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "airline-loyalty-theme";

export function ThemeProvider({ children }: { readonly children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (globalThis.window !== undefined) {
      return (localStorage.getItem(STORAGE_KEY) as Theme) || "modern";
    }
    return "modern";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "retro") {
      root.classList.add("retro");
    } else {
      root.classList.remove("retro");
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggleTheme = () =>
    setThemeState((prev) => (prev === "modern" ? "retro" : "modern"));

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
