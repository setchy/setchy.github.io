// Fetches high-level travel stats from the public Skratch share API and writes
// them into src/data/travel.json (consumed by the /travel page). The API needs
// no auth, so this can run locally or in CI. Run: npm run fetch:travel
//
// The stats are derived from what is marked on the Skratch map:
//   - countries      = visited entries that exist in Skratch's country catalog
//   - territories    = visited entries outside the catalog (dependencies, islands)
//   - regions        = marked sub-national regions (states, provinces)
//   - cities         = marked cities
//   - attractions   = marked places / attractions
//   - worldRegions   = how many of Skratch's 10 world regions contain a visited country
//   - worldPct       = share of the 195-country catalog visited
import { writeFileSync } from 'node:fs';

const SHARE_ID = process.env.SKRATCH_SHARE_ID ?? 'N0cBlEVoB8';
const USER_URL = `https://api2.skratch.world/share-api/user/${SHARE_ID}`;
const MAP_URL = 'https://api2.skratch.world/share-api/map';
const TRAVEL_STATS_OUT = new URL('../src/data/travel.json', import.meta.url);

const [userRes, mapRes] = await Promise.all([fetch(USER_URL), fetch(MAP_URL)]);
if (!userRes.ok) throw new Error(`Skratch API responded ${userRes.status} for share id ${SHARE_ID}`);
if (!mapRes.ok) throw new Error(`Skratch API responded ${mapRes.status} for map catalog`);

const data = await userRes.json();
const catalog = await mapRes.json();
const countryCodes = new Set(catalog.map((e) => e.alpha3Code));
const visited = data.visited?.territory ?? [];

const countries = visited.filter((code) => countryCodes.has(code));

const stats = {
  countries: countries.length,
  territories: visited.length - countries.length,
  regions: data.visited?.region?.length ?? 0,
  cities: data.visited?.city?.length ?? 0,
  attractions: data.visited?.place?.length ?? 0,
  worldRegions: new Set(
    countries.map((code) => catalog.find((e) => e.alpha3Code === code)?.territoryWRegion).filter(Boolean),
  ).size,
  worldRegionsTotal: new Set(catalog.map((e) => e.territoryWRegion)).size,
  worldPct: Math.round((countries.length / catalog.length) * 100),
};

writeFileSync(TRAVEL_STATS_OUT, JSON.stringify(stats, null, 2) + '\n');
console.log(
  `Wrote travel stats to ${TRAVEL_STATS_OUT.pathname.split('/').slice(-1)}: ` +
    `${stats.countries} countries, ${stats.territories} territories, ${stats.regions} regions, ${stats.cities} cities`,
);