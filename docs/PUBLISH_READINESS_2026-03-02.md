# Publish Readiness Report

Date: 2026-03-02
Project: `averdiNextJS`

## Executive Verdict
- Marketing/site deploy: **Ready with cautions**
- Production admin CMS behavior (edit content after deploy): **Partially ready**

## Checks Run
- `npm run lint`: passed with warnings (49 warnings, 0 errors)
- `npx tsc --noEmit`: passed
- `npm run build`: passed, sitemap generated

## Remaining Blocking Issue
1. Runtime admin writes are file-based JSON on local filesystem.
   - `src/lib/admin/users.ts`
   - `src/lib/admin/employees.ts`
   - `src/lib/admin/articles.ts`
   - `src/lib/admin/kunnskapsbank.ts`
   - These write to `src/data/*.json` using `fs.writeFile`.
   - On serverless hosting (Netlify/Vercel), runtime filesystem writes are usually non-persistent.
   - Impact: admin updates can fail or disappear after cold starts/redeploys.

## High Priority Non-Blocking Issues
1. Lint warning debt.
   - 49 warnings (unused vars and `<img>` optimization warnings).
   - Impact: maintainability/performance risk, but not a hard launch blocker.

2. Analytics configuration dependency.
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` must be set with a real GA4 id in production for tracking to activate.
   - Impact: no analytics events until configured.

## Recommended Go-Live Conditions
Minimum before publishing:
1. Confirm production env values (`JWT_SECRET`, `SITE_URL`, `ADMIN_PASSWORD_HASH`, `ADMIN_WRITE_ENABLED`, optional analytics keys).
2. Decide and document hosting model:
   - If static/marketing only: disable or limit production admin editing expectations.
   - If true CMS behavior required: migrate admin data to persistent storage before launch.

Recommended soon after publishing:
1. Reduce lint warning count.
2. Align legacy docs with current auth architecture.
3. Add smoke tests for admin login and CRUD endpoints.

## Temporary Domain Mode (Vercel)
- If `averdi.no` is not yet available in this Vercel project, set:
  - `SITE_URL=https://averdi-next-js-git-main-pro-design.vercel.app`
  - `NEXT_PUBLIC_SITE_URL=https://averdi-next-js-git-main-pro-design.vercel.app`
- Deploy on Vercel subdomain first, then switch both values to `https://www.averdi.no` when DNS/cutover is ready.
