/**
 * Glossary.tsx — short definitions of the key terms, as a semantic <dl>.
 */
import { useT } from "../i18n";
import { Card } from "./ui";

export function Glossary() {
  const t = useT();

  return (
    <Card>
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {t.glossary.items.map((item, i) => (
          <div key={i} className="rounded-lg border border-slate-200 p-3">
            <dt className="text-sm font-semibold text-slate-900">{item.term}</dt>
            <dd className="mt-0.5 text-xs leading-relaxed text-slate-600">{item.def}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
