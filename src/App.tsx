import { EmergencyBanner } from "./components/EmergencyBanner";
import { SummaryCards } from "./components/SummaryCards";
import { TemperatureScenarioChart } from "./components/TemperatureScenarioChart";
import { CompositionEstimator } from "./components/CompositionEstimator";
import { VaporPressureChart } from "./components/VaporPressureChart";
import { PlumeExplainer } from "./components/PlumeExplainer";
import { KnownUnknowns } from "./components/KnownUnknowns";
import { SourcesPanel } from "./components/SourcesPanel";
import { Section } from "./components/ui";
import { INCIDENT } from "./data/constants";

const NAV = [
  { id: "summary", label: "Summary" },
  { id: "temperature", label: "Temperature" },
  { id: "composition", label: "Composition" },
  { id: "pressure", label: "Pressure" },
  { id: "plume", label: "Plume" },
  { id: "unknowns", label: "Unknowns" },
  { id: "sources", label: "Sources" },
];

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <a
        href="#summary"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brand-600 focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <EmergencyBanner />

      {/* In-page navigation */}
      <nav
        aria-label="Section navigation"
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
          eyebrow="Situation summary"
          title="Where things stand"
          intro={
            <>
              A snapshot of <em>reported</em> conditions at the {INCIDENT.facility} in{" "}
              {INCIDENT.city}, framed with the uncertainty it deserves. Reported
              contents: roughly{" "}
              {INCIDENT.reportedContentsGallonsRange[0].toLocaleString()}–
              {INCIDENT.reportedContentsGallonsRange[1].toLocaleString()} gallons of{" "}
              {INCIDENT.chemical} (CAS {INCIDENT.cas}) in a{" "}
              {INCIDENT.tankCapacityGallons.toLocaleString()}-gallon tank.
            </>
          }
        >
          <SummaryCards />
        </Section>

        <Section
          id="temperature"
          eyebrow="Scenario model"
          title="Temperature scenarios"
          intro="Adjust the assumptions and compare three transparent what-if curves against published reference thresholds. None of these is a prediction."
        >
          <TemperatureScenarioChart />
        </Section>

        <Section
          id="composition"
          eyebrow="Energy estimator"
          title="Internal composition / energy estimate"
          intro="An energy-equivalent estimate of how much polymerization the measured temperature rise could represent — not a measurement of what is actually inside the tank."
        >
          <CompositionEstimator />
        </Section>

        <Section
          id="pressure"
          eyebrow="Context"
          title="Pressure & vapor context"
          intro="Equilibrium vapor pressure rises with temperature, but it is not the same as the total pressure inside the tank."
        >
          <VaporPressureChart />
        </Section>

        <Section
          id="plume"
          eyebrow="Education"
          title="How vapor plumes behave"
          intro="A conceptual explainer — deliberately not a live hazard map — of why plume paths are uncertain."
        >
          <PlumeExplainer />
        </Section>

        <Section
          id="unknowns"
          eyebrow="Honesty"
          title="Known unknowns"
          intro="The variables that would be required for any genuine assessment, and that are not publicly known."
        >
          <KnownUnknowns />
        </Section>

        <Section
          id="sources"
          eyebrow="Transparency"
          title="Sources & assumptions"
          intro="Every fact, constant, and threshold traces back to a public source listed here."
        >
          <SourcesPanel />
        </Section>

        {/* Share responsibly */}
        <section aria-labelledby="share-heading" className="section-anchor">
          <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6">
            <h2 id="share-heading" className="text-xl font-bold text-brand-900">
              Share this responsibly
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-700">
              This dashboard is for understanding mechanisms and uncertainty. Do not
              use it to override official evacuation, shelter, or re-entry orders. If
              you share it, share it together with the official sources at the top of
              the page — and make clear it is an independent educational estimate, not
              guidance from any agency.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-xs leading-relaxed text-slate-500 sm:px-6">
          <p>
            <strong className="text-slate-700">GG Tank Science Dashboard.</strong> An
            independent, open-source educational project. Not affiliated with OCFA,
            GKN Aerospace, the City of Garden Grove, EPA, or Cal OES. It does not
            determine whether any address is safe.
          </p>
          <p className="mt-2">
            All figures are reported or assumed values carrying real uncertainty.
            Always follow official emergency instructions.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
