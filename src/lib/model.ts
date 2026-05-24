/**
 * model.ts
 * -----------------------------------------------------------------------------
 * The scientific core. Every function here is pure and uncertainty-aware.
 *
 * READ THIS FIRST: nothing in this file is a prediction of what the tank will
 * do. These are transparent "what-if" calculations built from published
 * constants and user-chosen assumptions. The composition routine in particular
 * estimates an ENERGY-EQUIVALENT fraction, not the actual contents of the tank.
 */

import {
  MMA_HEAT_OF_POLYMERIZATION_J_PER_MOL,
  MMA_MOLAR_MASS_KG_PER_MOL,
  SCENARIO_DEFAULTS,
  VAPOR_PRESSURE_TABLE,
  type TemperatureThreshold,
} from "../data/constants";
import {
  clamp,
  fahrenheitDeltaToKelvin,
  gallonsToLiters,
} from "./units";

// Re-export the conversion primitives so callers can treat model.ts as the
// single import surface for "the science layer".
export {
  fahrenheitToCelsius,
  fahrenheitDeltaToKelvin,
  gallonsToLiters,
  pressureForcePounds,
} from "./units";

// -----------------------------------------------------------------------------
// Mass / mole / energy primitives
// -----------------------------------------------------------------------------

/** Liquid volume (US gallons) -> mass (kg), given a density in kg/L. */
export function volumeToMassKg(gallons: number, densityKgPerL: number): number {
  return gallonsToLiters(gallons) * densityKgPerL;
}

/** Mass of MMA (kg) -> moles of MMA. */
export function massToMolesMMA(massKg: number): number {
  return massKg / MMA_MOLAR_MASS_KG_PER_MOL;
}

/** Total heat (J) that would be released if the given moles fully polymerized. */
export function totalPolymerizationEnergy(molesMMA: number): number {
  return molesMMA * MMA_HEAT_OF_POLYMERIZATION_J_PER_MOL;
}

/**
 * Sensible heat (J) needed to raise `massKg` of liquid by a temperature
 * interval `deltaK`, given heat capacity in kJ/(kg·K).
 */
export function sensibleHeat(
  massKg: number,
  cpKjPerKgK: number,
  deltaK: number,
): number {
  return massKg * (cpKjPerKgK * 1000) * deltaK;
}

/**
 * Energy-equivalent conversion fraction.
 *
 * Of all the polymerization energy theoretically available, what fraction would
 * account for the measured temperature rise IF the rise were caused purely by
 * polymerization and IF no heat were removed?
 *
 * Mathematically the bulk mass and density CANCEL, so this fraction depends only
 * on heat capacity, the temperature rise, and the heat of polymerization — it is
 * the same for 5,000 or 7,000 gallons. Volume changes the absolute Joules, not
 * this percentage. The returned value can exceed 1 (flagged by callers as an
 * inconsistent-assumptions warning).
 */
export function energyEquivalentConversionFraction(params: {
  cpKjPerKgK: number;
  initialTempF: number;
  currentTempF: number;
  coolingRemovalMultiplier?: number;
}): number {
  const { cpKjPerKgK, initialTempF, currentTempF } = params;
  const coolingRemovalMultiplier = params.coolingRemovalMultiplier ?? 1;
  const deltaK = fahrenheitDeltaToKelvin(currentTempF - initialTempF);

  // Per-kilogram form (mass cancels): sensible heat per kg over the available
  // polymerization energy per kg.
  const sensiblePerKgJ = (cpKjPerKgK * 1000) * deltaK;
  const molesPerKg = 1 / MMA_MOLAR_MASS_KG_PER_MOL;
  const polyEnergyPerKgJ = molesPerKg * MMA_HEAT_OF_POLYMERIZATION_J_PER_MOL;

  const adiabaticFraction = sensiblePerKgJ / polyEnergyPerKgJ;
  return adiabaticFraction * coolingRemovalMultiplier;
}

// -----------------------------------------------------------------------------
// Composition / energy estimate (per volume)
// -----------------------------------------------------------------------------

export interface CompositionInput {
  gallons: number;
  densityKgPerL: number;
  cpKjPerKgK: number;
  initialTempF: number;
  currentTempF: number;
  coolingRemovalMultiplier: number;
}

export interface CompositionResult {
  gallons: number;
  massKg: number;
  molesMMA: number;
  totalPolymerizationEnergyJ: number;
  sensibleHeatJ: number;
  /** Adiabatic (no-heat-removed) energy-equivalent fraction, 0..(can exceed 1). */
  adiabaticConversionFraction: number;
  /** Adiabatic fraction scaled by the cooling-removal multiplier. */
  coolingAdjustedFraction: number;
  /** coolingAdjustedFraction clamped to [0,1] for display. */
  displayFraction: number;
  /** True when the raw fraction exceeds 1 — i.e. assumptions are inconsistent. */
  exceedsOneHundredPercent: boolean;
}

export function estimateComposition(input: CompositionInput): CompositionResult {
  const massKg = volumeToMassKg(input.gallons, input.densityKgPerL);
  const molesMMA = massToMolesMMA(massKg);
  const totalPolymerizationEnergyJ = totalPolymerizationEnergy(molesMMA);
  const deltaK = fahrenheitDeltaToKelvin(input.currentTempF - input.initialTempF);
  const sensibleHeatJ = sensibleHeat(massKg, input.cpKjPerKgK, deltaK);

  const adiabaticConversionFraction =
    totalPolymerizationEnergyJ > 0
      ? sensibleHeatJ / totalPolymerizationEnergyJ
      : 0;
  const coolingAdjustedFraction =
    adiabaticConversionFraction * input.coolingRemovalMultiplier;
  const displayFraction = clamp(coolingAdjustedFraction, 0, 1);

  return {
    gallons: input.gallons,
    massKg,
    molesMMA,
    totalPolymerizationEnergyJ,
    sensibleHeatJ,
    adiabaticConversionFraction,
    coolingAdjustedFraction,
    displayFraction,
    exceedsOneHundredPercent: coolingAdjustedFraction > 1,
  };
}

