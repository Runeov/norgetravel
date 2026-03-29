import { AlertCircle, Zap, Ship, Coins } from 'lucide-react';

const updates = [
  {
    icon: Zap,
    color: '#00CC6A',
    label: 'Aurora urgency',
    headline: '2026–27: last peak aurora season until 2031',
    body: 'Solar Cycle 25 peaked in 2024–25. Norwegian Space Agency confirms elevated activity continues through 2026–27 — then the slow 11-year decline to solar minimum begins. Every operator from Trafalgar to National Geographic is calling this the final high-probability window.',
  },
  {
    icon: Ship,
    color: '#5CBFEE',
    label: 'Zero-emission mandate live',
    headline: 'Zero-emission fjords: in force from January 2026',
    body: 'All vessels under 10,000 GT entering Geirangerfjord and Nærøyfjord must now meet zero-emission standards. Hurtigruten and Havila Voyages are fully compliant. Operators who haven\'t upgraded face fines — check compliance before you book.',
  },
  {
    icon: Coins,
    color: '#1B3A5C',
    label: 'New tourist tax',
    headline: '3% tourist accommodation tax from summer 2026',
    body: 'Norway\'s Storting approved a 3% nightly accommodation levy, with Lofoten among the first municipalities to opt in. Budget roughly NOK 30–150 extra per night depending on your accommodation. The revenue funds overtourism management and local infrastructure.',
  },
  {
    icon: AlertCircle,
    color: '#00CC6A',
    label: 'Svalbard expansion',
    headline: 'Hurtigruten doubles Svalbard capacity for 2026',
    body: 'A 40% surge in year-to-date bookings — driven primarily by North Americans — prompted Hurtigruten to add MS Midnatsol to the Svalbard route alongside MS Trollfjord. Combined Norway + Svalbard packages start from $5,432/person. Book early: 15 departures, filling fast.',
  },
];

export default function WhatsNew2026() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3A5C]/10 text-[#1B3A5C] text-sm font-medium mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00CC6A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00CC6A]"></span>
            </span>
            Norway 2026 — what&apos;s changed
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Three things that change how you plan a Norway trip this year
          </h2>
          <p className="text-slate-600 text-lg">
            New regulations, record booking surges, and a closing aurora window — here&apos;s what every traveller needs to know before booking.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {updates.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200/50 hover:border-slate-300 transition-colors duration-200"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 p-2.5 rounded-xl"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 block">
                      {item.label}
                    </span>
                    <h3 className="font-bold text-slate-900 mb-2 leading-snug">{item.headline}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
