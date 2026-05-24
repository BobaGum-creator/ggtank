/**
 * units.ts
 * -----------------------------------------------------------------------------
 * Pure, dependency-free unit-conversion utilities. Every function is a plain
 * input -> output transform with no side effects, so they are trivially
 * testable (see units.test.ts) and safe to reuse anywhere.
 */

import {
  F_DELTA_TO_K,
  LITERS_PER_GALLON,
  SQ_INCHES_PER_SQ_FOOT,
} from "../data/constants";

/** Absolute temperature: °F -> °C. */
export function fahrenheitToCelsius(f: number): number {
  return (f - 32) * F_DELTA_TO_K;
}

/** Absolute temperature: °C -> °F. */
export function celsiusToFahrenheit(c: number): number {
  return c * (9 / 5) + 32;
}

/**
 * Temperature DIFFERENCE (interval): a span in °F -> the same span in K (or °C).
 * Note this is an interval, so the 32° offset is intentionally NOT applied.
 */
export function fahrenheitDeltaToKelvin(deltaF: number): number {
  return deltaF * F_DELTA_TO_K;
}

/** US liquid gallons -> liters. */
export function gallonsToLiters(gallons: number): number {
  return gallons * LITERS_PER_GALLON;
}

/** Force from pressure over an area: psi * ft² * 144 -> pounds-force. */
export function pressureForcePounds(psi: number, areaFt2: number): number {
  return psi * areaFt2 * SQ_INCHES_PER_SQ_FOOT;
}

/** Clamp a number into [min, max]. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Round to a fixed number of decimals (returns a number, not a string). */
export function round(value: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/** Format a possibly-large energy in Joules into a human-friendly J/kJ/MJ/GJ string. */
export function formatEnergy(joules: number): string {
  const abs = Math.abs(joules);
  if (abs >= 1e9) return `${round(joules / 1e9, 2)} GJ`;
  if (abs >= 1e6) return `${round(joules / 1e6, 2)} MJ`;
  if (abs >= 1e3) return `${round(joules / 1e3, 2)} kJ`;
  return `${round(joules, 1)} J`;
}

/** Format a 0..1 fraction as a percent string, e.g. 0.0239 -> "2.4%". */
export function formatPercent(fraction: number, decimals = 1): string {
  return `${round(fraction * 100, decimals)}%`;
}
