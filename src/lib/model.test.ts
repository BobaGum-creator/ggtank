import { test } from "node:test";
import assert from "node:assert/strict";

import {
  volumeToMassKg,
  massToMolesMMA,
  totalPolymerizationEnergy,
  sensibleHeat,
  energyEquivalentConversionFraction,
  estimateComposition,
  interpolateVaporPressurePsi,
  simulateTemperatureScenarios,
  thresholdCrossings,
  ratePerHour,
} from "./model";
import { TEMPERATURE_THRESHOLDS, VAPOR_PRESSURE_TABLE } from "../data/constants";

const approx = (a: number, b: number, eps = 1e-6) =>
  assert.ok(Math.abs(a - b) <= eps, `${a} !~= ${b}`);

test("volumeToMassKg: 6000 gal at 0.94 kg/L", () => {
  // 6000 * 3.78541 L * 0.94 kg/L
  approx(volumeToMassKg(6000, 0.94), 6000 * 3.78541 * 0.94, 1e-3);
});

test("massToMolesMMA divides by molar mass in kg/mol", () => {
  approx(massToMolesMMA(100.12), 1000, 1e-6); // 100.12 kg / 0.10012 kg/mol
});

test("totalPolymerizationEnergy uses 57.8 kJ/mol", () => {
  approx(totalPolymerizationEnergy(1), 57800);
});

test("sensibleHeat converts cp from kJ to J internally", () => {
  // 1 kg * 1.91 kJ/kg-K * 1 K = 1910 J
  approx(sensibleHeat(1, 1.91, 1), 1910);
});

test("energy-equivalent fraction for 77->90F is low single-digit percent", () => {
  const f = energyEquivalentConversionFraction({
    cpKjPerKgK: 1.91,
    initialTempF: 77,
    currentTempF: 90,
  });
  // ~2.4%
  assert.ok(f > 0.02 && f < 0.03, `expected ~0.024, got ${f}`);
});

test("conversion fraction is independent of volume and density", () => {
  const a = estimateComposition({
    gallons: 5000,
    densityKgPerL: 0.92,
    cpKjPerKgK: 1.91,
    initialTempF: 77,
    currentTempF: 90,
    coolingRemovalMultiplier: 1,
  });
  const b = estimateComposition({
    gallons: 7000,
    densityKgPerL: 0.96,
    cpKjPerKgK: 1.91,
    initialTempF: 77,
    currentTempF: 90,
    coolingRemovalMultiplier: 1,
  });
  approx(a.adiabaticConversionFraction, b.adiabaticConversionFraction, 1e-9);
  // but absolute energies differ with volume
  assert.ok(b.totalPolymerizationEnergyJ > a.totalPolymerizationEnergyJ);
});

test("cooling multiplier scales fraction and flags >100%", () => {
  const r = estimateComposition({
    gallons: 6000,
    densityKgPerL: 0.94,
    cpKjPerKgK: 1.91,
    initialTempF: 77,
    currentTempF: 90,
    coolingRemovalMultiplier: 50,
  });
  assert.ok(r.coolingAdjustedFraction > 1);
  assert.ok(r.exceedsOneHundredPercent);
  assert.equal(r.displayFraction, 1); // clamped
});

test("interpolateVaporPressurePsi hits table points and interpolates", () => {
  approx(interpolateVaporPressurePsi(90), 1.103, 1e-9);
  // midpoint between 90 (1.103) and 100 (1.428)
  approx(interpolateVaporPressurePsi(95), (1.103 + 1.428) / 2, 1e-9);
  // clamps at the ends
  approx(interpolateVaporPressurePsi(40), VAPOR_PRESSURE_TABLE[0].psi);
  approx(
    interpolateVaporPressurePsi(200),
    VAPOR_PRESSURE_TABLE[VAPOR_PRESSURE_TABLE.length - 1].psi,
  );
});

test("ratePerHour computes the observed slope, guards divide-by-zero", () => {
  approx(ratePerHour(77, 90, 13), 1, 1e-9);
  assert.equal(ratePerHour(77, 90, 0), 0);
});

test("simulateTemperatureScenarios: linear is exact; cooling <= linear", () => {
  const { points } = simulateTemperatureScenarios({
    startTempF: 90,
    rateFPerHour: 1,
    ambientTempF: 70,
    coolingEffectiveness: 0.4,
    accelerationFactor: 0.05,
    horizonHours: 24,
  });
  assert.equal(points[0].hour, 0);
  assert.equal(points[points.length - 1].hour, 24);
  const at12 = points.find((p) => p.hour === 12)!;
  approx(at12.linear, 90 + 12, 1e-9);
  // cooling damps the rise, so it should stay at or below the linear curve
  assert.ok(at12.cooling <= at12.linear + 1e-9);
});

test("accelerating curve never dips below linear (or cooling)", () => {
  const { points } = simulateTemperatureScenarios({
    startTempF: 123, // far above ambient, where the cooling-loss term is large
    rateFPerHour: 1,
    ambientTempF: 70,
    coolingEffectiveness: 0.4,
    accelerationFactor: 0.05,
    horizonHours: 24,
  });
  for (const p of points) {
    assert.ok(
      p.accelerating >= p.linear - 1e-9,
      `accelerating ${p.accelerating} < linear ${p.linear} at hour ${p.hour}`,
    );
    assert.ok(p.accelerating >= p.cooling - 1e-9);
  }
});

test("zero cooling effectiveness makes cooling == linear", () => {
  const { points } = simulateTemperatureScenarios({
    startTempF: 90,
    rateFPerHour: 1,
    ambientTempF: 70,
    coolingEffectiveness: 0,
    accelerationFactor: 0,
    horizonHours: 12,
  });
  for (const p of points) approx(p.cooling, p.linear, 1e-9);
});

test("thresholdCrossings reports first hour reached or null", () => {
  const { points } = simulateTemperatureScenarios({
    startTempF: 90,
    rateFPerHour: 1,
    ambientTempF: 70,
    coolingEffectiveness: 0,
    accelerationFactor: 0,
    horizonHours: 48,
  });
  const crossings = thresholdCrossings(points, "linear", TEMPERATURE_THRESHOLDS);
  const at95 = crossings.find((c) => c.tempF === 95)!;
  assert.equal(at95.hour, 5); // 90 + 5 = 95
});
