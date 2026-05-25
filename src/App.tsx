import { EmergencyBanner } from "./components/EmergencyBanner";
import { SummaryCards } from "./components/SummaryCards";
import { Timeline } from "./components/Timeline";
import { TemperatureScenarioChart } from "./components/TemperatureScenarioChart";
import { CompositionEstimator } from "./components/CompositionEstimator";
import { VaporPressureChart } from "./components/VaporPressureChart";
import { PlumeExplainer } from "./components/PlumeExplainer";
import { KnownUnknowns } from "./components/KnownUnknowns";
import { Faq } from "./components/Faq";
import { Glossary } from "./components/Glossary";
import { SourcesPanel } from "./components/SourcesPanel";
import { Section } from "./components/ui";
import { ShareButtons } from "./components/ShareButtons";
import { INCIDENT } from "./data/constants";
import { useLanguage } from "./i18n";
import { siteBaseUrl, siteDisplayUrl } from "./lib/shareUrl";

function App() {
  const { t, lang } = useLanguage();
  const siteShareUrl = () => `${siteBaseUrl()}?lang=${lang}`;

  const NAV = [
    { id: "summary", label: t.nav.summary },
    { id: "temperature", label: t.nav.temperature },
    { id: "timeline", label: t.nav.timeline },
    { id: "composition", label: t.nav.composition },
    { id: "pressure", label: t.nav.pressure },
    { id: "plume", label: t.nav.plume },
    { id: "unknowns", label: t.nav.unknowns },
    { id: "faq", label: t.nav.faq },
    { id: "glossary", label: t.nav.glossary },
    { id: "sources", label: t.nav.sources },
  ];

  const [volLo, volHi] = INCIDENT.reportedContentsGallonsRange;

  return (
    <div className="min-h-screen bg-slate-50">
      <a
        href="#summary"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brand-600 focus:px-3 focus:py-2 focus:text-white"
      >
        {t.ui.skipToContent}
      </a>

      <EmergencyBanner />

      {/* In-page navigation */}
      <nav
        aria-label={t.ui.sectionNav}
        className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur"
      >
        <div className="mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6">
          <ul className="flex gap-1 py-2 text-sm">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className="inline-block whitespace-nowrap rounded-md px-3 py-1 font-medium text-slate-600 hover:bg-slate-100 hover:text-brand-700"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl space-y-14 px-4 py-10 sm:px-6">
        <Section
          id="summary"
          eyebrow={t.sections.summary.eyebrow}
          title={t.sections.summary.title}
          intro={t.sections.summary.intro({
            facility: INCIDENT.facility,
            city: INCIDENT.city,
            lo: volLo.toLocaleString(),
            hi: volHi.toLocaleString(),
            chemical: INCIDENT.chemical,
            cas: INCIDENT.cas,
            cap: INCIDENT.tankCapacityGallons.toLocaleString(),
          })}
        >
          <SummaryCards />
        </Section>

        <Section
          id="temperature"
          eyebrow={t.sections.temperature.eyebrow}
          title={t.sections.temperature.title}
          intro={t.sections.temperature.intro}
        >
          <TemperatureScenarioChart />
        </Section>

        <Section
          id="timeline"
          eyebrow={t.sections.timeline.eyebrow}
          title={t.sections.timeline.title}
          intro={t.sections.timeline.intro}
        >
          <Timeline />
        </Section>

        <Section
          id="composition"
          eyebrow={t.sections.composition.eyebrow}
          title={t.sections.composition.title}
          intro={t.sections.composition.intro}
        >
          <CompositionEstimator />
        </Section>

        <Section
          id="pressure"
          eyebrow={t.sections.pressure.eyebrow}
          title={t.sections.pressure.title}
          intro={t.sections.pressure.intro}
        >
          <VaporPressureChart />
        </Section>

        <Section
          id="plume"
          eyebrow={t.sections.plume.eyebrow}
          title={t.sections.plume.title}
          intro={t.sections.plume.intro}
        >
          <PlumeExplainer />
        </Section>

        <Section
          id="unknowns"
          eyebrow={t.sections.unknowns.eyebrow}
          title={t.sections.unknowns.title}
          intro={t.sections.unknowns.intro}
        >
          <KnownUnknowns />
        </Section>

        <Section
          id="faq"
          eyebrow={t.sections.faq.eyebrow}
          title={t.sections.faq.title}
          intro={t.sections.faq.intro}
        >
          <Faq />
        </Section>

        <Section
          id="glossary"
          eyebrow={t.sections.glossary.eyebrow}
          title={t.sections.glossary.title}
          intro={t.sections.glossary.intro}
        >
          <Glossary />
        </Section>

        <Section
          id="sources"
          eyebrow={t.sections.sources.eyebrow}
          title={t.sections.sources.title}
          intro={t.sections.sources.intro}
        >
          <SourcesPanel />
        </Section>

        {/* Share responsibly */}
        <section aria-labelledby="share-heading" className="section-anchor">
          <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6">
            <h2 id="share-heading" className="text-xl font-bold text-brand-900">
              {t.share.title}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-700">
              {t.share.body}
            </p>
            <div className="mt-4">
              <ShareButtons getUrl={siteShareUrl} text={t.share.message} />
            </div>
            <p className="mt-3 text-xs text-slate-600">
              {t.share.revisitAt}:{" "}
              <a
                href={siteBaseUrl()}
                className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-2 hover:decoration-brand-600"
              >
                {siteDisplayUrl()}
              </a>
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-xs leading-relaxed text-slate-500 sm:px-6">
          <p>
            <strong className="text-slate-700">{t.footer.line1Brand}</strong>
            {t.footer.line1}
          </p>
          <p className="mt-2">{t.footer.line2}</p>
          <p className="mt-3">
            <a
              href={siteBaseUrl()}
              className="font-semibold text-slate-600 underline decoration-slate-300 underline-offset-2 hover:text-brand-700"
            >
              {siteDisplayUrl()}
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
