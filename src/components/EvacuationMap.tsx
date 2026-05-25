/**
 * EvacuationMap.tsx — a reported snapshot of the evacuation zone.
 * Framed clearly as a snapshot that may be outdated; users must confirm the
 * current evacuation area and orders with official channels (OCFA).
 */
import { officialChannels } from "../data/sources";
import { useT } from "../i18n";
import { Badge, Card, WhatThisMeans } from "./ui";

const IMAGE_SRC = `${import.meta.env.BASE_URL}evacuation-zone.jpg`;
const OCFA = officialChannels[0]; // Orange County Fire Authority

export function EvacuationMap() {
  const t = useT();

  return (
    <Card>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge tone="danger">{t.evacuation.ordersActive}</Badge>
        <span className="text-xs text-slate-500">{t.evacuation.address}</span>
      </div>

      <figure>
        <img
          src={IMAGE_SRC}
          alt={t.evacuation.imageAlt}
          loading="lazy"
          className="w-full rounded-xl border border-slate-200"
        />
        <figcaption className="mt-2 text-xs text-slate-500">{t.evacuation.caption}</figcaption>
      </figure>

      <div className="mt-4 rounded-lg bg-slate-50 p-3 ring-1 ring-slate-200">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {t.evacuation.zoneHeading}
        </p>
        <ul className="mt-2 grid grid-cols-1 gap-1 text-sm text-slate-700 sm:grid-cols-2">
          {t.evacuation.boundaries.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span aria-hidden="true" className="mt-0.5 text-brand-600">•</span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      <WhatThisMeans>
        {t.evacuation.wtm}{" "}
        <a
          href={OCFA.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-700 underline"
        >
          {OCFA.name} ↗
        </a>
      </WhatThisMeans>
    </Card>
  );
}
