/**
 * BreakingBanner.tsx — a prominent red bar at the very top showing the latest
 * reported reading. Data-driven from the most recent observation, so it updates
 * automatically when a new reading is added to observations.ts.
 */
import { latestObservation } from "../data/observations";
import { formatTimestamp } from "../lib/format";
import { LOCALES, useLanguage } from "../i18n";

export function BreakingBanner() {
  const { t, lang } = useLanguage();
  const latest = latestObservation();
  if (!latest) return null;

  const reading = t.timeline.readingTitle(latest.tempF) + (latest.gaugeMax ? "+" : "");
  const time = formatTimestamp(latest.timestamp, LOCALES[lang]);

  return (
    <div className="bg-red-600 text-white">
      <div className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
        <a
          href="#timeline"
          className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm hover:text-white"
        >
          <span className="inline-flex items-center gap-1 rounded bg-white/20 px-1.5 py-0.5 text-xs font-bold uppercase tracking-wide">
            <span aria-hidden="true">●</span> {t.breaking.label}
          </span>
          <span className="font-semibold">{reading}</span>
          <span className="text-white/85">· {time}</span>
          <span className="text-white/85 underline decoration-white/40 underline-offset-2">
            {t.nav.timeline} →
          </span>
        </a>
      </div>
    </div>
  );
}
