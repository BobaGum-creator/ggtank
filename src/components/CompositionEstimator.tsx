/**
 * CompositionEstimator.tsx
 * Estimates an ENERGY-EQUIVALENT polymerization fraction — explicitly NOT the
 * actual tank contents. Shows the result as uncertainty bands and warns loudly
 * when the chosen assumptions become physically inconsistent (>100%).
 */
import { useMemo, useState } from "react";
import {
  COMPOSITION_DEFAULTS,
  MMA_CP_KJ_PER_KG_K,
  MMA_DENSITY_KG_PER_L,
  MMA_DENSITY_MAX_KG_PER_L,
  MMA_DENSITY_MIN_KG_PER_L,
  MMA_HEAT_OF_POLYMERIZATION_KJ_PER_MOL,
  VOLUME_DEFAULTS_GALLONS,
} from "../data/constants";
import { estimateComposition, liveEstimate } from "../lib/model";
import { clamp, formatEnergy, formatPercent } from "../lib/units";
import { useT } from "../i18n";
import { AssumptionControl } from "./AssumptionControl";
import { Badge, Card, WhatThisMeans } from "./ui";

interface Segment {
  key: string;
  label: string;
  fraction: number;
  color: string;
  note: string;
}

export function CompositionEstimator() {
  const t = useT();
  const [volMin, setVolMin] = useState<number>(VOLUME_DEFAULTS_GALLONS.min);
  const [volMid, setVolMid] = useState<number>(VOLUME_DEFAULTS_GALLONS.likelyLow);
  const [volMax, setVolMax] = useState<number>(VOLUME_DEFAULTS_GALLONS.max);
  const [density, setDensity] = useState<number>(MMA_DENSITY_KG_PER_L.value);
  const [cp, setCp] = useState<number>(MMA_CP_KJ_PER_KG_K.value);
  const [initialTempF, setInitialTempF] = useState<number>(COMPOSITION_DEFAULTS.initialTempF);
  const [currentTempF, setCurrentTempF] = useState<number>(() => Math.round(liveEstimate().currentTempF));
  const [coolingMult, setCoolingMult] = useState<number>(COMPOSITION_DEFAULTS.coolingRemovalMultiplier);

  const base = useMemo(
    () => ({
      densityKgPerL: density,
      cpKjPerKgK: cp,
      initialTempF,
      currentTempF,
      coolingRemovalMultiplier: coolingMult,
    }),
    [density, cp, initialTempF, currentTempF, coolingMult],
  );

  const results = useMemo(
    () => ({
      min: estimateComposition({ gallons: volMin, ...base }),
      mid: estimateComposition({ gallons: volMid, ...base }),
      max: estimateComposition({ gallons: volMax, ...base }),
    }),
    [volMin, volMid, volMax, base],
  );

  const r = results.mid;
  const adiabatic = clamp(r.adiabaticConversionFraction, 0, 1);
  const coolingAdjusted = r.coolingAdjustedFraction;
  const unknownExtra = clamp(coolingAdjusted - adiabatic, 0, 1 - adiabatic);
  const vapor = COMPOSITION_DEFAULTS.conceptualVaporFraction;
  const remaining = clamp(1 - adiabatic - unknownExtra - vapor, 0, 1);

  const segments: Segment[] = [
    { key: "remaining", label: t.composition.segRemaining, fraction: remaining, color: "#3b82f6", note: t.composition.segRemainingNote },
    { key: "polymerized", label: t.composition.segPolymerized, fraction: adiabatic, color: "#f59e0b", note: t.composition.segPolymerizedNote },
    { key: "unknown", label: t.composition.segUnknown, fraction: unknownExtra, color: "#94a3b8", note: t.composition.segUnknownNote },
    { key: "vapor", label: t.composition.segVapor, fraction: vapor, color: "#a78bfa", note: t.composition.segVaporNote },
  ];

  const volumeRows = [
    { label: t.composition.rowMinimum, res: results.min },
    { label: t.composition.rowLikely, res: results.mid },
    { label: t.composition.rowMaximum, res: results.max },
  ];

  return (
    <Card>
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Controls */}
        <div className="min-w-0 space-y-4">
          <h3 className="text-sm font-semibold text-slate-900">{t.composition.assumptions}</h3>
          <AssumptionControl label={t.composition.volMin} value={volMin} min={1000} max={34000} step={500} unit="gal" onChange={setVolMin} />
          <AssumptionControl label={t.composition.volLikely} value={volMid} min={1000} max={34000} step={500} unit="gal" onChange={setVolMid} />
          <AssumptionControl label={t.composition.volMax} value={volMax} min={1000} max={34000} step={500} unit="gal" onChange={setVolMax} />
          <AssumptionControl
            label={t.composition.density}
            value={density}
            min={MMA_DENSITY_MIN_KG_PER_L}
            max={MMA_DENSITY_MAX_KG_PER_L}
            step={0.005}
            unit="kg/L"
            help={MMA_DENSITY_KG_PER_L.note}
            onChange={setDensity}
          />
          <AssumptionControl
            label={t.composition.heatCapacity}
            value={cp}
            min={1.6}
            max={2.2}
            step={0.01}
            unit="kJ/kg·K"
            help={MMA_CP_KJ_PER_KG_K.note}
            onChange={setCp}
          />
          <AssumptionControl label={t.composition.initialTemp} value={initialTempF} min={50} max={140} step={1} unit="°F" onChange={setInitialTempF} />
          <AssumptionControl label={t.composition.currentTemp} value={currentTempF} min={50} max={200} step={1} unit="°F" onChange={setCurrentTempF} />
          <AssumptionControl
            label={t.composition.coolingMult}
            value={coolingMult}
            min={1}
            max={COMPOSITION_DEFAULTS.coolingRemovalMultiplierMax}
            step={0.5}
            unit="×"
            help={t.composition.coolingMultHelp}
            onChange={setCoolingMult}
          />
        </div>

        {/* Output */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">{t.composition.convFromTemp}</p>
              <p className="text-3xl font-bold text-amber-600">{formatPercent(adiabatic)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">{t.composition.withCoolingMult(coolingMult)}</p>
              <p className="text-3xl font-bold text-slate-700">
                {formatPercent(clamp(coolingAdjusted, 0, 1))}
                {r.exceedsOneHundredPercent && <span className="ml-1 text-base">⚠️</span>}
              </p>
            </div>
          </div>

          {r.exceedsOneHundredPercent && (
            <div role="alert" className="mt-3 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">
              <strong>{t.composition.inconsistentTitle}</strong> {t.composition.inconsistentBody}
            </div>
          )}

          {/* Stacked composition bar */}
          <div className="mt-5">
            <p className="text-sm font-medium text-slate-700">{t.composition.conceptualTitle}</p>
            <div className="mt-2 flex h-10 w-full overflow-hidden rounded-lg ring-1 ring-slate-200" role="img" aria-label={t.composition.conceptualTitle}>
              {segments.map((s) => (
                <div key={s.key} style={{ width: `${s.fraction * 100}%`, backgroundColor: s.color }} title={`${s.label}: ${formatPercent(s.fraction)}`} />
              ))}
            </div>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {segments.map((s) => (
                <li key={s.key} className="flex items-start gap-2 text-xs text-slate-600">
                  <span className="mt-0.5 inline-block h-3 w-3 flex-none rounded-sm" style={{ backgroundColor: s.color }} aria-hidden="true" />
                  <span>
                    <span className="font-medium text-slate-800">{s.label} — {formatPercent(s.fraction)}</span>
                    <br />
                    {s.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Absolute-energy range by volume */}
          <div className="mt-5 overflow-x-auto">
            <p className="text-sm font-medium text-slate-700">
              {t.composition.absByVolume}{" "}
              <span className="font-normal text-slate-500">{t.composition.absByVolumeNote}</span>
            </p>
            <table className="mt-2 w-full min-w-[440px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="py-2 pr-4 font-medium">{t.composition.colVolume}</th>
                  <th className="py-2 pr-4 font-medium">{t.composition.colMass}</th>
                  <th className="py-2 pr-4 font-medium">{t.composition.colIfFully}</th>
                  <th className="py-2 pr-4 font-medium">{t.composition.colHeatFromRise}</th>
                </tr>
              </thead>
              <tbody>
                {volumeRows.map(({ label, res }) => (
                  <tr key={label} className="border-b border-slate-100">
                    <td className="py-2 pr-4">{label} · {res.gallons.toLocaleString()} gal</td>
                    <td className="py-2 pr-4 tabular-nums">{Math.round(res.massKg).toLocaleString()} kg</td>
                    <td className="py-2 pr-4 tabular-nums">{formatEnergy(res.totalPolymerizationEnergyJ)}</td>
                    <td className="py-2 pr-4 tabular-nums">{formatEnergy(res.sensibleHeatJ)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <Badge tone="info">{t.composition.badgeHeatOfPoly(MMA_HEAT_OF_POLYMERIZATION_KJ_PER_MOL.value)}</Badge>
            <Badge tone="neutral">{t.composition.badgeEnergyEquiv}</Badge>
          </p>
        </div>
      </div>

      <WhatThisMeans>{t.composition.wtm}</WhatThisMeans>
    </Card>
  );
}
