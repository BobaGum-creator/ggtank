/**
 * shareUrl.ts — helpers for shareable deep links and the URL watermark.
 *
 * A shared link is itself the "link back to the site": it carries the canonical
 * URL plus (optionally) an encoded temperature scenario and the chosen language,
 * so a recipient opens the exact same view.
 */

/** Full site base, e.g. "https://host/ggtank/". Derived at runtime so forks work. */
export function siteBaseUrl(): string {
  const base = import.meta.env.BASE_URL || "/";
  return `${window.location.origin}${base}`;
}

/** Human-friendly URL for the on-page watermark, e.g. "host/ggtank". */
export function siteDisplayUrl(): string {
  const base = import.meta.env.BASE_URL || "/";
  return `${window.location.host}${base}`.replace(/\/+$/, "");
}

export interface ScenarioShareState {
  start: number;
  prev: number;
  hrs: number;
  amb: number;
  cool: number;
  acc: number;
  hz: number;
  /** Manual rate override; null means "use the auto-calculated rate". */
  rate: number | null;
}

const NUMERIC_KEYS: (keyof Omit<ScenarioShareState, "rate">)[] = [
  "start",
  "prev",
  "hrs",
  "amb",
  "cool",
  "acc",
  "hz",
];

/** Build a deep link to the temperature scenario for the given state + language. */
export function buildScenarioUrl(s: ScenarioShareState, lang: string): string {
  const p = new URLSearchParams();
  for (const k of NUMERIC_KEYS) p.set(k, String(s[k]));
  if (s.rate != null) p.set("rate", String(s.rate));
  p.set("lang", lang);
  return `${siteBaseUrl()}?${p.toString()}#temperature`;
}

/** Read any scenario params present in a query string. Missing keys are omitted. */
export function parseScenarioParams(search: string): Partial<ScenarioShareState> {
  const p = new URLSearchParams(search);
  const num = (key: string): number | undefined => {
    const raw = p.get(key);
    if (raw == null) return undefined;
    const n = Number(raw);
    return Number.isFinite(n) ? n : undefined;
  };
  const out: Partial<ScenarioShareState> = {};
  for (const k of NUMERIC_KEYS) {
    const v = num(k);
    if (v !== undefined) out[k] = v;
  }
  const rate = num("rate");
  if (rate !== undefined) out.rate = rate;
  return out;
}

/** Read the `lang` query param, if present and valid-looking. */
export function langFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("lang");
}
