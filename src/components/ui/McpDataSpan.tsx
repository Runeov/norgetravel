import { cn } from "@/lib/utils";

interface McpDataSpanProps {
  /** Unik ID som matcher nøkkelen MCP-serveren ser etter (f.eks. "aga-sone1-sats") */
  id: string;
  /** Verdien som skal vises (f.eks. 0.141 eller 850000) */
  value: number | string;
  /** Hvordan skal det vises for mennesker? */
  format?: 'percentage' | 'currency' | 'text';
  /** Kilden vi påstår dette kommer fra (for validering) */
  source?: string;
  className?: string;
}

export function McpDataSpan({ 
  id, 
  value, 
  format = 'text', 
  source = "Averdi Internal DB", 
  className 
}: McpDataSpanProps) {
  
  // Formater visningen for mennesker
  let displayValue = value.toString();
  
  if (typeof value === 'number') {
    if (format === 'percentage') {
      displayValue = `${(value * 100).toFixed(1).replace('.', ',')}%`;
    } else if (format === 'currency') {
      displayValue = new Intl.NumberFormat('no-NO', { 
        style: 'currency', 
        currency: 'NOK',
        maximumFractionDigits: 0
      }).format(value);
    }
  }

  return (
    <span 
      id={`mcp-target-${id}`} 
      data-mcp-value={value} // Rådata for maskinlesing
      data-mcp-source={source} // Hvor MCP bør sjekke for å validere
      data-mcp-last-verified={new Date().toISOString().split('T')[0]} // Dato for når koden ble bygget
      className={cn("font-semibold text-slate-900", className)}
    >
      {displayValue}
    </span>
  );
}