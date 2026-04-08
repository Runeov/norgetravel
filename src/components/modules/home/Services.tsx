'use client';

import { FeatureTabs, type FeatureTabItem } from '@/components/ui/FeatureTabs';
import imgNorthernLights from '@/assets/karasjok_Over.avif';
import imgFjords from '@/assets/Hero_Tjenester.avif';
import imgTrekking from '@/assets/hero_raadgivning.avif';
import imgCabins from '@/assets/Hero_aboutUS.png';

export default function Services() {

  const serviceItems: FeatureTabItem[] = [
    {
      id: 'fjord-cruises',
      title: 'Fjord Cruises',
      shortDesc: 'Zero-emission on UNESCO waters',
      icon: imgFjords.src,
      content: 'Peak fjord season runs May to September. From January 2026 all vessels entering UNESCO World Heritage fjords must meet zero-emission standards. Our partners, Hurtigruten and Havila Voyages, already exceed that bar.',
      bullets: ['Peak season May–Sep', 'Zero-emission certified operators', 'Geirangerfjord & Nærøyfjord UNESCO fjords', 'Havila 4-hour battery sailing'],
      link: '/destinations/fjords',
      linkText: 'Explore fjord cruises',
    },
    {
      id: 'trekking',
      title: 'Arctic Trekking',
      shortDesc: 'Midnight sun trails Jun–Aug',
      icon: imgTrekking.src,
      content: 'From Trolltunga to the Lofoten peaks, summer brings 24-hour daylight and the best trail conditions of the year. Our trekking partners bring expert mountain guides, gear, and seamless logistics so you focus on the adventure.',
      bullets: ['24-hour daylight Jun–Aug', 'Lofoten "Sail & Hike" expeditions', '57hours professional guides', 'Private & all-women group options'],
      link: '/tjenester/trekking',
      linkText: 'Explore trekking adventures',
    },
    {
      id: 'remote-cabins',
      title: 'Remote Cabin Stays',
      shortDesc: 'Rorbuer & hytter with fjord views',
      icon: imgCabins.src,
      content: 'Summer is peak season for Norwegian rorbuer and hytter. We feature hand-picked properties in Lofoten and across Northern Norway. Book early: the best cabins sell out by February for the summer season.',
      bullets: ['Booking.com tiered commission', 'Novasol handpicked properties', 'Private sauna & fjord access', 'Lofoten rorbuer sell out early'],
      link: '/tjenester/remote-cabins',
      linkText: 'Explore cabin stays',
    },
    {
      id: 'northern-lights',
      title: 'Northern Lights Tours',
      shortDesc: 'Returns Oct 2026',
      icon: imgNorthernLights.src,
      content: 'Aurora season runs October to March. The 2025-26 season is over, but the 2026-27 season will be the last elevated window of Solar Cycle 25 before the 11-year decline. Book now for next winter to secure the best guides and prices.',
      bullets: ['Next season: Oct 2026 – Mar 2027', 'Book ahead for best availability', 'GetYourGuide & Viator certified', 'Svalbard expeditions available'],
      link: '/tjenester/northern-lights',
      linkText: 'Plan for next aurora season',
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
