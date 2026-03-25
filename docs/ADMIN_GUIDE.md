# Admin Guide (Averdi Next.js)

Last updated: 2026-03-02

## Purpose
This guide explains how to operate the admin panel, manage content, and safely run the site in production.

## Access
- Admin login URL: `/admin/login`
- Main dashboard: `/admin/dashboard`
- Session cookie: `averdi-admin-session` (HTTP-only, 24h)
- Roles:
  - `admin`: full access, including user management
  - `editor`: content management only

## Required Environment Variables
- `JWT_SECRET` (required in production)
- `ADMIN_PASSWORD_HASH` (required in current setup for `initial-admin`)
- `SITE_URL` (used by sitemap generation)
- `ADMIN_WRITE_ENABLED` (production write toggle; default behavior is read-only)
- Optional:
  - `NEXT_PUBLIC_HOTJAR_ID`
  - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
  - `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` (social media post generation; falls back to template output if missing)

Note: `ADMIN_PASSWORD` is not used by runtime auth in the current implementation.

## Admin Navigation
- `Dashboard`: overview counts for employees and articles
- `Ansatte` (`/admin/employees`): create, edit, deactivate, delete employee profiles
- `Artikler` (`/admin/articles`): create, edit, publish/unpublish, delete articles
- `Kunnskapsbank` (`/admin/kunnskapsbank`): publish/unpublish top-level sections
- `Brukere` (`/admin/users`): user administration (admin role only)

## Content Workflows
### Users
- Go to `/admin/users/new`
- Set `name`, `email`, `password`, and role (`admin` or `editor`)
- Keep at least one active `admin` account

### Employees
- Go to `/admin/employees/new`
- Required: `name`, `role`, `email`, `phone`, `office`, `description`
- Use `isActive` to hide/show profiles without deleting

### Articles
- Go to `/admin/articles/new`
- Required: `title`, `slug`, `excerpt`, `content`
- Status:
  - `draft`: not publicly visible in dynamic article route
  - `published`: publicly visible
- Categories currently supported:
  - `artikler`, `bedrift`, `sametinget`, `organisasjoner`, `analyse`, `regelverk`

### Kunnskapsbank Section Visibility
- Go to `/admin/kunnskapsbank`
- Toggle published state for top-level sections:
  - `sametinget`
  - `bedrifter`
  - `organisasjoner`

## Data Storage and Backups
Admin writes are file-based and update JSON files in:
- `src/data/users.json`
- `src/data/employees.json`
- `src/data/articles.json`
- `src/data/kunnskapsbank.json`

Backup policy:
- Before major edits: commit current `src/data/*.json`
- After major edits: commit and push again
- Keep offsite repository backup enabled

## Production Write Mode
- In `NODE_ENV=production`, mutation endpoints are disabled by default.
- Set `ADMIN_WRITE_ENABLED=true` to allow write mode.
- On serverless infrastructure, runtime file writes can still be ephemeral/non-persistent.
- Recommended safe workflow for important content:
  - edit content in repository (`src/data/*.json`) or local/dev admin
  - commit and push
  - deploy/redeploy

## Security Operations
- Use a strong, unique `JWT_SECRET` in production
- Use named user accounts (no shared credentials)
- Minimize `admin` users; prefer `editor` role for content staff
- Remove test/dummy content before publish
- Review deploy logs after every release
- Verify analytics only loads after consent (`Godta alle`)

## Password Reset (Manual)
If all admins are locked out, reset by updating `src/data/users.json` with a new bcrypt hash:

```powershell
node -e "const bcrypt=require('bcrypt'); bcrypt.hash('NewStrongPasswordHere',10).then(h=>console.log(h))"
```

Then replace `passwordHash` for the target user in `src/data/users.json`, redeploy, and log in.

## Troubleshooting
### Login fails
- Check `JWT_SECRET` in deployment environment
- Verify user exists and `isActive: true` in `src/data/users.json`

### 401/403 from admin APIs
- Ensure session cookie exists and has not expired
- Confirm role permissions (`/admin/users` endpoints require `admin`)

### Content edit succeeds but public page does not update
- Verify whether the target public route is static or dynamic
- For static routes, redeploy to rebuild pages

### Content changes disappear in hosted environment
- Current storage is local filesystem JSON
- On serverless hosting, runtime writes are typically ephemeral/non-persistent
- Move to persistent storage (database or managed KV/object store) for production CMS behavior

### API returns "Admin skriveoperasjoner er deaktivert i produksjon"
- Expected when `NODE_ENV=production` and `ADMIN_WRITE_ENABLED` is unset or `false`
- Enable writes by setting `ADMIN_WRITE_ENABLED=true` and redeploy

## Pre-Publish Admin Checklist
- `JWT_SECRET` set in production
- At least one active `admin` user verified
- Remove all test articles/users/content
- Confirm no sensitive values in docs or source
- Run:
  - `npm run lint`
  - `npx tsc --noEmit`
  - `npm run build`
