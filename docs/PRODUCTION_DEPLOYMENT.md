# Production Deployment Guide

Project: Averdi Next.js  
Repository: https://github.com/Runeov/averdiNextJS  
Last Updated: 2026-03-02

## Deployment Target
Current setup supports standard Next.js deployment on Vercel/Netlify.

## Required Environment Variables
Set these in the production environment:

| Variable | Required | Notes |
| --- | --- | --- |
| `JWT_SECRET` | Yes | Minimum 32 chars, used for admin session JWT |
| `SITE_URL` | Yes | Canonical URL for sitemap/metadata |
| `ADMIN_PASSWORD_HASH` | Yes (current setup) | Bcrypt hash for `initial-admin` override |
| `ADMIN_WRITE_ENABLED` | Optional | Production write toggle (`false` by default if unset) |

Optional:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_HOTJAR_ID` | Hotjar analytics |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 |
| `OPENAI_API_KEY` / `ANTHROPIC_API_KEY` | AI social post generation |

Domain note:
- If custom domain is not connected yet, set `SITE_URL` to your active Vercel domain (for example `https://averdi-next-js-git-main-pro-design.vercel.app`).
- When `www.averdi.no` is ready, update `SITE_URL` and redeploy.

## Generate Secrets
Generate `JWT_SECRET`:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Generate `ADMIN_PASSWORD_HASH`:

```powershell
node -e "const bcrypt=require('bcrypt'); bcrypt.hash('StrongPasswordHere',10).then(h=>console.log(h))"
```

## Admin Access
- Login URL: `https://www.averdi.no/admin/login`
- Default account id/email in data: `initial-admin` / `admin@averdi.no`
- Password source:
  - If `ADMIN_PASSWORD_HASH` is set, that hash is used for `initial-admin`
  - Otherwise, hash from `src/data/users.json` is used
  - In this repository, `src/data/users.json` uses placeholder hash (`"$env$"`), so set `ADMIN_PASSWORD_HASH` in production

## Production Write Policy
Production admin mutation APIs are read-only by default.

- In production (`NODE_ENV=production`), write endpoints are disabled unless `ADMIN_WRITE_ENABLED=true`.
- For serverless hosts, runtime file writes may still be non-persistent.

Recommended workflow for important content updates:
1. Update content in repo (`src/data/*.json`) or in local/dev environment.
2. Commit and push.
3. Deploy/redeploy.

Read-only lock mode (optional):
- Keep `ADMIN_WRITE_ENABLED` unset or set it to `false` to prevent dashboard writes.
- Set `ADMIN_WRITE_ENABLED=true` to re-enable writes.

## Deployment Checklist
Pre-deploy:
- [ ] `JWT_SECRET` configured
- [ ] `SITE_URL` configured
- [ ] `ADMIN_PASSWORD_HASH` configured
- [ ] `ADMIN_WRITE_ENABLED` explicitly set (`true` for normal editing, `false` for lock mode)
- [ ] Local quality checks pass:
  - [ ] `npm run lint`
  - [ ] `npx tsc --noEmit`
  - [ ] `npm run build`

Post-deploy:
- [ ] Verify home page and key routes
- [ ] Verify `https://www.averdi.no/sitemap.xml`
- [ ] Verify admin login
- [ ] Verify Google Analytics loaded after cookie consent (`Godta alle`)
- [ ] Verify admin write attempts return expected read-only message (when lock is enabled)
- [ ] Check deployment logs for API/runtime errors

## Update Workflow (Git + Redeploy)
```bash
git add .
git commit -m "content: update employees/articles"
git push origin main
```

Then verify deployed pages.

## Backup Strategy
Always keep `src/data` under version control:
- `src/data/users.json`
- `src/data/employees.json`
- `src/data/articles.json`
- `src/data/kunnskapsbank.json`

## Troubleshooting
### "Admin skriveoperasjoner er deaktivert i produksjon"
- Expected when `ADMIN_WRITE_ENABLED` is unset or set to `false`.
- Set `ADMIN_WRITE_ENABLED=true` and redeploy.

### Admin login fails
- Check `JWT_SECRET`
- Check `ADMIN_PASSWORD_HASH` and `src/data/users.json`
- Check function/runtime logs

### Content change not visible
- Some pages are statically generated and require redeploy.
- Confirm deployment completed and cache is updated.
