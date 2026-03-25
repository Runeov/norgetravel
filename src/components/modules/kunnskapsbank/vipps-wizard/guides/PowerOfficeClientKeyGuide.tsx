'use client';

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { BookOpen, ChevronUp, ChevronDown, Key, X, ZoomIn } from 'lucide-react';

import { integrationPartners } from '../constants';

// Desktop images
import PowerofficeSteg1 from '../images/Poweroffice_steg_1.png';
import PowerofficeSteg2 from '../images/Poweroffice_steg_2.png';
import PowerofficeSteg3 from '../images/Poweroffice_steg_3_Emonkey_klientnøkkel.png';

// Mobile images (optional - will fall back to desktop if not available)
// import PowerofficeSteg1Mobile from '../images/Poweroffice_steg_1_mobile.png';
// import PowerofficeSteg2Mobile from '../images/Poweroffice_steg_2_mobile.png';
// import PowerofficeSteg3Mobile from '../images/Poweroffice_steg_3_mobile.png';

interface Props {
  integrationPartner?: string;
}

// ============================================
// ResponsiveGuideImage Component (embedded)
// ============================================
interface OverlayConfig {
  text: string;
  top: string;
  left: string;
  bgColor?: string;
  textColor?: string;
}

interface ResponsiveGuideImageProps {
  desktopSrc: StaticImageData;
  mobileSrc?: StaticImageData;
  alt: string;
  showZoomHint?: boolean;
  caption?: string;
  overlay?: OverlayConfig;
}

