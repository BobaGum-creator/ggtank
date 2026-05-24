/**
 * SourcesPanel.tsx — the references behind the facts and constants, plus a
 * compact list of the key modeling assumptions.
 */
import {
  MMA_CP_KJ_PER_KG_K,
  MMA_DENSITY_KG_PER_L,
  MMA_HEAT_OF_POLYMERIZATION_KJ_PER_MOL,
  MMA_MOLAR_MASS_G_PER_MOL,
} from "../data/constants";
import { sources, type SourceCategory } from "../data/sources";
import { Badge, Card } from "./ui";

const CATEGORY_LABELS: Record<SourceCategory, string> = {
  "official-order": "Official",
  news: "News",
  "chemical-reference": "Chemical reference",
  "safety-data": "Safety data",
  scientific: "Scientific",
};

const KEY_ASSUMPTIONS: string[] = [
  `MMA molar mass = ${MMA_MOLAR_MASS_G_PER_MOL} g/mol`,
  `Density default = ${MMA_DENSITY_KG_PER_L.value} kg/L (adjustable 0.92–0.96)`,
  `Heat capacity default = ${MMA_CP_KJ_PER_KG_K.value} kJ/(kg·K)`,
  `Heat of polymerization = ${MMA_HEAT_OF_POLYMERIZATION_KJ_PER_MOL.value} kJ/mol`,
  "Vapor pressure = NOAA CHRIS equilibrium table (not tank pressure)",
  "Temperature curves are arithmetic scenarios, not forecasts",
  "Conversion fraction is energy-equivalent, not a measured composition",
];

export function SourcesPanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <Card>
        <h3 className="text-sm font-semibold text-slate-900">Sources</h3>
        <ul className="mt-3 space-y-3">
          {sources.map((s) => (
            <li key={s.id} className="border-b border-slate-100 pb-3 last:border-0">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-brand-700 underline decoration-brand-200 underline-offset-2 hover:decoration-brand-600"
                >
                  {s.title}
                </a>
                <Badge tone="neutral">{CATEGORY_LABELS[s.category]}</Badge>
                {s.date && <span className="text-xs text-slate-400">{s.date}</span>}
              </div>
              <p className="mt-0.5 text-xs text-slate-600">
                <span className="font-medium text-slate-700">{s.publisher}.</span> {s.usedFor}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-slate-500">
          Links point to each organization's canonical site. If a specific document
          has moved, search that organization for the titled item.
        </p>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-slate-900">Key assumptions</h3>
        <ul className="mt-3 space-y-2">
          {KEY_ASSUMPTIONS.map((a) => (
            <li key={a} className="flex items-start gap-2 text-xs text-slate-600">
              <span aria-hidden="true" className="mt-0.5 text-brand-600">•</span>
              {a}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
