/**
 * format.ts — display formatting helpers (dates, etc.).
 */

/** Format an ISO timestamp as a Pacific date only, e.g. "May 21, 2026".
 *  Timestamps should carry a Pacific (-07:00) offset for a correct local date. */
export function formatDateOnly(iso: string | undefined): string {
  if (!iso) return "Unknown date";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  try {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeZone: "America/Los_Angeles",
    }).format(d);
  } catch {
    return iso;
  }
}

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
