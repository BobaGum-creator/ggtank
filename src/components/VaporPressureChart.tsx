/**
 * VaporPressureChart.tsx
 * Plots the NOAA CHRIS equilibrium vapor-pressure table and provides a small,
 * clearly-labelled educational force calculator. It deliberately does NOT
 * estimate tank failure pressure.
 */
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { VAPOR_PRESSURE_TABLE } from "../data/constants";
import { interpolateVaporPressurePsi, pressureForcePounds } from "../lib/model";
import { round } from "../lib/units";
import { useT } from "../i18n";
import { AssumptionControl } from "./AssumptionControl";
import { Card, WhatThisMeans } from "./ui";

export function VaporPressureChart() {
  const t = useT();
  const [psi, setPsi] = useState(1.103);
  const [areaFt2, setAreaFt2] = useState(100);

  const forceLb = pressureForcePounds(psi, areaFt2);

  const data = useMemo(
    () => VAPOR_PRESSURE_TABLE.map((p) => ({ tempF: p.tempF, psi: p.psi })),
    [],
  );

  const at90 = interpolateVaporPressurePsi(90);

  return (
    <Card>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Chart */}
        <div className="min-w-0">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="tempF"
                  tick={{ fontSize: 12, fill: "#475569" }}
                  label={{ value: t.pressure.tempAxis, position: "insideBottom", offset: -4, fontSize: 12, fill: "#64748b" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#475569" }}
                  width={44}
                  label={{ value: "psi", angle: -90, position: "insideLeft", fontSize: 12, fill: "#64748b" }}
                />
                <Tooltip
                  formatter={(value: number) => [`${value} psi`, t.pressure.vpTooltip]}
                  labelFormatter={(tt) => `${tt}°F`}
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
                />
                <Line type="monotone" dataKey="psi" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-1 text-center text-xs text-slate-500">
            {t.pressure.vpCaptionPre} {t.pressure.vpCaptionAt90(round(at90, 2))}
          </p>
        </div>

        {/* Force calculator */}
        <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-semibold text-slate-900">{t.pressure.forceTitle}</h3>
          <p className="mt-1 text-xs text-slate-600">
            {t.pressure.forceIntro}{" "}
            <code className="rounded bg-white px-1">force = psi × area(ft²) × 144</code>.
          </p>
          <div className="mt-4 space-y-4">
            <AssumptionControl label={t.pressure.pressureLabel} value={psi} min={0} max={50} step={0.1} unit="psi" onChange={setPsi} />
            <AssumptionControl label={t.pressure.areaLabel} value={areaFt2} min={1} max={2000} step={1} unit="ft²" onChange={setAreaFt2} />
          </div>
          <div className="mt-4 rounded-lg bg-white p-3 ring-1 ring-slate-200">
            <p className="text-xs uppercase tracking-wide text-slate-500">{t.pressure.resultingForce}</p>
            <p className="text-2xl font-bold text-slate-900 tabular-nums">{Math.round(forceLb).toLocaleString()} lbf</p>
            <p className="text-xs text-slate-500">{t.pressure.tonsApprox(round(forceLb / 2000, 1).toLocaleString())}</p>
          </div>
          <p className="mt-3 text-xs text-slate-500">{t.pressure.forceDisclaimer}</p>
        </div>
      </div>

      <WhatThisMeans>{t.pressure.wtm}</WhatThisMeans>
    </Card>
  );
}
