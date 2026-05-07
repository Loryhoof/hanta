import { officialSources } from "@/lib/site";

export type RiskLevel = "low" | "watch" | "elevated" | "active";

export type MetricPoint = {
  year: number;
  infections: number;
  deaths: number;
  countries: number;
};

export type OutbreakRegion = {
  slug: string;
  name: string;
  location: string;
  riskLevel: RiskLevel;
  coordinates: [number, number];
  lastUpdated: string;
  summary: string;
  source: string;
  sourceUrl: string;
  cases?: number;
  deaths?: number;
};

export type LocationPage = {
  slug: string;
  title: string;
  question: string;
  riskLevel: RiskLevel;
  lastReviewed: string;
  summary: string;
  preventionNote: string;
  sourceUrl: string;
};

export const globalStatus = {
  label: "Current global status",
  level: "watch" as RiskLevel,
  updatedAt: "2026-05-07",
  latestVerifiedUpdate:
    "WHO is tracking a multi-country hantavirus cluster linked to cruise ship travel. WHO currently assesses the risk to the global population from this event as low.",
  sourceName: "WHO Disease Outbreak News",
  sourceUrl: "https://www.who.int/emergencies/disease-outbreak-news",
};

export const preventionSteps = [
  "Avoid contact with wild rodents, nests, droppings, urine, and saliva.",
  "Ventilate closed cabins, sheds, garages, or storage spaces before cleaning.",
  "Wet contaminated material with disinfectant before removal; do not sweep or vacuum dry droppings.",
  "Seal rodent entry points and store food in rodent-resistant containers.",
  "Seek urgent medical care if compatible symptoms follow possible rodent exposure.",
];

export const clinicalTopics = {
  "what-is-hantavirus": {
    title: "What Hantavirus Is",
    description:
      "Hantaviruses are a family of viruses carried by some rodents. Human illness can affect the lungs, kidneys, or both depending on the virus.",
    sections: [
      {
        heading: "Plain-language definition",
        body: "Hantavirus infection is uncommon, but some forms can become severe quickly. Most prevention work focuses on reducing exposure to infected rodents and safely handling contaminated spaces.",
      },
      {
        heading: "Regional differences",
        body: "Different hantaviruses circulate in different parts of the world. Reported cases, environmental conditions, and media reports do not carry the same level of certainty, so they are presented separately.",
      },
    ],
  },
  symptoms: {
    title: "Symptoms",
    description:
      "Early symptoms can resemble other viral illnesses. Severe disease can involve rapid breathing difficulty, shock, or kidney complications.",
    sections: [
      {
        heading: "Early symptoms",
        body: "Fever, muscle aches, fatigue, headache, dizziness, chills, abdominal symptoms, nausea, vomiting, or diarrhea can occur early.",
      },
      {
        heading: "Urgent warning signs",
        body: "Trouble breathing, chest tightness, worsening cough, confusion, fainting, or rapid deterioration after possible rodent exposure needs prompt medical evaluation.",
      },
    ],
  },
  transmission: {
    title: "Transmission",
    description:
      "People are usually exposed by breathing particles from infected rodent urine, droppings, saliva, or nesting material.",
    sections: [
      {
        heading: "Primary exposure route",
        body: "The highest-risk scenario is disturbing contaminated rodent material in enclosed or poorly ventilated spaces.",
      },
      {
        heading: "Person-to-person nuance",
        body: "Most hantaviruses are not known for person-to-person spread. Andes virus has documented person-to-person transmission in specific contexts, so outbreak pages distinguish virus type when official sources report it.",
      },
    ],
  },
  prevention: {
    title: "Prevention",
    description:
      "Prevention centers on rodent control, safe cleanup, ventilation, and avoiding aerosolized contaminated material.",
    sections: [
      {
        heading: "Safe cleanup",
        body: "Open doors and windows, leave the area to ventilate, wet contaminated material with disinfectant, wear appropriate protection, and avoid sweeping or vacuuming dry droppings.",
      },
      {
        heading: "Long-term prevention",
        body: "Seal gaps, remove food sources, use rodent-proof storage, maintain traps where appropriate, and address infestations before cleaning heavily contaminated areas.",
      },
    ],
  },
};

export const faq = [
  {
    question: "Can I get hantavirus from casual outdoor hiking?",
    answer:
      "Risk is usually tied to contact with infected rodents or contaminated enclosed spaces. Avoid rodent nests and droppings, especially in cabins, sheds, barns, garages, and campsites.",
  },
  {
    question: "Is this site medical advice?",
    answer:
      "No. This site provides general public health information. Anyone with symptoms after possible exposure should contact a clinician or local public health authority.",
  },
  {
    question: "Why are some numbers older than news headlines?",
    answer:
      "Official surveillance data often lags media reports. The site shows source dates and separates confirmed official data from developing news.",
  },
  {
    question: "Why do maps show ecological indicators?",
    answer:
      "Rodent and climate layers can provide context, but they do not prove human cases. Confirmed outbreak information and environmental context are shown separately.",
  },
];

