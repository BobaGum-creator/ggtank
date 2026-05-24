/**
 * PlumeExplainer.tsx
 * A purely CONCEPTUAL plume graphic (not a hazard map) plus the limitations of
 * Gaussian plume tools such as NOAA ALOHA.
 */
import { useT } from "../i18n";
import { Card, WhatThisMeans } from "./ui";

export function PlumeExplainer() {
  const t = useT();
  const lim = t.plume.limitations;
  const limitationList = [lim.gaussian, lim.lowWind, lim.patchiness, lim.windShifts, lim.terrain, lim.urban, lim.reactions, lim.fragments];

  return (
    <Card>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Conceptual SVG */}
        <div className="min-w-0">
          <figure>
            <svg
              viewBox="0 0 400 260"
              className="w-full rounded-lg bg-slate-50 ring-1 ring-slate-200"
              role="img"
              aria-label={t.plume.svgAlt}
            >
              <defs>
                <radialGradient id="plumeGrad" cx="15%" cy="50%" r="85%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.85" />
                  <stop offset="35%" stopColor="#fbbf24" stopOpacity="0.55" />
                  <stop offset="70%" stopColor="#fde68a" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#fef3c7" stopOpacity="0.05" />
                </radialGradient>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#0f766e" />
                </marker>
              </defs>

              <rect x="0" y="210" width="400" height="50" fill="#e2e8f0" />
              <path d="M60 130 Q200 70 390 40 L390 220 Q200 190 60 130 Z" fill="url(#plumeGrad)" />

              <circle cx="58" cy="130" r="9" fill="#dc2626" />
              <text x="58" y="160" fontSize="10" textAnchor="middle" fill="#475569">{t.plume.labelSource}</text>

              <line x1="40" y1="30" x2="150" y2="30" stroke="#0f766e" strokeWidth="2" markerEnd="url(#arrow)" />
              <text x="95" y="22" fontSize="10" textAnchor="middle" fill="#0f766e">{t.plume.labelWind}</text>

              <line x1="300" y1="55" x2="300" y2="205" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
              <text x="312" y="130" fontSize="9" fill="#64748b">{t.plume.labelCrosswind}</text>

              <rect x="200" y="170" width="34" height="40" fill="#cbd5e1" stroke="#94a3b8" />
              <text x="217" y="228" fontSize="9" textAnchor="middle" fill="#64748b">{t.plume.labelBuilding}</text>

              <ellipse cx="120" cy="208" rx="34" ry="7" fill="#fbbf24" fillOpacity="0.6" />
              <text x="120" y="200" fontSize="9" textAnchor="middle" fill="#92400e">{t.plume.labelLowArea}</text>
            </svg>
            <figcaption className="mt-2 text-center text-xs text-slate-500">{t.plume.figCaption}</figcaption>
          </figure>
        </div>

        {/* Explanation */}
        <div className="min-w-0 space-y-3 text-sm leading-relaxed text-slate-700">
          <p>{t.plume.p1}</p>
          <p>{t.plume.p2}</p>
          <p>{t.plume.p3}</p>
          <div className="rounded-lg bg-slate-50 p-3 ring-1 ring-slate-200">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t.plume.limitationsTitle}</p>
            <ul className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
              {limitationList.map((l) => (
                <li key={l.title} className="text-xs text-slate-600">
                  <span className="font-medium text-slate-800">{l.title}.</span> {l.detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <WhatThisMeans>{t.plume.wtm}</WhatThisMeans>
    </Card>
  );
}
