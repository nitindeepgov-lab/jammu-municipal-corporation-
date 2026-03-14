import { useState, useRef } from 'react'
import { BsBuildings } from 'react-icons/bs'
import { MdOutlineCleaningServices } from 'react-icons/md'
import { FaFileAlt, FaWater } from 'react-icons/fa'
import { RiMoneyRupeeCircleLine } from 'react-icons/ri'
import SubpageTemplate from '../components/SubpageTemplate'

const paymentOptions = [
  {
    id: 'building',
    name: 'Building Permission Fee',
    desc: 'Pay fee for building plan / construction permission',
    href: 'https://jmc.jk.gov.in/PermissionForm.aspx',
    icon: BsBuildings,
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    activeRing: 'border-blue-600 bg-blue-50',
    fields: [
      { id: 'ownerName', label: 'Name of Property Owner', type: 'text', placeholder: 'Enter name of property owner', required: true },
      { id: 'parentage', label: 'Parentage', type: 'text', placeholder: 'Enter parentage (S/o, D/o, W/o)', required: true },
      { id: 'mobile', label: 'Mobile No.', type: 'tel', placeholder: 'Enter mobile number', required: true },
      { id: 'email', label: 'Email ID', type: 'email', placeholder: 'Enter email address' },
      { id: 'address', label: 'Address', type: 'textarea', placeholder: 'Enter applicant address' },
      { id: 'buildingPermNo', label: 'Building Permission No.', type: 'text', placeholder: 'Enter building permission number', required: true },
      { id: 'buildingAddress', label: 'Building Address', type: 'textarea', placeholder: 'Enter building / property address' },
      { id: 'details', label: 'Details', type: 'textarea', placeholder: 'Enter any additional details' },
      {
        id: 'feeItems',
        label: 'Payment For',
        type: 'fee-checkboxes',
        feeItems: [
          { id: 'septicTank', label: 'Septic Tank Security Fee' },
          { id: 'mulba', label: 'Mulba Security Fee' },
          { id: 'application', label: 'Application Fee' },
          { id: 'constructionPlan', label: 'Building Construction Plan Fee' },
          { id: 'betterment', label: 'Betterment Charges' },
          { id: 'sanitation', label: 'Sanitation Charges' },
          { id: 'license', label: 'License Fee' },
          { id: 'professional', label: 'Professional Fee' },
          { id: 'copying', label: 'Copying Fee' },
          { id: 'labourCess', label: 'Labour Cess Fee' },
        ],
      },
    ],
  },
  {
    id: 'sanitation',
    name: 'Sanitation Fee',
    desc: 'Pay sanitation and solid waste management charges',
    href: 'https://jmc.jk.gov.in/SanitationFee.aspx',
    icon: MdOutlineCleaningServices,
    color: 'bg-green-50 text-green-700 border-green-200',
    activeRing: 'border-green-600 bg-green-50',
    fields: [
      { id: 'ownerName', label: 'Name of Property Owner', type: 'text', placeholder: 'Enter name of property owner', required: true },
      { id: 'mobile', label: 'Mobile No.', type: 'tel', placeholder: 'Enter mobile number', required: true },
      { id: 'email', label: 'Email ID', type: 'email', placeholder: 'Enter email address' },
      { id: 'propertyAddress', label: 'Property Address', type: 'textarea', placeholder: 'Enter property address' },
      {
        id: 'location',
        label: 'Select Location',
        type: 'select',
        options: ['Select', 'Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'],
        required: true,
      },
      { id: 'period', label: 'Period', type: 'text', placeholder: 'Enter period (e.g. Jan 2026 – Mar 2026)', required: true },
      { id: 'amount', label: 'Amount (₹)', type: 'number', placeholder: 'Enter amount', required: true },
    ],
  },
  {
    id: 'tender',
    name: 'Tender Fee',
    desc: 'Pay tender document and processing charges',
    href: 'https://jmc.jk.gov.in/TenderFee.aspx',
    icon: FaFileAlt,
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    activeRing: 'border-orange-500 bg-orange-50',
    fields: [
      { id: 'name', label: 'Name', type: 'text', placeholder: 'Enter name', required: true },
      { id: 'parentage', label: 'Parentage', type: 'text', placeholder: 'Enter parentage (S/o, D/o, W/o)', required: true },
      { id: 'mobile', label: 'Mobile No.', type: 'tel', placeholder: 'Enter mobile number', required: true },
      { id: 'email', label: 'Email ID', type: 'email', placeholder: 'Enter email address' },
      { id: 'address', label: 'Address', type: 'textarea', placeholder: 'Enter address' },
      { id: 'nitTenderNo', label: 'NIT/Tender No.', type: 'text', placeholder: 'Enter NIT/Tender No.', required: true },
      { id: 'nitTenderDate', label: 'NIT/Tender Date', type: 'date', required: true },
      { id: 'nitTenderDetails', label: 'NIT/Tender Details', type: 'textarea', placeholder: 'Enter NIT/Tender details' },
      { id: 'amount', label: 'NIT/Tender Amount (₹)', type: 'number', placeholder: '0.0', required: true },
    ],
  },
  {
    id: 'other',
    name: 'Other Fee',
    desc: 'Pay miscellaneous JMC dues and charges',
    href: 'https://jmc.jk.gov.in/OtherFee.aspx',
    icon: RiMoneyRupeeCircleLine,
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    activeRing: 'border-purple-600 bg-purple-50',
    fields: [
      { id: 'dept', label: 'Select Department', type: 'select', options: ['Select', 'Health Section', 'Veterinary Services Treatment Of Cattle Cell Section', 'Transport Section', 'Khilafwarzi Section', 'Revenue Section', 'Other Services Miscellaneous', 'Building Permission Section'], required: true },
      { id: 'feeType', label: 'Select Type of Fee', type: 'text', placeholder: 'Enter type of fee', required: true },
      { id: 'payDetails', label: 'Payment Details', type: 'text', placeholder: 'Enter payment details', required: true },
      { id: 'location', label: 'Select Location', type: 'select', options: ['Select', 'Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'], required: true },
      { id: 'name', label: 'Name', type: 'text', placeholder: 'Enter full name', required: true },
      { id: 'mobile', label: 'Mobile Number', type: 'tel', placeholder: 'Enter 10-digit mobile number', required: true },
      { id: 'email', label: 'Email ID', type: 'email', placeholder: 'Enter email address' },
      { id: 'address', label: 'Address', type: 'textarea', placeholder: 'Enter full address', required: true },
      { id: 'amount', label: 'Amount (₹)', type: 'number', placeholder: 'Enter amount', required: true },
    ],
  },
  {
    id: 'water',
    name: 'Water Connection Bill',
    desc: 'Pay water connection and usage charges',
    href: 'https://jmc.jk.gov.in/pddeservices.html',
    icon: FaWater,
    color: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    activeRing: 'border-cyan-600 bg-cyan-50',
    fields: [
      { id: 'connNo', label: 'Consumer / Connection Number', type: 'text', placeholder: 'Enter consumer number', required: true },
      { id: 'name', label: 'Consumer Name', type: 'text', placeholder: 'Enter full name', required: true },
      { id: 'mobile', label: 'Mobile Number', type: 'tel', placeholder: 'Enter 10-digit mobile number', required: true },
      { id: 'email', label: 'Email ID', type: 'email', placeholder: 'Enter email address' },
      { id: 'address', label: 'Address', type: 'textarea', placeholder: 'Enter full address' },
      { id: 'amount', label: 'Amount (₹)', type: 'number', placeholder: 'Enter amount', required: true },
    ],
  },
]

