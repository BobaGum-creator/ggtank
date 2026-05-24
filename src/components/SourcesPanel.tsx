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
import { sources } from "../data/sources";
import { useT } from "../i18n";
import { Badge, Card } from "./ui";

export function SourcesPanel() {
  const t = useT();

  const keyAssumptions = [
    t.sources.assumptions.molarMass(MMA_MOLAR_MASS_G_PER_MOL),
    t.sources.assumptions.density(MMA_DENSITY_KG_PER_L.value),
    t.sources.assumptions.heatCapacity(MMA_CP_KJ_PER_KG_K.value),
    t.sources.assumptions.heatOfPoly(MMA_HEAT_OF_POLYMERIZATION_KJ_PER_MOL.value),
    t.sources.assumptions.vaporPressure,
    t.sources.assumptions.tempCurves,
    t.sources.assumptions.conversion,
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <Card>
        <h3 className="text-sm font-semibold text-slate-900">{t.sources.heading}</h3>
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
                <Badge tone="neutral">{t.sources.categories[s.category]}</Badge>
                {s.date && <span className="text-xs text-slate-400">{s.date}</span>}
              </div>
              <p className="mt-0.5 text-xs text-slate-600">
                <span className="font-medium text-slate-700">{s.publisher}.</span>{" "}
                {t.sources.usedFor[s.id] ?? s.usedFor}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-slate-500">{t.sources.note}</p>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-slate-900">{t.sources.keyAssumptions}</h3>
        <ul className="mt-3 space-y-2">
          {keyAssumptions.map((a) => (
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
