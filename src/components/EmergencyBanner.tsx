/**
 * EmergencyBanner.tsx — the page header: title, mission subtitle, the
 * not-official disclaimer, the official-channels strip, the language switcher,
 * and the "Last data update" timestamp pulled from observations.
 */
import { officialChannels } from "../data/sources";
import { formatTimestamp } from "../lib/format";
import { liveEstimate } from "../lib/model";
import { LOCALES, useLanguage } from "../i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Collapsible } from "./ui";

export function EmergencyBanner() {
  const { t, lang } = useLanguage();
  const nowIso = new Date().toISOString();
  const updated = formatTimestamp(nowIso, LOCALES[lang]);
  const estimatedTempF = Math.round(liveEstimate().currentTempF);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              GKN Aerospace MMA Tank — Garden Grove
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

        {/* Official channels strip (collapsible, collapsed by default) */}
        <nav aria-label={t.banner.officialHeading} className="mt-4">
          <Collapsible title={t.banner.officialHeading}>
            <ul className="flex flex-wrap gap-2">
              {officialChannels.map((c) => (
                <li key={c.name}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={t.banner.channelRoles[c.name] ?? c.role}
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
          </Collapsible>
        </nav>

        <p className="mt-4 text-xs text-slate-500">
          {t.banner.lastUpdate}{" "}
          <time dateTime={nowIso} className="font-medium text-slate-700">
            {updated}
          </time>{" "}
          · {t.banner.reportedNote}
        </p>

        {/* Real-time estimated tank temperature (live extrapolation, not a measurement) */}
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {t.banner.liveTempLabel}
          </p>
          <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-3xl font-bold text-amber-600">~{estimatedTempF}°F</span>
            <span className="text-xs text-slate-500">{t.banner.liveTempSub}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
