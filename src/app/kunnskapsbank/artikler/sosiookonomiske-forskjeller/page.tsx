'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Clock,
  Share2,
  MessageSquare,
  ThumbsUp,
  AlertTriangle,
  Coins,
  ShieldCheck,
  X,
  Instagram,
  Heart,
  BarChart3,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { getExpert } from '@/data/experts';
import logoThumb from '@/assets/logo_thumbail.avif';

// Brand colours (Averdi)
const BRAND = {
  orange: '#E86C1F',
  orangeDark: '#d65a10',
  slate900: '#0f1724',
  bg: 'bg-slate-50',
};

type Post = {
  id: string;
  title: string;
  copy: string;
  timestamp: string;
  likes: number;
  comments: number;
  image?: string; // optional image URL or local asset
};

const SAMPLE_POSTS: Post[] = [
  {
    id: 'p1',
    title: '«Tid er penger» — men bare for dem med Excel',
    copy: 'Hvorfor bruker reindriftsutøvere 40% av årsverket på papirarbeid? Hint: staten har adrenaline i regnearket.',
    timestamp: '12. des 2025',
    likes: 124,
    comments: 8,
    image: '/logo_thumbail.avif',
  },
  {
    id: 'p2',
    title: 'Banken sa: "Det er ikke pantbart"',
    copy: 'Har du 200 rein? Flott. Kan banken låne deg penger på det? Nei. Velkommen til død kapital.',
    timestamp: '8. des 2025',
    likes: 89,
    comments: 14,
  },
  {
    id: 'p3',
    title: 'Birgejupmi – å fikse alt gratis',
    copy: 'Når hele famn fungerer som helsevesenets oversettere, sier regnskapet ingenting om slitasjen.',
    timestamp: '2. des 2025',
    likes: 202,
    comments: 34,
  },
  {
    id: 'p4',
    title: 'Staten: "Vi vet det er krise"',
    copy: 'Oversatt: "Vi vet, men budsjettet sier nei."',
    timestamp: '29. nov 2025',
    likes: 47,
    comments: 3,
  },
];

