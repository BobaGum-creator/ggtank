/**
 * en.ts — English strings and the source-of-truth shape for all translations.
 * `es.ts` and `vi.ts` must satisfy `typeof en` (enforced by TypeScript), so a
 * missing or misnamed key in any language is a compile error.
 *
 * Notes:
 *  - Proper nouns left untranslated everywhere: brand name, agency acronyms,
 *    chemical names, source-document titles, units, and code snippets.
 *  - Functions are used where a value is interpolated.
 */
export const en = {
  langName: "English",
  ui: {
    language: "Language",
    whatThisMeans: "What this means",
    sectionNav: "Section navigation",
    skipToContent: "Skip to content",
    reset: "Reset",
    show: "Show",
    hide: "Hide",
    resetToObserved: (rate: string) => `Reset to observed (${rate}°F/hr)`,
    sourcePrefix: "Source:",
    notWithin: (h: number) => `not within ${h}h`,
    alreadyAtAbove: "already at/above",
    approxHours: (h: number) => `~${h}h`,
  },

  breaking: {
    label: "Breaking update",
  },

  banner: {
    subtitle: "A transparent estimate, not official guidance.",
    importantLabel: "Important:",
    disclaimer:
      "This site is not affiliated with OCFA, GKN Aerospace, the City of Garden Grove, EPA, or Cal OES. It does not determine whether any address is safe.",
    followOfficial: "Follow official evacuation and re-entry instructions.",
    officialHeading: "Follow official sources",
    channelRoles: {
      "Orange County Fire Authority (OCFA)": "Incident command, evacuation, and re-entry",
      "City of Garden Grove": "Local emergency notifications",
      "California Governor's Office of Emergency Services (Cal OES)": "State emergency coordination",
      "U.S. Environmental Protection Agency (EPA)": "Air monitoring and environmental response",
      "Orange County Health Care Agency": "Public-health guidance",
    } as Record<string, string>,
    lastUpdate: "Last data update:",
    reportedNote: "Reported figures only — see Sources & Assumptions below.",
    liveTempLabel: "Real-time estimated tank temperature",
    liveTempSub: "Live estimate (~1°F/hr) — not a measurement; the gauge maxes at 100°F",
  },

  nav: {
    summary: "Summary",
    timeline: "Timeline",
    temperature: "Temperature",
    composition: "Composition",
    pressure: "Pressure",
    plume: "Plume",
    unknowns: "Unknowns",
    faq: "FAQ",
    glossary: "Glossary",
    sources: "Sources",
    evacuation: "Evacuation",
  },

  sections: {
    summary: {
      eyebrow: "Situation summary",
      title: "Where things stand",
      intro: (p: {
        facility: string;
        city: string;
        lo: string;
        hi: string;
        chemical: string;
        cas: string;
        cap: string;
      }) =>
        `A snapshot of reported conditions at the ${p.facility} in ${p.city}, framed with the uncertainty it deserves. Reported contents: roughly ${p.lo}–${p.hi} gallons of ${p.chemical} (CAS ${p.cas}) in a ${p.cap}-gallon tank.`,
    },
    timeline: {
      eyebrow: "Reported chronology",
      title: "Timeline of reported data points",
      intro:
        "When each reported temperature reading and incident event occurred, most recent first. These are reported times from public sources, not independently verified.",
    },
    temperature: {
      eyebrow: "Scenario model",
      title: "Temperature scenarios",
      intro:
        "Adjust the assumptions and compare three transparent what-if curves against published reference thresholds. None of these is a prediction.",
    },
    composition: {
      eyebrow: "Energy estimator",
      title: "Internal composition / energy estimate",
      intro:
        "An energy-equivalent estimate of how much polymerization the measured temperature rise could represent — not a measurement of what is actually inside the tank.",
    },
    pressure: {
      eyebrow: "Context",
      title: "Pressure & vapor context",
      intro:
        "Equilibrium vapor pressure rises with temperature, but it is not the same as the total pressure inside the tank.",
    },
    plume: {
      eyebrow: "Education",
      title: "How vapor plumes behave",
      intro:
        "A conceptual explainer — deliberately not a live hazard map — of why plume paths are uncertain.",
    },
    unknowns: {
      eyebrow: "Honesty",
      title: "Known unknowns",
      intro:
        "The variables that would be required for any genuine assessment, and that are not publicly known.",
    },
    faq: {
      eyebrow: "Questions",
      title: "Frequently asked questions",
      intro:
        "Plain answers to common questions. None of these tell you whether a location is safe — only officials can.",
    },
    glossary: {
      eyebrow: "Plain language",
      title: "Glossary",
      intro: "Short definitions of the key terms used on this page.",
    },
    sources: {
      eyebrow: "Transparency",
      title: "Sources & assumptions",
      intro:
        "Every fact, constant, and threshold traces back to a public source listed here.",
    },
    evacuation: {
      eyebrow: "Evacuation",
      title: "Evacuation zone map",
      intro:
        "A reported snapshot of the evacuation area. Boundaries and orders change — always confirm the current evacuation zone and instructions with OCFA and local officials.",
    },
  },

  summary: {
    reportedTemp: "Reported internal temp",
    estimatedTemp: "Current estimated temp",
    estimatedSub: "Live estimate (~1°F/hr)",
    atAbove: (label: string) => `At/above: ${label}`,
    belowThresholds: "Below listed thresholds",
    reportedTrend: "Reported trend",
    reportedRateSub: "Reported rate of rise (~1°F/hr)",
    fromTwoReadings: "From last two reported readings",
    needTwo: "Need ≥2 readings",
    estVolume: "Estimated MMA volume",
    gallonsReported: "gallons (reported range)",
    knownUnknowns: "Known unknowns",
    criticalVars: "critical variables not publicly known",
    modelConfidence: "Model confidence",
    low: "Low",
    medium: "Medium",
    confMedium: "≥2 reported readings",
    confLow: "Limited inputs",
    plainHeading: "In plain English",
    plainBody:
      "The tank likely contains liquid MMA plus vapor headspace. The concern is not only ordinary heat. MMA can polymerize into PMMA/acrylic, releasing heat. If that reaction outpaces cooling or blocks venting, pressure and rupture risk can increase.",
    wtmPre:
      "These cards summarize reported figures and how they sit against published storage guidance. “Model confidence” reflects how complete the inputs are — it is capped at Medium because the most important variables (listed in ",
    wtmLink: "Known Unknowns",
    wtmPost:
      ") are not publicly known. None of this tells you whether any location is safe; only officials can.",
  },

  timeline: {
    kind: {
      incident: "Incident",
      reading: "Data point",
      report: "News report",
      official: "Official",
    },
    readingTitle: (tempF: number) => `Reported internal temperature: ${tempF}°F`,
    observationLabels: {
      "Earlier reported internal temperature": "Earlier reported internal temperature",
      "Reported internal gauge temperature": "Reported internal gauge temperature",
      "Internal temperature 100°F+ (the gauge maxes out at 100°F)": "Internal temperature 100°F+ (the gauge maxes out at 100°F)",
    } as Record<string, string>,
    observationSources: {
      "Reuters/AP public reporting": "Reuters/AP public reporting",
      "OCFA Critical Incident Update (Chief Covey), via NBC LA": "OCFA Critical Incident Update (Chief Covey), via NBC LA",
      "ABC7 (KABC), citing OCFA": "ABC7 (KABC), citing OCFA",
    } as Record<string, string>,
    confidence: {
      reported: "reported",
      estimated: "estimated",
      official: "official",
      unconfirmed: "unconfirmed",
    } as Record<string, string>,
    events: {
      "incident-start": {
        title: "Incident reported to begin",
        detail:
          "Concern reported at the GKN Aerospace facility in Garden Grove over a 34,000-gallon storage tank holding methyl methacrylate (MMA).",
      },
      "reuters-report": {
        title: "Reuters reports temperature rise and cooling efforts",
        detail:
          "Firefighters cooling the tank externally with water; experts exploring stabilization/neutralization; broken/gummed-up valves reported to limit chemical removal and pressure relief.",
      },
      "state-emergency": {
        title: "California Governor proclaims a State of Emergency",
        detail: "State-level emergency declared in response to the incident.",
      },
      "ap-report": {
        title: "Associated Press report on the crisis",
        detail:
          "Coverage of response actions and evacuation context; air monitoring reportedly had not detected offsite pollution at the time, but residents were told to follow evacuation orders.",
      },
    } as Record<string, { title: string; detail: string }>,
    wtmPre:
      "These are reported times, drawn from public reporting and official announcements — not independently verified, and times of day are approximate unless a specific reading time was given. Add new readings in ",
    wtmPost:
      " and they will appear here automatically. For the current situation, always rely on official channels.",
  },

  temperature: {
    assumptions: "Assumptions",
    startTemp: "Starting temperature",
    startTempHelp: "Most recent reported internal temperature.",
    prevTemp: "Previous known temperature",
    prevTempHelp: "An earlier reported reading, used to estimate the rate.",
    hoursBetween: "Hours between readings",
    observedRate: "Observed rate of rise",
    observedRateHelp:
      "Auto-calculated from the two readings, but you can override it.",
    cooling: "Cooling effectiveness",
    coolingHelp:
      "How strongly active cooling damps the rising rate over time. 0% = no damping.",
    acceleration: "Acceleration factor",
    accelerationHelp:
      "Drives ONLY the illustrative runaway-like curve. Higher = faster self-heating.",
    horizon: "Simulation horizon",
    hoursFromNow: "Hours from now",
    nowEstimated: "now (estimated)",
    extrapolatedNote:
      "The starting point is a live estimate extrapolated from the last reported 90°F at ~1°F/hr — it ticks up about 1°F each hour. The gauge maxes out at 100°F, so the current temperature is not directly measured.",
    illustrativeNote: (ceiling: number) =>
      `The dashed red curve is an illustrative runaway-like scenario, not a prediction. It is capped at ${ceiling}°F and may run off the top of the chart.`,
    legend: {
      linear: "Linear (constant rate)",
      cooling: "Cooling-controlled",
      accelerating: "Illustrative runaway-like",
    },
    timeToThreshold: "Time to reach each threshold",
    timeToThresholdNote: "— scenario math, not a predicted failure time",
    thColThreshold: "Threshold",
    wtmPre:
      "These three curves are arithmetic, not forecasts. The linear curve simply extends the observed rate. The cooling-controlled curve assumes active cooling gradually slows the rise. The illustrative runaway-like curve shows what self-accelerating heat could look like if polymerization outpaced cooling — it is a teaching shape, not a prediction. Real tank behavior depends on the ",
    wtmLink: "known unknowns",
    wtmPost:
      ". The “time to threshold” values are just where each line crosses a reference temperature, never a predicted time of failure.",
  },

  thresholds: {
    86: { label: "Preferred storage target", detail: "Below ~30°C / 86°F is a preferred storage target where practical." },
    95: { label: "BASF storage stability", detail: "BASF SDS lists storage stability below 35°C / 95°F." },
    104: { label: "Inhibitor-protection ceiling", detail: "Methacrylate-ester handling guidance: keep below 40°C / 104°F to help prevent stabilizer loss." },
    113: { label: "Restabilization threshold", detail: "BASF SDS: at 45°C / 113°F in a bulk tank, a restabilization system should be used." },
    140: { label: "Major emergency threshold", detail: "BASF SDS: at 60°C / 140°F in a fire-vicinity context, greater-area evacuation is recommended." },
  } as Record<number, { label: string; detail: string }>,

  composition: {
    assumptions: "Assumptions",
    volMin: "Volume — minimum",
    volLikely: "Volume — likely",
    volMax: "Volume — maximum",
    density: "Density",
    heatCapacity: "Heat capacity",
    initialTemp: "Initial temperature",
    currentTemp: "Current temperature",
    coolingMult: "Cooling removal multiplier",
    coolingMultHelp:
      "1× = purely adiabatic (no heat removed). Higher values assume cooling carried away heat before it showed up as a temperature rise.",
    convFromTemp: "Energy-equivalent conversion (from temp rise alone)",
    withCoolingMult: (n: number) => `With cooling multiplier (${n}×)`,
    inconsistentTitle: "These assumptions are inconsistent.",
    inconsistentBody:
      "The cooling-adjusted estimate exceeds 100%, which is physically impossible. It usually means the cooling multiplier is set higher than the data can support. Treat this as “assumptions don't add up,” not as a real result.",
    conceptualTitle: "Conceptual composition (energy-equivalent, not measured)",
    segRemaining: "Remaining liquid MMA",
    segRemainingNote: "Unreacted monomer still in liquid form.",
    segPolymerized: "Polymerized / gelled (energy-equivalent)",
    segPolymerizedNote:
      "Energy-equivalent share implied by the measured temperature rise alone.",
    segUnknown: "Unknown / unmeasured gradients",
    segUnknownNote:
      "Extra reaction that active cooling could have masked. Grows with the cooling multiplier.",
    segVapor: "Vapor / headspace",
    segVaporNote: "Large by volume, tiny by mass — shown conceptually.",
    absByVolume: "Absolute energy by volume",
    absByVolumeNote:
      "— the conversion % above is the same for every volume; only the raw Joules scale",
    colVolume: "Volume",
    colMass: "Mass",
    colIfFully: "If fully polymerized",
    colHeatFromRise: "Heat from measured rise",
    rowMinimum: "Minimum",
    rowLikely: "Likely",
    rowMaximum: "Maximum",
    badgeHeatOfPoly: (v: number) => `Heat of polymerization: ${v} kJ/mol`,
    badgeEnergyEquiv: "Energy-equivalent estimate — not a measurement",
    wtm:
      "The observed 77°F → 90°F rise alone would correspond to only a low single-digit percent of full MMA-to-PMMA polymerization energy if no heat had been removed. Because firefighters are cooling the tank, and because internal temperatures may be uneven, actual conversion could be higher or lower. This is an energy-equivalent estimate, not a measurement of actual composition. It can be badly wrong if cooling water removed significant heat, if the internal temperature is not uniform, if there is venting, if material has gelled, or if pressure relief has occurred.",
  },

  pressure: {
    tempAxis: "Temperature (°F)",
    vpCaptionPre: "NOAA CHRIS equilibrium vapor pressure of the liquid — not total tank pressure.",
    vpCaptionAt90: (psi: number) => `At ~90°F this is about ${psi} psi.`,
    vpTooltip: "Equilibrium VP",
    forceTitle: "Pressure → force (educational only)",
    forceIntro: "A small pressure acting over a large area still produces a large total force:",
    pressureLabel: "Pressure",
    areaLabel: "Surface area",
    resultingForce: "Resulting force",
    tonsApprox: (tons: string) => `≈ ${tons} US tons of force`,
    forceDisclaimer:
      "This is a textbook illustration of how pressure scales with area. It is not a statement about this tank's strength or failure point.",
    wtm:
      "Equilibrium vapor pressure rises with temperature, but the actual tank pressure depends on venting, headspace, gas generation, polymer blocking lines, leaks or cracks, and structural condition — so do not equate the two. A low numerical psi can still create large forces across a big tank surface. We deliberately do not estimate the tank's failure pressure: that is unknown without tank design, welds, corrosion, vent settings, fill level, and deformation data.",
  },

  plume: {
    svgAlt:
      "Conceptual illustration of a wind-driven vapor plume widening downwind, with low-lying pooling and building effects. Not a hazard map.",
    labelSource: "source",
    labelWind: "wind direction",
    labelCrosswind: "crosswind spread",
    labelBuilding: "building eddy",
    labelLowArea: "low-area pooling",
    figCaption: "Conceptual only — not a hazard map and not specific to this incident.",
    p1: "A plume is not a laser beam and not a perfect circle.",
    p2: "Wind generally controls the main direction, while slope, buildings, drains, and low spots can influence where heavier-than-air vapor pools near the ground.",
    p3: "Official plume or blast maps may come from simplified models and emergency-planning assumptions. They are planning tools, not guarantees of exactly where vapor will or will not be.",
    limitationsTitle: "Limitations of plume tools (e.g., NOAA ALOHA)",
    limitations: {
      gaussian: { title: "Gaussian assumptions", detail: "Assumes a smooth, idealized bell-shaped spread that real releases rarely follow exactly." },
      lowWind: { title: "Low-wind & stable air", detail: "Less reliable in very light winds or stable atmospheric conditions." },
      patchiness: { title: "Near-source patchiness", detail: "Concentrations close to the source can be uneven and hard to model." },
      windShifts: { title: "Wind shifts", detail: "Does not fully account for changing wind direction over time." },
      terrain: { title: "Terrain steering", detail: "Hills, slopes, and low spots can channel vapor in ways the model ignores." },
      urban: { title: "Urban building eddies", detail: "Buildings create swirls and dead zones not captured by a simple plume." },
      reactions: { title: "Chemical reactions", detail: "Does not model reactions that change the cloud as it travels." },
      fragments: { title: "Hazardous fragments", detail: "A violent rupture can throw debris — not part of a vapor-dispersion model." },
    },
    wtm:
      "We deliberately do not draw a precise, live hazard map — that would imply a false certainty about where vapor is. Use this only to understand why plumes are uncertain. For where it is actually safe, rely on official, real-time monitoring and evacuation orders.",
  },

  unknowns: {
    items: {
      "Actual tank pressure": { item: "Actual tank pressure", why: "Vapor pressure is not tank pressure; the real value depends on venting, gas generation, and structure." },
      "Tank design pressure (atmospheric vs. low-pressure rating)": { item: "Tank design pressure (atmospheric vs. low-pressure rating)", why: "Sets how much internal pressure the vessel can hold before failure." },
      "Relief-valve condition": { item: "Relief-valve condition", why: "Reported as broken/gummed up, which limits pressure relief." },
      "Whether vents are blocked by polymer": { item: "Whether vents are blocked by polymer", why: "Polymer/gel can plug vents and trap pressure." },
      "Inhibitor (stabilizer) concentration": { item: "Inhibitor (stabilizer) concentration", why: "Inhibitor suppresses polymerization; if depleted, reaction risk rises." },
      "Dissolved / headspace oxygen": { item: "Dissolved / headspace oxygen", why: "Oxygen interacts with inhibitor chemistry and reactivity." },
      "Contamination or initiators present": { item: "Contamination or initiators present", why: "Peroxides, rust, or other initiators can start polymerization." },
      "Actual internal temperature gradients": { item: "Actual internal temperature gradients", why: "A single gauge cannot show hot spots inside the bulk liquid." },
      "Polymer / gel fraction": { item: "Polymer / gel fraction", why: "How much has already reacted changes heat and flow behavior." },
      "Cooling water flow rate and heat removal": { item: "Cooling water flow rate and heat removal", why: "Determines how much heat is being carried away versus retained." },
      "Tank wall deformation / bulging": { item: "Tank wall deformation / bulging", why: "Bulging indicates stress and changes failure behavior." },
      "Leak / crack status": { item: "Leak / crack status", why: "Existing leaks change pressure, release, and fire risk." },
      "Nearby tank contents and status": { item: "Nearby tank contents and status", why: "Adjacent hazards can compound or change the scenario." },
      "Wind and real-time air monitoring": { item: "Wind and real-time air monitoring", why: "Controls where vapor goes and whether anything is offsite now." },
    } as Record<string, { item: string; why: string }>,
    wtm:
      "Every box above is unchecked because the information is not publicly available. This is exactly why no website — including this one — can tell you whether a specific location is safe. The people who can measure these things are the official responders; follow their instructions.",
  },

  sources: {
    heading: "Sources",
    note:
      "Links point to each organization's canonical site. If a specific document has moved, search that organization for the titled item.",
    keyAssumptions: "Key assumptions",
    categories: {
      "official-order": "Official",
      news: "News",
      "chemical-reference": "Chemical reference",
      "safety-data": "Safety data",
      scientific: "Scientific",
    },
    usedFor: {
      "ca-emergency": "Incident status and official-response context.",
      ap: "Incident facts, response actions, and evacuation context.",
      reuters: "Reported temperatures, ~1°F/hour trend, and cooling target.",
      "noaa-cameo": "Reactivity, polymerization hazard, and general response guidance.",
      "noaa-chris": "Density, heat capacity cross-check, and vapor-pressure table.",
      "niosh-pocket": "Occupational exposure limits (educational only).",
      "basf-sds": "Storage stability, restabilization, and evacuation thresholds.",
      "cefic-handling": "Storage and handling temperature guidance to protect inhibitor.",
      "nist-webbook": "Liquid heat-capacity default (~191 J/mol·K at ~298 K).",
      "noaa-aloha": "Plume-model limitations described in the education section.",
      "heat-of-poly": "Energy-equivalence calculation in the composition estimator.",
    } as Record<string, string>,
    assumptions: {
      molarMass: (v: number) => `MMA molar mass = ${v} g/mol`,
      density: (v: number) => `Density default = ${v} kg/L (adjustable 0.92–0.96)`,
      heatCapacity: (v: number) => `Heat capacity default = ${v} kJ/(kg·K)`,
      heatOfPoly: (v: number) => `Heat of polymerization = ${v} kJ/mol`,
      vaporPressure: "Vapor pressure = NOAA CHRIS equilibrium table (not tank pressure)",
      tempCurves: "Temperature curves are arithmetic scenarios, not forecasts",
      conversion: "Conversion fraction is energy-equivalent, not a measured composition",
    },
  },

  faq: {
    items: [
      {
        q: "Is this an official site? Can it tell me whether my home is safe?",
        a: "No. This is an independent educational project, not affiliated with any agency, and it cannot determine whether any address is safe. Only official responders can. Follow OCFA, the City of Garden Grove, Cal OES, EPA, and the Orange County Health Care Agency.",
      },
      {
        q: "What is methyl methacrylate (MMA)?",
        a: "A colorless, flammable liquid used to make PMMA (acrylic) plastic. It is mostly liquid at normal temperatures with vapor above it, and it can polymerize — chemically link into a solid — while releasing heat.",
      },
      {
        q: "Why is temperature such a concern? Isn't it just heat?",
        a: "The concern is not only ordinary heat. If MMA starts to polymerize, the reaction itself releases heat. If that heat outpaces cooling or blocks venting, pressure and the risk of rupture can rise. That is why responders are cooling the tank.",
      },
      {
        q: "The air smells sharp or like a nail salon. Is that dangerous?",
        a: "Odor is not a safety measurement — you may smell MMA at levels well below or above what matters, so your nose is not a reliable gauge of risk. Rely on official, real-time air monitoring and any health guidance instead.",
      },
      {
        q: "Will the tank explode?",
        a: "That is unknown. A violent rupture is a recognized hazard if polymerization runs away, but no one can publicly predict whether or when it will happen — the necessary information isn't available (see Known Unknowns). Follow evacuation orders regardless.",
      },
      {
        q: "How current is the data on this site?",
        a: "It shows reported figures with timestamps (see the Timeline), not a live feed, and they are not independently verified. For the current situation, always use official channels.",
      },
      {
        q: "Why doesn't the site give exact answers?",
        a: "Because the most important variables — actual pressure, valve condition, inhibitor level, internal hot spots, and more — are not publicly known. Exact numbers would be false precision. The tools here are for understanding mechanisms and ranges, not predictions.",
      },
      {
        q: "How do I get official alerts?",
        a: "Use the official sources linked at the top of this page, and sign up for your county's emergency alerts. Those authorities make the evacuation, shelter, and re-entry decisions.",
      },
    ],
  },

  glossary: {
    items: [
      { term: "Methyl methacrylate (MMA)", def: "The chemical in the tank (CAS 80-62-6): a colorless, flammable liquid monomer used to make acrylic plastic." },
      { term: "Monomer", def: "A small molecule that can join with many copies of itself to form a polymer. MMA is the monomer; PMMA is the polymer." },
      { term: "Polymerization", def: "The reaction that links monomer molecules into long chains (a polymer). For MMA it releases heat (it is exothermic)." },
      { term: "PMMA / acrylic", def: "Poly(methyl methacrylate) — the solid plastic (acrylic, e.g. Plexiglas) that MMA forms when it polymerizes." },
      { term: "Exothermic", def: "A reaction that releases heat. Runaway exothermic polymerization is the central concern with this tank." },
      { term: "Inhibitor (stabilizer)", def: "An additive that suppresses unwanted polymerization during storage. If it is depleted or overwhelmed, reaction risk rises." },
      { term: "Vapor pressure", def: "The pressure of vapor in equilibrium with the liquid at a given temperature. It rises with temperature — but it is NOT the same as the total pressure inside the tank." },
      { term: "Headspace", def: "The vapor-filled space above the liquid inside the tank." },
      { term: "Adiabatic", def: "An idealized case where no heat is removed. The estimator's 'no heat removed' assumption is adiabatic; real cooling changes the true picture." },
      { term: "Plume", def: "A cloud of vapor carried by the wind. Its path is shaped by wind, terrain, and buildings, so it is neither a straight line nor a perfect circle." },
      { term: "Restabilization", def: "Adding inhibitor back into a bulk tank to regain stability. Guidance flags this at about 45°C / 113°F." },
    ],
  },

  evacuation: {
    ordersActive: "Evacuation orders active",
    address: "GKN Aerospace / MMA leak — 12122 Western Ave, Garden Grove",
    imageAlt:
      "Reported evacuation-zone map for the GKN Aerospace MMA incident in Garden Grove, outlining the area roughly bounded by Ball Road, Valley View Street, Dale Street, and Trask Avenue.",
    caption:
      "Reported snapshot — not official guidance and possibly outdated. Confirm the current evacuation zone and orders with official sources.",
    zoneHeading: "Reported zone boundaries",
    boundaries: [
      "South of Ball Road",
      "East of Valley View St",
      "West of Dale Street",
      "North of Trask Avenue",
    ],
    wtm:
      "This is a snapshot someone captured, not a live or official map — the real zone and orders can change at any time. For the current evacuation area and what to do, rely on",
  },

  share: {
    title: "Share this responsibly",
    body:
      "This dashboard is for understanding mechanisms and uncertainty. Do not use it to override official evacuation, shelter, or re-entry orders. If you share it, share it together with the official sources at the top of the page — and make clear it is an independent educational estimate, not guidance from any agency.",
    copyLink: "Copy link",
    copied: "Copied!",
    share: "Share",
    shareScenario: "Share this scenario",
    revisitAt: "Share or revisit this page at",
    message:
      "GKN Aerospace MMA Tank — Garden Grove — a transparent, uncertainty-aware estimate. Not official guidance; follow official orders.",
  },

  footer: {
    line1Brand: "GKN Aerospace MMA Tank — Garden Grove.",
    line1:
      " An independent, open-source educational project. Not affiliated with OCFA, GKN Aerospace, the City of Garden Grove, EPA, or Cal OES. It does not determine whether any address is safe.",
    line2:
      "All figures are reported or assumed values carrying real uncertainty. Always follow official emergency instructions.",
  },
};

export type Translation = typeof en;
