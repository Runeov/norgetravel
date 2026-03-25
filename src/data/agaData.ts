// Eksisterende interfaces...
export interface Kommune {
  id: string;
  nummer: string;
  navn: string;
  fylke: string;
  sone: string;
  kommentar?: string;
}

// VIKTIG: Vi legger til ID-er her som konstanter
export const MCP_IDS = {
  FRIBELOEP_SONE_1A: "aga-fribeloep-sone1a-2025",
  SATS_SONE_1: "aga-sats-sone1-2025",
  SATS_SONE_1A: "aga-sats-sone1a-2025",
  SATS_SONE_2: "aga-sats-sone2-2025",
  SATS_SONE_3: "aga-sats-sone3-2025",
  SATS_SONE_4: "aga-sats-sone4-2025",
  SATS_SONE_4A: "aga-sats-sone4a-2025",
  SATS_SONE_5: "aga-sats-sone5-2025",
} as const;

export const satser2025 = {
  fribeloep_sone1a: 850000,
  sone1_ref: 0.141,
  satser: {
    "1": { 
      ordinaer: 0.141, 
      landbruk: 0.141, 
      navn: "Sone 1",
      mcpId: MCP_IDS.SATS_SONE_1 
    },
    "1a": { 
      ordinaer: 0.106, 
      landbruk: 0.106, 
      navn: "Sone 1a",
      mcpId: MCP_IDS.SATS_SONE_1A 
    },
    "2": { 
      ordinaer: 0.106, 
      landbruk: 0.106, 
      navn: "Sone 2",
      mcpId: MCP_IDS.SATS_SONE_2 
    },
    "3": { 
      ordinaer: 0.064, 
      landbruk: 0.064, 
      navn: "Sone 3",
      mcpId: MCP_IDS.SATS_SONE_3 
    },
    "4": { 
      ordinaer: 0.051, 
      landbruk: 0.051, 
      navn: "Sone 4",
      mcpId: MCP_IDS.SATS_SONE_4 
    },
    "4a": { 
      ordinaer: 0.079, 
      landbruk: 0.051, 
      navn: "Sone 4a",
      mcpId: MCP_IDS.SATS_SONE_4A 
    },
    "5": { 
      ordinaer: 0.000, 
      landbruk: 0.000, 
      navn: "Sone 5",
      mcpId: MCP_IDS.SATS_SONE_5 
    }
  } as Record<string, { ordinaer: number; landbruk: number; navn: string; mcpId: string }>
};

// ... kommuneListe forblir uendret
export const kommuneListe: Kommune[] = [ /* ... dine data ... */ ];