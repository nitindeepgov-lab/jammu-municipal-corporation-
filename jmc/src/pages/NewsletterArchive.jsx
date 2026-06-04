import { useState, useMemo, useEffect } from 'react'
import SubpageTemplate from '../components/SubpageTemplate'
import { getNewsletters } from '../services/strapiApi'
import { STRAPI_URL } from '../config/api'

/* ─────────────────────────────────────────────
   Full newsletter archive — scraped from
   https://jmc.jk.gov.in/newsletter.aspx
   PDFs on: https://jmc.jk.gov.in/adminjmcpanel/newsletter/
───────────────────────────────────────────── */
const BASE = 'https://jmc.jk.gov.in/adminjmcpanel/newsletter/'

const STATIC_NEWSLETTERS = [
  // 2025
  { year: 2025, month: 'April',     pdf: '1520255015119.pdf' },
  { year: 2025, month: 'March',     pdf: '1520254014977.pdf' },
  { year: 2025, month: 'February',  pdf: '1520253014836.pdf' },
  { year: 2025, month: 'January',   pdf: '1520252014695.pdf' },
  // 2024
  { year: 2024, month: 'December',  pdf: '1520241214554.pdf' },
  { year: 2024, month: 'November',  pdf: '1520241114413.pdf' },
  { year: 2024, month: 'October',   pdf: '1520241014272.pdf' },
  { year: 2024, month: 'September', pdf: '1520240914131.pdf' },
  { year: 2024, month: 'August',    pdf: '1520240813990.pdf' },
  { year: 2024, month: 'July',      pdf: '1520240713849.pdf' },
  { year: 2024, month: 'June',      pdf: '1520240613708.pdf' },
  { year: 2024, month: 'May',       pdf: '1520240513567.pdf' },
  { year: 2024, month: 'April',     pdf: '1520240413426.pdf' },
  { year: 2024, month: 'March',     pdf: '1520240313285.pdf' },
  { year: 2024, month: 'February',  pdf: '1520240213144.pdf' },
  { year: 2024, month: 'January',   pdf: '1520240113003.pdf' },
  // 2023
  { year: 2023, month: 'December',  pdf: '1520231212862.pdf' },
  { year: 2023, month: 'November',  pdf: '1520231112721.pdf' },
  { year: 2023, month: 'October',   pdf: '1520231012580.pdf' },
  { year: 2023, month: 'September', pdf: '1520230912439.pdf' },
  { year: 2023, month: 'August',    pdf: '1520230812298.pdf' },
  { year: 2023, month: 'July',      pdf: '1520230712157.pdf' },
  { year: 2023, month: 'June',      pdf: '1520230612016.pdf' },
  { year: 2023, month: 'May',       pdf: '1520230511875.pdf' },
  { year: 2023, month: 'April',     pdf: '1520230411734.pdf' },
  { year: 2023, month: 'March',     pdf: '1520230311593.pdf' },
  { year: 2023, month: 'February',  pdf: '1520230211452.pdf' },
  { year: 2023, month: 'January',   pdf: '1520230111311.pdf' },
  // 2022
  { year: 2022, month: 'December',  pdf: '1520221211170.pdf' },
  { year: 2022, month: 'November',  pdf: '1520221111029.pdf' },
  { year: 2022, month: 'October',   pdf: '1520221010888.pdf' },
  { year: 2022, month: 'September', pdf: '1520220910747.pdf' },
  { year: 2022, month: 'August',    pdf: '1520220810606.pdf' },
  { year: 2022, month: 'July',      pdf: '1520220710465.pdf' },
  { year: 2022, month: 'June',      pdf: '1520220610324.pdf' },
  { year: 2022, month: 'May',       pdf: '1520220510183.pdf' },
  { year: 2022, month: 'April',     pdf: '1520220410042.pdf' },
  { year: 2022, month: 'March',     pdf: '152022031901.pdf' },
  { year: 2022, month: 'February',  pdf: '152022021760.pdf' },
  { year: 2022, month: 'January',   pdf: '152022011619.pdf' },
  // 2021
  { year: 2021, month: 'December',  pdf: '152021121478.pdf' },
  { year: 2021, month: 'November',  pdf: '152021111337.pdf' },
  { year: 2021, month: 'October',   pdf: '152021101196.pdf' },
  { year: 2021, month: 'September', pdf: '152021091055.pdf' },
  { year: 2021, month: 'August',    pdf: '152021080914.pdf' },
  { year: 2021, month: 'July',      pdf: '152021070773.pdf' },
  { year: 2021, month: 'June',      pdf: '152021060632.pdf' },
  { year: 2021, month: 'May',       pdf: '152021050491.pdf' },
  { year: 2021, month: 'April',     pdf: '152021040350.pdf' },
  { year: 2021, month: 'March',     pdf: '152021030209.pdf' },
  { year: 2021, month: 'February',  pdf: '152021020068.pdf' },
  { year: 2021, month: 'January',   pdf: '15202101927.pdf' },
  // 2020
  { year: 2020, month: 'December',  pdf: '15202012786.pdf' },
  { year: 2020, month: 'November',  pdf: '15202011645.pdf' },
  { year: 2020, month: 'October',   pdf: '15202010504.pdf' },
  { year: 2020, month: 'September', pdf: '1520200904363.pdf' },
  { year: 2020, month: 'August',    pdf: '1520200804222.pdf' },
  { year: 2020, month: 'July',      pdf: '1520200704081.pdf' },
  { year: 2020, month: 'June',      pdf: '1520200603940.pdf' },
  // 2019
  { year: 2019, month: 'May',       pdf: '1520190503799.pdf' },
  { year: 2019, month: 'April',     pdf: '1520190403658.pdf' },
  { year: 2019, month: 'March',     pdf: '1520190303517.pdf' },
  { year: 2019, month: 'February',  pdf: '1520190203376.pdf' },
  { year: 2019, month: 'January',   pdf: '1520190103235.pdf' },
  // 2018
  { year: 2018, month: 'December',  pdf: '1520181203094.pdf' },
  { year: 2018, month: 'November',  pdf: '1520181102953.pdf' },
  { year: 2018, month: 'October',   pdf: '1520181002812.pdf' },
  { year: 2018, month: 'September', pdf: '1520180902671.pdf' },
  { year: 2018, month: 'August',    pdf: '1520180802530.pdf' },
  { year: 2018, month: 'July',      pdf: '1520180702389.pdf' },
  { year: 2018, month: 'June',      pdf: '1520180602248.pdf' },
  { year: 2018, month: 'May',       pdf: '1520180502107.pdf' },
  { year: 2018, month: 'April',     pdf: '1520180401966.pdf' },
  { year: 2018, month: 'March',     pdf: '1520180301825.pdf' },
  { year: 2018, month: 'February',  pdf: '1520180201684.pdf' },
  { year: 2018, month: 'January',   pdf: '1520180101543.pdf' },
  // 2017
  { year: 2017, month: 'December',  pdf: '1520171201402.pdf' },
  { year: 2017, month: 'November',  pdf: '1520171101261.pdf' },
  { year: 2017, month: 'October',   pdf: '1520171001120.pdf' },
  { year: 2017, month: 'September', pdf: '1520170900979.pdf' },
  { year: 2017, month: 'August',    pdf: '1520170800838.pdf' },
  { year: 2017, month: 'July',      pdf: '1520170700697.pdf' },
  { year: 2017, month: 'June',      pdf: '1520170600556.pdf' },
  { year: 2017, month: 'May',       pdf: '1520170500415.pdf' },
  { year: 2017, month: 'April',     pdf: '1520170400274.pdf' },
  { year: 2017, month: 'March',     pdf: '1520170300133.pdf' },
  { year: 2017, month: 'February',  pdf: '152017020992.pdf' },
  { year: 2017, month: 'January',   pdf: '152017010851.pdf' },
  // 2016
  { year: 2016, month: 'December',  pdf: '152016120710.pdf' },
  { year: 2016, month: 'November',  pdf: '152016110569.pdf' },
  { year: 2016, month: 'October',   pdf: '152016100428.pdf' },
  { year: 2016, month: 'September', pdf: '152016090287.pdf' },
  { year: 2016, month: 'August',    pdf: '152016080146.pdf' },
  { year: 2016, month: 'July',      pdf: '15201607005.pdf' },
  { year: 2016, month: 'June',      pdf: '152016060864.pdf' },
  { year: 2016, month: 'May',       pdf: '152016050723.pdf' },
  { year: 2016, month: 'April',     pdf: '152016040582.pdf' },
  { year: 2016, month: 'March',     pdf: '152016030441.pdf' },
  { year: 2016, month: 'January',   pdf: '152016010159.pdf' },
]

