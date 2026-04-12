import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Accessibility Statement | NorgeTravel.com',
  description: 'NorgeTravel.com accessibility statement under EAA (EU 2019/882). Report accessibility barriers to us.',
};

export default function TilgjengelighetPage() {
  return (
    <main className="flex-1 bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B3A5C] to-[#1B3A5C]/80 text-white py-20 px-4 -mt-20 pt-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-[#5CBFEE] uppercase tracking-widest mb-3">EAA – European Accessibility Act</p>
          <h1 className="text-4xl font-bold mb-4">Accessibility Statement</h1>
          <p className="text-xl text-white/80 leading-relaxed">
            NorgeTravel.com is committed to making this website accessible to everyone, in line with the
            European Accessibility Act (EU 2019/882) and universal design principles.
          </p>
          <p className="mt-6 text-sm text-white/50">Last updated: March 2026</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-14">

        {/* 1. About this statement */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. About this statement</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            This accessibility statement applies to <strong>norgetravel.com</strong> and has been prepared
            in accordance with the European Accessibility Act (EAA, EU 2019/882), effective 28 June 2025,
            and Norwegian law on universal design of ICT.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Our target standard is <strong>WCAG 2.1 Level AA</strong>.
          </p>
        </section>

        {/* 2. Status */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Accessibility status</h2>
          <div className="flex items-start gap-4 p-4 bg-amber-50 border border-amber-200 rounded-xl mb-6">
            <span className="text-2xl mt-0.5">⚠️</span>
            <p className="text-slate-700 text-sm leading-relaxed">
              This site is <strong>partially conformant</strong> with WCAG 2.1 AA. We are actively working to
              resolve known gaps.
            </p>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Keyboard navigation', status: '✓ Supported', ok: true },
              { label: 'Image text alternatives (alt attributes)', status: '✓ Implemented', ok: true },
              { label: 'Sufficient colour contrast', status: '✓ Verified', ok: true },
              { label: 'Responsive design (mobile/tablet)', status: '✓ Supported', ok: true },
              { label: 'Form labelling', status: '✓ Implemented', ok: true },
              { label: 'Skip navigation link', status: '✓ Implemented', ok: true },
              { label: 'ARIA landmarks', status: '⚠ In progress', ok: false },
            ].map(({ label, status, ok }) => (
              <div key={label} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-700 text-sm">{label}</span>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${ok ? 'bg-[#00CC6A]/10 text-[#00CC6A]' : 'bg-amber-100 text-amber-700'}`}>
                  {status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Known limitations */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Known limitations</h2>
          <ul className="space-y-3 text-slate-600">
            {[
              'Some interactive elements lack full ARIA labelling. We are working to resolve this.',
              'Video content does not yet have captions or audio descriptions.',
            ].map((point) => (
              <li key={point} className="flex gap-3">
                <span className="text-amber-500 font-bold mt-0.5 shrink-0">!</span>
                <span className="text-sm leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 4. Feedback */}
        <section className="bg-[#1B3A5C]/5 border border-[#1B3A5C]/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">4. Report an accessibility barrier</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            If you encounter accessibility barriers on norgetravel.com, we want to hear from you. Please
            describe which page you are on, what barrier you experience, and what device or assistive
            technology you are using.
          </p>
          <div className="space-y-4">
            <a
              href="mailto:hello@norgetravel.com?subject=Accessibility feedback – norgetravel.com"
              className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:border-[#1B3A5C] transition-colors group"
            >
              <span className="text-2xl">✉</span>
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-[#1B3A5C] transition-colors">Send email</p>
                <p className="text-sm text-slate-500">hello@norgetravel.com — subject: &quot;Accessibility&quot;</p>
              </div>
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            We aim to respond to accessibility enquiries within <strong>5 working days</strong>.
          </p>
        </section>

        {/* 5. Appeals */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Appeals</h2>
          <p className="text-slate-600 leading-relaxed">
            If you are not satisfied with our response, you may contact the{' '}
            <strong>Norwegian Digitalisation Agency (Digitaliseringsdirektoratet)</strong>, which supervises
            compliance with universal design requirements for ICT.
          </p>
          <a
            href="https://www.digdir.no"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-[#1B3A5C] font-medium hover:underline text-sm"
          >
            Digdir.no<span className="sr-only"> (opens in new tab)</span> →
          </a>
        </section>

        {/* Footer nav */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100 text-sm">
          <Link href="/personvern" className="text-[#1B3A5C] hover:underline">
            → Privacy policy
          </Link>
          <Link href="/" className="text-slate-500 hover:underline ml-auto">
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
