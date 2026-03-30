'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import logoNorgeTravel from '@/assets/norgeTravel.png';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({
    destinations: false,
    tours: false,
    travel: false,
  });
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setMobileDropdowns({ destinations: false, tours: false, travel: false });
  }, [pathname]);

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
    setIsMenuOpen(false);
    setMobileDropdowns({ destinations: false, tours: false, travel: false });
  };

  const navLinkClass = (isActive: boolean) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      isActive
        ? 'text-[#1B3A5C] bg-[#1B3A5C]/10'
        : 'text-slate-600 hover:text-[#1B3A5C] hover:bg-slate-50'
    }`;

  const dropdownItemClass = (isActive: boolean) =>
    `block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
      isActive
        ? 'text-[#1B3A5C] bg-[#1B3A5C]/10 font-medium'
        : 'text-slate-600 hover:bg-slate-50 hover:text-[#1B3A5C]'
    }`;

  const mobileMenuItemClass = (isActive: boolean) =>
    `block px-4 py-3 rounded-xl w-full text-left text-base font-medium ${
      isActive
        ? 'text-[#1B3A5C] bg-[#1B3A5C]/10'
        : 'text-slate-600 hover:bg-slate-50'
    }`;

  const toursMenuActive = pathname.startsWith('/tjenester');
  const guideMenuActive =
    pathname === '/kunnskapsbank' ||
    pathname.startsWith('/kunnskapsbank/');

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setMobileDropdowns({ destinations: false, tours: false, travel: false });
  };

  const toggleMobileDropdown = (key: 'destinations' | 'tours' | 'travel') => {
    setMobileDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-slate-200/50 shadow-sm'
          : 'bg-white/60 backdrop-blur-sm border-transparent'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" aria-label="NorgeTravel – Go to homepage">
              <Image
                src={logoNorgeTravel}
                alt="NorgeTravel Logo"
                width={220}
                height={80}
                className="h-20 w-auto"
                priority
                placeholder="blur"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              <Link href="/" className={navLinkClass(pathname === '/')}>
                Home
              </Link>

              {/* Destinations dropdown */}
              <div className="relative group">
                <button
                  type="button"
                  className={`${navLinkClass(pathname.startsWith('/destinations'))} inline-flex items-center gap-1`}
                  aria-haspopup="menu"
                >
                  Destinations
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                </button>
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0">
                  <div className="w-56 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md p-2 shadow-xl">
                    <Link href="/destinations/northern-norway" className={dropdownItemClass(pathname.startsWith('/destinations/northern-norway'))}>
                      Northern Norway
                    </Link>
                    <Link href="/destinations/lofoten" className={dropdownItemClass(pathname.startsWith('/destinations/lofoten'))}>
                      Lofoten Islands
                    </Link>
                    <Link href="/destinations/fjords" className={dropdownItemClass(pathname.startsWith('/destinations/fjords'))}>
                      Norwegian Fjords
                    </Link>
                    <Link href="/destinations/svalbard" className={dropdownItemClass(pathname.startsWith('/destinations/svalbard'))}>
                      Svalbard
                    </Link>
                  </div>
                </div>
              </div>

              {/* Tours dropdown */}
              <div className="relative group">
                <button
                  type="button"
                  className={`${navLinkClass(toursMenuActive)} inline-flex items-center gap-1`}
                  aria-haspopup="menu"
                >
                  Tours
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                </button>
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0">
                  <div className="w-60 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md p-2 shadow-xl">
                    <Link href="/tjenester/northern-lights" className={dropdownItemClass(pathname.startsWith('/tjenester/northern-lights'))}>
                      Northern Lights Tours
                    </Link>
                    <Link href="/tjenester/fjord-cruises" className={dropdownItemClass(pathname.startsWith('/tjenester/fjord-cruises'))}>
                      Fjord Cruises
                    </Link>
                    <Link href="/tjenester/trekking" className={dropdownItemClass(pathname.startsWith('/tjenester/trekking'))}>
                      Arctic Trekking
                    </Link>
                    <Link href="/tjenester/remote-cabins" className={dropdownItemClass(pathname.startsWith('/tjenester/remote-cabins'))}>
                      Remote Cabin Stays
                    </Link>
                  </div>
                </div>
              </div>

              {/* Travel Map dropdown */}
              <div className="relative group">
                <button
                  type="button"
                  className={`${navLinkClass(pathname.startsWith('/travel'))} inline-flex items-center gap-1`}
                  aria-haspopup="menu"
                >
                  Travel Map
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                </button>
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0">
                  <div className="w-60 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md p-2 shadow-xl">
                    <Link href="/travel/transport" className={dropdownItemClass(pathname.startsWith('/travel/transport'))}>
                      🚂 Transport
                    </Link>
                    <Link href="/travel/accommodation" className={dropdownItemClass(pathname.startsWith('/travel/accommodation'))}>
                      🏨 Accommodation
                    </Link>
                    <Link href="/travel/guides" className={dropdownItemClass(pathname.startsWith('/travel/guides'))}>
                      🧭 Guides
                    </Link>
                    <Link href="/travel/experiences" className={dropdownItemClass(pathname.startsWith('/travel/experiences'))}>
                      ⛷️ Experiences
                    </Link>
                    <Link href="/travel/restaurants" className={dropdownItemClass(pathname.startsWith('/travel/restaurants'))}>
                      🍽️ Restaurants
                    </Link>
                  </div>
                </div>
              </div>

              <Link href="/om-oss" className={navLinkClass(pathname === '/om-oss')}>
                About
              </Link>

              <Link href="/kunnskapsbank" className={navLinkClass(guideMenuActive)}>
                Travel Guide
              </Link>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('contact')}
              className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-full hover:shadow-lg hover:shadow-[#1B3A5C]/30 hover:-translate-y-0.5 focus:outline-none"
              aria-label="Plan your trip"
            >
              Plan Your Trip
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => {
                setIsMenuOpen((prev) => {
                  const next = !prev;
                  if (!next) {
                    setMobileDropdowns({ destinations: false, tours: false, travel: false });
                  }
                  return next;
                });
              }}
              className="inline-flex items-center justify-center p-2 rounded-full text-slate-600 hover:text-[#1B3A5C] hover:bg-[#1B3A5C]/10 transition-colors"
              aria-expanded={isMenuOpen}
              aria-label="Open menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-xl animate-in slide-in-from-top-5 duration-200">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link href="/" onClick={closeMobileMenu} className={mobileMenuItemClass(pathname === '/')}>
                Home
              </Link>

              <button
                type="button"
                onClick={() => toggleMobileDropdown('destinations')}
                className={mobileMenuItemClass(pathname.startsWith('/destinations'))}
              >
                <span className="flex items-center justify-between">
                  Destinations
                  <ChevronDown className={`h-5 w-5 transition-transform ${mobileDropdowns.destinations ? 'rotate-180' : ''}`} />
                </span>
              </button>
              {mobileDropdowns.destinations && (
                <div className="pl-4 space-y-1">
                  <Link href="/destinations/northern-norway" onClick={closeMobileMenu} className={dropdownItemClass(pathname.startsWith('/destinations/northern-norway'))}>
                    Northern Norway
                  </Link>
                  <Link href="/destinations/lofoten" onClick={closeMobileMenu} className={dropdownItemClass(pathname.startsWith('/destinations/lofoten'))}>
                    Lofoten Islands
                  </Link>
                  <Link href="/destinations/fjords" onClick={closeMobileMenu} className={dropdownItemClass(pathname.startsWith('/destinations/fjords'))}>
                    Norwegian Fjords
                  </Link>
                  <Link href="/destinations/svalbard" onClick={closeMobileMenu} className={dropdownItemClass(pathname.startsWith('/destinations/svalbard'))}>
                    Svalbard
                  </Link>
                </div>
              )}

              <button
                type="button"
                onClick={() => toggleMobileDropdown('tours')}
                className={mobileMenuItemClass(toursMenuActive)}
              >
                <span className="flex items-center justify-between">
                  Tours
                  <ChevronDown className={`h-5 w-5 transition-transform ${mobileDropdowns.tours ? 'rotate-180' : ''}`} />
                </span>
              </button>
              {mobileDropdowns.tours && (
                <div className="pl-4 space-y-1">
                  <Link href="/tjenester/northern-lights" onClick={closeMobileMenu} className={dropdownItemClass(pathname.startsWith('/tjenester/northern-lights'))}>
                    Northern Lights Tours
                  </Link>
                  <Link href="/tjenester/fjord-cruises" onClick={closeMobileMenu} className={dropdownItemClass(pathname.startsWith('/tjenester/fjord-cruises'))}>
                    Fjord Cruises
                  </Link>
                  <Link href="/tjenester/trekking" onClick={closeMobileMenu} className={dropdownItemClass(pathname.startsWith('/tjenester/trekking'))}>
                    Arctic Trekking
                  </Link>
                  <Link href="/tjenester/remote-cabins" onClick={closeMobileMenu} className={dropdownItemClass(pathname.startsWith('/tjenester/remote-cabins'))}>
                    Remote Cabin Stays
                  </Link>
                </div>
              )}

              <button
                type="button"
                onClick={() => toggleMobileDropdown('travel')}
                className={mobileMenuItemClass(pathname.startsWith('/travel'))}
              >
                <span className="flex items-center justify-between">
                  Travel Map
                  <ChevronDown className={`h-5 w-5 transition-transform ${mobileDropdowns.travel ? 'rotate-180' : ''}`} />
                </span>
              </button>
              {mobileDropdowns.travel && (
                <div className="pl-4 space-y-1">
                  <Link href="/travel/transport" onClick={closeMobileMenu} className={dropdownItemClass(pathname.startsWith('/travel/transport'))}>
                    🚂 Transport
                  </Link>
                  <Link href="/travel/accommodation" onClick={closeMobileMenu} className={dropdownItemClass(pathname.startsWith('/travel/accommodation'))}>
                    🏨 Accommodation
                  </Link>
                  <Link href="/travel/guides" onClick={closeMobileMenu} className={dropdownItemClass(pathname.startsWith('/travel/guides'))}>
                    🧭 Guides
                  </Link>
                  <Link href="/travel/experiences" onClick={closeMobileMenu} className={dropdownItemClass(pathname.startsWith('/travel/experiences'))}>
                    ⛷️ Experiences
                  </Link>
                  <Link href="/travel/restaurants" onClick={closeMobileMenu} className={dropdownItemClass(pathname.startsWith('/travel/restaurants'))}>
                    🍽️ Restaurants
                  </Link>
                </div>
              )}

              <Link href="/om-oss" onClick={closeMobileMenu} className={mobileMenuItemClass(pathname === '/om-oss')}>
                About
              </Link>

              <Link href="/kunnskapsbank" onClick={closeMobileMenu} className={mobileMenuItemClass(guideMenuActive)}>
                Travel Guide
              </Link>

              <div className="pt-4 mt-2 border-t border-slate-100">
                <button onClick={() => scrollToSection('contact')} className="w-full flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-xl shadow-md active:scale-95 transition-all" aria-label="Plan your trip">
                  Plan Your Trip
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
