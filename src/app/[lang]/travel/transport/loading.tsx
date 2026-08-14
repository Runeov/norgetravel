export default function TransportLoading() {
  return (
    <div className="min-h-screen bg-[#f5f8f9]" aria-busy="true" aria-label="Loading transport options">
      <section className="-mt-20 bg-[#102d46] pt-20 text-white">
        <div className="mx-auto grid min-h-[42rem] max-w-[1440px] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex items-center px-5 py-14 sm:px-8 lg:px-12 xl:px-20">
            <div className="w-full max-w-xl space-y-6">
              <div className="h-4 w-28 rounded bg-white/15" />
              <div className="h-4 w-44 rounded bg-[#65d6a6]/35" />
              <div className="space-y-3">
                <div className="h-14 w-full max-w-md rounded-lg bg-white/15" />
                <div className="h-14 w-4/5 rounded-lg bg-white/15" />
              </div>
              <div className="h-6 w-full max-w-lg rounded bg-white/10" />
              <div className="flex gap-3">
                <div className="h-12 w-40 rounded-lg bg-[#65d6a6]/50" />
                <div className="h-12 w-32 rounded-lg border border-white/15 bg-white/5" />
              </div>
            </div>
          </div>
          <div className="hidden bg-slate-700/50 lg:block" />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="h-10 w-full max-w-xl rounded-lg bg-slate-200" />
          <div className="mt-4 h-5 w-full max-w-2xl rounded bg-slate-200/80" />
          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {Array.from({ length: 6 }, (_, index) => (
                <div key={index} className="h-24 rounded-lg bg-slate-100" />
              ))}
            </div>
            <div className="mt-5 h-11 w-80 max-w-full rounded-lg bg-slate-100" />
          </div>
          <span className="sr-only" role="status">Loading transport options</span>
        </div>
      </section>
    </div>
  );
}
