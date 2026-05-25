/**
 * Timeline.tsx — a chronological record of when each reported data point and
 * event occurred. Merges temperature readings (observations.ts) with incident
 * milestones (timeline.ts), sorts ascending, and cites sources.
 */
import { observations } from "../data/observations";
import { timelineEvents } from "../data/timeline";
import { sourceById } from "../data/sources";
import { formatDateOnly, formatTimestamp } from "../lib/format";
import { LOCALES, useLanguage } from "../i18n";
import { Badge, Card, WhatThisMeans } from "./ui";

type RowKind = "incident" | "official" | "report" | "reading";

interface Row {
  ms: number;
  when: string;
  kind: RowKind;
  title: string;
  detail?: string;
  sourceLabel?: string;
  sourceUrl?: string;
  confidence?: string;
}

const KIND_DOT: Record<RowKind, string> = {
  incident: "#ea580c",
  reading: "#f59e0b",
  report: "#0284c7",
  official: "#2563eb",
};

const KIND_TONE: Record<RowKind, "caution" | "watch" | "neutral" | "info"> = {
  incident: "caution",
  reading: "watch",
  report: "neutral",
  official: "info",
};

export function Timeline() {
  const { t, lang } = useLanguage();
  const locale = LOCALES[lang];

  const kindLabel: Record<RowKind, string> = {
    incident: t.timeline.kind.incident,
    reading: t.timeline.kind.reading,
    report: t.timeline.kind.report,
    official: t.timeline.kind.official,
  };

  const rows: Row[] = [];

  for (const o of observations) {
    rows.push({
      ms: new Date(o.timestamp).getTime(),
      when: formatTimestamp(o.timestamp, locale),
      kind: "reading",
      title: t.timeline.readingTitle(o.tempF) + (o.gaugeMax ? "+" : ""),
      detail: t.timeline.observationLabels[o.label] ?? o.label,
      sourceLabel: t.timeline.observationSources[o.source] ?? o.source,
      confidence: t.timeline.confidence[o.confidence] ?? o.confidence,
    });
  }

  for (const e of timelineEvents) {
    const src = e.sourceId ? sourceById(e.sourceId) : undefined;
    const tr = t.timeline.events[e.id];
    rows.push({
      ms: new Date(e.timestamp).getTime(),
      when: e.timeKnown ? formatTimestamp(e.timestamp, locale) : formatDateOnly(e.timestamp, locale),
      kind: e.kind,
      title: tr?.title ?? e.title,
      detail: tr?.detail ?? e.detail,
      sourceLabel: src ? `${src.publisher} — ${src.title}` : undefined,
      sourceUrl: src?.url,
    });
  }

  rows.sort((a, b) => a.ms - b.ms);

  return (
    <Card>
      <ol className="relative ml-2 space-y-6 border-l-2 border-slate-200 pl-6">
        {rows.map((r, i) => (
          <li key={i} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-white ring-1 ring-slate-200"
              style={{ backgroundColor: KIND_DOT[r.kind] }}
            />
            <div className="flex flex-wrap items-center gap-2">
              <time className="text-xs font-semibold text-slate-500">{r.when}</time>
              <Badge tone={KIND_TONE[r.kind]}>{kindLabel[r.kind]}</Badge>
              {r.confidence && <Badge tone="neutral">{r.confidence}</Badge>}
            </div>
            <p className="mt-1 text-sm font-medium text-slate-900">{r.title}</p>
            {r.detail && <p className="mt-0.5 text-sm text-slate-600">{r.detail}</p>}
            {r.sourceLabel &&
              (r.sourceUrl ? (
                <a
                  href={r.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-xs font-medium text-brand-700 underline decoration-brand-200 underline-offset-2 hover:decoration-brand-600"
                >
                  {t.ui.sourcePrefix} {r.sourceLabel} ↗
                </a>
              ) : (
                <p className="mt-1 text-xs text-slate-500">
                  {t.ui.sourcePrefix} {r.sourceLabel}
                </p>
              ))}
          </li>
        ))}
      </ol>

      <WhatThisMeans>
        {t.timeline.wtmPre}
        <code className="rounded bg-white px-1">src/data/observations.ts</code>
        {t.timeline.wtmPost}
      </WhatThisMeans>
    </Card>
  );
}
