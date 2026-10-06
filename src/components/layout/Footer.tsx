'use client';

import Link from '@/components/LocalizedLink';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowUp } from 'lucide-react';
import logoNorgeTravel from '@/assets/norgeTravel.png';
import { useTripMap } from '@/context/TripMapContext';
import en from '@/i18n/dictionaries/en.json';

export function Footer({ dict }: { dict?: typeof en.footer }) {
  const d = dict || en.footer;
  const pathname = usePathname();
  const { openMap } = useTripMap();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-200">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div>
              <Image src={logoNorgeTravel} alt="Norge Travel logo" width={180} height={60} className="h-[60px] w-auto opacity-90" placeholder="blur" />
            </div>
            <p className="text-slate-500 leading-relaxed max-w-sm text-base">
              {d.tagline}
            </p>
            <div className="flex flex-col gap-1 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00CC6A]"></span>
                <p>{d.badgeCertified}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00CC6A]"></span>
                <p>{d.badgeEditors}</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-slate-900 mb-6 text-lg">{d.explore}</h3>
            <ul className="space-y-4 text-sm text-slate-500">
              <li>
                <Link href="/" className="hover:text-[#1B3A5C] transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-[#1B3A5C] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {d.home}
                </Link>
              </li>
              <li>
                <Link href="/travel-guides" className="hover:text-[#1B3A5C] transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-[#1B3A5C] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {d.guides}
                </Link>
              </li>
              <li>
                <Link href="/om-oss" className="hover:text-[#1B3A5C] transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-[#1B3A5C] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {d.about}
                </Link>
              </li>
              <li>
                <button onClick={openMap} className="hover:text-[#1B3A5C] transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-[#1B3A5C] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {d.tripPlanner}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-slate-900 mb-6 text-lg">{d.contact}</h3>
            <div className="space-y-6 text-sm text-slate-500">
              <div className="space-y-2">
                <p className="font-semibold text-slate-900 text-base">NorgeTravel.com</p>
                <div className="flex flex-col gap-1">
                  <p>{d.country}</p>
                </div>
                <div className="pt-2">
                  <a href="mailto:hello@norgetravel.com" className="text-[#1B3A5C] font-medium hover:text-[#1B3A5C]/80 transition-colors inline-flex items-center gap-2">
                    <span>✉️</span> hello@norgetravel.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="h-px w-full bg-slate-200 mb-8"></div>

        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-slate-400 text-center md:text-left">
            <span>{d.rights}</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-slate-500">
            <Link href="/personvern" className="hover:text-[#1B3A5C] transition-colors">{d.privacyPolicy}</Link>
            <Link href="/tilgjengelighet" className="hover:text-[#1B3A5C] transition-colors">{d.accessibility}</Link>
            <span className="text-slate-400 cursor-not-allowed" title={d.comingSoon}>{d.cookies}</span>
          </div>

          <button
            onClick={scrollToTop}
            className="md:hidden p-3 rounded-full bg-[#1B3A5C]/10 text-[#1B3A5C] hover:bg-[#1B3A5C]/20 transition-colors"
            aria-label={d.backToTop}
          >
            <ArrowUp className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
