'use client';

import { FeatureTabs, type FeatureTabItem } from '@/components/ui/FeatureTabs';
import { AverdiBackground } from '@/components/modules/AverdiBackground'; 

interface TemplateFeatureSectionProps {
  // Unik ID for at MCP-serveren skal kunne identifisere denne seksjonen ved scraping/validering
  mcpId?: string; 
  title?: string;
  subtitle?: string;
}

export default function TemplateFeatureSection({ 
  mcpId = "mcp-template-section", // Default ID hvis ingen sendes med
  title = "Tittel her",
  subtitle = "Undertittel her"
}: TemplateFeatureSectionProps) {

  // DATA-KONFIGURASJON
  // OBS: For at JSX (<span>..) skal fungere i 'content' og 'bullets', 
  // må FeatureTabItem i FeatureTabs.tsx ha typen 'string | React.ReactNode' på disse feltene.
  const items: FeatureTabItem[] = [
    {
      id: "tab-1",
      title: "Fane 1",
      shortDesc: "Kort beskrivelse",
      icon: "https://placehold.co/100x100/png", // Placeholder
      content: (
        <span>
          Dette er hovedteksten. Hvis du har data som endres ofte (f.eks. satser), 
          kan du markere det slik for MCP-kontroll: 
          Pris: <span id={`${mcpId}-price-val`} className="font-bold">14.1%</span>
        </span>
      ) as any, // 'as any' forbigår type-sjekk midlertidig hvis typen er satt til string
      bullets: [
        "Punkt 1",
        "Punkt 2",
        <span key="3">Punkt med <strong id={`${mcpId}-bullet-val`}>live data</strong></span> as any
      ],
      link: "/din-lenke",
      linkText: "Les mer"
    },
    {
      id: "tab-2",
      title: "Fane 2",
      shortDesc: "Kort beskrivelse",
      icon: "https://placehold.co/100x100/png",
      content: "Innhold for fane 2...",
      bullets: ["Punkt A", "Punkt B"],
      link: "/din-lenke-2"
    }
  ];

  return (
    // ID attributtet her er kroken MCP-serveren ser etter
    <section id={mcpId} className="py-24 relative overflow-hidden bg-white" data-mcp-status="active">
      <AverdiBackground />
      
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E86C1F]/10 text-[#E86C1F] text-sm font-medium mb-4">
            Kategori
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-slate-900">
            {title}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Tabs Component */}
        <FeatureTabs 
          items={items} 
          themeColor="#E86C1F" 
        />

      </div>
    </section>
  );
}