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
import { liveEstimate } from "../lib/model";
import { useT } from "../i18n";

export function SummaryCards() {
  const t = useT();
  const latest = latestObservation();

  const currentTempF = latest?.tempF;
  // The reported rate of rise (OCFA: ~+1°F/hr). We show the reported figure
  // rather than averaging the last two readings, because the latest reading is
  // capped at the 100°F gauge maximum, which would understate the true rate.
  const reportedRate = INCIDENT.reportedRateFPerHour;

  const reachedThreshold = currentTempF
    ? [...TEMPERATURE_THRESHOLDS].reverse().find((th) => currentTempF >= th.tempF)
    : undefined;
  const tempTone = reachedThreshold?.severity ?? "neutral";
  const reachedLabel = reachedThreshold ? t.thresholds[reachedThreshold.tempF].label : undefined;

  // Live extrapolated current temperature (recomputed per visit at ~1°F/hr).
  const estimatedTempF = Math.round(liveEstimate().currentTempF);
  const estReached = [...TEMPERATURE_THRESHOLDS]
    .reverse()
    .find((th) => estimatedTempF >= th.tempF);
  const estTone = estReached?.severity ?? "neutral";

  const isMedium = observations.length >= 2;
  const confidence = isMedium ? t.summary.medium : t.summary.low;

  const [volMin, volMax] = INCIDENT.reportedContentsGallonsRange;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stat
          label={t.summary.reportedTemp}
          value={currentTempF != null ? `${currentTempF}°F${latest?.gaugeMax ? "+" : ""}` : "—"}
          sub={reachedLabel ? t.summary.atAbove(reachedLabel) : t.summary.belowThresholds}
          tone={tempTone}
        />
        <Stat
          label={t.summary.estimatedTemp}
          value={`~${estimatedTempF}°F`}
          sub={t.summary.estimatedSub}
          tone={estTone}
        />
        <Stat
          label={t.summary.reportedTrend}
          value={`${reportedRate > 0 ? "+" : ""}${reportedRate.toFixed(1)}°F/hr`}
          sub={t.summary.reportedRateSub}
          tone={reportedRate > 0 ? "watch" : "neutral"}
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
