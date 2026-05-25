/**
 * ui.tsx — small, shared presentational primitives.
 * Keeps the section components focused on content rather than markup plumbing.
 */
import { useId, useState, type ReactNode } from "react";
import { useT } from "../i18n";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`card ${className}`}>{children}</div>;
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="section-anchor scroll-mt-20">
      <div className="mb-5">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
            {eyebrow}
          </p>
        )}
        <h2
          id={`${id}-heading`}
          className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          {title}
        </h2>
        {intro && (
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {intro}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

/** Calm, plain-English explainer box placed after charts/figures. */
export function WhatThisMeans({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  const t = useT();
  return (
    <div className="mt-4 rounded-xl border border-brand-100 bg-brand-50 p-4">
      <p className="flex items-center gap-2 text-sm font-semibold text-brand-900">
        <span aria-hidden="true">💡</span>
        {title ?? t.ui.whatThisMeans}
      </p>
      <div className="mt-1 text-sm leading-relaxed text-slate-700">{children}</div>
    </div>
  );
}

type BadgeTone = "neutral" | "info" | "watch" | "caution" | "warning" | "danger";

const badgeTones: Record<BadgeTone, string> = {
  neutral: "bg-slate-100 text-slate-700 ring-slate-200",
  info: "bg-sky-50 text-sky-800 ring-sky-200",
  watch: "bg-amber-50 text-amber-800 ring-amber-200",
  caution: "bg-orange-50 text-orange-800 ring-orange-200",
  warning: "bg-rose-50 text-rose-800 ring-rose-200",
  danger: "bg-red-50 text-red-800 ring-red-200",
};

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: BadgeTone;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${badgeTones[tone]}`}
    >
      {children}
    </span>
  );
}

/** Accessible inline help: a small "?" with a hover/focus tooltip. */
export function InfoTip({ label, text }: { label: string; text: string }) {
  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        aria-label={`More info: ${label}`}
        className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-600 hover:bg-slate-300"
      >
        ?
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-56 -translate-x-1/2 rounded-lg bg-slate-900 px-3 py-2 text-xs leading-snug text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {text}
      </span>
    </span>
  );
}

/** A labelled statistic for the summary cards. */
export function Stat({
  label,
  value,
  sub,
  tone = "neutral",
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  tone?: BadgeTone;
}) {
  const accent: Record<BadgeTone, string> = {
    neutral: "text-slate-900",
    info: "text-sky-700",
    watch: "text-amber-700",
    caution: "text-orange-700",
    warning: "text-rose-700",
    danger: "text-red-700",
  };
  return (
    <Card className="flex flex-col">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${accent[tone]}`}>{value}</p>
      {sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}
    </Card>
  );
}

/**
 * A collapsible panel. Collapsed by default; the header is a clear toggle
 * (chevron + Show/Hide pill). An optional `action` (e.g. a Reset button) shows
 * to the right of the header only when expanded.
 */
export function Collapsible({
  title,
  action,
  defaultOpen = false,
  children,
}: {
  title: string;
  action?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const t = useT();
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="rounded-lg border border-slate-200">
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-brand-700"
        >
          <span
            aria-hidden="true"
            className={`text-xs text-slate-400 transition-transform ${open ? "rotate-90" : ""}`}
          >
            ▶
          </span>
          {title}
          <span className="ml-1 inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
            {open ? t.ui.hide : t.ui.show}
          </span>
        </button>
        {open && action}
      </div>
      {open && (
        <div id={id} className="border-t border-slate-100 px-3 py-3">
          {children}
        </div>
      )}
    </div>
  );
}
