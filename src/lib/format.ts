/**
 * format.ts — display formatting helpers (dates, etc.).
 */

/** Format an ISO timestamp as a readable Pacific-time string, e.g.
 *  "May 23, 2026, 1:00 PM PDT". Falls back to the raw string on parse failure. */
export function formatTimestamp(iso: string | undefined): string {
  if (!iso) return "No observations recorded";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  try {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "America/Los_Angeles",
    }).format(d);
  } catch {
    return d.toISOString();
  }
}