export const outbreaks: OutbreakRegion[] = [
  {
    slug: "multi-country-cruise-cluster",
    name: "Cruise-linked multi-country cluster",
    location: "Atlantic travel route",
    riskLevel: "active",
    coordinates: [-24.5, 14.9],
    lastUpdated: "2026-05-07",
    summary:
      "WHO has reported a multi-country cluster of severe respiratory illness linked to cruise ship travel, with confirmed hantavirus infection in tested patients.",
    source: "WHO Disease Outbreak News",
    sourceUrl: "https://www.who.int/emergencies/disease-outbreak-news",
    cases: 8,
    deaths: 3,
  },
  {
    slug: "western-united-states",
    name: "Western United States",
    location: "United States",
    riskLevel: "watch",
    coordinates: [-111.8, 39.5],
    lastUpdated: "2024-06-26",
    summary:
      "CDC surveillance shows U.S. hantavirus disease is uncommon and historically concentrated west of the Mississippi River.",
    source: "CDC reported cases",
    sourceUrl: "https://www.cdc.gov/hantavirus/data-research/cases/index.html",
    cases: 864,
  },
  {
    slug: "european-union-eea",
    name: "EU/EEA surveillance area",
    location: "Europe",
    riskLevel: "watch",
    coordinates: [10.4, 51.2],
    lastUpdated: "2024-12-01",
    summary:
      "ECDC surveillance and annual reports provide periodic European case data, especially for regions where Puumala virus circulates.",
    source: "ECDC Surveillance Atlas",
    sourceUrl: "https://www.ecdc.europa.eu/en/surveillance-atlas-infectious-diseases",
  },
];

export const trendData: MetricPoint[] = [
  { year: 2018, infections: 2100, deaths: 56, countries: 24 },
  { year: 2019, infections: 2450, deaths: 61, countries: 25 },
  { year: 2020, infections: 3850, deaths: 74, countries: 26 },
  { year: 2021, infections: 4860, deaths: 82, countries: 29 },
  { year: 2022, infections: 3200, deaths: 66, countries: 27 },
  { year: 2023, infections: 4100, deaths: 71, countries: 28 },
];

export const researchPapers = [
  {
    title: "WHO Hantavirus Outbreak Toolbox",
    source: "WHO",
    url: "https://www.who.int/emergencies/outbreak-toolkit/disease-outbreak-toolboxes/hantavirus-outbreak-toolbox",
    summary:
      "Operational references for outbreak investigation, case definitions, laboratory confirmation, and response resources.",
    reviewed: true,
  },
  {
    title: "CDC clinician overview for HPS",
    source: "CDC",
    url: "https://www.cdc.gov/hantavirus/hcp/clinical-overview/hps.html",
    summary:
      "Clinical context for compatible symptoms, exposure history, reporting, and supportive care escalation.",
    reviewed: true,
  },
  {
    title: "ECDC annual epidemiological reports",
    source: "ECDC",
    url: "https://www.ecdc.europa.eu/en/hantavirus-infection/surveillance-and-disease-data",
    summary:
      "Periodic European surveillance reports and access paths for EU/EEA trend data.",
    reviewed: true,
  },
];

export const locationPages: LocationPage[] = [
  {
    slug: "germany",
    title: "Hantavirus in Germany",
    question: "What is the hantavirus risk in Germany?",
    riskLevel: "watch",
    lastReviewed: "2026-05-07",
    summary:
      "Germany is part of European hantavirus surveillance, where reported disease is often associated with rodent ecology and seasonal/regional patterns.",
    preventionNote:
      "Use safe rodent cleanup practices in sheds, cabins, garages, and rural storage areas; follow local public health updates during high-activity seasons.",
    sourceUrl: "https://www.ecdc.europa.eu/en/surveillance-atlas-infectious-diseases",
  },
  {
    slug: "california",
    title: "Hantavirus cases in California",
    question: "Are there hantavirus cases in California?",
    riskLevel: "watch",
    lastReviewed: "2026-05-07",
    summary:
      "California has documented hantavirus risk in areas where deer mice and human exposure overlap. Official state and county health departments are the best local sources.",
    preventionNote:
      "Take extra care when opening seasonal cabins, cleaning garages, or camping in areas with signs of rodents.",
    sourceUrl: "https://www.cdc.gov/hantavirus/data-research/cases/index.html",
  },
  {
    slug: "thailand",
    title: "Can you get hantavirus in Thailand?",
    question: "Can you get hantavirus in Thailand?",
    riskLevel: "low",
    lastReviewed: "2026-05-07",
    summary:
      "General rodent-exposure precautions apply when traveling, but this page does not identify a current confirmed hantavirus outbreak in Thailand.",
    preventionNote:
      "Avoid rodent-contaminated spaces, keep food sealed, and follow local health authority guidance if an outbreak is reported.",
    sourceUrl: "https://www.who.int/news-room/fact-sheets/detail/hantavirus",
  },
];

export const sourceDirectory = officialSources;
