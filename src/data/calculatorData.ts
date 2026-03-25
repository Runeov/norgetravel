// src/data/calculatorData.ts
import { satser2025 } from './agaData';

export interface CalcMunicipality {
  name: string;
  zone: string;
  county: string;
}

export const DESTINATION_MUNICIPALITIES: CalcMunicipality[] = [
  // Sone 5 - Finnmark
  { name: "Alta", zone: "5", county: "Finnmark" },
  { name: "Hammerfest", zone: "5", county: "Finnmark" },
  { name: "Sør-Varanger", zone: "5", county: "Finnmark" },
  { name: "Vadsø", zone: "5", county: "Finnmark" },
  { name: "Karasjok", zone: "5", county: "Finnmark" },
  { name: "Kautokeino", zone: "5", county: "Finnmark" },
  { name: "Porsanger", zone: "5", county: "Finnmark" },
  { name: "Nordkapp", zone: "5", county: "Finnmark" },
  { name: "Vardø", zone: "5", county: "Finnmark" },
  { name: "Tana", zone: "5", county: "Finnmark" },
  { name: "Båtsfjord", zone: "5", county: "Finnmark" },
  { name: "Berlevåg", zone: "5", county: "Finnmark" },
  { name: "Gamvik", zone: "5", county: "Finnmark" },
  { name: "Lebesby", zone: "5", county: "Finnmark" },
  { name: "Måsøy", zone: "5", county: "Finnmark" },
  { name: "Hasvik", zone: "5", county: "Finnmark" },
  { name: "Loppa", zone: "5", county: "Finnmark" },

  // Sone 5 - Nord-Troms
  { name: "Nordreisa", zone: "5", county: "Troms" },
  { name: "Skjervøy", zone: "5", county: "Troms" },
  { name: "Kvænangen", zone: "5", county: "Troms" },
  { name: "Kåfjord", zone: "5", county: "Troms" },
  { name: "Lyngen", zone: "5", county: "Troms" },
  { name: "Storfjord", zone: "5", county: "Troms" },
  { name: "Karlsøy", zone: "5", county: "Troms" },

  // Sone 4 - Utvalgte byer
  { name: "Tromsø", zone: "4", county: "Troms" },
  { name: "Bodø", zone: "4a", county: "Nordland" },
  { name: "Harstad", zone: "4", county: "Troms" },
  { name: "Narvik", zone: "4", county: "Nordland" },
  { name: "Rana", zone: "4", county: "Nordland" },
];

export const ORIGIN_CITIES = [
  { name: "Oslo (Sentrum)", zone: "1" },
  { name: "Bærum", zone: "1" },
  { name: "Bergen", zone: "1" },
  { name: "Trondheim", zone: "1" },
  { name: "Stavanger", zone: "1" },
];

export function getAgaRate(zoneCode: string): number {
  // @ts-ignore
  return satser2025.satser[zoneCode]?.ordinaer || 0.141;
}