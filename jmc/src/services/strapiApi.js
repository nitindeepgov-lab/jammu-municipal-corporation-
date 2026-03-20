import axios from 'axios';

// Point to deployed Strapi; falls back to local for dev
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

const api = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Bulletin Board ──────────────────────────────────────────

/** Fetch all published bulletin board entries (newest first) */
export const getBulletinItems = () =>
  api.get('/bulletin-boards?sort=release_date:desc&populate=*&status=published');

/** Fetch a single published bulletin board entry by documentId */
export const getBulletinItemById = (documentId) =>
  api.get(`/bulletin-boards/${documentId}?populate=*&status=published`);

/** Add a new bulletin board entry */
export const addBulletinItem = (title, release_date, link = '') =>
  api.post('/bulletin-boards', {
    data: { title, release_date, link },
  });

/** Update an existing entry by its Strapi document id */
export const updateBulletinItem = (documentId, fields) =>
  api.put(`/bulletin-boards/${documentId}`, { data: fields });

/** Delete an entry by its Strapi document id */
export const deleteBulletinItem = (documentId) =>
  api.delete(`/bulletin-boards/${documentId}`);

// ── Officials ────────────────────────────────────────────────

/** Fetch all published officials ordered by the 'order' field */
export const getOfficials = () =>
  api.get('/officials?populate=picture&sort=order:asc&filters[publishedAt][$notNull]=true');

// ── Smart City Tenders ──────────────────────────────────────

/** Fetch all published smart city tenders (newest first) */
export const getSmartCityTenders = () =>
  api.get('/smart-city-tenders?sort=published_date:desc&populate=*&status=published');

/** Fetch a single smart city tender by documentId */
export const getSmartCityTenderById = (documentId) =>
  api.get(`/smart-city-tenders/${documentId}?populate=*&status=published`);

/** Add a new smart city tender */
export const addSmartCityTender = (data) =>
  api.post('/smart-city-tenders', { data });

/** Update an existing smart city tender */
export const updateSmartCityTender = (documentId, fields) =>
  api.put(`/smart-city-tenders/${documentId}`, { data: fields });

/** Delete a smart city tender */
export const deleteSmartCityTender = (documentId) =>
  api.delete(`/smart-city-tenders/${documentId}`);

// ── News Ticker ─────────────────────────────────────────────

/** Fetch all published news ticker items (ordered by 'order' field) */
export const getNewsTickerItems = () =>
  api.get('/news-tickers?sort=order:asc&status=published&filters[is_active][$eq]=true');

/** Fetch all news ticker items (including inactive, for admin) */
export const getAllNewsTickerItems = () =>
  api.get('/news-tickers?sort=order:asc&status=published');

/** Add a new news ticker item */
export const addNewsTickerItem = (data) =>
  api.post('/news-tickers', { data });

/** Update an existing news ticker item */
export const updateNewsTickerItem = (documentId, fields) =>
  api.put(`/news-tickers/${documentId}`, { data: fields });

/** Delete a news ticker item */
export const deleteNewsTickerItem = (documentId) =>
  api.delete(`/news-tickers/${documentId}`);

// ── Notices & Tenders ───────────────────────────────────────

/** Fetch all published notices (newest first), optionally filtered by type */
export const getNotices = (noticeType) => {
  let url = '/notices?sort=notice_date:desc&populate=*&status=published';
  if (noticeType && noticeType !== 'all') {
    url += `&filters[notice_type][$eq]=${noticeType}`;
  }
  return api.get(url);
};

/** Fetch a single notice by documentId */
export const getNoticeById = (documentId) =>
  api.get(`/notices/${documentId}?populate=*&status=published`);

/** Add a new notice */
export const addNotice = (data) =>
  api.post('/notices', { data });

/** Update an existing notice */
export const updateNotice = (documentId, fields) =>
  api.put(`/notices/${documentId}`, { data: fields });

/** Delete a notice */
export const deleteNotice = (documentId) =>
  api.delete(`/notices/${documentId}`);

// ── Tenders (JMC General) ───────────────────────────────────

/** Fetch all published JMC tenders (newest first) */
export const getTenders = () =>
  api.get('/tenders?sort=tender_date:desc&populate=*&status=published');

/** Fetch a single tender by documentId */
export const getTenderById = (documentId) =>
  api.get(`/tenders/${documentId}?populate=*&status=published`);

/** Add a new tender */
export const addTender = (data) =>
  api.post('/tenders', { data });

/** Update an existing tender */
export const updateTender = (documentId, fields) =>
  api.put(`/tenders/${documentId}`, { data: fields });

/** Delete a tender */
export const deleteTender = (documentId) =>
  api.delete(`/tenders/${documentId}`);

export default api;
