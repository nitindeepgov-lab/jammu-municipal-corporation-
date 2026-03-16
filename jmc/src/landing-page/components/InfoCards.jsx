import WhosWho from './WhosWho'
import BulletinBoard from './BulletinBoard'

export default function InfoCards() {
  return (
    <section className="py-3 bg-gradient-to-b from-[#eef2f6] via-[#f6f8fb] to-white border-t border-slate-200/60">
      <div className="max-w-[1250px] mx-auto px-4 space-y-6 md:space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0b3a73] tracking-tight">What&apos;s new</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Bulletin Board */}
          <div className="relative h-full">
            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-[#0b3a73] via-[#0d63b2] to-[#1d9bf0] opacity-20 blur" aria-hidden />
            <div className="relative h-full bg-white/90 backdrop-blur border border-slate-200 rounded-3xl shadow-[0_14px_38px_rgba(16,24,40,0.08)] p-4 md:p-5">
              <BulletinBoard />
            </div>
          </div>

          {/* Officers / Officials */}
          <div className="relative h-full">
            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-[#ff7a18] via-[#ff9f43] to-[#ffd166] opacity-20 blur" aria-hidden />
            <div className="relative h-full bg-white/90 backdrop-blur border border-slate-200 rounded-3xl shadow-[0_14px_38px_rgba(16,24,40,0.08)] p-4 md:p-5">
              <WhosWho />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
