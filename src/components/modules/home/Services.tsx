'use client';

import { FeatureTabs, type FeatureTabItem } from '@/components/ui/FeatureTabs';
import imgNorthernLights from '@/assets/karasjok_Over.avif';
import imgFjords from '@/assets/Hero_Tjenester.avif';
import imgTrekking from '@/assets/hero_raadgivning.avif';
import imgCabins from '@/assets/Hero_aboutUS.png';

export default function Services() {

  const serviceItems: FeatureTabItem[] = [
    {
      id: 'northern-lights',
      title: 'Northern Lights Tours',
      shortDesc: 'Chase the aurora borealis',
      icon: imgNorthernLights.src,
      content: 'Solar Cycle 25 peaked in 2024–25 — the most intense aurora activity in over a decade. The 2026–27 season is the last elevated window before the 11-year decline to solar minimum. Hurtigruten has already doubled its Svalbard capacity for 2026, driven by a 40% booking surge from North American travelers.',
      bullets: ['Last peak aurora season until 2031', 'G3+ geomagnetic storm alerts', 'GetYourGuide & Viator certified', 'Svalbard expeditions from $5,432/person'],
      link: '/tjenester/northern-lights',
      linkText: 'Explore Northern Lights tours',
    },
    {
      id: 'fjord-cruises',
      title: 'Fjord Cruises',
      shortDesc: 'Zero-emission on UNESCO waters',
      icon: imgFjords.src,
      content: 'From January 2026 all vessels entering UNESCO World Heritage fjords must meet zero-emission standards. Our partners — Hurtigruten and Havila Voyages — already exceed that bar.',
      bullets: ['Zero-emission certified operators', 'Geirangerfjord & Nærøyfjord', 'Hurtigruten Northern Lights Guarantee', 'Havila 4-hour battery sailing'],
      link: '/tjenester/fjord-cruises',
      linkText: 'Explore fjord cruises',
    },
    {
      id: 'trekking',
      title: 'Arctic Trekking',
      shortDesc: 'Lofoten, Svalbard & beyond',
      icon: imgTrekking.src,
      content: 'From Trolltunga to the Svalbard Archipelago, our luxury trekking partners bring expert mountain guides, 24/7 support, and seamless logistics so you focus on the adventure.',
      bullets: ['Norrøna Sport — 10% commission', '57hours professional guides', 'Lofoten "Sail & Hike" expeditions', 'Private & all-women group options'],
      link: '/tjenester/trekking',
      linkText: 'Explore trekking adventures',
    },
    {
      id: 'remote-cabins',
      title: 'Remote Cabin Stays',
      shortDesc: 'Hytter with sauna & fjord views',
      icon: imgCabins.src,
      content: 'The Norwegian hytte (cabin) market is booming. We feature hand-picked properties in Lofoten and Tromsø — from cosy lakeside retreats to clifftop aurora-viewing platforms.',
      bullets: ['Booking.com — 25% tiered commission', 'Novasol handpicked properties', 'Private sauna & fjord access', 'Arctic Nomad digital-nomad stays'],
      link: '/tjenester/remote-cabins',
      linkText: 'Explore cabin stays',
    },
  ];

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Norway's best experiences, curated for you
          </h2>
          <p className="text-xl text-slate-600">
            Every recommendation is independently researched and linked to vetted affiliate partners with competitive commissions.
          </p>
        </div>

        <FeatureTabs
          items={serviceItems}
          themeColor="#1B3A5C"
        />
      </div>
    </section>
  );
}
