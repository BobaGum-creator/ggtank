/**
 * TemperatureScenarioChart.tsx
 * Three transparent "what-if" temperature curves over a chosen horizon, with
 * published reference thresholds drawn as horizontal markers. The accelerating
 * curve is explicitly illustrative — not a prediction.
 */
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  SCENARIO_DEFAULTS,
  SEVERITY_COLORS,
  TEMPERATURE_THRESHOLDS,
} from "../data/constants";
import {
  ratePerHour,
  simulateTemperatureScenarios,
  thresholdCrossings,
  type ScenarioKey,
} from "../lib/model";
import { AssumptionControl } from "./AssumptionControl";
import { Card, WhatThisMeans } from "./ui";

const SCENARIO_META: { key: ScenarioKey; name: string; color: string; dash?: string }[] = [
  { key: "linear", name: "Linear (constant rate)", color: "#0f766e" },
  { key: "cooling", name: "Cooling-controlled", color: "#2563eb" },
  { key: "accelerating", name: "Illustrative runaway-like", color: "#dc2626", dash: "6 4" },
];

export function TemperatureScenarioChart() {
  const [startTempF, setStartTempF] = useState<number>(SCENARIO_DEFAULTS.startTempF);
  const [previousTempF, setPreviousTempF] = useState<number>(SCENARIO_DEFAULTS.previousTempF);
  const [hoursBetween, setHoursBetween] = useState<number>(SCENARIO_DEFAULTS.hoursBetweenReadings);
  const [ambientTempF, setAmbientTempF] = useState<number>(SCENARIO_DEFAULTS.ambientTempF);
  const [coolingPct, setCoolingPct] = useState<number>(SCENARIO_DEFAULTS.coolingEffectiveness);
  const [accelerationFactor, setAccelerationFactor] = useState<number>(SCENARIO_DEFAULTS.accelerationFactor);
  const [horizon, setHorizon] = useState<number>(SCENARIO_DEFAULTS.defaultHorizonHours);

  const autoRate = ratePerHour(previousTempF, startTempF, hoursBetween);
  const [rateOverride, setRateOverride] = useState<number | null>(null);
  const rate = rateOverride ?? autoRate;

  const resetDefaults = () => {
    setStartTempF(SCENARIO_DEFAULTS.startTempF);
    setPreviousTempF(SCENARIO_DEFAULTS.previousTempF);
    setHoursBetween(SCENARIO_DEFAULTS.hoursBetweenReadings);
    setAmbientTempF(SCENARIO_DEFAULTS.ambientTempF);
    setCoolingPct(SCENARIO_DEFAULTS.coolingEffectiveness);
    setAccelerationFactor(SCENARIO_DEFAULTS.accelerationFactor);
    setHorizon(SCENARIO_DEFAULTS.defaultHorizonHours);
    setRateOverride(null);
  };

  const isDirty =
    startTempF !== SCENARIO_DEFAULTS.startTempF ||
    previousTempF !== SCENARIO_DEFAULTS.previousTempF ||
    hoursBetween !== SCENARIO_DEFAULTS.hoursBetweenReadings ||
    ambientTempF !== SCENARIO_DEFAULTS.ambientTempF ||
    coolingPct !== SCENARIO_DEFAULTS.coolingEffectiveness ||
    accelerationFactor !== SCENARIO_DEFAULTS.accelerationFactor ||
    horizon !== SCENARIO_DEFAULTS.defaultHorizonHours ||
    rateOverride !== null;

  const { points } = useMemo(
    () =>
      simulateTemperatureScenarios({
        startTempF,
        rateFPerHour: rate,
        ambientTempF,
        coolingEffectiveness: coolingPct / 100,
        accelerationFactor,
        horizonHours: horizon,
      }),
    [startTempF, rate, ambientTempF, coolingPct, accelerationFactor, horizon],
  );

  // Y-axis top: focus on the meaningful threshold range; let the accelerating
  // curve clip (allowDataOverflow) rather than crushing everything else.
  const yTop = useMemo(() => {
    const maxStable = Math.max(
      140,
      ...points.map((p) => Math.max(p.linear, p.cooling)),
    );
    return Math.min(220, Math.ceil((maxStable + 8) / 10) * 10);
  }, [points]);

  const crossings = useMemo(
    () =>
      SCENARIO_META.map((m) => ({
        key: m.key,
        name: m.name,
        rows: thresholdCrossings(points, m.key, TEMPERATURE_THRESHOLDS),
      })),
    [points],
  );

  return (
    <Card>
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Controls */}
        <div className="min-w-0 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">Assumptions</h3>
            <button
              type="button"
              onClick={resetDefaults}
              disabled={!isDirty}
              className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-600 hover:border-brand-600 hover:text-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span aria-hidden="true">↺</span> Reset
            </button>
          </div>
          <AssumptionControl
            label="Starting temperature"
            value={startTempF}
            min={60}
            max={160}
            step={1}
            unit="°F"
            help="Most recent reported internal temperature."
            onChange={setStartTempF}
          />
          <AssumptionControl
            label="Previous known temperature"
            value={previousTempF}
            min={50}
            max={160}
            step={1}
            unit="°F"
            help="An earlier reported reading, used to estimate the rate."
            onChange={setPreviousTempF}
          />
          <AssumptionControl
            label="Hours between readings"
            value={hoursBetween}
            min={1}
            max={48}
            step={1}
            unit="hr"
            onChange={setHoursBetween}
          />
          <div>
            <AssumptionControl
              label="Observed rate of rise"
              value={Number(rate.toFixed(2))}
              min={-2}
              max={10}
              step={0.1}
              unit="°F/hr"
              help="Auto-calculated from the two readings, but you can override it."
              onChange={setRateOverride}
            />
            {rateOverride !== null && (
              <button
                type="button"
                onClick={() => setRateOverride(null)}
                className="mt-1 text-xs font-medium text-brand-700 underline"
              >
                Reset to observed ({autoRate.toFixed(2)}°F/hr)
              </button>
            )}
          </div>
          <AssumptionControl
            label="Ambient temperature"
            value={ambientTempF}
            min={40}
            max={110}
            step={1}
            unit="°F"
            help="Outside air temperature; used by the illustrative cooling-loss term."
            onChange={setAmbientTempF}
          />
          <AssumptionControl
            label="Cooling effectiveness"
            value={coolingPct}
            min={0}
            max={100}
            step={1}
            unit="%"
            help="How strongly active cooling damps the rising rate over time. 0% = no damping."
            onChange={setCoolingPct}
          />
          <AssumptionControl
            label="Acceleration factor"
            value={accelerationFactor}
            min={0}
            max={0.2}
            step={0.005}
            unit="/hr"
            help="Drives ONLY the illustrative runaway-like curve. Higher = faster self-heating."
            onChange={setAccelerationFactor}
          />
          <div>
            <p className="text-sm font-medium text-slate-700">Simulation horizon</p>
            <div className="mt-2 flex gap-2" role="group" aria-label="Simulation horizon">
              {SCENARIO_DEFAULTS.horizonOptionsHours.map((h) => (
                <button
                  key={h}
                  type="button"
                  aria-pressed={horizon === h}
                  onClick={() => setHorizon(h)}
                  className={`rounded-md px-3 py-1 text-sm font-medium ${
                    horizon === h
                      ? "bg-brand-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {h}h
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="min-w-0">
          <div className="h-[420px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={points} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="hour"
                  tick={{ fontSize: 12, fill: "#475569" }}
                  label={{ value: "Hours from now", position: "insideBottom", offset: -4, fontSize: 12, fill: "#64748b" }}
                />
                <YAxis
                  domain={[60, yTop]}
                  allowDataOverflow
                  tick={{ fontSize: 12, fill: "#475569" }}
                  width={48}
                  label={{ value: "°F", angle: -90, position: "insideLeft", fontSize: 12, fill: "#64748b" }}
                />
                <Tooltip
                  formatter={(value: number, name: string) => [`${value.toFixed(1)}°F`, name]}
                  labelFormatter={(h) => `Hour ${h}`}
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                {TEMPERATURE_THRESHOLDS.map((t) => (
                  <ReferenceLine
                    key={t.tempF}
                    y={t.tempF}
                    stroke={SEVERITY_COLORS[t.severity]}
                    strokeDasharray="4 4"
                    strokeOpacity={0.8}
                    label={{
                      value: `${t.tempF}°F · ${t.label}`,
                      position: "insideTopLeft",
                      fontSize: 10,
                      fill: SEVERITY_COLORS[t.severity],
                    }}
                  />
                ))}
                {SCENARIO_META.map((m) => (
                  <Line
                    key={m.key}
                    type="monotone"
                    dataKey={m.key}
                    name={m.name}
                    stroke={m.color}
                    strokeWidth={2}
                    strokeDasharray={m.dash}
                    dot={false}
                    isAnimationActive={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            The dashed red curve is an <strong>illustrative runaway-like scenario, not a prediction</strong>.
            It is capped at {SCENARIO_DEFAULTS.acceleratingCeilingF}°F and may run off the top of the chart.
          </p>
        </div>
      </div>

      {/* Time-to-threshold (scenario math only) */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-slate-900">
          Time to reach each threshold{" "}
          <span className="font-normal text-slate-500">— scenario math, not a predicted failure time</span>
        </h3>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="py-2 pr-4 font-medium">Threshold</th>
                {crossings.map((c) => (
                  <th key={c.key} className="py-2 pr-4 font-medium">{c.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TEMPERATURE_THRESHOLDS.map((t, i) => (
                <tr key={t.tempF} className="border-b border-slate-100">
                  <td className="py-2 pr-4">
                    <span style={{ color: SEVERITY_COLORS[t.severity] }} className="font-semibold">
                      {t.tempF}°F
                    </span>{" "}
                    <span className="text-slate-600">{t.label}</span>
                  </td>
                  {crossings.map((c) => {
                    const hour = c.rows[i].hour;
                    return (
                      <td key={c.key} className="py-2 pr-4 tabular-nums text-slate-700">
                        {hour == null ? (
                          <span className="text-slate-400">not within {horizon}h</span>
                        ) : hour === 0 ? (
                          "already at/above"
                        ) : (
                          `~${hour}h`
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <WhatThisMeans>
        These three curves are arithmetic, not forecasts. The{" "}
        <strong>linear</strong> curve simply extends the observed rate. The{" "}
        <strong>cooling-controlled</strong> curve assumes active cooling gradually
        slows the rise. The <strong>illustrative runaway-like</strong> curve shows
        what self-accelerating heat <em>could</em> look like if polymerization
        outpaced cooling — it is a teaching shape, not a prediction. Real tank
        behavior depends on the <a className="font-medium text-brand-700 underline" href="#unknowns">known unknowns</a>.
        The "time to threshold" values are just where each line crosses a
        reference temperature, never a predicted time of failure.
      </WhatThisMeans>
    </Card>
  );
}
