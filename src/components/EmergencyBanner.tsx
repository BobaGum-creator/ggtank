/**
 * EmergencyBanner.tsx — the page header: title, mission subtitle, the
 * not-official disclaimer, the official-channels strip, the language switcher,
 * and the "Last data update" timestamp pulled from observations.
 */
import { officialChannels } from "../data/sources";
import { lastDataUpdate } from "../data/observations";
import { formatTimestamp } from "../lib/format";
import { useT } from "../i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function EmergencyBanner() {
  const t = useT();
  const updated = formatTimestamp(lastDataUpdate());

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              GG Tank Science Dashboard
            </h1>
            <p className="text-base font-medium text-brand-700">{t.banner.subtitle}</p>
          </div>
          <div className="flex-none">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Primary disclaimer */}
        <div
          role="note"
          className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900"
        >
          <strong className="font-semibold">{t.banner.importantLabel}</strong>{" "}
          {t.banner.disclaimer}{" "}
          <strong className="font-semibold">{t.banner.followOfficial}</strong>
        </div>

        {/* Official channels strip */}
        <nav aria-label={t.banner.officialHeading} className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {t.banner.officialHeading}
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {officialChannels.map((c) => (
              <li key={c.name}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={c.role}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:border-brand-600 hover:text-brand-700"
                >
                  {c.name}
                  <span aria-hidden="true" className="text-slate-400">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-4 text-xs text-slate-500">
          {t.banner.lastUpdate}{" "}
          <time dateTime={lastDataUpdate()} className="font-medium text-slate-700">
            {updated}
          </time>{" "}
          · {t.banner.reportedNote}
        </p>
      </div>
    </header>
  );
}
