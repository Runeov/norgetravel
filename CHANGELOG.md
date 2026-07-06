# Changelog

All notable changes to the NorgeTravel SaaS Travel Engine will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-07-06

### Added
- Created dynamic edit pages for articles under `src/app/admin/articles/[id]/page.tsx` to handle database editing from the admin panel.
- Created dynamic edit pages for team profiles under `src/app/admin/employees/[id]/page.tsx`.
- Implemented backend API edit endpoints (`PUT`) and delete endpoints (`DELETE`) under `src/app/api/admin/articles/[id]/route.ts` and `src/app/api/admin/employees/[id]/route.ts`.
- Generated edit pages for all 6 travel map categories:
  - `src/app/admin/travel/accommodation/[id]/page.tsx`
  - `src/app/admin/travel/events/[id]/page.tsx`
  - `src/app/admin/travel/experiences/[id]/page.tsx`
  - `src/app/admin/travel/guides/[id]/page.tsx`
  - `src/app/admin/travel/restaurants/[id]/page.tsx`
  - `src/app/admin/travel/transport/[id]/page.tsx`
- Documented porting and developer maps inside `docs/SAAS_ENGINE_GUIDE.md`.

### Changed
- Built premium interactive Admin Travel Guides Management Dashboard under `/admin/travel-guides/` featuring Social Analytics, SVG line trend charts, staged release lists, and social promo clipboard copying.
- Converted all 11 admin API endpoints from `force-static` to `force-dynamic` to allow Next.js cookie writing and header actions during runtime without throwing exceptions.
- Cleansed 27 files to remove all legacy branding ("Averdi") and update to "NorgeTravel" and "norgetravel.com".

### Fixed
- Fixed the admin login authentication crash caused by `force-static` pre-rendering.
- Resolved local admin credential login checks by resetting the password hash to a cleanly generated bcrypt string.
