import { createContext, useState, useEffect } from "react";
import ar from "../locales/ar.json";
import en from "../locales/en.json";

// قاموس بسيط للترجمات
const translations = {
  en: en,
  ar: ar,
};

// 1. إنشاء Context
export const LanguageContext = createContext(null);

// 2. إنشاء مكون Provider
export function LanguageProvider({ children }) {
  // يمكننا محاولة جلب اللغة المفضلة من Local Storage
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem("app-lang");
    return savedLang || "en"; // القيمة الافتراضية
  });

  // استخدام useEffect لحفظ اللغة في Local Storage
  useEffect(() => {
    localStorage.setItem("app-lang", language);
    // يمكن أيضاً تحديث اتجاه النص (RTL/LTR) هنا
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
  };

  // القيمة التي ستتوفر للمستهلكين: اللغة الحالية، دالة لتغيير اللغة، والترجمات للغة المختارة
  const contextValue = {
    language,
    changeLanguage,
    t: translations[language], // دالة مساعدة للحصول على الترجمة
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}
