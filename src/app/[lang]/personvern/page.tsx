import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | NorgeTravel.com',
  description: 'Privacy policy for NorgeTravel.com — what data we collect and your rights under GDPR.',
};

export default function PersonvernPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
      <p className="text-slate-500 mb-10">Last updated: March 2026</p>

      <section className="prose prose-slate max-w-none space-y-10 text-slate-700">

        {/* 1. Data controller */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Data controller</h2>
          <p>
            NorgeTravel.com is the data controller for personal data processed via this website.
          </p>
          <ul className="mt-3 space-y-1 list-none pl-0">
            <li><span className="font-medium">Website:</span> norgetravel.com</li>
            <li>
              <span className="font-medium">Email:</span>{' '}
              <a href="mailto:hello@norgetravel.com" className="text-[#1B3A5C] hover:underline">hello@norgetravel.com</a>
            </li>
          </ul>
        </div>

        {/* 2. What data we collect */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">2. What personal data do we collect?</h2>
          <p>We collect the following categories of personal data:</p>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li>
              <span className="font-medium">Contact form:</span> name, email address, phone number (optional), and the content of your message.
            </li>
            <li>
              <span className="font-medium">Usage analytics (consent only):</span> anonymised data about visits, page views, and scrolling via Hotjar. No data is linked to identifiable individuals.
            </li>
          </ul>
        </div>

        {/* 3. Cookies */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Cookies</h2>
          <p className="mb-4">This website uses the following cookies:</p>
          <div className="overflow-x-auto rounded border border-slate-200">
            <table className="w-full text-sm text-left">
              <caption className="sr-only">Cookies used on norgetravel.com</caption>
              <thead className="bg-slate-100 text-slate-600 uppercase text-xs">
                <tr>
                  <th scope="col" className="px-4 py-3">Name</th>
                  <th scope="col" className="px-4 py-3">Type</th>
                  <th scope="col" className="px-4 py-3">Purpose</th>
                  <th scope="col" className="px-4 py-3">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-4 py-3 font-mono">cookie-consent</td>
                  <td className="px-4 py-3">Necessary</td>
                  <td className="px-4 py-3">Remembers your consent choice</td>
                  <td className="px-4 py-3">Until browser storage cleared</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="px-4 py-3 font-mono">_hjSession*</td>
                  <td className="px-4 py-3">Analytics (Hotjar)</td>
                  <td className="px-4 py-3">Anonymised page usage analysis</td>
                  <td className="px-4 py-3">Session / 1 year</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono">_hjSessionUser*</td>
                  <td className="px-4 py-3">Analytics (Hotjar)</td>
                  <td className="px-4 py-3">Identifies anonymous user across visits</td>
                  <td className="px-4 py-3">1 year</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            You can withdraw consent for analytics cookies at any time by clicking &quot;Necessary only&quot; in the cookie banner.
          </p>
        </div>

        {/* 4. Legal basis */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Legal basis</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <span className="font-medium">Analytics cookies (Hotjar):</span> consent (GDPR Art. 6(1)(a)).
            </li>
            <li>
              <span className="font-medium">Necessary cookie (consent preference):</span> legitimate interest in remembering your choice (GDPR Art. 6(1)(f)).
            </li>
            <li>
              <span className="font-medium">Contact form:</span> performance of a contract or pre-contractual steps (GDPR Art. 6(1)(b)).
            </li>
          </ul>
        </div>

        {/* 5. Retention and sharing */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Retention and sharing</h2>
          <p>
            Contact form data is retained only as long as necessary to handle your enquiry — maximum 2 years after last contact.
          </p>
          <p className="mt-3">
            Hotjar data is processed by Hotjar Ltd. (Malta) as a data processor under a data processing agreement. Data is not transferred to third countries without adequate safeguards. See{' '}
            <a href="https://www.hotjar.com/legal/policies/privacy/" target="_blank" rel="noopener noreferrer" className="text-[#1B3A5C] hover:underline">Hotjar&apos;s privacy policy<span className="sr-only"> (opens in new tab)</span></a>{' '}
            for details.
          </p>
          <p className="mt-3">We do not sell personal data to third parties.</p>
        </div>

        {/* 6. Your rights */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Your rights</h2>
          <p>As a data subject you have the right to:</p>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li><span className="font-medium">Access</span> — find out what data we hold about you.</li>
            <li><span className="font-medium">Rectification</span> — request correction of inaccurate data.</li>
            <li><span className="font-medium">Erasure</span> — request deletion (&quot;right to be forgotten&quot;).</li>
            <li><span className="font-medium">Withdraw consent</span> — you may withdraw consent for analytics cookies at any time without affecting the lawfulness of prior processing.</li>
            <li><span className="font-medium">Complain</span> — you have the right to lodge a complaint with <a href="https://www.datatilsynet.no" target="_blank" rel="noopener noreferrer" className="text-[#1B3A5C] hover:underline">Datatilsynet (Norway)<span className="sr-only"> (opens in new tab)</span></a>.</li>
          </ul>
        </div>

        {/* 7. Contact */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Contact us</h2>
          <p>
            For privacy questions or to exercise your rights, contact us at{' '}
            <a href="mailto:hello@norgetravel.com" className="text-[#1B3A5C] hover:underline">hello@norgetravel.com</a>.
          </p>
        </div>

      </section>

      <div className="mt-12 pt-8 border-t border-slate-200">
        <Link href="/" className="text-sm text-[#1B3A5C] hover:underline">← Back to home</Link>
      </div>
    </main>
  );
}
