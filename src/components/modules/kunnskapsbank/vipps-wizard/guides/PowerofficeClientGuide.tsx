'use client';

import React, { useState } from 'react';
import { BookOpen, ChevronUp, ChevronDown, Key, Play, ExternalLink } from 'lucide-react';

import { integrationPartners } from '../constants';

// Video for Client Key retrieval
import PowerOfficeClientKeyVideo from '../Video/PowerOffice_ClientKey.webm';

interface Props {
  integrationPartner?: string;
}

export function PowerOfficeClientKeyGuide({ integrationPartner }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Get partner configuration
  const getPartnerConfig = () => {
    switch(integrationPartner) {
      case 'iizy':
        return {
          name: 'iizy',
          extensionName: 'iizy fakturaintegrasjon',
          color: '#7c3aed' // purple
        };
      case 'emonkey':
        return {
          name: 'eMonkey',
          extensionName: 'Vipps - Levert av eMonkey',
          color: '#059669' // green
        };
      case 'srh':
        return {
          name: 'SNN Regnskapshuset',
          extensionName: 'SNN RH - Vipps',
          color: '#dc2626' // red
        };
      default:
        return {
          name: integrationPartners.find((p) => p.id === integrationPartner)?.name || 'Din partner',
          extensionName: 'Din integrasjon',
          color: '#3b82f6' // blue
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
              Følg videoen under for å hente den ut.
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

          {/* Video Section */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg">
            <div className="p-4 border-b border-slate-700">
              <h4 className="text-white font-semibold flex items-center gap-2">
                <Play className="w-5 h-5 text-purple-400" aria-hidden="true" />
                Video: Slik henter du Client Key
              </h4>
            </div>
            
            <div className="relative aspect-video bg-black">
              <video
                controls
                className="w-full h-full"
                poster=""
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              >
                <source src={PowerOfficeClientKeyVideo} type="video/webm" />
                Din nettleser støtter ikke videoavspilling.
              </video>
              
              {/* Play overlay when not playing */}
              {!isVideoPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 bg-purple-600/80 rounded-full flex items-center justify-center">
                    <Play className="w-10 h-10 text-white ml-1" fill="white" aria-hidden="true" />
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 text-slate-400 text-sm">
              <p>Videoen viser steg-for-steg hvordan du finner og kopierer Client Key fra PowerOffice Go.</p>
            </div>
          </div>

          {/* Quick Steps Summary */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-4">Oppsummering:</h4>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                <span className="text-slate-700">
                  Logg inn på <a href="https://go.poweroffice.net" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline hover:text-purple-800">go.poweroffice.net<span className="sr-only"> (åpnes i ny fane)</span></a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                <span className="text-slate-700">
                  Gå til <strong>Innstillinger</strong> → <strong>Utvidelser (Extensions)</strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                <span className="text-slate-700">
                  Finn <strong style={{ color: partnerConfig.color }}>{partnerConfig.extensionName}</strong> og klikk <strong>Authorize</strong>
                </span>
              </li>
            </ol>
          </div>

          {/* Success Info */}
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                ✓
              </div>
              <div>
                <h4 className="font-semibold text-green-900">Averdi håndterer resten</h4>
                <p className="text-green-800 text-sm mt-1">
                  Når du har godkjent integrasjonen, henter Averdi automatisk Client Key og setter opp tilkoblingen for deg.
                  Du trenger ikke å kopiere eller lagre noen nøkler manuelt.
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