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
import { estimateComposition } from "../lib/model";
import { clamp, formatEnergy, formatPercent } from "../lib/units";
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
  const [volMin, setVolMin] = useState<number>(VOLUME_DEFAULTS_GALLONS.min);
  const [volMid, setVolMid] = useState<number>(VOLUME_DEFAULTS_GALLONS.likelyLow);
  const [volMax, setVolMax] = useState<number>(VOLUME_DEFAULTS_GALLONS.max);
  const [density, setDensity] = useState<number>(MMA_DENSITY_KG_PER_L.value);
  const [cp, setCp] = useState<number>(MMA_CP_KJ_PER_KG_K.value);
  const [initialTempF, setInitialTempF] = useState<number>(COMPOSITION_DEFAULTS.initialTempF);
  const [currentTempF, setCurrentTempF] = useState<number>(COMPOSITION_DEFAULTS.currentTempF);
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

  // Volume-by-volume results (absolute energies differ; the FRACTION does not).
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
    {
      key: "remaining",
      label: "Remaining liquid MMA",
      fraction: remaining,
      color: "#3b82f6",
      note: "Unreacted monomer still in liquid form.",
    },
    {
      key: "polymerized",
      label: "Polymerized / gelled (energy-equivalent)",
      fraction: adiabatic,
      color: "#f59e0b",
      note: "Energy-equivalent share implied by the measured temperature rise alone.",
    },
    {
      key: "unknown",
      label: "Unknown / unmeasured gradients",
      fraction: unknownExtra,
      color: "#94a3b8",
      note: "Extra reaction that active cooling could have masked. Grows with the cooling multiplier.",
    },
    {
      key: "vapor",
      label: "Vapor / headspace",
      fraction: vapor,
      color: "#a78bfa",
      note: "Large by volume, tiny by mass — shown conceptually.",
    },
  ];

  return (
    <Card>
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Controls */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900">Assumptions</h3>
          <AssumptionControl label="Volume — minimum" value={volMin} min={1000} max={34000} step={500} unit="gal" onChange={setVolMin} />
          <AssumptionControl label="Volume — likely" value={volMid} min={1000} max={34000} step={500} unit="gal" onChange={setVolMid} />
          <AssumptionControl label="Volume — maximum" value={volMax} min={1000} max={34000} step={500} unit="gal" onChange={setVolMax} />
          <AssumptionControl
            label="Density"
            value={density}
            min={MMA_DENSITY_MIN_KG_PER_L}
            max={MMA_DENSITY_MAX_KG_PER_L}
            step={0.005}
            unit="kg/L"
            help={MMA_DENSITY_KG_PER_L.note}
            onChange={setDensity}
          />
          <AssumptionControl
            label="Heat capacity"
            value={cp}
            min={1.6}
            max={2.2}
            step={0.01}
            unit="kJ/kg·K"
            help={MMA_CP_KJ_PER_KG_K.note}
            onChange={setCp}
          />
          <AssumptionControl label="Initial temperature" value={initialTempF} min={50} max={140} step={1} unit="°F" onChange={setInitialTempF} />
          <AssumptionControl label="Current temperature" value={currentTempF} min={50} max={200} step={1} unit="°F" onChange={setCurrentTempF} />
          <AssumptionControl
            label="Cooling removal multiplier"
            value={coolingMult}
            min={1}
            max={COMPOSITION_DEFAULTS.coolingRemovalMultiplierMax}
            step={0.5}
            unit="×"
            help="1× = purely adiabatic (no heat removed). Higher values assume cooling carried away heat before it showed up as a temperature rise."
            onChange={setCoolingMult}
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Energy-equivalent conversion (from temp rise alone)
              </p>
              <p className="text-3xl font-bold text-amber-600">{formatPercent(adiabatic)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                With cooling multiplier ({coolingMult}×)
              </p>
              <p className="text-3xl font-bold text-slate-700">
                {formatPercent(clamp(coolingAdjusted, 0, 1))}
                {r.exceedsOneHundredPercent && <span className="ml-1 text-base">⚠️</span>}
              </p>
            </div>
          </div>

          {r.exceedsOneHundredPercent && (
            <div role="alert" className="mt-3 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">
              <strong>These assumptions are inconsistent.</strong> The cooling-adjusted
              estimate exceeds 100%, which is physically impossible. It usually means
              the cooling multiplier is set higher than the data can support. Treat
              this as "assumptions don't add up," not as a real result.
            </div>
          )}

          {/* Stacked composition bar */}
          <div className="mt-5">
            <p className="text-sm font-medium text-slate-700">
              Conceptual composition (energy-equivalent, not measured)
            </p>
            <div className="mt-2 flex h-10 w-full overflow-hidden rounded-lg ring-1 ring-slate-200" role="img" aria-label="Conceptual composition bands">
              {segments.map((s) => (
                <div
                  key={s.key}
                  style={{ width: `${s.fraction * 100}%`, backgroundColor: s.color }}
                  title={`${s.label}: ${formatPercent(s.fraction)}`}
                />
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
              Absolute energy by volume{" "}
              <span className="font-normal text-slate-500">
                — the conversion % above is the same for every volume; only the raw Joules scale
              </span>
            </p>
            <table className="mt-2 w-full min-w-[440px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="py-2 pr-4 font-medium">Volume</th>
                  <th className="py-2 pr-4 font-medium">Mass</th>
                  <th className="py-2 pr-4 font-medium">If fully polymerized</th>
                  <th className="py-2 pr-4 font-medium">Heat from measured rise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Minimum", res: results.min },
                  { label: "Likely", res: results.mid },
                  { label: "Maximum", res: results.max },
                ].map(({ label, res }) => (
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
            <Badge tone="info">Heat of polymerization: {MMA_HEAT_OF_POLYMERIZATION_KJ_PER_MOL.value} kJ/mol</Badge>
            <Badge tone="neutral">Energy-equivalent estimate — not a measurement</Badge>
          </p>
        </div>
      </div>

      <WhatThisMeans>
        The observed 77°F → 90°F rise alone would correspond to only a low
        single-digit percent of full MMA-to-PMMA polymerization energy if no heat
        had been removed. Because firefighters are cooling the tank, and because
        internal temperatures may be uneven, actual conversion could be higher or
        lower. This is an <strong>energy-equivalent estimate, not a measurement of
        actual composition</strong>. It can be badly wrong if cooling water removed
        significant heat, if the internal temperature is not uniform, if there is
        venting, if material has gelled, or if pressure relief has occurred.
      </WhatThisMeans>
    </Card>
  );
}
