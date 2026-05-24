/**
 * SummaryCards.tsx — the at-a-glance situation summary plus a plain-English
 * explanation of the core concern (heat AND polymerization, not heat alone).
 */
import { Card, Stat, WhatThisMeans } from "./ui";
import {
  INCIDENT,
  KNOWN_UNKNOWNS,
  TEMPERATURE_THRESHOLDS,
} from "../data/constants";
import { observations, latestObservation } from "../data/observations";
import { ratePerHour } from "../lib/model";

function hoursBetween(aIso: string, bIso: string): number {
  return (new Date(bIso).getTime() - new Date(aIso).getTime()) / 3_600_000;
}

export function SummaryCards() {
  const latest = latestObservation();
  const prev = observations.length >= 2 ? observations[observations.length - 2] : undefined;

  const currentTempF = latest?.tempF;
  const trend =
    latest && prev
      ? ratePerHour(prev.tempF, latest.tempF, hoursBetween(prev.timestamp, latest.timestamp))
      : undefined;

  // Tone the temperature card by the highest threshold it has reached.
  const reachedThreshold = currentTempF
    ? [...TEMPERATURE_THRESHOLDS].reverse().find((t) => currentTempF >= t.tempF)
    : undefined;
  const tempTone = reachedThreshold?.severity ?? "neutral";

  // Confidence is deliberately conservative: never above "Medium" given the
  // number of unknowns. Two or more reported readings -> Medium, else Low.
  const confidence = observations.length >= 2 ? "Medium" : "Low";

  const [volMin, volMax] = INCIDENT.reportedContentsGallonsRange;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Stat
          label="Reported internal temp"
          value={currentTempF != null ? `${currentTempF}°F` : "—"}
          sub={reachedThreshold ? `At/above: ${reachedThreshold.label}` : "Below listed thresholds"}
          tone={tempTone}
        />
        <Stat
          label="Reported trend"
          value={trend != null ? `${trend > 0 ? "+" : ""}${trend.toFixed(1)}°F/hr` : "—"}
          sub={trend != null ? "From last two reported readings" : "Need ≥2 readings"}
          tone={trend != null && trend > 0 ? "watch" : "neutral"}
        />
        <Stat
          label="Estimated MMA volume"
          value={`${volMin.toLocaleString()}–${volMax.toLocaleString()}`}
          sub="gallons (reported range)"
        />
        <Stat
          label="Known unknowns"
          value={KNOWN_UNKNOWNS.length}
          sub="critical variables not publicly known"
          tone="caution"
        />
        <Stat
          label="Model confidence"
          value={confidence}
          sub={confidence === "Medium" ? "≥2 reported readings" : "Limited inputs"}
          tone={confidence === "Medium" ? "watch" : "neutral"}
        />
      </div>

      <Card className="mt-4">
        <h3 className="text-sm font-semibold text-slate-900">In plain English</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          The tank likely contains liquid MMA plus vapor headspace. The concern is
          not only ordinary heat. MMA can polymerize into PMMA/acrylic, releasing
          heat. If that reaction outpaces cooling or blocks venting, pressure and
          rupture risk can increase.
        </p>
      </Card>

      <WhatThisMeans>
        These cards summarize <em>reported</em> figures and how they sit against
        published storage guidance. "Model confidence" reflects how complete the
        inputs are — it is capped at Medium because the most important variables
        (listed in <a className="font-medium text-brand-700 underline" href="#unknowns">Known Unknowns</a>)
        are not publicly known. None of this tells you whether any location is
        safe; only officials can.
      </WhatThisMeans>
    </div>
  );
}
