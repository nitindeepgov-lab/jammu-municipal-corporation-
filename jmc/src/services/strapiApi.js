import axios from "axios";
import { STRAPI_URL } from "../config/api.js";
import { logError } from "../utils/errorLogger.js";

const api = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  // 30s timeout — Render free tier cold starts can take 15-20s
  timeout: 30000,
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    logError("API Request", error);
    return Promise.reject(error);
  },
);

// Response interceptor for error handling with retry logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    const context = config?.url || "Unknown endpoint";

    // Retry on network errors or 5xx server errors (up to 2 retries)
    const isRetryable =
      !error.response || // Network error
      (error.response.status >= 500 && error.response.status < 600); // Server error

    if (isRetryable && config && !config.__retryCount) {
      config.__retryCount = 0;
    }

    if (isRetryable && config && config.__retryCount < 2) {
      config.__retryCount += 1;
      const delay = config.__retryCount * 1000; // 1s, 2s
      await new Promise((resolve) => setTimeout(resolve, delay));
      return api(config);
    }

    logError(`API Response [${context}]`, error, {
      status: error.response?.status,
      data: error.response?.data,
      retryCount: config?.__retryCount || 0,
    });
    return Promise.reject(error);
  },
);

// ── Simple Cache System ─────────────────────────────────────
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const getCached = async (key, fetchFn) => {
  const cached = cache.get(key);
  const now = Date.now();
  if (cached && !cached.promise && (now - cached.timestamp < CACHE_TTL)) {
    return Promise.resolve(cached.data);
  }
  if (cached && cached.promise) {
    return cached.promise;
  }
  const promise = fetchFn();
  cache.set(key, { timestamp: now, promise });
  try {
    const data = await promise;
    cache.set(key, { timestamp: Date.now(), data });
    return data;
  } catch (err) {
    cache.delete(key);
    throw err;
  }
};

const clearCacheByPrefix = (prefix) => {
  for (const key of cache.keys()) {
    if (key.startsWith(prefix)) {
      cache.delete(key);
    }
  }
};

// ── Bulletin Board ──────────────────────────────────────────

/** Fetch all published bulletin board entries (newest first) */
export const getBulletinItems = () =>
  getCached("bulletin-boards", () =>
    api.get(
      "/bulletin-boards?sort=release_date:desc&populate=*&status=published",
    )
  );

/** Fetch a single published bulletin board entry by documentId */
export const getBulletinItemById = (documentId) =>
  getCached(`bulletin-board-${documentId}`, () =>
    api.get(`/bulletin-boards/${documentId}?populate=*&status=published`)
  );

/** Add a new bulletin board entry */
export const addBulletinItem = (title, release_date, link = "") => {
  clearCacheByPrefix("bulletin-");
  return api.post("/bulletin-boards", {
    data: { title, release_date, link },
  });
};

/** Update an existing entry by its Strapi document id */
export const updateBulletinItem = (documentId, fields) => {
  clearCacheByPrefix("bulletin-");
  return api.put(`/bulletin-boards/${documentId}`, { data: fields });
};

/** Delete an entry by its Strapi document id */
export const deleteBulletinItem = (documentId) => {
  clearCacheByPrefix("bulletin-");
  return api.delete(`/bulletin-boards/${documentId}`);
};

// ── Officials ────────────────────────────────────────────────

/** Fetch all published officials ordered by the 'order' field */
export const getOfficials = () =>
  getCached("officials", () =>
    api.get(
      "/officials?populate=picture&sort=order:asc&filters[publishedAt][$notNull]=true",
    )
  );

// ── Governing Bodies (Ministers) ─────────────────────────────

/** Fetch all active governing body members ordered by the 'order' field */
export const getMinisters = () =>
  getCached("ministers", () =>
    api.get("/ministers?populate=image&sort=order:asc")
  );

// ── Hero Slides ──────────────────────────────────────────────

/** Fetch all active hero banner slides ordered by 'order' */
export const getHeroSlides = () =>
  getCached("hero-slides", () =>
    api.get("/hero-slides?populate=image&sort=order:asc&filters[is_active][$eq]=true")
  );
<<<<<<< HEAD
=======

>>>>>>> ebc7ded632d305b316fd3b7f78afa55bf408e6bb

// ── Photo Gallery ─────────────────────────────────────────────

/** Fetch all published photo gallery items ordered by 'order' */
export const getPhotoGalleryItems = () =>
  getCached("photo-galleries", () =>
    api.get(
      "/photo-galleries?populate[images][populate]=*&sort=order:asc&status=published&filters[is_active][$eq]=true",
    )
  );

// ── Ex-Municipal Councillors ───────────────────────────────

/** Fetch all published councillor details ordered by ward number */
export const getCouncillors = () =>
  getCached("councillors-all", () =>
    api.get(
      "/councillor-details?populate=photo&sort=ward_no:asc&pagination[pageSize]=100&status=published",
    )
  );

/** Fetch councillors with backend pagination and optional ward filter */
export const getCouncillorsPaginated = (
  page = 1,
  pageSize = 7,
  wardNo = null,
) => {
  const key = `councillors-page-${page}-${pageSize}-${wardNo || "all"}`;
  return getCached(key, () => {
    let url = `/councillor-details?populate=photo&sort=ward_no:asc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&status=published`;

    if (wardNo && wardNo !== "all") {
      url += `&filters[ward_no][$eq]=${wardNo}`;
    }

    return api.get(url);
  });
};

