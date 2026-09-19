import travelJson from './travel.json';

export interface TravelStats {
  countries: number;
  territories: number;
  regions: number;
  cities: number;
  attractions: number;
  worldRegions: number;
  worldRegionsTotal: number;
  worldPct: number;
}

export const travelStats: TravelStats = travelJson;