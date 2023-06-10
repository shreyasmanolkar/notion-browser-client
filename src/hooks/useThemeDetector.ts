import { useEffect, useState } from "react";

export const useThemeDetector = () => {
  const getMatchMedia = () => window.matchMedia("(prefers-color-scheme: dark)");

  const [isDarkTheme, setIsDarkTheme] = useState(getMatchMedia().matches);

  const mqListener = (e: MediaQueryListEvent) => {
    setIsDarkTheme(e.matches);
  };

  useEffect(() => {
    const mq = getMatchMedia();
    mq.addEventListener("change", mqListener);
    return () => mq.removeEventListener("change", mqListener);
  }, []);

  return isDarkTheme;
};