function FormField({ field, value, onChange }) {
  const base = 'w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent transition bg-white'
  if (field.type === 'select') {
    return (
      <select id={field.id} value={value || ''} onChange={onChange} required={field.required} className={base}>
        {field.options.map(opt => (
          <option key={opt} value={opt === field.options[0] ? '' : opt}>{opt}</option>
        ))}
      </select>
    )
  }
  if (field.type === 'textarea') {
    return (
      <textarea id={field.id} value={value || ''} onChange={onChange} placeholder={field.placeholder}
        required={field.required} rows={3} className={base + ' resize-none'} />
    )
  }
  if (field.type === 'fee-checkboxes') {
    const feeValue = value || {}
    const handleFee = (feeId, prop, val) => {
      const updated = { ...feeValue, [feeId]: { ...(feeValue[feeId] || { checked: false, amount: '' }), [prop]: val } }
      onChange({ target: { id: field.id, value: updated } })
    }
    const total = Object.values(feeValue).reduce((sum, item) => item.checked ? sum + (parseFloat(item.amount) || 0) : sum, 0)
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 grid grid-cols-[1fr_auto] text-xs font-semibold text-gray-500 border-b border-gray-200">
          <span>Fee Type</span><span className="w-28 text-right pr-1">Amount (₹)</span>
        </div>
        <div className="divide-y divide-gray-100">
          {field.feeItems.map(item => {
            const itemState = feeValue[item.id] || { checked: false, amount: '' }
            return (
              <div key={item.id} className="flex items-center gap-3 px-4 py-2.5">
                <input type="checkbox" checked={itemState.checked}
                  onChange={e => handleFee(item.id, 'checked', e.target.checked)}
                  className="w-4 h-4 accent-[#003366] cursor-pointer flex-shrink-0" />
                <span className={`flex-1 text-sm ${itemState.checked ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                  {item.label}
                </span>
                <input type="number" value={itemState.amount}
                  onChange={e => handleFee(item.id, 'amount', e.target.value)}
                  disabled={!itemState.checked}
                  min="0" placeholder="0.00"
                  className="w-28 border border-gray-300 rounded px-2 py-1.5 text-sm text-right disabled:bg-gray-100 disabled:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#003366] bg-white" />
              </div>
            )
          })}
        </div>
        <div className="px-4 py-2.5 bg-[#003366]/5 flex items-center justify-between border-t border-gray-200">
          <span className="text-sm font-bold text-[#003366]">Total Amount</span>
          <span className="text-sm font-bold text-[#003366] w-28 text-right pr-1">₹ {total.toFixed(2)}</span>
        </div>
      </div>
    )
  }
  return (
    <input id={field.id} type={field.type} value={value || ''} onChange={onChange}
      placeholder={field.placeholder} required={field.required} className={base} />
  )
}

export default function PayOnline() {
  const [selected, setSelected] = useState(null)
  const [formData, setFormData] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef(null)

  const handleSelect = (option) => {
    if (selected?.id === option.id) {
      setSelected(null)
      setFormData({})
      setSubmitted(false)
    } else {
      setSelected(option)
      setFormData({})
      setSubmitted(false)
      setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => window.open(selected.href, '_blank', 'noopener,noreferrer'), 600)
  }

  return (
    <SubpageTemplate
      title="Online Payment"
      breadcrumb={[{ name: 'Citizen Services', to: '/services' }, { name: 'Online Payment', to: null }]}
    >
      <div className="space-y-8">

        {/* Hero header */}
        <div className="rounded-xl bg-[#003366] px-6 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-1">Jammu Municipal Corporation</p>
            <h2 className="text-white font-bold text-xl mb-1.5">Online Payment Portal</h2>
            <p className="text-blue-200 text-sm">Select a fee category, fill in the details, and proceed to payment securely.</p>
          </div>
          <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 flex-shrink-0 self-start sm:self-auto">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
            </svg>
            <span className="text-white text-xs font-semibold">Secure &amp; Official</span>
          </div>
        </div>

        {/* Progress stepper */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm px-5 py-4">
          <div className="flex items-center justify-between">
            {[
              { label: 'Select Category', icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h7" /></svg> },
              { label: 'Fill Details', icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg> },
              { label: 'Proceed to Pay', icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
            ].map(({ label, icon }, i, arr) => {
              const isComplete = (i === 0 && selected) || (i === 1 && submitted)
              const isActive = (i === 0 && !selected) || (i === 1 && selected && !submitted) || (i === 2 && submitted)
              return (
                <div key={label} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-1.5 flex-1">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isComplete ? 'bg-green-500 border-green-500 text-white' :
                      isActive ? 'bg-[#003366] border-[#003366] text-white' :
                      'bg-white border-gray-200 text-gray-400'
                    }`}>
                      {isComplete
                        ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        : icon}
                    </div>
                    <span className={`text-[10px] font-semibold hidden sm:block text-center transition-colors ${
                      isComplete ? 'text-green-600' : isActive ? 'text-[#003366]' : 'text-gray-400'
                    }`}>{label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-2 mb-5 sm:mb-0 rounded-full transition-all duration-500 ${
                      (i === 0 && selected) || (i === 1 && submitted) ? 'bg-green-400' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Payment category cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[#003366] font-bold text-base">Choose Payment Category</h3>
              <p className="text-gray-400 text-xs mt-0.5">Select the type of fee you want to pay</p>
            </div>
            {selected && (
              <button
                onClick={() => { setSelected(null); setFormData({}); setSubmitted(false) }}
                className="text-xs text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1 border border-gray-200 hover:border-red-200 rounded-lg px-3 py-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                Clear selection
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {paymentOptions.map((option) => {
              const Icon = option.icon
              const isActive = selected?.id === option.id
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  className={`group relative flex items-center gap-4 bg-white rounded-xl p-4 transition-all duration-200 text-left w-full overflow-hidden
                    ${isActive ? 'shadow-lg ring-2 ring-[#003366]' : 'shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200'}`}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-all duration-200 ${isActive ? 'bg-[#FF6600]' : 'bg-transparent group-hover:bg-gray-200'}`} />
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl border ml-2 flex-shrink-0 transition-transform duration-200 ${option.color} ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                    <Icon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm leading-tight transition-colors ${isActive ? 'text-[#FF6600]' : 'text-[#003366] group-hover:text-[#FF6600]'}`}>
                      {option.name}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5 leading-snug">{option.desc}</p>
                  </div>
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${isActive ? 'bg-orange-50' : 'bg-gray-50 group-hover:bg-orange-50'}`}>
                    <svg className={`w-3.5 h-3.5 transition-all ${isActive ? 'rotate-90 text-[#FF6600]' : 'text-gray-400 group-hover:text-[#FF6600]'}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Inline Form */}
        {selected && (
          <div ref={formRef} className="rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            {/* Form header */}
            <div className="bg-gradient-to-r from-[#003366] to-[#004f99] px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 flex items-center justify-center rounded-xl border-2 border-white/20 ${selected.color}`}>
                  <selected.icon size={22} />
                </div>
                <div>
                  <p className="text-white font-bold text-base">{selected.name}</p>
                  <p className="text-blue-300 text-xs mt-0.5">Fill in the details — fields marked * are required</p>
                </div>
              </div>
              <button
                onClick={() => { setSelected(null); setFormData({}); setSubmitted(false) }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-blue-200 hover:text-white transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {submitted ? (
              <div className="bg-white p-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 ring-4 ring-green-50">
                  <svg className="w-9 h-9 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-[#003366] font-bold text-lg mb-2">Redirecting to Payment Portal…</p>
                <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
                  You will be taken to the official JMC payment gateway to complete your transaction securely.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white">
                <div className="p-6 sm:p-7">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
                    {selected.fields.map((field) => (
                      <div key={field.id} className={field.type === 'textarea' || field.type === 'fee-checkboxes' ? 'sm:col-span-2' : ''}>
                        <label htmlFor={field.id} className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-0.5 normal-case font-normal"> *</span>}
                        </label>
                        <FormField field={field} value={formData[field.id]} onChange={handleChange} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 border-t border-gray-100 px-6 sm:px-7 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                    </svg>
                    Secure redirect to official JMC payment portal
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => { setSelected(null); setFormData({}) }}
                      className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-100 hover:border-gray-300 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 sm:flex-none px-7 py-2.5 rounded-xl bg-[#003366] text-white text-sm font-bold hover:bg-[#FF6600] transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-900/20"
                    >
                      Proceed to Pay
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Bottom info strip */}
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            {
              icon: <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
              bg: 'bg-blue-50 border-blue-100',
              title: 'Secure Payments',
              desc: 'All transactions are SSL encrypted and processed via the official JMC payment gateway.',
            },
            {
              icon: <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
              bg: 'bg-green-50 border-green-100',
              title: 'Instant Receipt',
              desc: 'Download your payment receipt instantly after a successful transaction.',
            },
            {
              icon: <svg className="w-5 h-5 text-[#FF6600]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
              bg: 'bg-orange-50 border-orange-100',
              title: 'Helpline: 1800-180-7207',
              desc: 'Toll Free · Monday–Friday · 10 AM to 5 PM',
            },
          ].map(({ icon, bg, title, desc }) => (
            <div key={title} className={`border rounded-xl p-4 flex gap-3 items-start ${bg}`}>
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                {icon}
              </div>
              <div>
                <p className="font-bold text-xs text-gray-800 mb-0.5">{title}</p>
                <p className="text-gray-500 text-[11px] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </SubpageTemplate>
  )
}
