/**
 * LanguageSwitcher.tsx — a small segmented control for choosing the language.
 */
import { LANGUAGES, useLanguage } from "../i18n";

export function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.ui.language}
      className="inline-flex rounded-lg border border-slate-300 bg-white p-0.5"
    >
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          aria-pressed={lang === l.code}
          onClick={() => setLang(l.code)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
            lang === l.code
              ? "bg-brand-600 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
