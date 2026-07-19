import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en" | "tr" | "ru" | "es";

export const LANGUAGES: { id: Lang; name: string; flag: string; dir: "rtl" | "ltr" }[] = [
  { id: "ar", name: "العربية", flag: "🇯🇴", dir: "rtl" },
  { id: "en", name: "English", flag: "🇬🇧", dir: "ltr" },
  { id: "tr", name: "Türkçe", flag: "🇹🇷", dir: "ltr" },
  { id: "ru", name: "Русский", flag: "🇷🇺", dir: "ltr" },
  { id: "es", name: "Español", flag: "🇪🇸", dir: "ltr" },
];

type Ctx = { lang: Lang; setLang: (l: Lang) => void; dir: "rtl" | "ltr" };

const LanguageContext = createContext<Ctx | null>(null);

const LS_KEY = "alyazouri_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem(LS_KEY) as Lang | null;
      if (saved && LANGUAGES.some((l) => l.id === saved)) return saved;
    } catch { /* ignore */ }
    const nav = navigator.language?.toLowerCase() ?? "";
    if (nav.startsWith("tr")) return "tr";
    if (nav.startsWith("ru")) return "ru";
    if (nav.startsWith("es")) return "es";
    if (nav.startsWith("en")) return "en";
    return "ar";
  });

  const dir = LANGUAGES.find((l) => l.id === lang)?.dir ?? "rtl";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    try { localStorage.setItem(LS_KEY, lang); } catch { /* ignore */ }
  }, [lang, dir]);

  return (
    <LanguageContext.Provider value={{ lang, setLang: setLangState, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
