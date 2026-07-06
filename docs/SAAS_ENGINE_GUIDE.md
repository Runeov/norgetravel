# SaaS Travel Engine: Developer & AI Integration Guide

This guide maps the architecture, file directory structure, data flow, and APIs of the NorgeTravel SaaS motor. It is designed to allow a developer (or an AI assistant) to easily port, customize, and run this engine in another project.

---

## 1. Architectural Overview

The NorgeTravel motor is a file-based travel guide SaaS engine built on **Next.js (App Router)** and optimized with **Turbopack**.

### Core Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** TailwindCSS with a clean component-based layout design.
- **Database:** File-based JSON storage (highly portable, zero database server setup).
- **Validation:** Zod schemas for all backend and API inputs.
- **Concurrency:** Multi-process file lock mechanism to prevent JSON corruption.
- **Session Auth:** Signed JWT stored in secure httpOnly cookies.

---

## 2. File Directory Map

When porting this motor to a new project, preserve this directory structure:

```
├── src/
│   ├── app/
│   │   ├── admin/                 # Admin Dashboard Pages
│   │   │   ├── dashboard/         # Base metrics view
│   │   │   ├── articles/          # Article list, creation, and [id] editing
│   │   │   ├── employees/         # Profile list, creation, and [id] editing
│   │   │   ├── travel/            # Travel Map listings (accommodation, events, etc.)
│   │   │   ├── travel-guides/     # Main travel guides interactive panel
│   │   │   └── login/             # Secure login screen
│   │   └── api/admin/             # Backend API Route Handlers
│   │       ├── articles/          # GET/POST/PUT/DELETE for articles
│   │       ├── auth/              # POST (login), DELETE (logout), GET (session check)
│   │       ├── employees/         # GET/POST/PUT/DELETE for team profiles
│   │       └── travel/            # Category-specific maps CRUD
│   ├── components/
│   │   └── admin/                 # Reusable dashboard widgets, lists, and forms
│   ├── data/                      # JSON Database Stores
│   │   ├── articles.json
│   │   ├── employees.json
│   │   ├── users.json
│   │   └── travel-*.json
│   ├── lib/
│   │   ├── admin/                 # Data access and helper layers
│   │   ├── schemas/               # Zod validation schemas
│   │   └── storage/
│   │       └── file-lock.ts       # Concurrent lock manager
│   └── types/
│       └── admin.ts               # Core TypeScript definitions
```

---

## 3. Data Flow & Concurrency Locking

To ensure data integrity without an external SQL/NoSQL database, all mutations route through a file lock manager.

### The Lock Mechanism (`src/lib/storage/file-lock.ts`)
```typescript
import { withFileLock } from '@/lib/storage/file-lock';

// Example write mutation:
return withFileLock('articles', async () => {
  const articles = await getArticles();
  articles[id] = updatedData;
  await fs.writeFile(DATA_FILE, JSON.stringify(articles, null, 2));
});
```

---

## 4. Admin Dashboard Subsystems

The dashboard contains three primary modules:

### 1. Social Analytics Tab
- Renders growth cards and user outreach telemetry.
- Includes a custom SVG trend chart visualizing traffic.

### 2. Staged Release & Previews
- Lists publications by category.
- Features a **Promo Copy** console. Users can toggle channels (X, Reddit, Facebook, TikTok) and copy generated posts using a clipboard handler.

### 3. Category Hubs Tab
- Integrates toggle switch configurations to dynamically publish or unpublish directories on the main portal.

---

## 5. Security & Authentication

- Sessions are managed via JWT signed using `jose`.
- In development mode, the secret key falls back to a development string. In production, a 32-character `JWT_SECRET` is required.
- **Admin Password Hash:** Stored as a bcrypt hash inside `src/data/users.json`.

---

## 6. How to Port this Engine (Step-by-Step)

Follow these steps to lift this engine and drop it into a new travel website project:

1.  **Copy Folders:** Copy the `src/app/admin/`, `src/app/api/admin/`, `src/components/admin/`, `src/data/`, and `src/lib/admin/` folders into your new repository.
2.  **Install Dependencies:** Run `npm install` for required dependencies:
    `npm install jose bcrypt zod lucide-react`
3.  **Define Environment Variables:** Add these keys to your `.env.local`:
    - `JWT_SECRET` (base64 string)
    - `ADMIN_WRITE_ENABLED=true` (enables writes in production)
4.  **Set Initial Admin:** Insert a default admin hash inside `src/data/users.json`. (Verify email matches your domain, e.g., `admin@yourdomain.com`).
5.  **Build Check:** Run `npm run build` to verify Next.js routes compile cleanly.
