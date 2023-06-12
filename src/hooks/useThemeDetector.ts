// import { useEffect, useState } from "react";

// export const useThemeDetector = () => {
//   const getMatchMedia = () => window.matchMedia("(prefers-color-scheme: dark)");

//   const [isDarkTheme, setIsDarkTheme] = useState(getMatchMedia().matches);

//   const mqListener = (e: MediaQueryListEvent) => {
//     setIsDarkTheme(e.matches);
//   };

//   useEffect(() => {
//     const mq = getMatchMedia();
//     mq.addEventListener("change", mqListener);
//     return () => mq.removeEventListener("change", mqListener);
//   }, []);

//   return isDarkTheme;
// };

import { useEffect, useState } from "react";

const isMatchMediaAvailable = () =>
  typeof window !== "undefined" && typeof window.matchMedia !== "undefined";

export const useThemeDetector = () => {
  const getMatchMedia = () =>
    isMatchMediaAvailable()
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : null;

  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const mq = getMatchMedia();
    return mq ? mq.matches : false;
  });

  const mqListener = (e: MediaQueryListEvent) => {
    setIsDarkTheme(e.matches);
  };

  useEffect(() => {
    const mq = getMatchMedia();
    if (mq) {
      mq.addEventListener("change", mqListener);
      return () => mq.removeEventListener("change", mqListener);
    }
  }, []);

  return isDarkTheme;
};
