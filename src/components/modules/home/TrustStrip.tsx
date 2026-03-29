export default function TrustStrip() {
  const partners = [
    { name: 'GetYourGuide', emoji: '🎟️', tagline: '7% commission · 30-day cookie' },
    { name: 'Viator', emoji: '🧭', tagline: '8–10% commission · TripAdvisor' },
    { name: 'Hurtigruten', emoji: '🚢', tagline: 'Northern Lights Guarantee' },
    { name: 'Havila Voyages', emoji: '⚡', tagline: 'Zero-emission fjord cruises' },
    { name: 'Booking.com', emoji: '🏠', tagline: '28M+ listings · Cabin stays' },
    { name: 'SafetyWing', emoji: '🛡️', tagline: '10% recurring · 364-day cookie' },
  ];

  return (
    <section className="bg-white border-y border-slate-100 py-10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">
          Trusted affiliate partners
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-14">
          {partners.map((partner) => (
            <div key={partner.name} className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity duration-300 group">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{partner.emoji}</span>
              <span className="text-sm font-semibold text-slate-700">{partner.name}</span>
              <span className="text-xs text-slate-400">{partner.tagline}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
