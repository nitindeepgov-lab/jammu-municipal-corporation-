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

  if (!loading && !commissioner) {
    return (
      <SubpageTemplate
        title="Commissioner's Desk"
        breadcrumb={[{ name: "Commissioner's Desk" }]}
      >
        <div className="bg-white rounded shadow-sm p-8 text-center text-gray-500">
          Commissioner profile is not published in the CMS yet.
        </div>
      </SubpageTemplate>
    );
  }

  const activeProfile = commissioner;
  const paragraphs = (activeProfile?.message || "")
    .split("\n\n")
    .filter(Boolean);

  return (
    <SubpageTemplate
      title="Commissioner's Desk"
      breadcrumb={[{ name: "Commissioner's Desk" }]}
    >
      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <div className="bg-white rounded shadow-sm overflow-hidden">
            <div className="h-64 bg-[#003366] overflow-hidden">
              {activeProfile?.image && (
                <img
                  src={activeProfile.image}
                  alt="Municipal Commissioner"
                  className="w-full h-full object-cover object-top"
                />
              )}
            </div>
            <div className="p-5 text-center">
              <h2 className="text-[#003366] font-bold text-base">
                {activeProfile?.name}
              </h2>
              <p className="text-[#FF6600] text-sm font-medium mt-1">
                {activeProfile?.designation}
              </p>
              <p className="text-gray-500 text-xs mt-0.5">
                Jammu Municipal Corporation
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100 text-left space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-[#003366]">📍</span>
                  Rail Head Complex, Jammu – 180012
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#003366]">📞</span>
                  {activeProfile?.officePhone || "—"}
                </div>
                {activeProfile?.email && (
                  <div className="flex items-center gap-2">
                    <span className="text-[#003366]">📧</span>
                    <a
                      href={`mailto:${activeProfile.email}`}
                      className="text-[#003366] hover:underline break-all"
                    >
                      {activeProfile.email}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-[#003366]">🌐</span>
                  <a
                    href="https://jmc.jk.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#003366] hover:underline"
                  >
                    jmc.jk.gov.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Commissioner's Message */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-[#FF6600] rounded-full"></div>
              <h2 className="text-xl font-bold text-[#003366]">
                Commissioner's Message
              </h2>
            </div>

            {loading && !commissioner ? (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-[#003366] rounded-full animate-spin" />
                <p className="text-xs text-gray-400 mt-2 font-semibold">
                  Loading message...
                </p>
              </div>
            ) : (
              paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-gray-700 text-sm leading-relaxed mb-4"
                >
                  {p}
                </p>
              ))
            )}

            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="font-bold text-[#003366] text-sm">
                {activeProfile?.name}
              </p>
              <p className="text-gray-500 text-xs">
                {activeProfile?.designation}, Jammu
              </p>
            </div>
          </div>

          {/* Key Initiatives */}
          <div className="bg-white rounded shadow-sm p-6">
            <h3 className="font-bold text-[#003366] text-base mb-4">
              Key Initiatives
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
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
                  className="flex items-start gap-3 p-3 rounded border border-gray-100 hover:border-[#FF6600] transition-colors"
                >
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-[#003366] text-xs">
                      {item.title}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
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
