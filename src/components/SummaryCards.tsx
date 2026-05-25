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
import { useT } from "../i18n";

function hoursBetween(aIso: string, bIso: string): number {
  return (new Date(bIso).getTime() - new Date(aIso).getTime()) / 3_600_000;
}

export function SummaryCards() {
  const t = useT();
  const latest = latestObservation();
  const prev = observations.length >= 2 ? observations[observations.length - 2] : undefined;

  const currentTempF = latest?.tempF;
  const trend =
    latest && prev
      ? ratePerHour(prev.tempF, latest.tempF, hoursBetween(prev.timestamp, latest.timestamp))
      : undefined;

  const reachedThreshold = currentTempF
    ? [...TEMPERATURE_THRESHOLDS].reverse().find((th) => currentTempF >= th.tempF)
    : undefined;
  const tempTone = reachedThreshold?.severity ?? "neutral";
  const reachedLabel = reachedThreshold ? t.thresholds[reachedThreshold.tempF].label : undefined;

  const isMedium = observations.length >= 2;
  const confidence = isMedium ? t.summary.medium : t.summary.low;

  const [volMin, volMax] = INCIDENT.reportedContentsGallonsRange;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Stat
          label={t.summary.reportedTemp}
          value={currentTempF != null ? `${currentTempF}°F${latest?.gaugeMax ? "+" : ""}` : "—"}
          sub={reachedLabel ? t.summary.atAbove(reachedLabel) : t.summary.belowThresholds}
          tone={tempTone}
        />
        <Stat
          label={t.summary.reportedTrend}
          value={trend != null ? `${trend > 0 ? "+" : ""}${trend.toFixed(1)}°F/hr` : "—"}
          sub={trend != null ? t.summary.fromTwoReadings : t.summary.needTwo}
          tone={trend != null && trend > 0 ? "watch" : "neutral"}
        />
        <Stat
          label={t.summary.estVolume}
          value={`${volMin.toLocaleString()}–${volMax.toLocaleString()}`}
          sub={t.summary.gallonsReported}
        />
        <Stat
          label={t.summary.knownUnknowns}
          value={KNOWN_UNKNOWNS.length}
          sub={t.summary.criticalVars}
          tone="caution"
        />
        <Stat
          label={t.summary.modelConfidence}
          value={confidence}
          sub={isMedium ? t.summary.confMedium : t.summary.confLow}
          tone={isMedium ? "watch" : "neutral"}
        />
      </div>

      <Card className="mt-4">
        <h3 className="text-sm font-semibold text-slate-900">{t.summary.plainHeading}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">{t.summary.plainBody}</p>
      </Card>

      <WhatThisMeans>
        {t.summary.wtmPre}
        <a className="font-medium text-brand-700 underline" href="#unknowns">
          {t.summary.wtmLink}
        </a>
        {t.summary.wtmPost}
      </WhatThisMeans>
    </div>
  );
}
