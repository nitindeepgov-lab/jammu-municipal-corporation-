import { useState } from 'react'
import SubpageTemplate from '../components/SubpageTemplate'

const noticeData = {
  public: [
    { title: 'PHE Water Supply Helpline Numbers — Important Notice', date: '20 May 2025', href: 'https://jmc.jk.gov.in/adminjmcpanel/noticefiles/318202558462347.pdf' },
    { title: 'Notice regarding Property Tax Assessment for Financial Year 2025-26', date: '15 May 2025', href: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Public' },
    { title: 'Public Notice: Trade License Renewal — All Traders to Apply', date: '10 May 2025', href: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Public' },
    { title: 'Important: Solid Waste Management Guidelines for Residents', date: '05 May 2025', href: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Public' },
    { title: 'Notification regarding Garbage Collection Timings', date: '01 May 2025', href: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Public' },
    { title: 'Online Building Permission — Apply via JMC Portal', date: '25 Apr 2025', href: 'https://jmc.jk.gov.in/PermissionForm.aspx' },
    { title: 'Swachh Bharat Mission — Citizen Participation Drive', date: '20 Apr 2025', href: 'https://jmc.jk.gov.in/swachhgallery.aspx' },
    { title: 'Street Light Repair Grievance — Report via Helpline', date: '15 Apr 2025', href: 'https://jmc.jk.gov.in/OnlineGrievances.aspx' },
  ],
  tenders: [
    { title: 'Tender for Street Light Repair and Maintenance Works in Jammu City', date: '22 May 2025', href: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Tender' },
    { title: 'Tender for Supply and Installation of Solid Waste Management Equipment', date: '18 May 2025', href: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Tender' },
    { title: 'Tender for Construction of Public Toilet Complexes at Multiple Locations', date: '12 May 2025', href: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Tender' },
    { title: 'Tender for Road Repair and Development Works in Jammu City', date: '08 May 2025', href: 'https://jmc.jk.gov.in/developwork.aspx' },
    { title: 'Tender for Horticulture Development and Maintenance of Gardens', date: '03 May 2025', href: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Tender' },
    { title: 'Tender for Supply of Uniform and Safety Equipment for Sanitation Workers', date: '28 Apr 2025', href: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Tender' },
  ],
  council: [
    { title: 'Council Meeting Proceedings — April 2025', date: '30 Apr 2025', href: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Council' },
    { title: 'Resolutions Passed in General House Meeting — March 2025', date: '28 Mar 2025', href: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Council' },
    { title: 'Standing Committee Meeting Minutes — February 2025', date: '25 Feb 2025', href: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Council' },
    { title: 'Special Session on Development Works — January 2025', date: '20 Jan 2025', href: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Council' },
    { title: 'Budget Approval Meeting — December 2024', date: '15 Dec 2024', href: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Council' },
  ],
}

const tabs = [
  { id: 'public', label: 'Public Notices' },
  { id: 'tenders', label: 'Tenders' },
  { id: 'council', label: 'Council Updates' },
]

export default function Notices() {
  const [active, setActive] = useState('public')

  return (
    <SubpageTemplate title="Notices &amp; Tenders" breadcrumb={[{ name: 'Notices & Tenders' }]}>
      <div>
        <div className="bg-white rounded shadow-sm overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-gray-200">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`px-6 py-4 text-sm font-semibold transition-colors border-b-2 ${
                  active === tab.id
                    ? 'border-[#FF6600] text-[#FF6600] bg-orange-50'
                    : 'border-transparent text-gray-600 hover:text-[#003366] hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Notice list */}
          <div className="p-6">
            <ul className="divide-y divide-gray-100">
              {noticeData[active].map((notice, idx) => (
                <li key={idx} className="py-4 flex items-start gap-4">
                  <div className="flex-shrink-0 bg-[#003366] text-white text-center px-3 py-1.5 rounded text-xs min-w-[80px]">
                    {notice.date}
                  </div>
                  <div className="flex-1">
                    <a
                      href={notice.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#003366] hover:text-[#FF6600] text-sm font-medium hover:underline transition-colors"
                    >
                      <span className="text-[#FF6600] mr-1">►</span>
                      {notice.title}
                    </a>
                  </div>
                  <a
                    href={notice.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 border border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white text-xs px-3 py-1 rounded transition-colors"
                  >
                    View
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-gray-100 text-right">
              <a
                href={`https://jmc.jk.gov.in/notices.aspx?noticetype=${active === 'public' ? 'Public' : active === 'tenders' ? 'Tender' : 'Council'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#003366] text-white text-sm px-6 py-2 rounded hover:bg-[#004080] transition-colors"
              >
                View All on JMC Portal →
              </a>
            </div>
          </div>
        </div>
      </div>
    </SubpageTemplate>
  )
}
