import { useState, useRef, useCallback } from 'react'
import { FaFileAlt } from 'react-icons/fa'
import { RiMoneyRupeeCircleLine } from 'react-icons/ri'
import SubpageTemplate from '../components/SubpageTemplate'
import { STRAPI_URL } from '../config/api'

/* ═══════════════════════════════════════════════════════
   Payment Categories
   ═══════════════════════════════════════════════════════ */
const paymentOptions = [
  {
    id: 'tender',
    name: 'Tender Fee',
    desc: 'Pay tender document and processing charges',
    feeType: 'TENDER_FEE',
    icon: FaFileAlt,
    accentFrom: '#f97316', accentTo: '#f59e0b',
    fields: [
      { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter your full name', required: true, half: true },
      { id: 'parentage', label: 'Parentage', type: 'text', placeholder: 'S/o, D/o, W/o', required: true, half: true },
      { id: 'mobile', label: 'Mobile Number', type: 'tel', placeholder: '10-digit mobile number', required: true, half: true },
      { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', half: true },
      { id: 'address', label: 'Address', type: 'textarea', placeholder: 'Enter your full address' },
      { id: 'nitTenderNo', label: 'NIT / Tender No.', type: 'text', placeholder: 'e.g. NIT-2025/001', required: true, half: true },
      { id: 'nitTenderDate', label: 'NIT / Tender Date', type: 'date', required: true, half: true },
      { id: 'nitTenderDetails', label: 'Tender Details', type: 'textarea', placeholder: 'Brief description of the tender' },
      { id: 'amount', label: 'Amount', type: 'number', placeholder: '₹ 0.00', required: true, half: true },
    ],
  },
  {
    id: 'other',
    name: 'Other Fee',
    desc: 'Pay miscellaneous JMC dues and charges',
    feeType: 'OTHER_FEE',
    icon: RiMoneyRupeeCircleLine,
    accentFrom: '#8b5cf6', accentTo: '#6366f1',
    fields: [
      { id: 'dept', label: 'Department', type: 'select', options: ['Select Department', 'Health Section', 'Veterinary Services', 'Transport Section', 'Khilafwarzi Section', 'Revenue Section', 'Miscellaneous', 'Building Permission'], required: true, half: true },
      { id: 'feeType', label: 'Type of Fee', type: 'text', placeholder: 'e.g. License Renewal', required: true, half: true },
      { id: 'payDetails', label: 'Payment Details', type: 'text', placeholder: 'Brief description', required: true },
      { id: 'location', label: 'Zone', type: 'select', options: ['Select Zone', 'Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'], required: true, half: true },
      { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter your full name', required: true, half: true },
      { id: 'mobile', label: 'Mobile Number', type: 'tel', placeholder: '10-digit mobile number', required: true, half: true },
      { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', half: true },
      { id: 'address', label: 'Address', type: 'textarea', placeholder: 'Enter your full address', required: true },
      { id: 'amount', label: 'Amount', type: 'number', placeholder: '₹ 0.00', required: true, half: true },
    ],
  },
]

/* ═══════════════════════════════════════════════════════
   Input Component — Clean, minimal
   ═══════════════════════════════════════════════════════ */
function Field({ field, value, onChange }) {
  const cls =
    'w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-[14px] text-gray-800 ' +
    'placeholder:text-gray-400 outline-none transition-all ' +
    'focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/10'

  if (field.type === 'select') {
    return (
      <select id={field.id} value={value || ''} onChange={onChange} required={field.required} className={cls + ' appearance-none bg-no-repeat bg-[right_12px_center] bg-[length:16px] cursor-pointer'} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")` }}>
        {field.options.map(opt => (
          <option key={opt} value={opt === field.options[0] ? '' : opt}>{opt}</option>
        ))}
      </select>
    )
  }
  if (field.type === 'textarea') {
    return (
      <textarea id={field.id} value={value || ''} onChange={onChange} placeholder={field.placeholder}
        required={field.required} rows={2} className={cls + ' resize-none'} />
    )
  }
  return (
    <input id={field.id} type={field.type} value={value || ''} onChange={onChange}
      placeholder={field.placeholder} required={field.required}
      className={cls}
      {...(field.type === 'number' ? { min: 0, step: '0.01' } : {})} />
  )
}

/* ═══════════════════════════════════════════════════════
   Status enum
   ═══════════════════════════════════════════════════════ */
const STATUS = { IDLE: 0, LOADING: 1, SUCCESS: 2, FAILED: 3 }

/* ═══════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════ */
export default function PayOnline() {
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({})
  const [status, setStatus] = useState(STATUS.IDLE)
  const [msg, setMsg] = useState('')
  const panelRef = useRef(null)

  /* helpers */
  const reset = useCallback(() => { setSelected(null); setForm({}); setStatus(STATUS.IDLE); setMsg('') }, [])

  const pick = (opt) => {
    if (selected?.id === opt.id) { reset(); return }
    setSelected(opt); setForm({}); setStatus(STATUS.IDLE); setMsg('')
    setTimeout(() => panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  const onChange = (e) => setForm(p => ({ ...p, [e.target.id]: e.target.value }))

  /* ── BillDesk response handler ───────────────────────── */
  const handleBillDeskResponse = useCallback((txn) => {
    console.log('BillDesk SDK response:', txn)
    if (txn && (txn.status === '0300' || txn.transaction_error_type === 'success')) {
      setStatus(STATUS.SUCCESS)
      setMsg(txn.transactionid || txn.orderid || '')
    } else {
      setStatus(STATUS.FAILED)
      setMsg(txn?.transaction_error_desc || 'Payment was not completed.')
    }
  }, [])

  /* ── Submit → Backend → SDK ──────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(STATUS.LOADING)

    try {
      // ────────────────────────────────────────────────────────
      // TEST INTEGRATION: Mocking backend response to show SDK UI
      // ────────────────────────────────────────────────────────
      // TODO: Uncomment this block when you get real credentials!
      /*
      const res = await fetch(`${STRAPI_URL}/api/billdesk/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: form.amount,
          customerName: form.name || '',
          customerEmail: form.email || '',
          customerMobile: form.mobile || '',
          feeType: selected.feeType,
          additionalInfo: form,
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error?.message || `Server error ${res.status}`)
      }
      const { data } = await res.json()
      */
      
      // MOCK DATA: Just to trigger the Sandbox UI
      await new Promise(r => setTimeout(r, 600)) // Fake network delay
      const data = {
        merchantId: 'BDSKUUAT',
        bdOrderId: 'MOCK_ORDER_' + Date.now(),
        authToken: 'MOCK_TEST_TOKEN',
      }
      // ────────────────────────────────────────────────────────

      // 2) Launch BillDesk Web SDK
      if (!window.loadBillDeskSdk) {
        throw new Error('BillDesk SDK not loaded. Check your internet connection.')
      }

      window.loadBillDeskSdk({
        responseHandler: handleBillDeskResponse,
        merchantLogo: '/logo.jpeg',
        flowConfig: {
          merchantId: data.merchantId,
          bdOrderId: data.bdOrderId,
          authToken: data.authToken,
          childWindow: false,
          retryCount: 3,
          prefs: { payment_categories: ['card', 'nb', 'upi', 'wallets', 'qr'] },
        },
        flowType: 'payments',
      })
    } catch (err) {
      console.error('Payment init failed:', err)
      setStatus(STATUS.FAILED)
      setMsg(err.message || 'Could not start payment. Please try again.')
    }
  }

  /* derived */
  const step = status === STATUS.IDLE ? (selected ? 1 : 0) : 2
  const amount = form.amount ? parseFloat(form.amount) : 0

  /* ═══════════════════════════════════════════════════════
     Render
     ═══════════════════════════════════════════════════════ */
  return (
    <SubpageTemplate
      title="Online Payment"
      breadcrumb={[{ name: 'Citizen Services', to: '/services' }, { name: 'Online Payment', to: null }]}
    >
      <div className="space-y-6 max-w-4xl mx-auto">

        {/* ── Hero ─────────────────────────────────────── */}
        <div className="relative rounded-2xl overflow-hidden bg-[#003366]">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M20 18V0H0v20h18V20zM20 20v18h18V20z'/%3E%3C/g%3E%3C/svg%3E")` }} />
          <div className="relative px-6 py-6 sm:px-8 sm:py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-blue-300/80 text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5">Jammu Municipal Corporation</p>
              <h2 className="text-white font-bold text-xl sm:text-2xl leading-tight">Online Payment Portal</h2>
              <p className="text-blue-200/60 text-sm mt-1">Secure payments powered by BillDesk</p>
            </div>
            <div className="flex items-center gap-2.5 bg-white/[0.08] border border-white/[0.1] rounded-xl px-4 py-2.5 shrink-0 self-start">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/90 text-xs font-semibold">SSL Secured</span>
            </div>
          </div>
        </div>

        {/* ── Stepper ──────────────────────────────────── */}
        <div className="bg-white rounded-xl border border-gray-100 px-6 py-4 shadow-sm">
          <div className="flex items-center">
            {['Select Category', 'Fill Details', 'Payment'].map((label, i, arr) => {
              const done = i < step, active = i === step
              return (
                <div key={label} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1 gap-1.5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      done ? 'bg-green-500 text-white' : active ? 'bg-[#003366] text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {done ? '✓' : i + 1}
                    </div>
                    <span className={`text-[10px] font-semibold hidden sm:block ${done ? 'text-green-600' : active ? 'text-[#003366]' : 'text-gray-400'}`}>{label}</span>
                  </div>
                  {i < arr.length - 1 && <div className={`h-0.5 flex-1 mx-2 rounded-full mb-4 sm:mb-0 transition-colors duration-500 ${done ? 'bg-green-400' : 'bg-gray-100'}`} />}
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Category Selection ───────────────────────── */}
        {status === STATUS.IDLE && (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-gray-900 font-semibold text-base">Choose Payment Category</h3>
              {selected && (
                <button onClick={reset} className="text-xs text-gray-500 hover:text-red-500 transition flex items-center gap-1">
                  <span>×</span> Clear
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {paymentOptions.map(opt => {
                const Icon = opt.icon
                const active = selected?.id === opt.id
                return (
                  <button key={opt.id} onClick={() => pick(opt)}
                    className={`group relative flex items-center gap-4 rounded-xl p-4 text-left w-full transition-all duration-200 ${
                      active ? 'bg-white shadow-lg ring-2 ring-[#003366]' : 'bg-white border border-gray-100 hover:shadow-md hover:border-gray-200'
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200`}
                      style={{ background: active ? `linear-gradient(135deg,${opt.accentFrom},${opt.accentTo})` : '#f3f4f6', color: active ? '#fff' : opt.accentFrom }}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm ${active ? 'text-[#003366]' : 'text-gray-900'}`}>{opt.name}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{opt.desc}</p>
                    </div>
                    <svg className={`w-4 h-4 shrink-0 transition-all ${active ? 'text-[#003366] rotate-90' : 'text-gray-300 group-hover:text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                )
              })}
            </div>
          </>
        )}

        {/* ── Form Panel ───────────────────────────────── */}
        {selected && status === STATUS.IDLE && (
          <div ref={panelRef} className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
            {/* header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between"
              style={{ background: `linear-gradient(135deg, ${selected.accentFrom}08, ${selected.accentTo}05)` }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white"
                  style={{ background: `linear-gradient(135deg,${selected.accentFrom},${selected.accentTo})` }}>
                  <selected.icon size={18} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{selected.name}</p>
                  <p className="text-gray-400 text-[11px]">Fields marked * are required</p>
                </div>
              </div>
              <button onClick={reset} className="text-gray-400 hover:text-gray-600 transition p-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* form body */}
            <form onSubmit={handleSubmit}>
              <div className="px-6 py-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                  {selected.fields.map(f => (
                    <div key={f.id} className={f.type === 'textarea' || !f.half ? 'sm:col-span-2' : ''}>
                      <label htmlFor={f.id} className="block text-xs font-medium text-gray-500 mb-1.5">
                        {f.label}{f.required && <span className="text-red-400 ml-0.5">*</span>}
                      </label>
                      <Field field={f} value={form[f.id]} onChange={onChange} />
                    </div>
                  ))}
                </div>
              </div>

              {/* footer */}
              <div className="px-6 py-4 bg-gray-50/70 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" /></svg>
                  Secure via <strong className="text-gray-600 ml-0.5">BillDesk</strong>
                </div>
                <div className="flex gap-2.5 w-full sm:w-auto">
                  <button type="button" onClick={reset}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition">
                    Cancel
                  </button>
                  <button type="submit"
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-[#003366] text-white text-sm font-semibold hover:bg-[#004080] transition flex items-center justify-center gap-2 shadow-sm">
                    {amount > 0 ? `Pay ₹${amount.toFixed(2)}` : 'Proceed to Pay'}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ── Loading ──────────────────────────────────── */}
        {status === STATUS.LOADING && (
          <div ref={panelRef} className="bg-white rounded-2xl border border-gray-100 shadow-lg p-12 text-center">
            <div className="relative w-14 h-14 mx-auto mb-5">
              <div className="absolute inset-0 rounded-full border-[3px] border-gray-100" />
              <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#003366] animate-spin" />
            </div>
            <p className="text-gray-900 font-semibold text-lg">Initializing Payment…</p>
            <p className="text-gray-400 text-sm mt-1.5 max-w-xs mx-auto">Connecting to BillDesk. Please do not close this window.</p>
          </div>
        )}

        {/* ── Success ──────────────────────────────────── */}
        {status === STATUS.SUCCESS && (
          <div ref={panelRef} className="bg-white rounded-2xl border border-green-100 shadow-lg p-12 text-center">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
            </div>
            <p className="text-gray-900 font-semibold text-lg">Payment Successful</p>
            {msg && <p className="text-green-600 text-xs font-mono bg-green-50 inline-block px-3 py-1 rounded mt-2">{msg}</p>}
            <p className="text-gray-400 text-sm mt-3">Your payment has been processed. A receipt has been sent to your email.</p>
            <button onClick={reset} className="mt-6 px-6 py-2.5 rounded-lg bg-[#003366] text-white text-sm font-semibold hover:bg-[#004080] transition">Make Another Payment</button>
          </div>
        )}

        {/* ── Failed ───────────────────────────────────── */}
        {status === STATUS.FAILED && (
          <div ref={panelRef} className="bg-white rounded-2xl border border-red-100 shadow-lg p-12 text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </div>
            <p className="text-gray-900 font-semibold text-lg">Payment Not Completed</p>
            <p className="text-gray-500 text-sm mt-1.5 max-w-md mx-auto">{msg || 'The payment could not be processed. You have not been charged.'}</p>
            <div className="flex gap-3 justify-center mt-6">
              <button onClick={() => { setStatus(STATUS.IDLE); setMsg('') }}
                className="px-6 py-2.5 rounded-lg bg-[#003366] text-white text-sm font-semibold hover:bg-[#004080] transition">Retry</button>
              <button onClick={reset}
                className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition">Start Over</button>
            </div>
          </div>
        )}

        {/* ── Info Strip ───────────────────────────────── */}
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { icon: '🛡️', title: 'Secure Payments', desc: 'SSL encrypted via BillDesk', bg: 'bg-blue-50/60 border-blue-100' },
            { icon: '🧾', title: 'Instant Receipt', desc: 'Download receipt after payment', bg: 'bg-green-50/60 border-green-100' },
            { icon: '📞', title: '1800-180-7207', desc: 'Toll-free helpline', bg: 'bg-orange-50/60 border-orange-100' },
          ].map(({ icon, title, desc, bg }) => (
            <div key={title} className={`border rounded-xl p-4 flex items-center gap-3 ${bg}`}>
              <span className="text-xl">{icon}</span>
              <div>
                <p className="font-semibold text-xs text-gray-800">{title}</p>
                <p className="text-gray-500 text-[10px]">{desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </SubpageTemplate>
  )
}
