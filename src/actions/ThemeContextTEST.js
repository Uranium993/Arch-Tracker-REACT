import { useState, useContext, createContext } from "react";

const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}

export function ThemeProvider({ children }) {
  const [state, setState] = useState(false);

  const toggle = () => {
    setState((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={state}>
      <ThemeUpdateContext.Provider value={toggle}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}
