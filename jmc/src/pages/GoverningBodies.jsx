import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import SubpageTemplate from "../components/SubpageTemplate";

const PROFILE_CONTENT = {
  Mayor: {
    name: "Hon'ble Mayor",
    subtitle: "Governing Bodies",
    note: "Profile content for the Mayor will be updated shortly.",
  },
  "Deputy-Mayor": {
    name: "Hon'ble Deputy Mayor",
    subtitle: "Governing Bodies",
    note: "Profile content for the Deputy Mayor will be updated shortly.",
  },
  "Chairman-PHSC": {
    name: "Hon'ble Chairman Public Health and Sanitation Committee",
    subtitle: "Governing Bodies",
    note: "Profile content for this committee chairperson will be updated shortly.",
  },
  "Chairman-SBC": {
    name: "Hon'ble Chairman Swachh Bharat Committee",
    subtitle: "Governing Bodies",
    note: "Profile content for this committee chairperson will be updated shortly.",
  },
  "Chairman-SJC": {
    name: "Hon'ble Chairman Social Justice Committee",
    subtitle: "Governing Bodies",
    note: "Profile content for this committee chairperson will be updated shortly.",
  },
  "Principal-Secretary": {
    name: "Commissioner Secretary to Govt. (HUDD)",
    subtitle: "Governing Bodies",
    image: "/officials/principal_secretary.jpg",
    imageAlt: "Commissioner Secretary to Govt. (HUDD)",
    note: "Official profile details will be updated shortly.",
  },
  Commissioner: {
    name: "Municipal Commissioner, JMC",
    subtitle: "Governing Bodies",
    image: "/officials/commissioner.jpg",
    imageAlt: "Municipal Commissioner, Jammu Municipal Corporation",
    note: "Official profile details will be updated shortly.",
  },
};

function getProfileKey(search) {
  const query = search.startsWith("?") ? search.slice(1) : search;
  if (!query) return "Mayor";

  // Supports both `?Mayor` and `?profile=Mayor` formats.
  if (!query.includes("=")) return decodeURIComponent(query);

  const params = new URLSearchParams(query);
  return params.get("profile") || "Mayor";
}

export default function GoverningBodies() {
  const location = useLocation();

  const profileKey = useMemo(
    () => getProfileKey(location.search),
    [location.search],
  );

  const profile = PROFILE_CONTENT[profileKey] || {
    name: "Governing Bodies",
    subtitle: "Jammu Municipal Corporation",
    note: "Profile details will be updated shortly.",
  };

  return (
    <SubpageTemplate
      title="Governing Bodies"
      breadcrumb={[{ name: "Governing Bodies" }]}
    >
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FF6600]">
            {profile.subtitle}
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-[#002B5E] tracking-tight leading-tight">
            {profile.name}
          </h2>
        </div>

        {profile.image && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
            <div className="max-w-[180px] md:max-w-[220px] mx-auto">
              <img
                src={profile.image}
                alt={profile.imageAlt || profile.name}
                className="w-full h-auto rounded-xl border border-gray-200 shadow-sm"
              />
            </div>
          </div>
        )}
      </div>
    </SubpageTemplate>
  );
}
