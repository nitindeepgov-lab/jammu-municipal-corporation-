# Jammu Municipal Corporation - Project Structure

## 📋 Overview
This is a monorepo for the Jammu Municipal Corporation (JMC) web platform, consisting of a headless CMS backend and a React-based frontend.

---

## 📂 Project Structure

### **1. CMS (Backend) - `/cms`**
Headless CMS built with Node.js managing all content and data.

#### Key Features:
- 🏛️ **Bulletin Board** - Public announcements and bulletins
- 📰 **News Ticker** - Dynamic news updates
- 📜 **Notices** - Official notices and alerts
- 👔 **Officials** - Management of officials and staff
- 💼 **Smart City Tenders** - Smart city project tenders
- 🏗️ **Tender Management** - General municipal tenders

#### Directory Structure:
```
cms/
├── config/              # Configuration files
│   ├── admin.js        # Admin settings
│   ├── api.js          # API configuration
│   ├── database.js     # Database setup
│   ├── middlewares.js  # Express middlewares
│   ├── plugins.js      # Plugin configuration
│   └── server.js       # Server setup
├── src/
│   ├── index.js        # Entry point
│   ├── admin/          # Admin panel (Vite + Vue)
│   ├── api/            # API routes & controllers
│   │   ├── bulletin-board/
│   │   ├── news-ticker/
│   │   ├── notice/
│   │   ├── official/
│   │   ├── smart-city-tender/
│   │   └── tender/
│   ├── components/     # Reusable components
│   └── extensions/     # Custom extensions
├── database/           # Database migrations
├── scripts/            # Seed scripts
│   ├── seed.js
│   └── seed-admin.js
├── data/               # Static data
└── public/             # Static assets
    └── uploads/        # User uploads
```

#### Tech Stack:
- Node.js + Express
- Database (SQLite/PostgreSQL)
- Admin Panel: Vite + Vue
- API: RESTful

#### Running CMS:
```bash
cd cms
npm install
npm run dev
```

---

### **2. JMC (Frontend) - `/jmc`**
React-based public-facing website with Vite and Tailwind CSS.

#### Key Pages:
- 🏠 Landing Page with Hero, News, Tickers
- ℹ️ About & Commissioner
- 📰 News & Notices
- 👥 Officials Listing
- 💼 Services & Smart City
- 🏗️ Development Works
- 💾 e-Governance
- 📋 RTI (Right to Information)
- 🎨 Gallery
- 📱 My Jammu App
- ✉️ Contact & Feedback

#### Directory Structure:
```
jmc/
├── src/
│   ├── main.jsx           # Entry point
│   ├── App.jsx            # Root component
│   ├── index.css          # Global styles
│   ├── App.css            # App styles
│   ├── assets/            # Images, icons, etc.
│   ├── components/        # Reusable components
│   │   ├── PageLayout.jsx
│   │   └── SubpageTemplate.jsx
│   ├── landing-page/      # Landing page components
│   │   ├── index.jsx
│   │   └── components/
│   │       ├── Header.jsx
│   │       ├── Navigation.jsx
│   │       ├── HeroSlider.jsx
│   │       ├── BulletinBoard.jsx
│   │       ├── NewsTicker.jsx
│   │       ├── InfoCards.jsx
│   │       ├── MinistersCarousel.jsx
│   │       ├── Footer.jsx
│   │       └── ... (other sections)
│   ├── pages/             # Page components
│   │   ├── About.jsx
│   │   ├── News.jsx
│   │   ├── Notices.jsx
│   │   ├── Officials.jsx
│   │   ├── Services.jsx
│   │   ├── ... (other pages)
│   └── services/
│       └── strapiApi.js   # API integration
├── public/                # Static assets
│   ├── app/
│   ├── banner/
│   ├── circle/
│   └── officials/
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS setup
├── postcss.config.js      # PostCSS configuration
└── package.json
```

#### Tech Stack:
- React 18+
- Vite (Build tool)
- Tailwind CSS (Styling)
- Responsive Design
- API Integration: CMS backend

#### Running JMC:
```bash
cd jmc
npm install
npm run dev      # Development
npm run build    # Production build
npm run preview  # Preview build
```

---

## 🚀 Getting Started

### Prerequisites:
- Node.js 16+
- npm or yarn
- Git

### Installation:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nitindeepgov-lab/jammu-municipal-corporation-.git
   cd jammu-municipal-corporation
   ```

2. **Install dependencies for both projects:**
   ```bash
   # Backend
   cd cms
   npm install
   
   # Frontend
   cd ../jmc
   npm install
   ```

3. **Environment Setup:**
   - Create `.env` files in both `cms/` and `jmc/` directories
   - Configure API endpoints and database settings

4. **Run development servers:**

   Terminal 1 - CMS Backend:
   ```bash
   cd cms
   npm run dev
   ```

   Terminal 2 - Frontend:
   ```bash
   cd jmc
   npm run dev
   ```

---

## 📊 Git Workflow

### Current Branch: `Nitindeep`

### Available Branches:
- `main` - Production release
- `Preview` - Preview/staging
- `Nitindeep` - Development (YOUR BRANCH)
- `jmc-feature` - Feature development
- `Devesh-V2` - Alternative development

### Committing Changes:

```bash
# Check status
git status

# Stage changes
git add .

# Commit with meaningful message
git commit -m "feat: add new feature description"

# Push to your branch
git push origin Nitindeep

# Create Pull Request to main when ready
```

### Commit Message Format:
```
<type>: <short description>

<detailed description if needed>

<issue linking if applicable>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

## 🔄 Deployment

### Frontend (JMC):
- Hosted on Vercel (see `vercel.json`)
- Auto-deploys on push to main

### Backend (CMS):
- Needs server deployment configuration
- Database migration scripts available in `cms/database/migrations/`

---

## 📦 Dependencies Summary

### CMS Backend:
- Express.js
- Database drivers
- Admin UI (Vue + Vite)

### JMC Frontend:
- React
- Vite
- Tailwind CSS
- ESLint
- PostCSS

---

## 🛠️ Maintenance

### Database:
- Run migrations: `npm run migrate` (CMS)
- Seed data: `npm run seed` (CMS)

### Updates:
```bash
# Update dependencies
npm update

# Check for vulnerabilities
npm audit
```

---

## 📝 Notes

- **Authentication**: Configure in CMS admin panel
- **Content Management**: Use CMS admin interface
- **Styling**: Tailwind CSS classes in React components
- **API Integration**: See `/jmc/src/services/strapiApi.js`

---

## 👥 Team

- **Project**: Jammu Municipal Corporation Web Platform
- **Repository**: https://github.com/nitindeepgov-lab/jammu-municipal-corporation-
- **Active Branch**: Nitindeep

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Express.js](https://expressjs.com)

---

**Last Updated**: March 25, 2026
