'use client';

import { useEffect, useRef } from 'react';

interface AviasalesWidgetProps {
  /** The full src URL of the Travelpayouts/Aviasales script */
  scriptSrc: string;
  className?: string;
}

export function AviasalesWidget({ scriptSrc, className = '' }: AviasalesWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing children to prevent duplicate injections on re-renders (like in React StrictMode)
    containerRef.current.innerHTML = '';

    // Create the script element
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    script.charset = 'utf-8';

    // Append it to our container
    containerRef.current.appendChild(script);

    return () => {
      // Cleanup if component unmounts
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [scriptSrc]);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div ref={containerRef} className="aviasales-widget-container" />
    </div>
  );
}
