/**
 * timeline.ts
 * -----------------------------------------------------------------------------
 * Reported incident milestones (non-temperature events). The Timeline section
 * MERGES these with the temperature readings from observations.ts and sorts
 * everything chronologically, so the page shows exactly when each reported data
 * point and event occurred.
 *
 * HOW TO ADD AN EVENT (non-developers): copy a block below and edit it.
 *  - `timestamp`: ISO 8601 with the Pacific (-07:00) offset. If you only know
 *     the day, use noon ("T12:00:00-07:00") and set `timeKnown: false` so the
 *     page shows just the date.
 *  - `sourceId`: must match an `id` in sources.ts (or omit it).
 *  - `kind`: "incident" | "official" | "report".
 */

export type TimelineKind = "incident" | "official" | "report";

export interface TimelineEvent {
  /** ISO 8601 timestamp, Pacific. Use noon for date-only events. */
  readonly timestamp: string;
  /** False when only the calendar date is known (shows date without a time). */
  readonly timeKnown: boolean;
  readonly title: string;
  readonly detail?: string;
  /** id of a record in sources.ts, when applicable. */
  readonly sourceId?: string;
  readonly kind: TimelineKind;
}

export const timelineEvents: readonly TimelineEvent[] = [
  {
    timestamp: "2026-05-21T12:00:00-07:00",
    timeKnown: false,
    title: "Incident reported to begin",
    detail:
      "Concern reported at the GKN Aerospace facility in Garden Grove over a 34,000-gallon storage tank holding methyl methacrylate (MMA).",
    sourceId: "ap",
    kind: "incident",
  },
  {
    timestamp: "2026-05-23T12:00:00-07:00",
    timeKnown: false,
    title: "Reuters reports temperature rise and cooling efforts",
    detail:
      "Firefighters cooling the tank externally with water; experts exploring stabilization/neutralization; broken/gummed-up valves reported to limit chemical removal and pressure relief.",
    sourceId: "reuters",
    kind: "report",
  },
  {
    timestamp: "2026-05-23T12:00:00-07:00",
    timeKnown: false,
    title: "California Governor proclaims a State of Emergency",
    detail: "State-level emergency declared in response to the incident.",
    sourceId: "ca-emergency",
    kind: "official",
  },
  {
    timestamp: "2026-05-24T12:00:00-07:00",
    timeKnown: false,
    title: "Associated Press report on the crisis",
    detail:
      "Coverage of response actions and evacuation context; air monitoring reportedly had not detected offsite pollution at the time, but residents were told to follow evacuation orders.",
    sourceId: "ap",
    kind: "report",
  },
];