const MONTH_NUM = {
  January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
  July: 7, August: 8, September: 9, October: 10, November: 11, December: 12,
}

const MONTH_SHORT = {
  January: 'JAN', February: 'FEB', March: 'MAR', April: 'APR',
  May: 'MAY', June: 'JUN', July: 'JUL', August: 'AUG',
  September: 'SEP', October: 'OCT', November: 'NOV', December: 'DEC',
}

// Colour palette cycles per month number
const PALETTES = [
  { from: '#002B5E', to: '#003d85' },   // Jan — navy
  { from: '#1a4731', to: '#215a3e' },   // Feb — forest
  { from: '#7c2d12', to: '#9a3412' },   // Mar — brick
  { from: '#FF6600', to: '#e85500' },   // Apr — JMC orange
  { from: '#0c4a6e', to: '#0369a1' },   // May — ocean
  { from: '#4a1942', to: '#6a2860' },   // Jun — plum
  { from: '#002B5E', to: '#003d85' },   // Jul
  { from: '#1a4731', to: '#215a3e' },   // Aug
  { from: '#7c2d12', to: '#9a3412' },   // Sep
  { from: '#FF6600', to: '#e85500' },   // Oct
  { from: '#0c4a6e', to: '#0369a1' },   // Nov
  { from: '#4a1942', to: '#6a2860' },   // Dec
]

