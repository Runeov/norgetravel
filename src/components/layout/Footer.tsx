'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowUp } from 'lucide-react';
import logoNorgeTravel from '@/assets/norgeTravel.png';
import { useTripMap } from '@/context/TripMapContext';

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const { openMap } = useTripMap();

  const scrollToSection = (sectionId: string) => {
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarHeight;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

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
              <Image src={logoNorgeTravel} alt="NorgeTravel Logo" width={180} height={60} className="h-[60px] w-auto opacity-90" placeholder="blur" />
            </div>
            <p className="text-slate-500 leading-relaxed max-w-sm text-base">
              Your guide to sustainable Arctic adventures — Northern Lights tours, zero-emission fjord cruises, luxury trekking, and remote cabin stays across Norway.
            </p>
            <div className="flex flex-col gap-1 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00CC6A]"></span>
                <p>Sustainable Travel Certified</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00CC6A]"></span>
                <p>Zero-Emission Partners Only</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-slate-900 mb-6 text-lg">Explore</h3>
            <ul className="space-y-4 text-sm text-slate-500">
              <li>
                <Link href="/" className="hover:text-[#1B3A5C] transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-[#1B3A5C] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Home
                </Link>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-[#1B3A5C] transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-[#1B3A5C] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Tours
                </button>
              </li>
              <li>
                <Link href="/om-oss" className="hover:text-[#1B3A5C] transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-[#1B3A5C] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About
                </Link>
              </li>
              <li>
                <Link href="/kunnskapsbank" className="hover:text-[#1B3A5C] transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-[#1B3A5C] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Travel Guide
                </Link>
              </li>
              <li>
                <button onClick={openMap} className="hover:text-[#1B3A5C] transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-[#1B3A5C] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Plan Your Trip
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-slate-900 mb-6 text-lg">Contact</h3>
            <div className="space-y-6 text-sm text-slate-500">
              <div className="space-y-2">
                <p className="font-semibold text-slate-900 text-base">NorgeTravel.com</p>
                <div className="flex flex-col gap-1">
                  <p>Norway</p>
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
            <span>© 2026 NorgeTravel.com. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-slate-500">
            <Link href="/privacy" className="hover:text-[#1B3A5C] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#1B3A5C] transition-colors">Terms of Use</Link>
            <Link href="/accessibility" className="hover:text-[#1B3A5C] transition-colors">Accessibility</Link>
            <span className="text-slate-400 cursor-not-allowed" title="Coming soon">Cookies</span>
          </div>

          <button
            onClick={scrollToTop}
            className="md:hidden p-3 rounded-full bg-[#1B3A5C]/10 text-[#1B3A5C] hover:bg-[#1B3A5C]/20 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
