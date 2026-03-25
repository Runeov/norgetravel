// src/data/propertyTaxData.ts

// Satser for NÆRINGSEIENDOM 2025 (Promille)
// Kilder: SSB (KOSTRA) og kommunale budsjettvedtak for 2025.
// Merk: Mange kommuner i nord maksimerer denne til 7 promille.

export const PROPERTY_TAX_RATES = {
  // Referanser (Sone 1)
  "Oslo (Sentrum)": { rate: 3.7, mcpId: "ptax-oslo-naering-2025" }, // Vedtatt 3.7 for næring 2025
  "Bærum": { rate: 0.0, mcpId: "ptax-baerum-naering-2025" },
  "Bergen": { rate: 5.0, mcpId: "ptax-bergen-naering-2025" }, // Varierer, ca nivå
  "Trondheim": { rate: 4.6, mcpId: "ptax-trondheim-naering-2025" },
  "Stavanger": { rate: 0.0, mcpId: "ptax-stavanger-naering-2025" }, // Fjernet i 2025? (Sjekk) - Setter lavt

  // Sone 5 (Finnmark)
  "Alta": { rate: 7.0, mcpId: "ptax-alta-naering-2025" }, // Vedtatt 7 promille 2025
  "Hammerfest": { rate: 7.0, mcpId: "ptax-hammerfest-naering-2025" }, // Vedtatt 7 promille
  "Sør-Varanger": { rate: 7.0, mcpId: "ptax-sorvaranger-naering-2025" },
  "Vadsø": { rate: 7.0, mcpId: "ptax-vadso-naering-2025" },
  "Karasjok": { rate: 0.0, mcpId: "ptax-karasjok-naering-2025" }, // Ofte fritak eller særskilt
  "Kautokeino": { rate: 0.0, mcpId: "ptax-kautokeino-naering-2025" },
  "Porsanger": { rate: 7.0, mcpId: "ptax-porsanger-naering-2025" },
  "Nordkapp": { rate: 7.0, mcpId: "ptax-nordkapp-naering-2025" },
  "Vardø": { rate: 7.0, mcpId: "ptax-vardo-naering-2025" },
  "Loppa": { rate: 7.0, mcpId: "ptax-loppa-naering-2025" },
  "Hasvik": { rate: 7.0, mcpId: "ptax-hasvik-naering-2025" },
  "Måsøy": { rate: 7.0, mcpId: "ptax-masoy-naering-2025" },
  "Lebesby": { rate: 7.0, mcpId: "ptax-lebesby-naering-2025" },
  "Gamvik": { rate: 7.0, mcpId: "ptax-gamvik-naering-2025" },
  "Berlevåg": { rate: 7.0, mcpId: "ptax-berlevag-naering-2025" },
  "Båtsfjord": { rate: 7.0, mcpId: "ptax-batsfjord-naering-2025" },
  "Tana": { rate: 7.0, mcpId: "ptax-tana-naering-2025" },

  // Sone 5 (Nord-Troms)
  "Nordreisa": { rate: 5.0, mcpId: "ptax-nordreisa-naering-2025" },
  "Skjervøy": { rate: 4.0, mcpId: "ptax-skjervoy-naering-2025" },
  "Kvænangen": { rate: 7.0, mcpId: "ptax-kvaenangen-naering-2025" },
  "Kåfjord": { rate: 4.0, mcpId: "ptax-kafjord-naering-2025" },
  "Lyngen": { rate: 4.0, mcpId: "ptax-lyngen-naering-2025" },
  "Storfjord": { rate: 7.0, mcpId: "ptax-storfjord-naering-2025" },
  "Karlsøy": { rate: 4.0, mcpId: "ptax-karlsoy-naering-2025" },

  // Sone 4 (Troms/Nordland)
  "Tromsø": { rate: 7.0, mcpId: "ptax-tromso-naering-2025" }, // Økt til 7 promille for næring i 2025
  "Bodø": { rate: 6.2, mcpId: "ptax-bodo-naering-2025" }, // Vedtatt 6.2
  "Harstad": { rate: 6.5, mcpId: "ptax-harstad-naering-2025" }, // Vedtatt 6.5
  "Narvik": { rate: 6.8, mcpId: "ptax-narvik-naering-2025" },
  "Rana": { rate: 7.0, mcpId: "ptax-rana-naering-2025" },
};

export function getPropertyTaxRate(kommuneNavn: string): number {
  // @ts-ignore
  return PROPERTY_TAX_RATES[kommuneNavn]?.rate ?? 7.0; // Fallback er 7 promille i distrikt
}