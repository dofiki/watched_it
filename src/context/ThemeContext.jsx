/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // initialize theme from localstorage (if availabe)
  // otherwise default to true
  const [darkTheme, setDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem("darkTheme");
    if (savedTheme === null || savedTheme === "undefined") return true;

    try {
      return JSON.parse(savedTheme);
    } catch (err) {
      console.log(err)
      return true;
    }
  });

  // update theme if dark theme is changed
  useEffect(() => {
    localStorage.setItem("darkTheme", JSON.stringify(darkTheme));
  }, [darkTheme]);

  function toggleTheme() {
    setDarkTheme((prev) => !prev);
  }

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// for consumption, custom hook :)
export function useTheme() {
  return useContext(ThemeContext);
}
