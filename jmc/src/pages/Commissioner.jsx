"use client";

import { useEffect, useState } from "react";
import SubpageTemplate from "../components/SubpageTemplate";
import { getOfficials } from "../services/strapiApi";
import { STRAPI_URL } from "../config/api";

export default function Commissioner() {
  const [commissioner, setCommissioner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOfficials()
      .then((res) => {
        const data = res?.data?.data || [];
        const found = data.find((item) => {
          const attr = item.attributes || item;
          return attr.designation?.toLowerCase() === "commissioner";
        });
        if (found) {
          const attr = found.attributes || found;
          setCommissioner({
            name: attr.name,
            designation: attr.designation,
            email: attr.email || null,
            mobile: attr.mobile || null,
            officePhone: attr.office_phone || null,
            image: attr.picture?.url
              ? attr.picture.url.startsWith("http")
                ? attr.picture.url
                : `${STRAPI_URL}${attr.picture.url}`
              : "/officials/com.jpg",
            message: attr.message || null,
          });
        }
      })
      .catch((err) => {
        console.error("Failed to load commissioner details:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <SubpageTemplate
        title="Commissioner's Desk"
        breadcrumb={[{ name: "Commissioner's Desk" }]}
      >
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-10 h-10 border-2 border-gray-200 border-t-[#003366] rounded-full animate-spin mb-3" />
          <p className="text-xs text-gray-400 font-semibold">Loading profile…</p>
        </div>
      </SubpageTemplate>
    );
  }

  if (!commissioner) {
    return (
      <SubpageTemplate
        title="Commissioner's Desk"
        breadcrumb={[{ name: "Commissioner's Desk" }]}
      >
        <div className="bg-white rounded shadow-sm p-6 sm:p-8 text-center text-gray-500 text-sm">
          Commissioner profile is not published in the CMS yet.
        </div>
      </SubpageTemplate>
    );
  }

  const paragraphs = (commissioner.message || "").split("\n\n").filter(Boolean);

  return (
    <SubpageTemplate
      title="Commissioner's Desk"
      breadcrumb={[{ name: "Commissioner's Desk" }]}
    >
      {/* ── Responsive Layout: stacks on mobile, side-by-side on md+ ── */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* ── Profile Card ── */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            {/* Photo */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/5] bg-[#003366] overflow-hidden">
              {commissioner.image && (
                <img
                  src={commissioner.image}
                  alt={`${commissioner.name} — Municipal Commissioner`}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              )}
              {/* Gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#003366]/60 to-transparent" />
            </div>

            {/* Info */}
            <div className="p-4 sm:p-5 text-center">
              <h2 className="text-[#003366] font-bold text-sm sm:text-base leading-tight">
                {commissioner.name}
              </h2>
              <p className="text-[#FF6600] text-xs sm:text-sm font-semibold mt-1">
                {commissioner.designation}
              </p>
              <p className="text-gray-400 text-xs mt-0.5">
                Jammu Municipal Corporation
              </p>

              {/* Contact Details */}
              <div className="mt-4 pt-4 border-t border-gray-100 text-left space-y-2.5">
                <ContactRow icon="📍" text="Rail Head Complex, Jammu – 180012" />
                {commissioner.officePhone && (
                  <ContactRow icon="📞" text={commissioner.officePhone} />
                )}
                {commissioner.mobile && (
                  <ContactRow icon="📱" text={commissioner.mobile} />
                )}
                {commissioner.email && (
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#003366] text-sm leading-none mt-px">📧</span>
                    <a
                      href={`mailto:${commissioner.email}`}
                      className="text-[#003366] hover:underline break-all text-xs"
                    >
                      {commissioner.email}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2.5">
                  <span className="text-[#003366] text-sm leading-none">🌐</span>
                  <a
                    href="https://jmc.jk.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#003366] hover:underline text-xs"
                  >
                    jmc.jk.gov.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="flex-1 min-w-0 space-y-5">

          {/* Commissioner's Message */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="w-1 h-7 bg-[#FF6600] rounded-full flex-shrink-0" />
              <h2 className="text-lg sm:text-xl font-bold text-[#003366]">
                Commissioner's Message
              </h2>
            </div>

            {paragraphs.length > 0 ? (
              <div className="space-y-3">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-gray-600 text-sm leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm italic">No message available.</p>
            )}

            <div className="mt-5 sm:mt-6 pt-4 border-t border-gray-100">
              <p className="font-bold text-[#003366] text-sm">{commissioner.name}</p>
              <p className="text-gray-400 text-xs mt-0.5">
                {commissioner.designation}, Jammu Municipal Corporation
              </p>
            </div>
          </div>

          {/* Key Initiatives */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
            <h3 className="font-bold text-[#003366] text-sm sm:text-base mb-4">
              Key Initiatives
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  icon: "🏙️",
                  title: "Smart City Mission",
                  desc: "Technology-driven urban development projects for Jammu",
                },
                {
                  icon: "🧹",
                  title: "Swachh Bharat Mission",
                  desc: "Cleanliness and solid waste management drives",
                },
                {
                  icon: "💡",
                  title: "Street Lighting",
                  desc: "LED street light upgrades across all wards",
                },
                {
                  icon: "🏗️",
                  title: "Development Works",
                  desc: "Road repair, drainage, and public infrastructure",
                },
                {
                  icon: "💧",
                  title: "Water Supply",
                  desc: "Improved water supply and PHE connectivity",
                },
                {
                  icon: "🌿",
                  title: "Urban Greening",
                  desc: "Parks, gardens, and horticulture development",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:border-[#FF6600]/40 hover:bg-orange-50/20 transition-colors"
                >
                  <span className="text-lg sm:text-xl flex-shrink-0">{item.icon}</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#003366] text-xs sm:text-sm leading-snug">
                      {item.title}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SubpageTemplate>
  );
}

function ContactRow({ icon, text }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="text-[#003366] text-sm leading-none mt-px flex-shrink-0">{icon}</span>
      <span className="text-gray-600 text-xs break-words">{text}</span>
    </div>
  );
}
