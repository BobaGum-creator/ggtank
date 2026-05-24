/**
 * i18n/index.tsx — language context, provider, and hooks.
 *
 * Type-safe by construction: components consume the whole dictionary object for
 * the active language (e.g. `t.banner.subtitle`), so a missing key is a compile
 * error rather than a runtime "missing translation".
 */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { en, type Translation } from "./en";
import { es } from "./es";
import { vi } from "./vi";

export type Lang = "en" | "es" | "vi";

export const DICTIONARIES: Record<Lang, Translation> = { en, es, vi };

export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: "en", label: en.langName },
  { code: "es", label: es.langName },
  { code: "vi", label: vi.langName },
];

const STORAGE_KEY = "ggtank-lang";

function isLang(value: string | null): value is Lang {
  return value === "en" || value === "es" || value === "vi";
}

/** Saved choice → browser language → English. */
function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (isLang(saved)) return saved;
  const nav = window.navigator.language?.toLowerCase() ?? "";
  if (nav.startsWith("es")) return "es";
  if (nav.startsWith("vi")) return "vi";
  return "en";
}

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage may be unavailable (private mode); choice still applies for the session.
    }
  };

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: DICTIONARIES[lang] }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}

/** Convenience hook for components that only need the active dictionary. */
export function useT(): Translation {
  return useLanguage().t;
}
