import { NorgeBackground } from '@/components/modules/NorgeBackground';

interface TravelHeroProps {
  title: string;
  subtitle: string;
  emoji: string;
}

export function TravelHero({ title, subtitle, emoji }: TravelHeroProps) {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32 bg-[#1B3A5C] text-white">
      <NorgeBackground />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <span className="text-6xl mb-6 block">{emoji}</span>
        <h1 className="text-5xl lg:text-7xl font-bold mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5CBFEE] to-[#00CC6A]">
            {title}
          </span>
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
