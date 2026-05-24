/**
 * sources.ts
 * -----------------------------------------------------------------------------
 * The references that back the facts, constants, and thresholds in this site.
 * Every `sourceId` used elsewhere in the codebase resolves to a record here.
 *
 * NOTE ON LINKS: URLs point to the organizations' canonical resources. They are
 * provided for further reading. If a specific document moves, search the
 * organization's site for the titled document rather than trusting a stale link.
 */

export type SourceCategory =
  | "official-order"
  | "news"
  | "chemical-reference"
  | "safety-data"
  | "scientific";

export interface SourceRecord {
  readonly id: string;
  readonly title: string;
  readonly publisher: string;
  readonly category: SourceCategory;
  /** Best-known date for the cited item (YYYY-MM-DD) or a descriptive label. */
  readonly date?: string;
  readonly url: string;
  /** What this source is used to support in the dashboard. */
  readonly usedFor: string;
}

export const sources: readonly SourceRecord[] = [
  {
    id: "ca-emergency",
    title: "Governor's Proclamation of a State of Emergency",
    publisher: "Office of the Governor of California",
    category: "official-order",
    date: "2026-05-23",
    url: "https://www.gov.ca.gov/newsroom/",
    usedFor: "Incident status and official-response context.",
  },
  {
    id: "ap",
    title: "Report on the Garden Grove chemical tank crisis",
    publisher: "Associated Press",
    category: "news",
    date: "2026-05-24",
    url: "https://apnews.com/",
    usedFor: "Incident facts, response actions, and evacuation context.",
  },
  {
    id: "reuters",
    title: "Report on tank temperature and cooling / stabilization efforts",
    publisher: "Reuters",
    category: "news",
    date: "2026-05-23",
    url: "https://www.reuters.com/",
    usedFor: "Reported temperatures, ~1°F/hour trend, and cooling target.",
  },
  {
    id: "noaa-cameo",
    title: "CAMEO Chemicals: Methyl Methacrylate Monomer, Stabilized",
    publisher: "NOAA Office of Response and Restoration",
    category: "chemical-reference",
    url: "https://cameochemicals.noaa.gov/",
    usedFor: "Reactivity, polymerization hazard, and general response guidance.",
  },
  {
    id: "noaa-chris",
    title: "CHRIS: Methyl Methacrylate physical property table",
    publisher: "NOAA / U.S. Coast Guard CHRIS",
    category: "chemical-reference",
    url: "https://cameochemicals.noaa.gov/",
    usedFor: "Density, heat capacity cross-check, and vapor-pressure table.",
  },
  {
    id: "niosh-pocket",
    title: "NIOSH Pocket Guide to Chemical Hazards: Methyl Methacrylate",
    publisher: "CDC / NIOSH",
    category: "safety-data",
    url: "https://www.cdc.gov/niosh/npg/",
    usedFor: "Occupational exposure limits (educational only).",
  },
  {
    id: "basf-sds",
    title: "Safety Data Sheet: Methyl Methacrylate (rev. 2025/10/09)",
    publisher: "BASF",
    category: "safety-data",
    date: "2025-10-09",
    url: "https://www.basf.com/",
    usedFor: "Storage stability, restabilization, and evacuation thresholds.",
  },
  {
    id: "cefic-handling",
    title: "Methacrylate Esters: Safe Handling Manual",
    publisher: "Methacrylate Producers Association / CEFIC",
    category: "safety-data",
    url: "https://cefic.org/",
    usedFor: "Storage and handling temperature guidance to protect inhibitor.",
  },
  {
    id: "nist-webbook",
    title: "Chemistry WebBook: Methyl methacrylate — heat capacity",
    publisher: "NIST",
    category: "scientific",
    url: "https://webbook.nist.gov/chemistry/",
    usedFor: "Liquid heat-capacity default (~191 J/mol·K at ~298 K).",
  },
  {
    id: "noaa-aloha",
    title: "ALOHA: Limitations and assumptions",
    publisher: "NOAA / U.S. EPA CAMEO Suite",
    category: "scientific",
    url: "https://www.epa.gov/cameo/aloha-software",
    usedFor: "Plume-model limitations described in the education section.",
  },
  {
    id: "heat-of-poly",
    title: "Heat of polymerization of methyl methacrylate (~57.8 kJ/mol)",
    publisher: "Polymer-chemistry literature (e.g. Brandrup, Polymer Handbook)",
    category: "scientific",
    url: "https://onlinelibrary.wiley.com/",
    usedFor: "Energy-equivalence calculation in the composition estimator.",
  },
];

/** Look up a source record by id. */
export function sourceById(id: string): SourceRecord | undefined {
  return sources.find((s) => s.id === id);
}

/** Official channels residents should follow. These are authorities, not links to facts. */
export interface OfficialChannel {
  readonly name: string;
  readonly role: string;
  readonly url: string;
}

export const officialChannels: readonly OfficialChannel[] = [
  {
    name: "Orange County Fire Authority (OCFA)",
    role: "Incident command, evacuation, and re-entry",
    url: "https://www.ocfa.org/",
  },
  {
    name: "City of Garden Grove",
    role: "Local emergency notifications",
    url: "https://ggcity.org/",
  },
  {
    name: "California Governor's Office of Emergency Services (Cal OES)",
    role: "State emergency coordination",
    url: "https://www.caloes.ca.gov/",
  },
  {
    name: "U.S. Environmental Protection Agency (EPA)",
    role: "Air monitoring and environmental response",
    url: "https://www.epa.gov/",
  },
  {
    name: "Orange County Health Care Agency",
    role: "Public-health guidance",
    url: "https://www.ochealthinfo.com/",
  },
];
