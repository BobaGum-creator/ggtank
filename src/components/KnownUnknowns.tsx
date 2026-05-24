/**
 * KnownUnknowns.tsx — the variables that would be needed for any real
 * assessment but are not publicly known. The honest core of the dashboard.
 */
import { KNOWN_UNKNOWNS } from "../data/constants";
import { useT } from "../i18n";
import { Card, WhatThisMeans } from "./ui";

export function KnownUnknowns() {
  const t = useT();

  return (
    <Card>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {KNOWN_UNKNOWNS.map((u) => {
          const tr = t.unknowns.items[u.item];
          return (
            <li key={u.item} className="flex items-start gap-3 rounded-lg border border-slate-200 p-3">
              <span aria-hidden="true" className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded border border-slate-300 text-slate-400">
                ?
              </span>
              <span>
                <span className="text-sm font-medium text-slate-900">{tr?.item ?? u.item}</span>
                <span className="mt-0.5 block text-xs text-slate-600">{tr?.why ?? u.why}</span>
              </span>
            </li>
          );
        })}
      </ul>

      <WhatThisMeans>{t.unknowns.wtm}</WhatThisMeans>
    </Card>
  );
}
