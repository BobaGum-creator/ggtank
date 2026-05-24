/**
 * EmergencyBanner.tsx — the page header: title, mission subtitle, the
 * not-official disclaimer, the official-channels strip, and the
 * "Last data update" timestamp pulled from observations.
 */
import { officialChannels } from "../data/sources";
import { lastDataUpdate } from "../data/observations";
import { formatTimestamp } from "../lib/format";

export function EmergencyBanner() {
  const updated = formatTimestamp(lastDataUpdate());

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            GG Tank Science Dashboard
          </h1>
          <p className="text-base font-medium text-brand-700">
            A transparent estimate, not official guidance.
          </p>
        </div>

        {/* Primary disclaimer */}
        <div
          role="note"
          className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900"
        >
          <strong className="font-semibold">Important:</strong> This site is not
          affiliated with OCFA, GKN Aerospace, the City of Garden Grove, EPA, or
          Cal OES. It does not determine whether any address is safe.{" "}
          <strong className="font-semibold">
            Follow official evacuation and re-entry instructions.
          </strong>
        </div>

        {/* Official channels strip */}
        <nav aria-label="Official information channels" className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Follow official sources
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
          Last data update:{" "}
          <time dateTime={lastDataUpdate()} className="font-medium text-slate-700">
            {updated}
          </time>{" "}
          · Reported figures only — see Sources &amp; Assumptions below.
        </p>
      </div>
    </header>
  );
}