function ResponsiveGuideImage({ 
  desktopSrc, 
  mobileSrc, 
  alt, 
  showZoomHint = true,
  caption,
  overlay
}: ResponsiveGuideImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mobileImageFailed, setMobileImageFailed] = useState(false);

  const mobileImage = (mobileSrc && !mobileImageFailed) ? mobileSrc : desktopSrc;
  const hasDedicatedMobileImage = mobileSrc && !mobileImageFailed;

  const OverlayText = () => {
    if (!overlay) return null;
    return (
      <span 
        className="absolute text-sm font-medium px-3 py-1 rounded whitespace-nowrap pointer-events-none"
        style={{ 
          top: overlay.top,
          left: overlay.left,
          transform: 'translate(-50%, -50%)',
          backgroundColor: overlay.bgColor || '#000',
          color: overlay.textColor || '#fff'
        }}
      >
        {overlay.text}
      </span>
    );
  };

  return (
    <>
      <div className="rounded-lg border border-slate-200 bg-slate-50">
        {/* Mobile Image (tap to zoom) */}
        <button
          onClick={() => setIsZoomed(true)}
          className="block md:hidden w-full text-left group relative"
          aria-label={`${alt} - Trykk for å forstørre`}
        >
          <Image
            src={mobileImage}
            alt={alt}
            className="w-full h-auto rounded-md"
            sizes="100vw"
            placeholder="blur"
            onError={() => {
              if (mobileSrc) setMobileImageFailed(true);
            }}
          />
          <OverlayText />
          {showZoomHint && hasDedicatedMobileImage && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/70 text-white text-xs px-2 py-1 rounded-full opacity-80">
              <ZoomIn className="w-3 h-3" aria-hidden="true" />
              <span>Trykk for å forstørre</span>
            </div>
          )}
        </button>

        {/* Desktop Image */}
        <div className="hidden md:block relative">
          <Image
            src={desktopSrc}
            alt={alt}
            className="w-full h-auto rounded-md"
            sizes="(max-width: 768px) 100vw, 700px"
            placeholder="blur"
            style={{ maxHeight: '300px', objectFit: 'contain' }}
          />
          <OverlayText />
        </div>

        {caption && (
          <p className="text-xs mt-2 text-center text-slate-500">{caption}</p>
        )}
      </div>

      {/* Fullscreen Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex flex-col cursor-pointer"
          onClick={() => setIsZoomed(false)}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsZoomed(false)}
              className="text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Lukk"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <div className="relative inline-block">
              <Image
                src={mobileImage}
                alt={alt}
                className="rounded-lg"
                sizes="200vw"
                placeholder="blur"
                style={{ 
                  width: `${Math.round(mobileImage.width * 0.7)}px`,
                  maxWidth: 'none',
                  maxHeight: '100vh',
                  height: 'auto'
                }}
              />
              <OverlayText />
            </div>
          </div>
          <div className="text-center pb-4 text-white/60 text-sm">
            Dra for å se detaljer • Trykk hvor som helst for å lukke
          </div>
        </div>
      )}
    </>
  );
}

// ============================================
// Main Component
// ============================================
export function PowerOfficeClientKeyGuide({ integrationPartner }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  // Get partner configuration
  const getPartnerConfig = () => {
    switch(integrationPartner) {
      case 'iizy':
        return {
          name: 'iizy',
          extensionName: 'iizy fakturaintegrasjon',
          color: '#7c3aed'
        };
      case 'emonkey':
        return {
          name: 'eMonkey',
          extensionName: 'Vipps - Levert av eMonkey',
          color: '#059669'
        };
      case 'srh':
        return {
          name: 'SNN Regnskapshuset',
          extensionName: 'SNN RH - Vipps',
          color: '#dc2626'
        };
      default:
        return {
          name: integrationPartners.find((p) => p.id === integrationPartner)?.name || 'Din partner',
          extensionName: 'Din integrasjon',
          color: '#3b82f6'
        };
    }
  };

  const partnerConfig = getPartnerConfig();

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-purple-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-purple-600" aria-hidden="true" />
          <span className="font-semibold text-purple-900">
            📖 Hvordan hente Client Key fra PowerOffice Go
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-purple-600" aria-hidden="true" />
        ) : (
          <ChevronDown className="w-5 h-5 text-purple-600" aria-hidden="true" />
        )}
      </button>

      {isOpen && (
        <div className="px-6 py-6 bg-white border-t border-purple-200 space-y-6">
          
          {/* Header */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2 text-slate-900">
              Hent Client Key for {partnerConfig.name}
            </h3>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto">
              For å fullføre integrasjonen trenger vi din <strong>Client Key</strong> fra PowerOffice Go.
              Følg stegene under.
            </p>
          </div>

          {/* Partner Badge */}
          <div className="flex justify-center">
            <span 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium"
              style={{ backgroundColor: partnerConfig.color }}
            >
              <Key className="w-4 h-4" aria-hidden="true" />
              {partnerConfig.extensionName}
            </span>
          </div>

          {/* Step 1 - Login */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-purple-600" />
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-900 font-bold text-xl">1</span>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold mb-2">Logg inn på PowerOffice Go</h4>
                <p className="text-slate-600">
                  Gå til{' '}
                  <a
                   href="https://go.poweroffice.net"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-purple-700 underline hover:text-purple-900"
                 >
                   go.poweroffice.net<span className="sr-only"> (åpnes i ny fane)</span>
                 </a>{' '}
                  og logg inn. Du må ha administratorrettigheter.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 - Meny -> Innstillinger */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-slate-200" />
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-900 font-bold text-xl">2</span>
              </div>
              <div className="flex-1 w-full">
                <h4 className="text-xl font-bold mb-2">Klikk Meny → Innstillinger</h4>
                <p className="text-slate-600 mb-4">
                  Åpne menyen øverst og velg <strong>Innstillinger</strong> under «Administrer».
                </p>
                <ResponsiveGuideImage
                  desktopSrc={PowerofficeSteg1}
                  alt="PowerOffice Go: Meny → Innstillinger"
                />
              </div>
            </div>
          </div>

          {/* Step 3 - System -> Utvidelser */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-slate-200" />
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-900 font-bold text-xl">3</span>
              </div>
              <div className="flex-1 w-full">
                <h4 className="text-xl font-bold mb-2">System → Utvidelser</h4>
                <p className="text-slate-600 mb-4">
                  Under <strong>System</strong>-seksjonen, klikk på <strong>Utvidelser</strong>.
                </p>
                <ResponsiveGuideImage
                  desktopSrc={PowerofficeSteg2}
                  alt="PowerOffice Go: System → Utvidelser"
                />
              </div>
            </div>
          </div>

          {/* Step 4 - Legg til utvidelse */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-slate-200" />
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-900 font-bold text-xl">4</span>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold mb-2">Klikk «Legg til utvidelse»</h4>
                <p className="text-slate-600">
                  Klikk på knappen <strong>Legg til utvidelse</strong> for å åpne dialogen.
                </p>
              </div>
            </div>
          </div>

          {/* Step 5 - Kopier Client Key */}
          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg relative overflow-hidden text-white">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-400" />
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-xl">5</span>
              </div>
              <div className="flex-1 w-full">
                <h4 className="text-xl font-bold mb-2 text-white">Kopier Client Key og bekreft</h4>
                <p className="text-slate-300 mb-4">
                  Søk etter <strong style={{ color: partnerConfig.color }}>{partnerConfig.extensionName}</strong>, 
                  kopier <strong>Klientnøkkel</strong>-verdien, og klikk <strong>Ok</strong>.
                </p>
                <ResponsiveGuideImage
                  desktopSrc={PowerofficeSteg3}
                  alt="PowerOffice Go: Kopier Client Key"
                  overlay={{
                    text: partnerConfig.name,
                    top: '12%',
                    left: '65%',
                    bgColor: partnerConfig.color
                  }}
                />
              </div>
            </div>
          </div>

          {/* Success Info */}
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                ✓
              </div>
              <div>
                <h4 className="font-semibold text-green-900">Lim inn Client Key i feltet under</h4>
                <p className="text-green-800 text-sm mt-1">
                  Når du har kopiert klientnøkkelen, lim den inn i «Client Key»-feltet nedenfor.
                </p>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="text-center pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              Trenger du hjelp?{' '}
              <a 
                href="mailto:support@averdi.no" 
                className="text-purple-600 underline hover:text-purple-800"
              >
                Kontakt Averdi support
              </a>
            </p>
          </div>

        </div>
      )}
    </div>
  );
}