/**
 * constants.ts
 * -----------------------------------------------------------------------------
 * Single source of truth for every scientific constant, conversion factor, and
 * published reference value used in the dashboard. No component should hard-code
 * a "magic number" — import it from here so that every assumption is auditable
 * in one place and easy to correct if better public data becomes available.
 *
 * IMPORTANT FRAMING: These are published reference values and reasonable
 * defaults. They are NOT measurements of this specific tank. Treat every number
 * as an assumption that carries uncertainty.
 */

/** A scientific constant with provenance, so the UI can explain where it came from. */
export interface ScientificConstant {
  readonly value: number;
  readonly unit: string;
  readonly label: string;
  readonly note: string;
  /** id of a source record in sources.ts, when applicable. */
  readonly sourceId?: string;
}

// -----------------------------------------------------------------------------
// Unit conversion factors
// -----------------------------------------------------------------------------

/** US liquid gallons -> liters. */
export const LITERS_PER_GALLON = 3.78541;

/** Pounds-force per square inch acting over one square foot -> pounds-force.
 *  1 ft^2 = 144 in^2, so force(lbf) = psi * area(ft^2) * 144. */
export const SQ_INCHES_PER_SQ_FOOT = 144;

/** Fahrenheit-degree interval -> Kelvin/Celsius-degree interval. */
export const F_DELTA_TO_K = 5 / 9;

// -----------------------------------------------------------------------------
// MMA (methyl methacrylate) physical properties
// -----------------------------------------------------------------------------

export const MMA_CAS = "80-62-6";

/** Molar mass of MMA (C5H8O2). g/mol. */
export const MMA_MOLAR_MASS_G_PER_MOL = 100.12;
/** Molar mass expressed in kg/mol for energy math. */
export const MMA_MOLAR_MASS_KG_PER_MOL = MMA_MOLAR_MASS_G_PER_MOL / 1000;

/** Default liquid density. User-adjustable across the listed range. kg/L. */
export const MMA_DENSITY_KG_PER_L: ScientificConstant = {
  value: 0.94,
  unit: "kg/L",
  label: "MMA liquid density",
  note: "Approximate near-ambient liquid density. Real value drifts with temperature.",
  sourceId: "noaa-chris",
};
export const MMA_DENSITY_MIN_KG_PER_L = 0.92;
export const MMA_DENSITY_MAX_KG_PER_L = 0.96;

/** Default liquid specific heat capacity. kJ/(kg*K).
 *  Derived from NIST ~191 J/(mol*K) at ~298 K: 191 / 100.12 g/mol ≈ 1.908 kJ/kg-K. */
export const MMA_CP_KJ_PER_KG_K: ScientificConstant = {
  value: 1.91,
  unit: "kJ/(kg·K)",
  label: "MMA liquid heat capacity",
  note: "From NIST ~191 J/(mol·K) at ~298 K. NOAA CHRIS lists ~0.454 Btu/(lb·°F) at 90°F (~1.90 kJ/kg·K), a close cross-check.",
  sourceId: "nist-webbook",
};

/** NOAA CHRIS cross-check value for heat capacity at 90°F. Btu/(lb·°F). */
export const MMA_CP_BTU_PER_LB_F_AT_90F = 0.454;

/** Heat released when one mole of MMA polymerizes to PMMA. kJ/mol (exothermic). */
export const MMA_HEAT_OF_POLYMERIZATION_KJ_PER_MOL: ScientificConstant = {
  value: 57.8,
  unit: "kJ/mol",
  label: "Heat of polymerization (MMA → PMMA)",
  note: "Literature value ~57.8 kJ/mol. Used only for energy-equivalence estimates.",
  sourceId: "heat-of-poly",
};
/** Same value in Joules per mole for raw energy math. */
export const MMA_HEAT_OF_POLYMERIZATION_J_PER_MOL =
  MMA_HEAT_OF_POLYMERIZATION_KJ_PER_MOL.value * 1000;

export const MMA_BOILING_POINT_C_RANGE: readonly [number, number] = [100, 101];
export const MMA_BOILING_POINT_F_RANGE: readonly [number, number] = [212, 214];
export const MMA_FLASH_POINT_C_RANGE: readonly [number, number] = [10, 13];
export const MMA_FLASH_POINT_F_RANGE: readonly [number, number] = [50, 55];

// -----------------------------------------------------------------------------
// Reported incident facts (public reporting — treat as reported, not verified)
// -----------------------------------------------------------------------------

