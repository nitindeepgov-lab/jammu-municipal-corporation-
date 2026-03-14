import SubpageTemplate from '../components/SubpageTemplate'

export default function Feedback() {
  return (
    <SubpageTemplate title="Feedback" breadcrumb={[{ name: 'Feedback' }]}>
      <div>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded shadow-sm p-8">
            <h2 className="text-lg font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-6 inline-block">
              Share Your Feedback
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              We value your opinion. Your feedback helps us improve our services and serve you better.
              Please fill in the form below or submit directly on the JMC portal.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                window.open('https://jmc.jk.gov.in/feedback.aspx', '_blank')
              }}
              className="space-y-5"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input type="text" required placeholder="First Name" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#003366]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" placeholder="Last Name" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#003366]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input type="email" required placeholder="your@email.com" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#003366]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service / Department</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#003366] bg-white">
                  <option value="">Select</option>
                  <option>Water Supply / PHE</option>
                  <option>Sanitation</option>
                  <option>Roads & Infrastructure</option>
                  <option>Property Tax</option>
                  <option>Street Lighting</option>
                  <option>Smart City Services</option>
                  <option>Online Portal</option>
                  <option>General</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex gap-2">
                  {['Excellent', 'Good', 'Average', 'Poor'].map(r => (
                    <label key={r} className="flex items-center gap-1 text-sm text-gray-600 cursor-pointer">
                      <input type="radio" name="rating" value={r} className="accent-[#FF6600]" />
                      {r}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Feedback *</label>
                <textarea required rows={5} placeholder="Please share your feedback, suggestions, or comments..." className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#003366] resize-none" />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 bg-[#003366] hover:bg-[#004080] text-white py-2.5 rounded font-medium text-sm transition-colors">
                  Submit Feedback
                </button>
                <a
                  href="https://jmc.jk.gov.in/feedback.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white py-2.5 rounded font-medium text-sm transition-colors text-center"
                >
                  Submit on Portal
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SubpageTemplate>
  )
}
