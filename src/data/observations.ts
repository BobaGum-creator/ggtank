/**
 * observations.ts
 * -----------------------------------------------------------------------------
 * HOW TO UPDATE THIS FILE (for non-developers)
 * -----------------------------------------------------------------------------
 * This file holds the timeline of REPORTED tank readings the dashboard charts.
 * You only need to edit the list below. To add a new reading, copy one block
 * (everything between a pair of { ... }, including the trailing comma) and edit
 * the values:
 *
 *   {
 *     timestamp: "2026-05-24T09:00:00-07:00",  // date & time, Pacific (-07:00)
 *     label: "Reported internal gauge temperature",
 *     tempF: 92,                                 // temperature in °F
 *     source: "AP public reporting",            // where you read it
 *     confidence: "reported",                    // see ObservationConfidence
 *   },
 *
 * Rules of thumb:
 *  - Keep entries in time order (oldest first).
 *  - timestamp format is ISO 8601 with the -07:00 Pacific Daylight offset.
 *  - Only add numbers you can attribute to a named public source.
 *  - "confidence" must be one of: "reported" | "estimated" | "official".
 *  - Save the file. The site rebuilds automatically in dev; for the live site,
 *    commit and push — the GitHub Pages workflow redeploys on its own.
 *
 * Nothing else in the codebase needs to change when you add a reading.
 */

export type ObservationConfidence = "reported" | "estimated" | "official" | "unconfirmed";

export interface Observation {
  /** ISO 8601 timestamp, Pacific time, e.g. "2026-05-23T13:00:00-07:00". */
  readonly timestamp: string;
  /** Short human-readable description of the reading. */
  readonly label: string;
  /** Reported temperature in degrees Fahrenheit. */
  readonly tempF: number;
  /** Where the figure came from (name a public source). */
  readonly source: string;
  /** How much weight to give this figure. */
  readonly confidence: ObservationConfidence;
  /** True when the gauge has maxed out, so the real value is this figure OR HIGHER
   *  (rendered with a trailing "+", e.g. "100°F+"). */
  readonly gaugeMax?: boolean;
}

export const observations: readonly Observation[] = [
  {
    timestamp: "2026-05-22T12:00:00-07:00",
    label: "Earlier reported internal temperature",
    tempF: 77,
    source: "Reuters/AP public reporting",
    confidence: "reported",
  },
  {
    timestamp: "2026-05-23T09:54:10-07:00",
    label: "Reported internal gauge temperature",
    tempF: 90,
    source: "OCFA Critical Incident Update (Chief Covey), via NBC LA",
    confidence: "official",
  },
  {
    timestamp: "2026-05-24T18:10:00-07:00",
    label: "Internal temperature 100°F+ (the gauge maxes out at 100°F)",
    tempF: 100,
    source: "ABC7 (KABC), citing OCFA",
    confidence: "reported",
    gaugeMax: true,
  },
];

/** The most recent observation, or undefined if the list is empty. */
export function latestObservation(): Observation | undefined {
  return observations.length > 0 ? observations[observations.length - 1] : undefined;
}

/** Pretty ISO timestamp of the most recent reading, for the "Last data update" line. */
export function lastDataUpdate(): string | undefined {
  return latestObservation()?.timestamp;
}