function getPalette(month) {
  const m = month || 'January'
  return PALETTES[(MONTH_NUM[m] - 1) % PALETTES.length]
}

function getNewsletterUrl(item) {
  // Support Strapi V4/V5 formats for Media Upload
  if (item.document?.url) {
    return item.document.url.startsWith('http') ? item.document.url : `${STRAPI_URL}${item.document.url}`
  }
  if (item.document?.data?.attributes?.url) {
    const url = item.document.data.attributes.url
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
  }
  // Support custom link
  if (item.link) {
    return item.link
  }
  // Support legacy filename
  if (item.pdf) {
    return `${BASE}${item.pdf}`
  }
  return '#'
}

/* ── Skeleton Card while loading ── */
function SkeletonCard() {
  return (
    <div className="animate-pulse flex flex-col rounded-xl overflow-hidden border border-slate-100 bg-white">
      <div className="h-28 bg-slate-100" />
      <div className="flex items-center justify-between px-3 py-2.5 bg-white">
        <div className="space-y-1.5 w-full">
          <div className="h-3 bg-slate-100 rounded w-2/3" />
          <div className="h-2.5 bg-slate-100 rounded w-1/3" />
        </div>
        <div className="w-7 h-7 rounded-lg bg-slate-50 shrink-0 ml-2" />
      </div>
      <div className="px-3 pb-2.5">
        <div className="h-4 bg-slate-100 rounded-full w-8" />
      </div>
    </div>
  )
}

