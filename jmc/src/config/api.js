/**
 * API configuration for JMC application
 */

// Validate and get Strapi URL
const getStrapiUrl = () => {
  const url = import.meta.env.VITE_STRAPI_URL;

  if (!url) {
    if (import.meta.env.DEV) {
      console.warn("⚠️ VITE_STRAPI_URL not set, using localhost");
      return "http://localhost:1338";
    } else {
      console.error("❌ VITE_STRAPI_URL is required in production");
      return "";
    }
  }

  return url;
};

export const STRAPI_URL = getStrapiUrl();

// API endpoints
export const API_ENDPOINTS = {
  BULLETIN_BOARD: "/bulletin-boards",
  OFFICIALS: "/officials",
  COUNCILLORS: "/councillor-details",
  NEWS_TICKER: "/news-tickers",
  NOTICES: "/notices",
  TENDERS: "/tenders",
  SMART_CITY_TENDERS: "/smart-city-tenders",
};

// Common query parameters
export const COMMON_PARAMS = {
  PUBLISHED: "status=published",
  POPULATE_ALL: "populate=*",
  SORT_DESC: (field) => `sort=${field}:desc`,
  SORT_ASC: (field) => `sort=${field}:asc`,
};

// Validate environment on app start
export const validateEnvironment = () => {
  const requiredVars = ["VITE_STRAPI_URL"];
  const missing = requiredVars.filter((varName) => !import.meta.env[varName]);

  if (missing.length > 0 && !import.meta.env.DEV) {
    console.error("❌ Missing required environment variables:", missing);
  }
};
