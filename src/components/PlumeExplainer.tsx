/**
 * PlumeExplainer.tsx
 * A purely CONCEPTUAL plume graphic (not a hazard map) plus the limitations of
 * Gaussian plume tools such as NOAA ALOHA.
 */
import { Card, WhatThisMeans } from "./ui";

const ALOHA_LIMITATIONS: { title: string; detail: string }[] = [
  { title: "Gaussian assumptions", detail: "Assumes a smooth, idealized bell-shaped spread that real releases rarely follow exactly." },
  { title: "Low-wind & stable air", detail: "Less reliable in very light winds or stable atmospheric conditions." },
  { title: "Near-source patchiness", detail: "Concentrations close to the source can be uneven and hard to model." },
  { title: "Wind shifts", detail: "Does not fully account for changing wind direction over time." },
  { title: "Terrain steering", detail: "Hills, slopes, and low spots can channel vapor in ways the model ignores." },
  { title: "Urban building eddies", detail: "Buildings create swirls and dead zones not captured by a simple plume." },
  { title: "Chemical reactions", detail: "Does not model reactions that change the cloud as it travels." },
  { title: "Hazardous fragments", detail: "A violent rupture can throw debris — not part of a vapor-dispersion model." },
];

export function PlumeExplainer() {
  return (
    <Card>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Conceptual SVG */}
        <div>
          <figure>
            <svg
              viewBox="0 0 400 260"
              className="w-full rounded-lg bg-slate-50 ring-1 ring-slate-200"
              role="img"
              aria-label="Conceptual illustration of a wind-driven vapor plume widening downwind, with low-lying pooling and building effects. Not a hazard map."
            >
              <defs>
                <radialGradient id="plumeGrad" cx="15%" cy="50%" r="85%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.85" />
                  <stop offset="35%" stopColor="#fbbf24" stopOpacity="0.55" />
                  <stop offset="70%" stopColor="#fde68a" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#fef3c7" stopOpacity="0.05" />
                </radialGradient>
              </defs>

              {/* ground */}
              <rect x="0" y="210" width="400" height="50" fill="#e2e8f0" />

              {/* plume: elongated, widening downwind */}
              <path d="M60 130 Q200 70 390 40 L390 220 Q200 190 60 130 Z" fill="url(#plumeGrad)" />

              {/* source */}
              <circle cx="58" cy="130" r="9" fill="#dc2626" />
              <text x="58" y="160" fontSize="10" textAnchor="middle" fill="#475569">source</text>

              {/* wind arrow */}
              <line x1="40" y1="30" x2="150" y2="30" stroke="#0f766e" strokeWidth="2" markerEnd="url(#arrow)" />
              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#0f766e" />
                </marker>
              </defs>
              <text x="95" y="22" fontSize="10" textAnchor="middle" fill="#0f766e">wind direction</text>

              {/* crosswind spread indicator */}
              <line x1="300" y1="55" x2="300" y2="205" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
              <text x="312" y="130" fontSize="9" fill="#64748b">crosswind spread</text>

              {/* building */}
              <rect x="200" y="170" width="34" height="40" fill="#cbd5e1" stroke="#94a3b8" />
              <text x="217" y="228" fontSize="9" textAnchor="middle" fill="#64748b">building eddy</text>

              {/* low area pooling */}
              <ellipse cx="120" cy="208" rx="34" ry="7" fill="#fbbf24" fillOpacity="0.6" />
              <text x="120" y="200" fontSize="9" textAnchor="middle" fill="#92400e">low-area pooling</text>
            </svg>
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              Conceptual only — not a hazard map and not specific to this incident.
            </figcaption>
          </figure>
        </div>

        {/* Explanation */}
        <div className="space-y-3 text-sm leading-relaxed text-slate-700">
          <p>A plume is <strong>not a laser beam and not a perfect circle</strong>.</p>
          <p>
            Wind generally controls the main direction, while slope, buildings,
            drains, and low spots can influence where heavier-than-air vapor pools
            near the ground.
          </p>
          <p>
            Official plume or blast maps may come from simplified models and
            emergency-planning assumptions. They are planning tools, not guarantees
            of exactly where vapor will or will not be.
          </p>
          <div className="rounded-lg bg-slate-50 p-3 ring-1 ring-slate-200">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Limitations of plume tools (e.g., NOAA ALOHA)
            </p>
            <ul className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
              {ALOHA_LIMITATIONS.map((l) => (
                <li key={l.title} className="text-xs text-slate-600">
                  <span className="font-medium text-slate-800">{l.title}.</span> {l.detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <WhatThisMeans>
        We deliberately do not draw a precise, live hazard map — that would imply a
        false certainty about where vapor is. Use this only to understand <em>why</em>
        plumes are uncertain. For where it is actually safe, rely on official,
        real-time monitoring and evacuation orders.
      </WhatThisMeans>
    </Card>
  );
}
