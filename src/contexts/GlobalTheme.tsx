"use client";
import { saveThemeToCookie } from "@/helper/cookiesFunctions";
import { createContext, useState, useContext } from "react";

export interface GlobalThemeType {
  theme: string;
  setTheme: (newTheme: string) => void;
  toggleTheme: () => void;
}

export interface GlobalThemeProps {
  initialTheme: string;
  children: React.ReactNode;
}

export const GlobalTheme = createContext<GlobalThemeType | null>(null);

export const GlobalThemeContextProvider = ({ children, initialTheme }: GlobalThemeProps) => {
  const [theme, setThemeState] = useState<string>(initialTheme);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    saveThemeToCookie(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <GlobalTheme.Provider value={{ theme, setTheme, toggleTheme }}>
      <html lang="en" data-theme={theme}>
        <body>{children}</body>
      </html>
    </GlobalTheme.Provider>
  );
};

export const useGlobalTheme = () => {
  const context = useContext(GlobalTheme);
  if (!context) throw new Error("useGlobalTheme must be used within a GlobalThemeProvider");
  return context;
};
