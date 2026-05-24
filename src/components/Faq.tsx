/**
 * Faq.tsx — frequently asked questions as native, accessible disclosure widgets.
 * Uses <details>/<summary> so it works without JavaScript and is keyboard-friendly.
 */
import { useT } from "../i18n";
import { Card } from "./ui";

export function Faq() {
  const t = useT();

  return (
    <Card>
      <div className="divide-y divide-slate-100">
        {t.faq.items.map((item, i) => (
          <details key={i} className="group py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-3 text-sm font-medium text-slate-900 marker:content-none">
              <span>{item.q}</span>
              <span
                aria-hidden="true"
                className="flex-none text-slate-400 transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="pb-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
          </details>
        ))}
      </div>
    </Card>
  );
}
