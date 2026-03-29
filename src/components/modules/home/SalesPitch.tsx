'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, Leaf, TrendingUp, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import heroImage from '@/assets/Hero_aboutUS.png';

export default function SalesPitch() {
  const router = useRouter();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-slate-50 overflow-hidden font-sans">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Left Column: Text & CTA */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3A5C]/10 text-[#1B3A5C] text-sm font-bold mb-6 border border-[#1B3A5C]/20">
                <TrendingUp className="w-4 h-4" aria-hidden="true" />
                <span>The 2026 Norwegian opportunity</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 text-slate-900 leading-tight">
                The perfect storm for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A]">
                  Arctic travel
                </span>
              </h2>

              <div className="space-y-6 text-lg text-slate-600 leading-relaxed mb-10">
                <p>
                  Solar Cycle 25 peaked in 2024–25 — the most intense aurora activity in over a decade. The 2026–27 season is the last elevated window before the 11-year decline to solar minimum in 2031. Norway logged a record 7.2 million international arrivals in 2025 (+8% YoY), with Scandinavia bookings up 35% as travelers escape southern European heat.
                </p>
                <p>
                  NorgeTravel.com sits at the intersection of high-intent travellers and best-in-class Norwegian operators. Every tour we feature is independently verified for sustainability credentials.
                </p>
                <p className="font-medium text-slate-900 border-l-4 border-[#00CC6A] pl-4">
                  Mid-range and luxury segments yield the highest affiliate commissions — a single private Northern Lights chase for four can generate $100+ in a single transaction.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-[#1B3A5C] rounded-full hover:bg-[#152f4a] transition-all shadow-lg hover:shadow-[#1B3A5C]/40 transform hover:-translate-y-1 gap-2"
                >
                  <Leaf className="w-5 h-5" aria-hidden="true" />
                  Get in touch
                </button>

                <button
                  onClick={() => router.push('/om-oss')}
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 bg-white border-2 border-slate-200 rounded-full hover:border-[#1B3A5C] hover:text-[#1B3A5C] transition-all duration-300 group shadow-sm hover:shadow-md"
                >
                  About NorgeTravel
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Image */}
          <div className="order-1 lg:order-2 relative">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              <div className="absolute inset-0 bg-[#00CC6A]/10 rounded-full blur-3xl transform scale-90 translate-y-4 -z-10"></div>

              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-square border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-700 ease-in-out">
                <Image
                  src={heroImage}
                  alt="Norway landscape — sustainable Arctic adventure"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  placeholder="blur"
                  quality={85}
                />

                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#00CC6A]/10 p-2 rounded-full text-[#00CC6A]">
                      <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-base">Zero-Emission Certified</p>
                      <p className="text-slate-500 text-xs">All fjord cruise partners comply with 2026 mandate</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