// ── Payment Locations ─────────────────────────────────────

/** Fetch all published payment locations ordered by ward number (desc) */
export const getLocations = () =>
  getCached("locations", () =>
    api.get(
      "/locations?sort=ward_no:desc&pagination[pageSize]=200&filters[is_active][$eq]=true",
    )
  );

// ── Smart City Tenders ──────────────────────────────────────

/** Fetch all published smart city tenders (newest first) */
export const getSmartCityTenders = () =>
  getCached("smart-city-tenders", () =>
    api.get(
      "/smart-city-tenders?sort=published_date:desc&populate=*&status=published",
    )
  );

/** Fetch a single smart city tender by documentId */
export const getSmartCityTenderById = (documentId) =>
  getCached(`smart-city-tender-${documentId}`, () =>
    api.get(`/smart-city-tenders/${documentId}?populate=*&status=published`)
  );

/** Add a new smart city tender */
export const addSmartCityTender = (data) => {
  clearCacheByPrefix("smart-city-tender");
  return api.post("/smart-city-tenders", { data });
};

/** Update an existing smart city tender */
export const updateSmartCityTender = (documentId, fields) => {
  clearCacheByPrefix("smart-city-tender");
  return api.put(`/smart-city-tenders/${documentId}`, { data: fields });
};

/** Delete a smart city tender */
export const deleteSmartCityTender = (documentId) => {
  clearCacheByPrefix("smart-city-tender");
  return api.delete(`/smart-city-tenders/${documentId}`);
};

// ── News Ticker ─────────────────────────────────────────────

/** Fetch all published news ticker items (ordered by 'order' field) */
export const getNewsTickerItems = () =>
  getCached("news-tickers-active", () =>
    api.get(
      "/news-tickers?sort=order:asc&status=published&filters[is_active][$eq]=true",
    )
  );

/** Fetch all news ticker items (including inactive, for admin) */
export const getAllNewsTickerItems = () =>
  getCached("news-tickers-all", () =>
    api.get("/news-tickers?sort=order:asc&status=published")
  );

/** Add a new news ticker item */
export const addNewsTickerItem = (data) => {
  clearCacheByPrefix("news-ticker");
  return api.post("/news-tickers", { data });
};

/** Update an existing news ticker item */
export const updateNewsTickerItem = (documentId, fields) => {
  clearCacheByPrefix("news-ticker");
  return api.put(`/news-tickers/${documentId}`, { data: fields });
};

/** Delete a news ticker item */
export const deleteNewsTickerItem = (documentId) => {
  clearCacheByPrefix("news-ticker");
  return api.delete(`/news-tickers/${documentId}`);
};

// ── Events & Activities ─────────────────────────────────────

/** Fetch all published events & activities (ordered by 'order', newest date first) */
export const getEventActivities = () =>
  getCached("event-activities", () =>
    api.get(
      "/event-activities?sort=order:asc,event_date:desc&populate=image&status=published&filters[is_active][$eq]=true",
    )
  );

// ── Notices & Tenders ───────────────────────────────────────

/** Fetch all published notices (newest first), optionally filtered by type */
export const getNotices = (noticeType) => {
  const key = `notices-${noticeType || "all"}`;
  return getCached(key, () => {
    let url = "/notices?sort=notice_date:desc&populate=*&status=published";
    if (noticeType && noticeType !== "all") {
      url += `&filters[notice_type][$eq]=${noticeType}`;
    }
    return api.get(url);
  });
};

/** Fetch a single notice by documentId */
export const getNoticeById = (documentId) =>
  getCached(`notice-${documentId}`, () =>
    api.get(`/notices/${documentId}?populate=*&status=published`)
  );

/** Add a new notice */
export const addNotice = (data) => {
  clearCacheByPrefix("notice");
  return api.post("/notices", { data });
};

/** Update an existing notice */
export const updateNotice = (documentId, fields) => {
  clearCacheByPrefix("notice");
  return api.put(`/notices/${documentId}`, { data: fields });
};

/** Delete a notice */
export const deleteNotice = (documentId) => {
  clearCacheByPrefix("notice");
  return api.delete(`/notices/${documentId}`);
};

// ── Tenders (JMC General) ───────────────────────────────────

/** Fetch all published JMC tenders (newest first) */
export const getTenders = () =>
  getCached("tenders-all", () =>
    api.get("/tenders?sort=tender_date:desc&populate=*&status=published")
  );

/** Fetch a single tender by documentId */
export const getTenderById = (documentId) =>
  getCached(`tender-${documentId}`, () =>
    api.get(`/tenders/${documentId}?populate=*&status=published`)
  );

/** Add a new tender */
export const addTender = (data) => {
  clearCacheByPrefix("tender");
  return api.post("/tenders", { data });
};

/** Update an existing tender */
export const updateTender = (documentId, fields) => {
  clearCacheByPrefix("tender");
  return api.put(`/tenders/${documentId}`, { data: fields });
};

/** Delete a tender */
export const deleteTender = (documentId) => {
  clearCacheByPrefix("tender");
  return api.delete(`/tenders/${documentId}`);
};

// ── Visitor Count ───────────────────────────────────────

/** Fetch the current global visitor count */
export const getVisitorCount = () => api.get("/visitor-count/current");

/** Increment and return the global visitor count */
export const incrementVisitorCount = () => api.post("/visitor-count/increment");

export default api;