export const INCIDENT = {
  facility: "GKN Aerospace facility",
  city: "Garden Grove, California",
  chemical: "Methyl methacrylate (MMA)",
  cas: MMA_CAS,
  tankCapacityGallons: 34000,
  reportedContentsGallonsRange: [5000, 7000] as const,
  startDate: "2026-05-21",
  reportedRateFPerHour: 1,
} as const;

// -----------------------------------------------------------------------------
// Composition / energy estimator default volume assumptions (US gallons)
// -----------------------------------------------------------------------------

export const VOLUME_DEFAULTS_GALLONS = {
  min: 5000,
  likelyLow: 6000,
  likelyHigh: 7000,
  max: 7000,
  /** Single representative midpoint used for headline numbers. */
  mid: 6000,
} as const;

// -----------------------------------------------------------------------------
// Temperature reference thresholds (°F) with published context.
// These drive the colored bands in the temperature chart. Ordered low -> high.
// -----------------------------------------------------------------------------

export interface TemperatureThreshold {
  readonly tempF: number;
  readonly label: string;
  readonly detail: string;
  readonly severity: "info" | "watch" | "caution" | "warning" | "danger";
  readonly sourceId?: string;
}

/** Hex colors per severity, used for chart strokes and threshold labels. */
export const SEVERITY_COLORS: Record<TemperatureThreshold["severity"], string> = {
  info: "#0284c7", // sky-600
  watch: "#d97706", // amber-600
  caution: "#ea580c", // orange-600
  warning: "#e11d48", // rose-600
  danger: "#dc2626", // red-600
};

export const TEMPERATURE_THRESHOLDS: readonly TemperatureThreshold[] = [
  {
    tempF: 86,
    label: "Preferred storage target",
    detail: "Below ~30°C / 86°F is a preferred storage target where practical.",
    severity: "info",
    sourceId: "cefic-handling",
  },
  {
    tempF: 95,
    label: "BASF storage stability",
    detail: "BASF SDS lists storage stability below 35°C / 95°F.",
    severity: "watch",
    sourceId: "basf-sds",
  },
  {
    tempF: 104,
    label: "Inhibitor-protection ceiling",
    detail: "Methacrylate-ester handling guidance: keep below 40°C / 104°F to help prevent stabilizer loss.",
    severity: "caution",
    sourceId: "cefic-handling",
  },
  {
    tempF: 113,
    label: "Restabilization threshold",
    detail: "BASF SDS: at 45°C / 113°F in a bulk tank, a restabilization system should be used.",
    severity: "warning",
    sourceId: "basf-sds",
  },
  {
    tempF: 140,
    label: "Major emergency threshold",
    detail: "BASF SDS: at 60°C / 140°F in a fire-vicinity context, greater-area evacuation is recommended.",
    severity: "danger",
    sourceId: "basf-sds",
  },
];

// -----------------------------------------------------------------------------
// NOAA CHRIS equilibrium vapor pressure table.
// IMPORTANT: equilibrium vapor pressure of the liquid — NOT total tank pressure.
// -----------------------------------------------------------------------------

export interface VaporPressurePoint {
  readonly tempF: number;
  readonly psi: number;
}

export const VAPOR_PRESSURE_TABLE: readonly VaporPressurePoint[] = [
  { tempF: 70, psi: 0.635 },
  { tempF: 80, psi: 0.843 },
  { tempF: 90, psi: 1.103 },
  { tempF: 100, psi: 1.428 },
  { tempF: 110, psi: 1.828 },
  { tempF: 120, psi: 2.316 },
  { tempF: 130, psi: 2.906 },
  { tempF: 140, psi: 3.613 },
];

// -----------------------------------------------------------------------------
// Temperature-scenario model defaults
// -----------------------------------------------------------------------------

