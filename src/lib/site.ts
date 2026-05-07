export const site = {
  name: "Hantavirus Prevention",
  domain: "hantavirusprevention.org",
  url: "https://hantavirusprevention.org",
  description:
    "Hantavirus prevention guidance, outbreak updates, case trends, and research summaries.",
  emailFrom: "Hantavirus Prevention <alerts@hantavirusprevention.org>",
};

export const primaryNav = [
  { href: "/what-is-hantavirus", label: "What it is" },
  { href: "/prevention", label: "Prevention" },
  { href: "/map", label: "Risk map" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/news", label: "News" },
  { href: "/research", label: "Research" },
];

export const officialSources = [
  {
    name: "CDC reported U.S. hantavirus cases",
    agency: "CDC",
    url: "https://www.cdc.gov/hantavirus/data-research/cases/index.html",
    cadence: "Periodic",
    priority: 100,
  },
  {
    name: "CDC case definition and reporting",
    agency: "CDC",
    url: "https://www.cdc.gov/hantavirus/php/surveillance/index.html",
    cadence: "Periodic",
    priority: 98,
  },
  {
    name: "CDC prevention guidance",
    agency: "CDC",
    url: "https://www.cdc.gov/hantavirus/prevention/index.html",
    cadence: "Periodic",
    priority: 96,
  },
  {
    name: "WHO hantavirus fact sheet",
    agency: "WHO",
    url: "https://www.who.int/news-room/fact-sheets/detail/hantavirus",
    cadence: "Periodic",
    priority: 95,
  },
  {
    name: "WHO Disease Outbreak News",
    agency: "WHO",
    url: "https://www.who.int/emergencies/disease-outbreak-news",
    cadence: "Near-real-time",
    priority: 94,
  },
  {
    name: "ECDC Surveillance Atlas",
    agency: "ECDC",
    url: "https://www.ecdc.europa.eu/en/surveillance-atlas-infectious-diseases",
    cadence: "Annual/periodic",
    priority: 90,
  },
  {
    name: "NASA POWER climate data",
    agency: "NASA",
    url: "https://power.larc.nasa.gov/docs/tutorials/service-data-request/api/",
    cadence: "Daily/monthly",
    priority: 70,
  },
  {
    name: "NOAA Climate Data Online",
    agency: "NOAA",
    url: "https://www.ncdc.noaa.gov/cdo-web/webservices/v2",
    cadence: "Daily/monthly",
    priority: 68,
  },
  {
    name: "GBIF rodent occurrence data",
    agency: "GBIF",
    url: "https://techdocs.gbif.org/en/openapi/",
    cadence: "Continuous",
    priority: 60,
  },
];

export const sourceDisclaimer =
  "Risk levels summarize available public information and may change as agencies update their reports. This information is not a diagnosis or a substitute for medical care.";
