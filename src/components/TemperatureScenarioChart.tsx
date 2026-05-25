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
  ReferenceDot,
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
import { useLanguage } from "../i18n";
import { buildScenarioUrl, parseScenarioParams } from "../lib/shareUrl";
import { AssumptionControl } from "./AssumptionControl";
import { ShareButtons } from "./ShareButtons";
import { Card, WhatThisMeans } from "./ui";

const SCENARIO_META: { key: ScenarioKey; color: string; dash?: string }[] = [
  { key: "linear", color: "#0f766e" },
  { key: "cooling", color: "#2563eb" },
  { key: "accelerating", color: "#dc2626", dash: "6 4" },
];

export function TemperatureScenarioChart() {
  const { t, lang } = useLanguage();
  // Restore a shared scenario from the URL on first load (falls back to defaults).
  const [initial] = useState(() => parseScenarioParams(window.location.search));
  const [startTempF, setStartTempF] = useState<number>(initial.start ?? SCENARIO_DEFAULTS.startTempF);
  const [previousTempF, setPreviousTempF] = useState<number>(initial.prev ?? SCENARIO_DEFAULTS.previousTempF);
  const [hoursBetween, setHoursBetween] = useState<number>(initial.hrs ?? SCENARIO_DEFAULTS.hoursBetweenReadings);
  const [ambientTempF, setAmbientTempF] = useState<number>(initial.amb ?? SCENARIO_DEFAULTS.ambientTempF);
  const [coolingPct, setCoolingPct] = useState<number>(initial.cool ?? SCENARIO_DEFAULTS.coolingEffectiveness);
  const [accelerationFactor, setAccelerationFactor] = useState<number>(initial.acc ?? SCENARIO_DEFAULTS.accelerationFactor);
  const [horizon, setHorizon] = useState<number>(initial.hz ?? SCENARIO_DEFAULTS.defaultHorizonHours);

  const autoRate = ratePerHour(previousTempF, startTempF, hoursBetween);
  const [rateOverride, setRateOverride] = useState<number | null>(initial.rate ?? null);
  const rate = rateOverride ?? autoRate;

  const scenarioShareUrl = () => {
    const url = buildScenarioUrl(
      {
        start: startTempF,
        prev: previousTempF,
        hrs: hoursBetween,
        amb: ambientTempF,
        cool: coolingPct,
        acc: accelerationFactor,
        hz: horizon,
        rate: rateOverride,
      },
      lang,
    );
    // Reflect the scenario in the address bar so the copied link matches the view.
    window.history.replaceState(null, "", url);
    return url;
  };

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

  const yTop = useMemo(() => {
    const maxStable = Math.max(140, ...points.map((p) => Math.max(p.linear, p.cooling)));
    return Math.min(220, Math.ceil((maxStable + 8) / 10) * 10);
  }, [points]);

  const scenarioName = (key: ScenarioKey) => t.temperature.legend[key];

  const crossings = useMemo(
    () =>
      SCENARIO_META.map((m) => ({
        key: m.key,
        rows: thresholdCrossings(points, m.key, TEMPERATURE_THRESHOLDS),
      })),
    [points],
  );

  return (
    <Card>
      <div className="flex flex-col gap-6">
        {/* Controls */}
        <div className="min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">{t.temperature.assumptions}</h3>
            <button
              type="button"
              onClick={resetDefaults}
              disabled={!isDirty}
              className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-600 hover:border-brand-600 hover:text-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span aria-hidden="true">↺</span> {t.ui.reset}
            </button>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          <AssumptionControl
            label={t.temperature.startTemp}
            value={startTempF}
            min={60}
            max={160}
            step={1}
            unit="°F"
            help={t.temperature.startTempHelp}
            onChange={setStartTempF}
          />
          <AssumptionControl
            label={t.temperature.prevTemp}
            value={previousTempF}
            min={50}
            max={160}
            step={1}
            unit="°F"
            help={t.temperature.prevTempHelp}
            onChange={setPreviousTempF}
          />
          <AssumptionControl
            label={t.temperature.hoursBetween}
            value={hoursBetween}
            min={1}
            max={48}
            step={1}
            unit="hr"
            onChange={setHoursBetween}
          />
          <div>
            <AssumptionControl
              label={t.temperature.observedRate}
              value={Number(rate.toFixed(2))}
              min={-2}
              max={10}
              step={0.1}
              unit="°F/hr"
              help={t.temperature.observedRateHelp}
              onChange={setRateOverride}
            />
            {rateOverride !== null && (
              <button
                type="button"
                onClick={() => setRateOverride(null)}
                className="mt-1 text-xs font-medium text-brand-700 underline"
              >
                {t.ui.resetToObserved(autoRate.toFixed(2))}
              </button>
            )}
          </div>
          <AssumptionControl
            label={t.temperature.ambient}
            value={ambientTempF}
            min={40}
            max={110}
            step={1}
            unit="°F"
            help={t.temperature.ambientHelp}
            onChange={setAmbientTempF}
          />
          <AssumptionControl
            label={t.temperature.cooling}
            value={coolingPct}
            min={0}
            max={100}
            step={1}
            unit="%"
            help={t.temperature.coolingHelp}
            onChange={setCoolingPct}
          />
          <AssumptionControl
            label={t.temperature.acceleration}
            value={accelerationFactor}
            min={0}
            max={0.2}
            step={0.005}
            unit="/hr"
            help={t.temperature.accelerationHelp}
            onChange={setAccelerationFactor}
          />
          <div>
            <p className="text-sm font-medium text-slate-700">{t.temperature.horizon}</p>
            <div className="mt-2 flex gap-2" role="group" aria-label={t.temperature.horizon}>
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
        </div>

        {/* Chart */}
        <div className="min-w-0 order-first">
          <div className="h-[420px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={points} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="hour"
                  tick={{ fontSize: 12, fill: "#475569" }}
                  label={{ value: t.temperature.hoursFromNow, position: "insideBottom", offset: -4, fontSize: 12, fill: "#64748b" }}
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
                  labelFormatter={(h) => `${t.temperature.hoursFromNow}: ${h}`}
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                {TEMPERATURE_THRESHOLDS.map((th) => (
                  <ReferenceLine
                    key={th.tempF}
                    y={th.tempF}
                    stroke={SEVERITY_COLORS[th.severity]}
                    strokeDasharray="4 4"
                    strokeOpacity={0.8}
                    label={{
                      value: `${th.tempF}°F · ${t.thresholds[th.tempF].label}`,
                      position: "insideTopLeft",
                      fontSize: 10,
                      fill: SEVERITY_COLORS[th.severity],
                    }}
                  />
                ))}
                {SCENARIO_META.map((m) => (
                  <Line
                    key={m.key}
                    type="monotone"
                    dataKey={m.key}
                    name={scenarioName(m.key)}
                    stroke={m.color}
                    strokeWidth={2}
                    strokeDasharray={m.dash}
                    dot={false}
                    isAnimationActive={false}
                  />
                ))}
                <ReferenceDot
                  x={0}
                  y={startTempF}
                  r={6}
                  fill="#dc2626"
                  stroke="#ffffff"
                  strokeWidth={2}
                  isFront
                  label={{
                    value: `${Math.round(startTempF)}°F ${t.temperature.nowEstimated}`,
                    position: "right",
                    dy: 16,
                    fontSize: 10,
                    fontWeight: 600,
                    fill: "#dc2626",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            {t.temperature.illustrativeNote(SCENARIO_DEFAULTS.acceleratingCeilingF)}
          </p>
          <p className="mt-1 text-xs text-slate-500">{t.temperature.extrapolatedNote}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-600">{t.share.shareScenario}:</span>
            <ShareButtons size="sm" text={t.share.message} getUrl={scenarioShareUrl} />
          </div>
        </div>
      </div>

      {/* Time-to-threshold (scenario math only) */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-slate-900">
          {t.temperature.timeToThreshold}{" "}
          <span className="font-normal text-slate-500">{t.temperature.timeToThresholdNote}</span>
        </h3>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="py-2 pr-4 font-medium">{t.temperature.thColThreshold}</th>
                {SCENARIO_META.map((m) => (
                  <th key={m.key} className="py-2 pr-4 font-medium">{scenarioName(m.key)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TEMPERATURE_THRESHOLDS.map((th, i) => (
                <tr key={th.tempF} className="border-b border-slate-100">
                  <td className="py-2 pr-4">
                    <span style={{ color: SEVERITY_COLORS[th.severity] }} className="font-semibold">
                      {th.tempF}°F
                    </span>{" "}
                    <span className="text-slate-600">{t.thresholds[th.tempF].label}</span>
                  </td>
                  {crossings.map((c) => {
                    const hour = c.rows[i].hour;
                    return (
                      <td key={c.key} className="py-2 pr-4 tabular-nums text-slate-700">
                        {hour == null ? (
                          <span className="text-slate-400">{t.ui.notWithin(horizon)}</span>
                        ) : hour === 0 ? (
                          t.ui.alreadyAtAbove
                        ) : (
                          t.ui.approxHours(hour)
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
        {t.temperature.wtmPre}
        <a className="font-medium text-brand-700 underline" href="#unknowns">
          {t.temperature.wtmLink}
        </a>
        {t.temperature.wtmPost}
      </WhatThisMeans>
    </Card>
  );
}
