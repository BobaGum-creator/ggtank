/**
 * BreakingBanner.tsx — a prominent red bar at the very top showing the latest
 * update: whichever is most recent between the newest reported reading and the
 * newest timeline event. Data-driven, so it updates automatically as new
 * readings/events are added.
 */
import { latestObservation } from "../data/observations";
import { timelineEvents } from "../data/timeline";
import { formatDateOnly, formatTimestamp } from "../lib/format";
import { LOCALES, useLanguage } from "../i18n";

export function BreakingBanner() {
  const { t, lang } = useLanguage();
  const locale = LOCALES[lang];

  const obs = latestObservation();
  const event = [...timelineEvents].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  )[0];

  const obsMs = obs ? new Date(obs.timestamp).getTime() : -Infinity;
  const eventMs = event ? new Date(event.timestamp).getTime() : -Infinity;

  let title: string | undefined;
  let when: string | undefined;

  if (event && eventMs >= obsMs) {
    const tr = t.timeline.events[event.id];
    title = tr?.bannerTitle ?? tr?.title ?? event.title;
    when = event.timeKnown
      ? formatTimestamp(event.timestamp, locale)
      : formatDateOnly(event.timestamp, locale);
  } else if (obs) {
    title = t.timeline.readingTitle(obs.tempF) + (obs.gaugeMax ? "+" : "");
    when = formatTimestamp(obs.timestamp, locale);
  }

  if (!title) return null;

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
          <span className="font-semibold">{title}</span>
          {when && <span className="text-white/85">· {when}</span>}
          <span className="text-white/85 underline decoration-white/40 underline-offset-2">
            {t.nav.timeline} →
          </span>
        </a>
      </div>
    </div>
  );
}
