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

export default api;
