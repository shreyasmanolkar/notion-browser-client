import React, { createContext, useState } from "react";
import { useAppSelector } from "../app/hooks";

export const ThemeContext = createContext<any>({ theme: "light", undefined });

export const ThemeProvider: React.FC<{ children: any }> = ({ children }) => {
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const storedTheme = userInfo?.isDarkMode ? "dark" : "light";
  const [theme, setTheme] = useState(storedTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
