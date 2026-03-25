'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { WizardConfig } from './types';
import { modules, integrationPartners, initialConfig } from './constants';
import {
  WelcomeStep,
  AccountingSystemStep,
  ModulesStep,
  OrganizationInfoStep,
  IntegrationPartnerStep,
  VippsCredentialsStep,
  AccountingApiStep,
  AccountMappingStep,
  CompleteStep
} from './steps';

export function VippsSetupWizard() {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<WizardConfig>(initialConfig);

  // Keep the top of the wizard ("magnet") in view when moving between steps,
  // especially on mobile where focus/keyboard can leave the scroll position far down.
  const wizardTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait until the next paint(s) so the new step content has mounted and layout is stable.
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        wizardTopRef.current?.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
      });
    });
  }, [step]);

  const buildConfigData = (cfg: WizardConfig) => {
    return {
      version: '2.0',
      metadata: {
        created: new Date().toISOString(),
        wizard: 'Vipps-PowerOffice Integration Setup'
      },
      company: {
        name: cfg.companyName,
        orgNumber: cfg.orgNumber,
        type: cfg.organizationType
      },
      vipps: {
        clientId: cfg.integrationPartner === 'emonkey' ? 'HANDLED_BY_EMONKEY' : cfg.vippsClientId,
        merchantSerialNumber: cfg.vippsMerchantSerialNumber,
        subscriptionKey: cfg.integrationPartner === 'emonkey'
          ? 'NOT_REQUIRED_FOR_EMONKEY'
          : (cfg.vippsSubscriptionKey || 'NOT_PROVIDED'),
        environment: 'production',
        apiVersion: 'v2',
        products: modules
          .filter(m => cfg.modules.includes(m.id) || m.required)
          .map(m => m.vippsProduct)
          .filter(Boolean)
      },
      accounting: {
        system: cfg.accountingSystem,
        integrationPartner: cfg.integrationPartner,
        accounts: cfg.accounts,
        mva: cfg.mvaSettings,
        features: cfg.features
      },
      modules: cfg.modules,
      authentication: {
        vipps: {
          method: 'OAuth 2.0',
          tokenEndpoint: 'https://api.vipps.no/accesstoken/get'
        },
        poweroffice: {
          method: 'OAuth 2.0 Client Credentials',
          tokenEndpoint: 'https://goapi.poweroffice.net/OAuth/Token'
        }
      }
    };
  };

  const normalizePartnerConfirmation = (value: string) => {
    return value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/\s+as\.?$/i, '')
      .replace(/[^a-z0-9 ]/g, '')
      .trim();
  };

  const blurActiveElement = () => {
    const el = document.activeElement;
    if (el instanceof HTMLElement) el.blur();
  };

  // State updaters
  const updateConfig = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const updateNested = (parent: string, key: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [parent]: { ...(prev as any)[parent], [key]: value }
    }));
  };

  const toggleModule = (moduleId: string) => {
    setConfig(prev => ({
      ...prev,
      modules: prev.modules.includes(moduleId)
        ? prev.modules.filter(m => m !== moduleId)
        : [...prev.modules, moduleId]
    }));
  };

  // Validation
  const canProceed = (): boolean => {
    switch (step) {
      case 0: return true;
      case 1: return config.accountingSystem !== '';
      case 2: return config.modules.length > 0;
      case 3: return !!(config.companyName && config.orgNumber && config.organizationType);
      case 4: return config.integrationPartner !== '';
      case 5:
        {
          const partner = integrationPartners.find(p => p.id === config.integrationPartner);
          const expected = [partner?.id, partner?.name].filter(Boolean)
            .map(v => normalizePartnerConfirmation(String(v)));
          const provided = normalizePartnerConfirmation(config.vippsSubscriptionKey || '');
          const isPartnerConfirmed = expected.includes(provided);

          return config.integrationPartner === 'emonkey'
          ? !!(config.vippsMerchantSerialNumber && isPartnerConfirmed)
          : !!(config.vippsClientId && config.vippsClientSecret && config.vippsMerchantSerialNumber);
        }
      case 6: return !!config.accountingApiSecret; // Only Client Key required now
      case 7: return true;
      case 8: return true;
      default: return true;
    }
  };

  // File generation functions
  const generateConfigFile = () => {
    const configData = buildConfigData(config);

    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vipps-integration-${config.orgNumber}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Demo helper: store JSON in localStorage and open the example page.
  const openExampleJson = () => {
    const configData = buildConfigData(config);
    const json = JSON.stringify(configData, null, 2);

    localStorage.setItem('vippsWizardConfigJson', json);
    localStorage.setItem('vippsWizardConfigJsonUpdatedAt', new Date().toISOString());

    window.open('/kunnskapsbank/bedrifter/vipps-integrasjon/example-json', '_blank', 'noopener,noreferrer');
  };

  const generateImplementationGuide = () => {
    const partner = integrationPartners.find(p => p.id === config.integrationPartner);
    const activeModules = modules.filter(m => config.modules.includes(m.id) || m.required);
    const guide = generateGuideText(config, partner, activeModules);

    const blob = new Blob([guide], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `implementation-guide-${config.orgNumber}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sendToAverdi = () => {
    const emailBody = `Hello Averdi Accounting Team,

I have completed the Vipps MobilePay integration setup wizard.

Organization: ${config.companyName}
Org. Number: ${config.orgNumber}
Integration Partner: ${integrationPartners.find(p => p.id === config.integrationPartner)?.name}

I will send the full configuration file separately via secure channel.

Best regards`;

    const mailtoLink = `mailto:support@averdi.no?subject=Vipps Integration Setup - ${config.companyName} (${config.orgNumber})&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  };

  // Step definitions
  const steps = [
    { title: 'Welcome', component: <WelcomeStep /> },
    {
      title: 'Accounting System',
      component: <AccountingSystemStep config={config} updateConfig={updateConfig} />
    },
    {
      title: 'Select Modules',
      component: <ModulesStep config={config} modules={modules} toggleModule={toggleModule} />
    },
    {
      title: 'Organization Info',
      component: <OrganizationInfoStep config={config} updateConfig={updateConfig} />
    },
    {
      title: 'Integration Partner',
      component: <IntegrationPartnerStep config={config} updateConfig={updateConfig} integrationPartners={integrationPartners} />
    },
    {
      title: 'Vipps Credentials',
      component: <VippsCredentialsStep config={config} updateConfig={updateConfig} />
    },
    {
      title: 'Accounting API',
      component: <AccountingApiStep config={config} updateConfig={updateConfig} />
    },
    {
      title: 'Account Mapping',
      component: <AccountMappingStep config={config} updateNested={updateNested} />
    },
    {
      title: 'Complete',
      component: (
        <CompleteStep
          config={config}
          openExampleJson={openExampleJson}
          generateImplementationGuide={generateImplementationGuide}
          sendToAverdi={sendToAverdi}
        />
      )
    }
  ];

  return (
    <div className="p-8">
      {/* Anchor for step-to-step scroll behavior */}
      <div ref={wizardTopRef} className="scroll-mt-24" />
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((s, idx) => (
            <div key={idx} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${
                idx < step ? 'bg-green-500 text-white' :
                idx === step ? 'bg-orange-500 text-white' :
                'bg-gray-300 text-gray-600'
              }`}>
                {idx < step ? <Check className="w-5 h-5" aria-hidden="true" /> : idx + 1}
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 ${idx < step ? 'bg-green-500' : 'bg-gray-300'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-sm text-gray-600 text-center">
          Step {step + 1} of {steps.length}: {steps[step].title}
        </div>
      </div>

      {/* Main Content */}
      <div className="mb-6">
        {steps[step].component}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <button
          onClick={() => {
            blurActiveElement();
            setStep(step - 1);
          }}
          disabled={step === 0}
          className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          Back
        </button>

        {step < steps.length - 1 ? (
          <button
            onClick={() => {
              blurActiveElement();
              setStep(step + 1);
            }}
            disabled={!canProceed()}
            className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        ) : (
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
          >
            Start New Setup
          </button>
        )}
      </div>
    </div>
  );
}

// Implementation guide text generator (kept separate for readability)
function generateGuideText(config: WizardConfig, partner: any, activeModules: any[]) {
  return `
VIPPS MOBILEPAY INTEGRATION - IMPLEMENTATION GUIDE
Generated: ${new Date().toLocaleDateString('nb-NO')} ${new Date().toLocaleTimeString('nb-NO')}
==============================================================================

CLIENT INFORMATION
------------------
Organization: ${config.companyName}
Org. Number: ${config.orgNumber}
Type: ${config.organizationType}

INTEGRATION CONFIGURATION
--------------------------
Accounting System: ${config.accountingSystem === 'poweroffice' ? 'PowerOffice Go' : '24SevenOffice'}
Integration Partner: ${partner?.name || config.integrationPartner}

ACTIVE MODULES
--------------
${activeModules.map(m => `• ${m.name}`).join('\n')}

ACCOUNT MAPPING (NS 4102)
--------------------------
Vipps Interim (Mellomregning): ${config.accounts.vippsInterim}
Bank Account: ${config.accounts.bankAccount}
Sales Income (VAT Free): ${config.accounts.salesIncome}
Sales Income (VAT 25%): ${config.accounts.salesIncomeMVA}
Bank & Card Fees: ${config.accounts.fees}
Rounding Differences: ${config.accounts.roundingDiff}

VIPPS API CREDENTIALS
--------------------------------------------------
Merchant Serial Number (MSN): ${config.vippsMerchantSerialNumber}

POWEROFFICE GO
------------------------------
Client Key: [REDACTED - See encrypted config file]

CONTACT INFORMATION
-------------------
Averdi Accounting: support@averdi.no

==============================================================================
Generated by Vipps Integration Setup Wizard v2.0
==============================================================================
`;
}