/* ── Single Newsletter Card ── */
function NewsletterCard({ item, isLatest }) {
  const { from, to } = getPalette(item.month)
  const url = getNewsletterUrl(item)

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Download JMC e-Newsletter ${item.month} ${item.year}`}
      className="group flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* Gradient cover */}
      <div
        className="relative p-4 h-28 flex flex-col justify-between"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      >
        {isLatest && (
          <span className="absolute top-2 right-2 text-[9px] font-extrabold uppercase tracking-widest bg-white/20 text-white px-2 py-0.5 rounded-full border border-white/30 backdrop-blur-sm">
            Latest
          </span>
        )}
        {/* Top watermark row */}
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5z"/>
          </svg>
          <span className="text-white/60 text-[9px] font-extrabold uppercase tracking-widest">JMC Newsletter</span>
        </div>
        {/* Month */}
        <div>
          <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">{item.year}</p>
          <p className="text-white font-black text-2xl leading-none tracking-tight">{MONTH_SHORT[item.month] || 'JAN'}</p>
        </div>
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between px-3 py-2.5 bg-white flex-1">
        <div className="min-w-0">
          <p className="text-[#002B5E] font-bold text-xs truncate">{item.month} {item.year}</p>
          <p className="text-slate-400 text-[10px] font-medium mt-0.5 truncate">Official Issue</p>
        </div>
        {/* Download arrow */}
        <div className="w-7 h-7 rounded-lg bg-slate-50 group-hover:bg-[#FF6600] flex items-center justify-center transition-all duration-300 shrink-0 ml-2">
          <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"/>
          </svg>
        </div>
      </div>

      {/* PDF badge */}
      <div className="px-3 pb-2.5">
        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full border border-red-100">
          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5z"/>
          </svg>
          PDF
        </span>
      </div>
    </a>
  )
}

/* ── Main Page ── */
export default function NewsletterArchive() {
  const [newsletters, setNewsletters] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    getNewsletters()
      .then(res => {
        if (!active) return
        const raw = res.data?.data || res.data || []
        const items = raw.map(x => {
          const attrs = x.attributes || x
          return {
            id: x.id,
            year: attrs.year,
            month: attrs.month,
            pdf: attrs.pdf,
            link: attrs.link,
            document: attrs.document
          }
        })
        setNewsletters(items.length > 0 ? items : STATIC_NEWSLETTERS)
      })
      .catch(err => {
        console.error('Error fetching newsletters from CMS:', err)
        if (active) {
          setNewsletters(STATIC_NEWSLETTERS)
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  // Sort newsletters: newest year first, then newest month first
  const sorted = useMemo(() => {
    return [...newsletters].sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year
      const ma = MONTH_NUM[a.month] || 1
      const mb = MONTH_NUM[b.month] || 1
      return mb - ma
    })
  }, [newsletters])

  const years = useMemo(() => (
    [...new Set(sorted.map(n => n.year))].sort((a, b) => b - a)
  ), [sorted])

  const [activeYear, setActiveYear] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    let list = sorted
    if (activeYear !== 'all') list = list.filter(n => n.year === Number(activeYear))
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(n =>
        n.month.toLowerCase().includes(q) ||
        String(n.year).includes(q)
      )
    }
    return list
  }, [sorted, activeYear, search])

  const latestNewsletter = sorted[0]

  return (
    <SubpageTemplate
      title="E-Newsletter Archive"
      breadcrumb={[{ name: 'E-Newsletter' }]}
    >
      <div className="space-y-6">

        {/* ── Info banner ── */}
        <div className="bg-white rounded shadow-sm p-5 border-l-4 border-[#FF6600]">
          <h2 className="text-lg font-bold text-[#003366] mb-1">JMC Monthly E-Newsletter</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Jammu Municipal Corporation publishes a monthly e-Newsletter documenting civic initiatives, infrastructure projects, sanitation drives, Smart City updates, and governance milestones. Browse the full archive below — click any issue to download the PDF.
          </p>
          <div className="flex flex-wrap gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF6600]" />
              <span className="text-xs font-semibold text-gray-500">
                {loading ? '...' : `${newsletters.length}+ Issues Published`}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#002B5E]" />
              <span className="text-xs font-semibold text-gray-500">
                {loading ? '...' : `${years.length} Years Covered (${years[years.length - 1]}–Present)`}
              </span>
            </div>
          </div>
        </div>

        {/* ── Filter & Search ── */}
        <div className="bg-white rounded shadow-sm p-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">

            {/* Year tabs — scrollable */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar flex-nowrap">
              <button
                onClick={() => setActiveYear('all')}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-extrabold uppercase tracking-wide transition-all ${
                  activeYear === 'all'
                    ? 'bg-[#002B5E] text-white shadow-sm'
                    : 'text-slate-500 hover:text-[#002B5E] hover:bg-slate-100'
                }`}
              >
                All
              </button>
              {years.map(y => (
                <button
                  key={y}
                  onClick={() => setActiveYear(String(y))}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-extrabold uppercase tracking-wide transition-all ${
                    activeYear === String(y)
                      ? 'bg-[#FF6600] text-white shadow-sm'
                      : 'text-slate-500 hover:text-[#002B5E] hover:bg-slate-100'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Search */}
            <div className="relative w-full sm:w-52">
              <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
              </svg>
              <input
                type="text"
                placeholder="Month or year…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-8 py-1.5 text-xs border border-slate-200 rounded-lg bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002B5E]/30 focus:border-[#002B5E]/50 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              )}
            </div>

            <span className="text-[11px] text-slate-400 font-semibold shrink-0 hidden sm:block">
              {loading ? '...' : `${filtered.length} issue${filtered.length !== 1 ? 's' : ''}`}
            </span>
          </div>
        </div>

        {/* ── Grid / Empty State ── */}
        {loading ? (
          /* Premium loading skeleton grid */
          <div className="bg-white rounded shadow-sm p-5">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {Array.from({ length: 12 }).map((_, idx) => (
                <SkeletonCard key={idx} />
              ))}
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded shadow-sm p-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <p className="text-gray-700 font-bold">No newsletters found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search or year filter.</p>
            <button
              onClick={() => { setSearch(''); setActiveYear('all') }}
              className="mt-4 px-4 py-2 bg-[#002B5E] text-white text-sm font-bold rounded-lg hover:bg-[#001f4d] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : activeYear === 'all' && !search.trim() ? (
          /* Grouped by year */
          <div className="space-y-8">
            {years.map(y => {
              const items = filtered.filter(n => n.year === y)
              if (!items.length) return null
              return (
                <div key={y} className="bg-white rounded shadow-sm p-5">
                  {/* Year header */}
                  <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
                    <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#002B5E] to-[#FF6600]" />
                    <h3 className="text-base font-black text-[#002B5E] tracking-tight">{y}</h3>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full ml-1">
                      {items.length} issue{items.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                    {items.map(item => (
                      <NewsletterCard
                        key={`${item.year}-${item.month}`}
                        item={item}
                        isLatest={item === latestNewsletter}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* Flat filtered grid */
          <div className="bg-white rounded shadow-sm p-5">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {filtered.map(item => (
                <NewsletterCard
                  key={`${item.year}-${item.month}`}
                  item={item}
                  isLatest={item === latestNewsletter}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Official source note ── */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-[#002B5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#002B5E]">Source</p>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              All newsletter PDFs are served directly from the official JMC server at{' '}
              <a href="https://jmc.jk.gov.in/newsletter.aspx" target="_blank" rel="noopener noreferrer" className="text-[#FF6600] font-semibold hover:underline">
                jmc.jk.gov.in/newsletter.aspx
              </a>.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar { scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </SubpageTemplate>
  )
}