export const SCENARIO_DEFAULTS = {
  // ESTIMATED current temperature, extrapolated from the last reported 90°F at
  // ~1°F/hr. The gauge maxes out at 100°F, so this is not a direct measurement.
  startTempF: 123,
  previousTempF: 90,
  // 90°F (reported, May 23) -> ~123°F (estimated, ~7 PM May 24) is ~33 hours at
  // ~1°F/hr, so the auto-rate resolves to 1°F/hr.
  hoursBetweenReadings: 33,
  ambientTempF: 70,
  /** 0–100 slider. Higher = cooling damps the rising rate faster. */
  coolingEffectiveness: 40,
  /** 0–0.2 per hour. Drives the illustrative accelerating scenario only. */
  accelerationFactor: 0.05,
  horizonOptionsHours: [6, 12, 24, 48] as const,
  defaultHorizonHours: 24,
  /** Euler integration step for the scenario simulation. Hours. */
  stepHours: 0.25,
  /** Per-unit-of-cooling-effectiveness Newtonian loss coefficient (1/hr) used
   *  ONLY in the illustrative accelerating scenario. Purely illustrative. */
  coolingLossCoeffPerEffectiveness: 0.05,
  /** The accelerating scenario is capped here because past MMA's boiling point
   *  (~212–214°F) the simple lumped model stops being physically meaningful. °F. */
  acceleratingCeilingF: 300,
} as const;

// -----------------------------------------------------------------------------
// Composition / energy estimator defaults
// -----------------------------------------------------------------------------

export const COMPOSITION_DEFAULTS = {
  initialTempF: 77,
  // Estimated current temperature (~123°F, extrapolated at ~1°F/hr; gauge maxes at 100°F).
  currentTempF: 123,
  /** 1x = purely adiabatic (no heat removed). Higher = more unmeasured heat
   *  assumed removed by cooling before it showed up as a temperature rise. */
  coolingRemovalMultiplier: 1,
  coolingRemovalMultiplierMax: 20,
  /** A small CONCEPTUAL vapor/headspace slice for the composition bar. The
   *  headspace volume is large, but vapor MASS is tiny — this is illustrative. */
  conceptualVaporFraction: 0.005,
} as const;

// -----------------------------------------------------------------------------
// Known unknowns — the variables that would be needed for any real assessment
// but are not publicly known. Drives both the summary count and the checklist.
// -----------------------------------------------------------------------------

export interface KnownUnknown {
  readonly item: string;
  readonly why: string;
}

export const KNOWN_UNKNOWNS: readonly KnownUnknown[] = [
  { item: "Actual tank pressure", why: "Vapor pressure is not tank pressure; the real value depends on venting, gas generation, and structure." },
  { item: "Tank design pressure (atmospheric vs. low-pressure rating)", why: "Sets how much internal pressure the vessel can hold before failure." },
  { item: "Relief-valve condition", why: "Reported as broken/gummed up, which limits pressure relief." },
  { item: "Whether vents are blocked by polymer", why: "Polymer/gel can plug vents and trap pressure." },
  { item: "Inhibitor (stabilizer) concentration", why: "Inhibitor suppresses polymerization; if depleted, reaction risk rises." },
  { item: "Dissolved / headspace oxygen", why: "Oxygen interacts with inhibitor chemistry and reactivity." },
  { item: "Contamination or initiators present", why: "Peroxides, rust, or other initiators can start polymerization." },
  { item: "Actual internal temperature gradients", why: "A single gauge cannot show hot spots inside the bulk liquid." },
  { item: "Polymer / gel fraction", why: "How much has already reacted changes heat and flow behavior." },
  { item: "Cooling water flow rate and heat removal", why: "Determines how much heat is being carried away versus retained." },
  { item: "Tank wall deformation / bulging", why: "Bulging indicates stress and changes failure behavior." },
  { item: "Leak / crack status", why: "Existing leaks change pressure, release, and fire risk." },
  { item: "Nearby tank contents and status", why: "Adjacent hazards can compound or change the scenario." },
  { item: "Wind and real-time air monitoring", why: "Controls where vapor goes and whether anything is offsite now." },
];

// -----------------------------------------------------------------------------
// Exposure limits — EDUCATIONAL ONLY. Occupational limits for healthy adult
// workers; NOT residential safety-clearance levels. ppm.
// -----------------------------------------------------------------------------

export interface ExposureLimit {
  readonly label: string;
  readonly valuePpm: number;
  readonly averaging: string;
  readonly note: string;
  readonly sourceId?: string;
}

export const EXPOSURE_LIMITS: readonly ExposureLimit[] = [
  {
    label: "NIOSH REL (TWA)",
    valuePpm: 100,
    averaging: "up to 10-hr workday",
    note: "Occupational recommended exposure limit for healthy adult workers.",
    sourceId: "niosh-pocket",
  },
  {
    label: "OSHA PEL (TWA)",
    valuePpm: 100,
    averaging: "8-hr workday",
    note: "Occupational permissible exposure limit for healthy adult workers.",
    sourceId: "niosh-pocket",
  },
];