// -----------------------------------------------------------------------------
// Vapor pressure (equilibrium — NOT total tank pressure)
// -----------------------------------------------------------------------------

/**
 * Linearly interpolate the NOAA CHRIS equilibrium vapor-pressure table.
 * Below/above the tabulated range the nearest endpoint is returned (clamped).
 */
export function interpolateVaporPressurePsi(tempF: number): number {
  const table = VAPOR_PRESSURE_TABLE;
  const first = table[0];
  const last = table[table.length - 1];
  if (tempF <= first.tempF) return first.psi;
  if (tempF >= last.tempF) return last.psi;

  for (let i = 0; i < table.length - 1; i++) {
    const a = table[i];
    const b = table[i + 1];
    if (tempF >= a.tempF && tempF <= b.tempF) {
      const t = (tempF - a.tempF) / (b.tempF - a.tempF);
      return a.psi + t * (b.psi - a.psi);
    }
  }
  return last.psi; // unreachable, satisfies the type checker
}

// -----------------------------------------------------------------------------
// Temperature scenarios
// -----------------------------------------------------------------------------

export interface ScenarioParams {
  startTempF: number;
  /** Observed rate of rise, °F/hour. */
  rateFPerHour: number;
  ambientTempF: number;
  /** Cooling effectiveness, normalized 0..1 (slider 0–100 ÷ 100). */
  coolingEffectiveness: number;
  /** Acceleration factor, per hour (0–0.2). */
  accelerationFactor: number;
  horizonHours: number;
}

export interface ScenarioPoint {
  hour: number;
  /** T = T0 + r·t */
  linear: number;
  /** Cooling damps the rising rate over time. */
  cooling: number;
  /** Illustrative runaway-like curve. NOT a prediction. */
  accelerating: number;
}

export interface ScenarioResult {
  points: ScenarioPoint[];
}

/**
 * Build the three scenario curves over the horizon.
 *
 *  1. Linear:      T(t) = T0 + r·t
 *  2. Cooling:     effectiveRate(t) = r·exp(−c·t/12); T(t) is its time integral.
 *  3. Accelerating (illustrative): Euler-integrated
 *        dT/dt = r·exp(a·t) − k·(T − ambient)
 *     where k scales with cooling effectiveness. Capped at a ceiling because the
 *     lumped model is meaningless past MMA's boiling point.
 */
export function simulateTemperatureScenarios(
  params: ScenarioParams,
): ScenarioResult {
  const {
    startTempF,
    rateFPerHour,
    ambientTempF,
    coolingEffectiveness,
    accelerationFactor,
    horizonHours,
  } = params;

  const step = SCENARIO_DEFAULTS.stepHours;
  const ceiling = SCENARIO_DEFAULTS.acceleratingCeilingF;
  const lossCoeff =
    coolingEffectiveness * SCENARIO_DEFAULTS.coolingLossCoeffPerEffectiveness;
  // Decay constant for the cooling-controlled rate: exp(−c·t/12).
  const coolingDecay = coolingEffectiveness / 12;

  const points: ScenarioPoint[] = [];
  let accelT = startTempF;
  let t = 0;

  // Closed-form helper for the cooling-controlled integral.
  const coolingTemp = (time: number): number => {
    if (coolingDecay <= 0) return startTempF + rateFPerHour * time;
    return (
      startTempF +
      (rateFPerHour / coolingDecay) * (1 - Math.exp(-coolingDecay * time))
    );
  };

  // March the accelerating Euler integration and sample at whole-hour marks.
  const totalSteps = Math.round(horizonHours / step);
  for (let i = 0; i <= totalSteps; i++) {
    t = i * step;
    if (i > 0) {
      const rate =
        rateFPerHour * Math.exp(accelerationFactor * t) -
        lossCoeff * (accelT - ambientTempF);
      accelT = clamp(accelT + rate * step, ambientTempF, ceiling);
    }
    // Record only on whole-hour boundaries to keep the dataset chart-friendly.
    const isWholeHour = Math.abs(t - Math.round(t)) < 1e-9;
    if (isWholeHour) {
      const hour = Math.round(t);
      points.push({
        hour,
        linear: startTempF + rateFPerHour * hour,
        cooling: coolingTemp(hour),
        accelerating: accelT,
      });
    }
  }

  return { points };
}

export type ScenarioKey = "linear" | "cooling" | "accelerating";

export interface ThresholdCrossing {
  tempF: number;
  label: string;
  /** First whole hour at which the scenario reaches the threshold, or null. */
  hour: number | null;
}

/**
 * For one scenario curve, the first hour each threshold is reached within the
 * simulated horizon. This is scenario ARITHMETIC, not a predicted failure time.
 */
export function thresholdCrossings(
  points: readonly ScenarioPoint[],
  key: ScenarioKey,
  thresholds: readonly TemperatureThreshold[],
): ThresholdCrossing[] {
  return thresholds.map((th) => {
    const hit = points.find((p) => p[key] >= th.tempF);
    return {
      tempF: th.tempF,
      label: th.label,
      hour: hit ? hit.hour : null,
    };
  });
}

/** Auto-calculated rate of rise between two readings, °F/hour. */
export function ratePerHour(
  previousTempF: number,
  currentTempF: number,
  hoursBetween: number,
): number {
  if (hoursBetween <= 0) return 0;
  return (currentTempF - previousTempF) / hoursBetween;
}
