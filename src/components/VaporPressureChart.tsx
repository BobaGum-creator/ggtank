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
import { AssumptionControl } from "./AssumptionControl";
import { Card, WhatThisMeans } from "./ui";

export function VaporPressureChart() {
  const [psi, setPsi] = useState(1.103); // equilibrium VP at ~90°F as a starting point
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
                  label={{ value: "Temperature (°F)", position: "insideBottom", offset: -4, fontSize: 12, fill: "#64748b" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#475569" }}
                  width={44}
                  label={{ value: "psi", angle: -90, position: "insideLeft", fontSize: 12, fill: "#64748b" }}
                />
                <Tooltip
                  formatter={(value: number) => [`${value} psi`, "Equilibrium VP"]}
                  labelFormatter={(t) => `${t}°F`}
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
                />
                <Line type="monotone" dataKey="psi" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-1 text-center text-xs text-slate-500">
            NOAA CHRIS <strong>equilibrium vapor pressure</strong> of the liquid — <strong>not total tank pressure</strong>.
            At ~90°F this is about {round(at90, 2)} psi.
          </p>
        </div>

        {/* Force calculator */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-semibold text-slate-900">
            Pressure → force (educational only)
          </h3>
          <p className="mt-1 text-xs text-slate-600">
            A small pressure acting over a large area still produces a large total
            force: <code className="rounded bg-white px-1">force = psi × area(ft²) × 144</code>.
          </p>
          <div className="mt-4 space-y-4">
            <AssumptionControl label="Pressure" value={psi} min={0} max={50} step={0.1} unit="psi" onChange={setPsi} />
            <AssumptionControl label="Surface area" value={areaFt2} min={1} max={2000} step={1} unit="ft²" onChange={setAreaFt2} />
          </div>
          <div className="mt-4 rounded-lg bg-white p-3 ring-1 ring-slate-200">
            <p className="text-xs uppercase tracking-wide text-slate-500">Resulting force</p>
            <p className="text-2xl font-bold text-slate-900 tabular-nums">
              {Math.round(forceLb).toLocaleString()} lbf
            </p>
            <p className="text-xs text-slate-500">
              ≈ {round(forceLb / 2000, 1).toLocaleString()} US tons of force
            </p>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            This is a textbook illustration of how pressure scales with area. It is
            <strong> not</strong> a statement about this tank's strength or failure point.
          </p>
        </div>
      </div>

      <WhatThisMeans>
        Equilibrium vapor pressure rises with temperature, but the actual tank
        pressure depends on venting, headspace, gas generation, polymer blocking
        lines, leaks or cracks, and structural condition — so do not equate the two.
        A low numerical psi can still create large forces across a big tank surface.
        We deliberately do <strong>not</strong> estimate the tank's failure pressure:
        that is unknown without tank design, welds, corrosion, vent settings, fill
        level, and deformation data.
      </WhatThisMeans>
    </Card>
  );
}