export default function ArtikkelFornesInteractive() {
  const author = getExpert('elle-maret');
  const [posts] = useState<Post[]>(SAMPLE_POSTS);
  const [active, setActive] = useState<Post | null>(null);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const totalLikes = useMemo(
    () => posts.reduce((s, p) => s + p.likes, 0) + Object.values(liked).filter(Boolean).length,
    [posts, liked]
  );

  return (
    <main className={`min-h-screen relative font-sans ${BRAND.bg}`}>
      <AverdiBackground />

      <nav className="relative z-20 container mx-auto px-4 py-6 max-w-6xl flex justify-between items-center">
        <Link href="/kunnskapsbank/artikler" className="flex items-center text-slate-500 hover:text-slate-900 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
          Tilbake til oversikten
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Image src={logoThumb} alt="Averdi" width={36} height={36} className="rounded-full" />
            <div className="text-sm">
              <div className="font-semibold text-slate-900">Averdi Innsikt</div>
              <div className="text-xs text-slate-500">Funny · Sharp · Finance</div>
            </div>
          </div>
        </div>
      </nav>

      <article className="relative z-10 container mx-auto px-4 pb-24 max-w-6xl">
        {/* Header */}
        <header className="mb-8 grid md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-widest mb-4">
              <AlertTriangle className="w-3 h-3" aria-hidden="true" />
              Dybdeanalyse
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3 leading-tight">
              Norge lyver om rikdommen sin.
            </h1>

            <div className="flex items-center gap-4 text-slate-500 text-sm mb-4">
              <div className="flex items-center gap-2">
                {author?.image ? (
                  <div className="w-9 h-9 rounded-full overflow-hidden relative">
                    <Image src={author.image} alt={author.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">EM</div>
                )}
                <div className="leading-tight">
                  <div className="font-semibold text-slate-900">{author?.name || 'Elle Máret'}</div>
                  <div className="text-xs">5 min • 12. desember 2025</div>
                </div>
              </div>

              <div className="ml-2 text-slate-600 text-xs">En samling innlegg — scroll, like, del og åpne plott.</div>
            </div>
          </div>

          {/* Quick stats / diagram preview */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-semibold uppercase text-slate-500">Raskt</div>
              <div className="text-xs text-slate-400">Snapshot</div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-700">Posts</div>
                <div className="font-bold">{posts.length}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-700">Samlede likes</div>
                <div className="font-bold">{totalLikes}</div>
              </div>
              <div className="pt-2">
                <MiniBarChart values={[40, 70, 55, 90, 30]} />
              </div>
            </div>
          </div>
        </header>

        {/* Instagram-style grid */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="mb-4 text-slate-700 font-semibold">@AverdiInnsikt — korte slagkraftige innlegg</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map((p) => (
                <motion.article
                  key={p.id}
                  layout
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer border border-slate-100"
                  onClick={() => setActive(p)}
                >
                  <div className="relative h-40 w-full bg-gradient-to-br from-slate-200 to-orange-50 flex items-center justify-center">
                    {p.image ? (
                      <Image src={p.image} alt={p.title} fill className="object-cover" />
                    ) : (
                      <div className="text-slate-400 text-sm px-4 text-center">Bildeplassholder</div>
                    )}

                    <div className="absolute top-3 left-3 inline-flex items-center gap-2 bg-black/40 text-white text-xs px-2 py-1 rounded-full">
                      <Instagram className="w-4 h-4" aria-hidden="true" />
                      <span>{p.timestamp}</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 text-sm mb-2">{p.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-3">{p.copy}</p>

                    <div className="mt-3 flex items-center justify-between text-slate-500 text-xs">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setLiked((s) => ({ ...s, [p.id]: !s[p.id] }));
                          }}
                          className="flex items-center gap-1"
                          aria-label={`Lik innlegg: ${p.title}`}
                          aria-pressed={!!liked[p.id]}
                        >
                          <Heart className={`w-4 h-4 ${liked[p.id] ? 'text-red-500' : ''}`} aria-hidden="true" />
                          <span aria-hidden="true">{p.likes + (liked[p.id] ? 1 : 0)}</span>
                        </button>

                        <button onClick={(e) => e.stopPropagation()} className="flex items-center gap-1" aria-label={`Kommenter innlegg: ${p.title}`}>
                          <MessageSquare className="w-4 h-4" aria-hidden="true" />
                          <span aria-hidden="true">{p.comments}</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <button onClick={(e) => e.stopPropagation()} className="text-slate-400 hover:text-slate-700" aria-label="Del artikkel">
                          <Share2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <button onClick={(e) => e.stopPropagation()} className="text-slate-400 hover:text-slate-700" aria-label="Tommel opp">
                          <ThumbsUp className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Right column: large sticky post + CTA */}
          <aside className="sticky top-24">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs font-semibold text-slate-500">Utvalgt</div>
                  <div className="font-bold text-slate-900">Statens stille tilståelse</div>
                </div>
                <div className="text-xs text-slate-400">{posts[3].timestamp}</div>
              </div>

              <p className="text-sm text-slate-700 mb-4">Smak på setningen: "Manglende språkkompetanse truer pasientsikkerheten" — og hva det betyr i praksis.</p>

              <div className="flex items-center gap-3">
                <button className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-[#E86C1F] hover:bg-[#d65a10] text-white rounded-full font-bold">
                  Les hele saken
                </button>
                <button onClick={() => setActive(posts[3])} className="p-2 rounded-full bg-slate-50 border border-slate-100" aria-label="Vis visualisering">
                  <BarChart3 className="w-5 h-5 text-slate-700" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <div className="text-xs font-semibold text-slate-500 mb-3">En morsom konto for regnskapsskandaler</div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden relative">
                  <Image src={logoThumb} alt="Averdi" width={40} height={40} />
                </div>
                <div>
                  <div className="font-semibold">AverdiInnsikt</div>
                  <div className="text-xs text-slate-500">Følg for flere spydigheter</div>
                </div>
                <div className="ml-auto">
                  <button className="px-3 py-1 rounded-full bg-slate-900 text-white text-xs">Følg</button>
                </div>
              </div>
            </div>
          </aside>
        </section>

        {/* Footer CTA */}
        <div className="mt-12">
          <div className="bg-slate-900 text-white p-8 rounded-3xl flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2 text-orange-400">Vil du ha oss på laget?</h3>
              <p className="text-slate-200">Vi hjelper kommuner og organisasjoner med å regne sannheten. Compliance as a Service — med et smil.</p>
            </div>
            <div>
              <Link href="/kontakt" className="inline-flex items-center justify-center px-6 py-3 bg-[#E86C1F] hover:bg-[#d65a10] rounded-full font-bold">
                Kontakt oss
              </Link>
            </div>
          </div>
        </div>

        {/* Modal for active post */}
        <AnimatePresence>
          {active && (
            <PostModal post={active} onClose={() => setActive(null)} liked={!!liked[active.id]} onToggleLike={() => setLiked((s) => ({ ...s, [active.id]: !s[active.id] }))} />
          )}
        </AnimatePresence>
      </article>
    </main>
  );
}

function MiniBarChart({ values }: { values: number[] }) {
  const max = Math.max(...values);
  return (
    <div className="flex items-end gap-1 h-12">
      {values.map((v, i) => (
        <div key={i} className="flex-1">
          <div className="w-full rounded-sm" style={{ height: `${(v / max) * 100}%`, background: 'linear-gradient(180deg, rgba(232,108,31,0.9), rgba(232,108,31,0.4))' }} />
        </div>
      ))}
    </div>
  );
}

function PostModal({ post, onClose, liked, onToggleLike }: { post: Post; onClose: () => void; liked: boolean; onToggleLike: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20 }} className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden relative">
              <Image src={logoThumb} alt="Averdi" width={40} height={40} />
            </div>
            <div>
              <div className="font-semibold">AverdiInnsikt</div>
              <div className="text-xs text-slate-500">{post.timestamp}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={onToggleLike} className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-slate-50 border border-slate-100" aria-label={liked ? 'Fjern like' : 'Lik innlegg'} aria-pressed={liked}>
              <Heart className={`w-4 h-4 ${liked ? 'text-red-500' : 'text-slate-500'}`} aria-hidden="true" />
              <span className="text-sm" aria-hidden="true">{post.likes + (liked ? 1 : 0)}</span>
            </button>
            <button onClick={onClose} className="p-2 rounded-full bg-slate-50 border border-slate-100" aria-label="Lukk">
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="md:flex">
          <div className="md:w-1/2 p-6">
            <div className="h-64 w-full bg-gradient-to-br from-slate-200 to-orange-50 rounded-lg mb-4 flex items-center justify-center">
              <Image src={post.image || logoThumb} alt={post.title} width={600} height={360} className="object-cover" />
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-2">{post.title}</h2>
            <p className="text-slate-700 mb-4">{post.copy}</p>

            <div className="flex items-center gap-3 text-sm text-slate-500">
              <div className="inline-flex items-center gap-2">
                <Coins className="w-4 h-4" aria-hidden="true" />
                <span>Økonomisk vinkel</span>
              </div>

              <div className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span>5 min lesetid</span>
              </div>

              <div className="inline-flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                <span>Faktasjekket</span>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 p-6 border-l border-slate-100">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-semibold">Rask visualisering</div>
                <div className="text-xs text-slate-400">Placeholder data</div>
              </div>

              <MiniDonutChart segments={[30, 25, 45]} labels={["Tid", "Penger", "Helse"]} />
            </div>

            <div>
              <div className="text-sm font-semibold mb-2">En enkel forklaring</div>
              <ol className="text-sm text-slate-600 pl-4 space-y-2 list-decimal">
                <li>Kostnader skjult i tid og administrasjon.</li>
                <li>Bankenes vurderingsmetodikk overser lokale verdier.</li>
                <li>Resultat: Income rich, asset poor.</li>
              </ol>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-[#E86C1F] hover:bg-[#d65a10] text-white rounded-full font-bold">
                Send faktura
              </button>

              <button className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-white border border-slate-100 rounded-full font-semibold">
                Del på LinkedIn
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MiniDonutChart({ segments, labels }: { segments: number[]; labels: string[] }) {
  const total = segments.reduce((s, n) => s + n, 0);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;
  return (
    <div className="flex items-center gap-4">
      <svg width={120} height={120} viewBox="0 0 120 120">
        <g transform={`translate(60,60)`}>
          {segments.map((s, i) => {
            const portion = s / total;
            const dash = portion * circumference;
            const dashArray = `${dash} ${circumference - dash}`;
            const rotate = (offset / circumference) * 360;
            offset += dash;
            const colour = i === 0 ? BRAND.orange : i === 1 ? '#f6ad55' : '#cbd5e1';
            return (
              <circle
                key={i}
                r={radius}
                cx={0}
                cy={0}
                fill="transparent"
                stroke={colour}
                strokeWidth={18}
                strokeDasharray={dashArray}
                strokeDashoffset={0}
                transform={`rotate(${rotate - 90})`}
              />
            );
          })}
        </g>
      </svg>

      <div className="text-sm">
        {labels.map((l, i) => (
          <div key={i} className="flex items-center gap-2">
            <div style={{ width: 10, height: 10, background: i === 0 ? BRAND.orange : i === 1 ? '#f6ad55' : '#cbd5e1' }} className="rounded-sm" />
            <div className="text-slate-700 text-xs">{l} — {segments[i]}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
