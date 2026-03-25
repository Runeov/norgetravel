export interface Expert {
  id: string; // Unik ID (slug) for URL-bruk
  name: string;
  role: string;
  image?: string; // Filnavn i /src/assets/ eller URL
  initials: string; // Fallback hvis bilde mangler
  bio?: string; // Kort biografi for bunn av artikler
  email?: string;
  phone?: string;
  department: "Ledelse" | "Sametinget" | "Bedrift" | "Lønn" | "Rådgivning";
}

// Dette objektet simulerer en CMS-database. 
// Admin kan enkelt redigere tekstene her inntil dere får et fullt CMS.
export const experts: Record<string, Expert> = {
  "ingvald-laiti": {
    id: "ingvald-laiti",
    name: "Ingvald Laiti",
    role: "Statsautorisert regnskapsfører / Daglig leder",
    initials: "IL",
    department: "Ledelse",
    email: "ingvald@averdi.no",
    bio: "Grunnlegger av Averdi. Spesialist på skatterett i tiltakssonen og strategisk bedriftsrådgivning."
  },
  "jan-atle": {
    id: "jan-atle",
    name: "Jan-Atle", // Fyll inn etternavn
    role: "Seniorrådgiver Sametinget",
    initials: "JA",
    department: "Sametinget",
    email: "jan.atle@averdi.no",
    bio: "30+ års erfaring med samiske organisasjoner. Din ekspert på søknadsprosesser og prosjektregnskap mot Sametinget."
  },
  "alida": {
    id: "alida",
    name: "Alida", // Fyll inn etternavn
    role: "Senior Regnskapskonsulent",
    initials: "A",
    department: "Lønn",
    email: "alida@averdi.no",
    bio: "Spesialist på lønnskjøring og HR for foreninger og idrettslag. Sørger for at frivilligheten går rundt."
  },"Hilde-Marie": {
    id: "Hilde-Marie",
    name: "Hilde-Marie",
    role: "Strategisk Rådgiver & Analytiker",
    initials: "EM",
    department: "Rådgivning",
    email: "hml@averdi.no",
    bio: "Spesialist på krysningspunktet mellom samisk samfunnsliv og norsk forvaltning. Forfatter av 'Statens Tilståelse'-rapportene."
  },
  // --- PLASS TIL FLERE ANSATTE (Kopier blokken under for å legge til ny) ---
  "annen-statsautorisert": {
    id: "annen-statsautorisert",
    name: "Navn Etternavn",
    role: "Statsautorisert regnskapsfører",
    initials: "NE",
    department: "Bedrift",
    bio: "Kort tekst om ekspertise..."
  }
};

export const getExpert = (id: string) => experts[id];
export const getAllExperts = () => Object.values(experts);