/**
 * Timeline.tsx — a chronological record of when each reported data point and
 * event occurred. Merges temperature readings (observations.ts) with incident
 * milestones (timeline.ts), sorts ascending, and cites sources.
 */
import { observations } from "../data/observations";
import { timelineEvents } from "../data/timeline";
import { sourceById } from "../data/sources";
import { formatDateOnly, formatTimestamp } from "../lib/format";
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
  incident: "#ea580c", // orange-600
  reading: "#f59e0b", // amber-500
  report: "#0284c7", // sky-600
  official: "#2563eb", // brand-600
};

const KIND_LABEL: Record<RowKind, string> = {
  incident: "Incident",
  reading: "Data point",
  report: "News report",
  official: "Official",
};

const KIND_TONE: Record<RowKind, "caution" | "watch" | "neutral" | "info"> = {
  incident: "caution",
  reading: "watch",
  report: "neutral",
  official: "info",
};

function buildRows(): Row[] {
  const rows: Row[] = [];

  for (const o of observations) {
    const src = o.source;
    rows.push({
      ms: new Date(o.timestamp).getTime(),
      when: formatTimestamp(o.timestamp),
      kind: "reading",
      title: `Reported internal temperature: ${o.tempF}°F`,
      detail: o.label,
      sourceLabel: src,
      confidence: o.confidence,
    });
  }

  for (const e of timelineEvents) {
    const src = e.sourceId ? sourceById(e.sourceId) : undefined;
    rows.push({
      ms: new Date(e.timestamp).getTime(),
      when: e.timeKnown ? formatTimestamp(e.timestamp) : formatDateOnly(e.timestamp),
      kind: e.kind,
      title: e.title,
      detail: e.detail,
      sourceLabel: src ? `${src.publisher} — ${src.title}` : undefined,
      sourceUrl: src?.url,
    });
  }

  return rows.sort((a, b) => a.ms - b.ms);
}

export function Timeline() {
  const rows = buildRows();

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
              <Badge tone={KIND_TONE[r.kind]}>{KIND_LABEL[r.kind]}</Badge>
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
                  Source: {r.sourceLabel} ↗
                </a>
              ) : (
                <p className="mt-1 text-xs text-slate-500">Source: {r.sourceLabel}</p>
              ))}
          </li>
        ))}
      </ol>

      <WhatThisMeans>
        These are <strong>reported</strong> times, drawn from public reporting and
        official announcements — not independently verified, and times of day are
        approximate unless a specific reading time was given. Add new readings in{" "}
        <code className="rounded bg-white px-1">src/data/observations.ts</code> and
        they will appear here automatically. For the current situation, always rely
        on official channels.
      </WhatThisMeans>
    </Card>
  );
}
