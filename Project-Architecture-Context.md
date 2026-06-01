# Jammu Municipal Corporation (JMC) - Project Architecture & Context

## 1. Overview
The JMC website is a full-stack modern web application designed for the citizens of Jammu. It provides e-governance services, information about civic amenities, notices, tenders, and online payment features.

The project is structured into two main directories:
- `cms/`: The Strapi headless CMS backend.
- `jmc/`: The Vite + React frontend.

## 2. Frontend Architecture (React + Vite)
- **Framework:** React 19 + Vite 7
- **Routing:** `react-router-dom` v7. Routes are defined in `App.jsx` and use `React.lazy` for code-splitting.
- **Styling:** TailwindCSS + Vanilla CSS (`index.css`, `App.css`).
- **Icons:** `lucide-react` and `react-icons`.

### Important Routes & Pages (`App.jsx`)
- `/` -> Landing Page
- `/about` -> About JMC
- `/officials`, `/commissioner`, `/governing-bodies`, `/councillor-details` -> JMC Leadership & Staff
- `/services`, `/egov` -> Citizen Services and E-Governance links
- `/pay-online`, `/payment-status`, `/payment-result` -> BillDesk payment integration
- `/notices`, `/smart-city-tenders` -> Public notices and tenders
- `/rti`, `/rti/document/:slug` -> Right to Information disclosures
- `/departments`, `/departments/*` -> Specific department pages
- `/contact` -> Helplines & Grievance form
- `/feedback` -> Feedback submission

### ChatBot Architecture
The chatbot (`ChatBot.jsx`) provides a floating assistant for users. 
- It uses `chatKnowledge.js` as its knowledge base, attempting keyword/fuzzy matching first.
- If it cannot find a match, it falls back to an AI response (`aiAnswer` in `chatKnowledge.js`) which makes an API call to OpenAI (`gpt-4o-mini`) using the `VITE_AI_API_KEY`.
- **Navigation matching:** The bot can interpret intents like "take me to paying taxes" and generate a navigation button directly pointing to the correct React route.

## 3. Backend Architecture (Strapi CMS)
- **Framework:** Strapi v5
- **Database:** PostgreSQL (using `pg` driver)
- **Key API Endpoints:** 
  - `/api/bulletin-boards`
  - `/api/officials`
  - `/api/councillor-details`
  - `/api/news-tickers`
  - `/api/event-activities`
  - `/api/notices`
  - `/api/tenders`
  - `/api/smart-city-tenders`
  - Additional endpoints exist for audit logs, visitor counting, billdesk payment verification, and neon uploads.
- **Integration:** The frontend connects to the backend via `VITE_STRAPI_URL`. Production fallback is `https://jammu-municipal-corporation.onrender.com`.

## 4. How Links and Navigation Work
1. **React Router:** Traditional navigation occurs via `<Link>` from `react-router-dom`. When a user visits `/pay-online`, the React Router intercepts the URL and lazy-loads the `PayOnline` component.
2. **ChatBot Navigation:** The ChatBot intercepts phrases like "go to", "show me", "take me". It matches keywords against `pageRoutes` in `chatKnowledge.js` (e.g., "pay" matches the `pay-online` route). The bot then emits a React-Router navigation event.
3. **API Links:** Data fetched from Strapi often includes documents (e.g., PDFs for notices and tenders). The frontend prepends the Strapi base URL to these media assets so they can be downloaded directly by the user.

## 5. E-Governance & External Links
Many e-governance services are integrated as external links leading to J&K government portals:
- MyJammu portal for grievances and water tanker bookings
- HUDD BPS for building plans
- JAKSMAC for birth/death certificates, rehri licenses, and pet registration
- JanSugam for trade licenses

## Summary
The JMC website acts as the central digital portal for Jammu. The frontend relies purely on Strapi for its dynamic content (news, officials, tenders) and delegates heavy lifting like payments to BillDesk and e-governance to state portals. The ChatBot acts as an intelligent overlay that routes citizens to the correct internal pages or provides factual answers from its offline KB or the fallback LLM.
