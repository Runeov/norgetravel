import { Info } from 'lucide-react';

interface CommercialDisclosureProps {
  children: React.ReactNode;
}

export function CommercialDisclosure({ children }: CommercialDisclosureProps) {
  return (
    <p className="flex max-w-[62ch] items-start gap-2 text-xs leading-relaxed text-slate-500">
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
