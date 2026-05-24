/**
 * AssumptionControl.tsx
 * A labelled, accessible control that keeps a range slider and a numeric input
 * in sync. Used everywhere the user adjusts a model assumption, so the UI makes
 * it obvious that every number is an editable assumption, not a fixed fact.
 */
import { useId } from "react";
import { InfoTip } from "./ui";

export interface AssumptionControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  help?: string;
  /** Hide the slider and show only a number input (for free-form values). */
  numberOnly?: boolean;
  onChange: (value: number) => void;
}

export function AssumptionControl({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  help,
  numberOnly = false,
  onChange,
}: AssumptionControlProps) {
  const id = useId();

  const handle = (raw: string) => {
    const n = Number(raw);
    if (Number.isFinite(n)) onChange(n);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
          {help && (
            <span className="ml-1 align-middle">
              <InfoTip label={label} text={help} />
            </span>
          )}
        </label>
        <div className="flex items-center gap-1">
          <input
            id={`${id}-num`}
            type="number"
            inputMode="decimal"
            value={Number.isFinite(value) ? value : ""}
            min={min}
            max={max}
            step={step}
            onChange={(e) => handle(e.target.value)}
            aria-label={`${label} value`}
            className="w-24 rounded-md border border-slate-300 px-2 py-1 text-right text-sm tabular-nums focus:border-brand-600"
          />
          {unit && <span className="text-xs text-slate-500">{unit}</span>}
        </div>
      </div>
      {!numberOnly && (
        <input
          id={id}
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => handle(e.target.value)}
          aria-label={label}
          className="mt-2 w-full accent-brand-600"
        />
      )}
    </div>
  );
}
