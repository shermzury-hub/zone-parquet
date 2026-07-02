"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/lib/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("ku");
  const [loaded, setLoaded] = useState(false);

  // بارکردنی زمانی پاشەکەوتکراو
  useEffect(() => {
    try {
      const saved = localStorage.getItem("zp_lang");
      if (saved === "ku" || saved === "en" || saved === "ar") {
        setLang(saved);
      }
    } catch (e) {}
    setLoaded(true);
  }, []);

  // پاشەکەوتکردن + گۆڕینی ئاراستە و زمانی پەڕەکە
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem("zp_lang", lang);
    } catch (e) {}
    document.documentElement.lang = lang === "ku" ? "ckb" : lang;
    document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
  }, [lang, loaded]);

  function t(key) {
    const dict = translations[lang] || translations.ku;
    return dict[key] || translations.ku[key] || key;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}