import React, { createContext, useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";

export const ThemeContext = createContext<any>({ undefined });

export const ThemeProvider: React.FC<{ children: any }> = ({ children }) => {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const storedTheme = userInfo?.isDarkMode ? "dark" : "light";
    setTheme(storedTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const theme = userInfo?.isDarkMode ? "dark" : "light";
    setTheme(theme);
  }, [userInfo?.isDarkMode]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
