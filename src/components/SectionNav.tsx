/**
 * SectionNav.tsx — the sticky in-page navigation with scroll-spy.
 *
 * As the page scrolls, an IntersectionObserver tracks which section is in view
 * and marks its nav link active; the nav also auto-scrolls horizontally to keep
 * the active link centered (the bar has more items than fit on a phone).
 */
import { useEffect, useRef, useState } from "react";
import { useT } from "../i18n";

/** Section ids in page order; each matches a key in `t.nav`. */
const SECTION_IDS = [
  "temperature",
  "summary",
  "timeline",
  "composition",
  "pressure",
  "plume",
  "unknowns",
  "faq",
  "glossary",
  "sources",
  "evacuation",
] as const;

export function SectionNav() {
  const t = useT();
  const items = SECTION_IDS.map((id) => ({ id, label: t.nav[id] }));

  const [activeId, setActiveId] = useState<string>(SECTION_IDS[0]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Track the section currently sitting just under the sticky nav line.
  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const line = 96; // px from the top, clearing the sticky bar
      let current: string = SECTION_IDS[0];
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - line <= 0) current = id;
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Keep the active link centered within the horizontally-scrolling nav.
  useEffect(() => {
    const container = scrollRef.current;
    const link = linkRefs.current[activeId];
    if (!container || !link) return;
    const cRect = container.getBoundingClientRect();
    const lRect = link.getBoundingClientRect();
    const delta = lRect.left + lRect.width / 2 - (cRect.left + cRect.width / 2);
    if (Math.abs(delta) < 1) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    container.scrollBy({ left: delta, behavior: reduce ? "auto" : "smooth" });
  }, [activeId]);

  return (
    <nav
      aria-label={t.ui.sectionNav}
      className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur"
    >
      <div ref={scrollRef} className="mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6">
        <ul className="flex gap-1 py-2 text-sm">
          {items.map((n) => {
            const active = n.id === activeId;
            return (
              <li key={n.id}>
                <a
                  ref={(el) => {
                    linkRefs.current[n.id] = el;
                  }}
                  href={`#${n.id}`}
                  aria-current={active ? "true" : undefined}
                  className={`inline-block whitespace-nowrap rounded-md px-3 py-1 font-medium transition-colors ${
                    active
                      ? "bg-brand-600 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-brand-700"
                  }`}
                >
                  {n.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
