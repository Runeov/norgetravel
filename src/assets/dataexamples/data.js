// --- DATA: propertyTaxData.ts (Mock) ---
// Basert på SSB: Kommuner UTEN eiendomsskatt (utvalg for logikk). 
// De fleste bykommuner HAR eiendomsskatt (2-7 promille).
// Default antagelse: 4 promille for næring hvis ikke spesifisert.

const propertyTaxExceptions = [
    "Os", "Røyrvik", "Tydal", "Vanylven", "Vea", // Eksempler fra SSB-liste over kommuner uten eiendomsskatt
    // Legg til flere fra SSB-listen om nødvendig.
    // Merk: Mange kommuner i Nord-Troms/Finnmark HAR eiendomsskatt for å finansiere velferd,
    // men satsene varierer. Vi antar "Har skatt" som default, men lar bruker justere.
];

const taxRates2026 = {
    wealthTax: 0.01, // Formuesskatt (ca 1%)
    incomeTax_National: 0.22, // 22%
    incomeTax_Zone5: 0.185,   // 18.5% (Tiltakssonen)
    studentLoanWriteDown_Zone5: 60000, // Økt fra 30k til 60k
    studentLoanWriteDown_Zone5_Teacher: 80000, // Lærere (omfattes av tillegg)
    aga_Zone1: 0.141,
    aga_Zone5: 0.00
};