import { createContext, useState, useEffect } from "react";

// 1. إنشاء Context
export const ThemeContext = createContext(null);

// 2. إنشاء مكون Provider
export function ThemeProvider({ children }) {
  // يمكننا محاولة جلب السمة المفضلة من Local Storage
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("app-theme");
    return savedTheme || "light"; // القيمة الافتراضية إذا لم توجد
  });

  // استخدام useEffect لحفظ السمة في Local Storage عند تغييرها
  useEffect(() => {
    localStorage.setItem("app-theme", theme);
    // يمكننا أيضاً تحديث فئة الـ body لتطبيق السمة على مستوى CSS
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
