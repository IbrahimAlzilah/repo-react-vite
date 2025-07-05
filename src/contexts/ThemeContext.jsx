import { createContext, useState, useEffect } from "react";

// 1. إنشاء Context
export const ThemeContext = createContext(null);

// 2. إنشاء مكون Provider
export function ThemeProvider({ children }) {
  // يمكننا محاولة جلب السمة المفضلة من Local Storage
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("app-theme");
    // This is the key change:
    return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); // القيمة الافتراضية إذا لم توجد
  });

  // استخدام useEffect لحفظ السمة في Local Storage وتطبيقها على DOM
  useEffect(() => {
    localStorage.setItem("app-theme", theme);
    document.body.className = theme;
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]); // يُنفذ هذا الـ effect كلما تغيرت السمة

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const contextValue = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}