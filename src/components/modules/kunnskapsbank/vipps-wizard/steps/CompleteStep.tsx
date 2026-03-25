import React from 'react';
import { Check, Download, ExternalLink } from 'lucide-react';
import { WizardConfig } from '../types';
import { TroubleshootingGuide } from '../guides';

interface Props {
  config: WizardConfig;
  openExampleJson: () => void;
  generateImplementationGuide: () => void;
  sendToAverdi: () => void;
}

export function CompleteStep({
  config,
  openExampleJson,
  generateImplementationGuide,
  sendToAverdi
}: Props) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
          <Check className="w-10 h-10 text-white" aria-hidden="true" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Setup Complete!</h2>
        <p className="text-lg text-gray-600">Your configuration is ready</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Configuration Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Organization:</span>
            <span className="font-medium">{config.companyName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Accounting System:</span>
            <span className="font-medium capitalize">{config.accountingSystem}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Integration Partner:</span>
            <span className="font-medium capitalize">{config.integrationPartner}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={openExampleJson}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <ExternalLink className="w-5 h-5" aria-hidden="true" />
          Open Demo Config (ExampleOfJson.html)
        </button>

        <button
          onClick={generateImplementationGuide}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <Download className="w-5 h-5" aria-hidden="true" />
          Download Implementation Guide (TXT)
        </button>

        <button
          onClick={sendToAverdi}
          className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <Check className="w-5 h-5" aria-hidden="true" />
          Email Configuration to Averdi
        </button>
      </div>

      <TroubleshootingGuide />
    </div>
  );
}

