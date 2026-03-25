# Averdi Admin System - Technical Design Document

**Version:** 1.0
**Date:** January 2026
**Status:** Implemented

---

## 1. Overview

The Averdi Admin System is a content management system built with Next.js 15 for managing employees and articles on the averdi.no website. This document describes the technical architecture, design decisions, and implementation details.

### 1.1 Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Framework | Next.js (App Router) | 15.5.9 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.x |
| Validation | Zod | 3.x |
| Authentication | JWT (jose) | - |
| Password Hashing | bcrypt | 5.x |
| Icons | Lucide React | - |
| Rich Text | TipTap | - |

### 1.2 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (Browser)                      │
├─────────────────────────────────────────────────────────────┤
│  Admin UI Components    │    Public Pages                    │
│  - /admin/login         │    - /                             │
│  - /admin/dashboard     │    - /om-oss                       │
│  - /admin/employees     │    - /kunnskapsbank                │
│  - /admin/articles      │    - /tjenester                    │
│  - /admin/users         │                                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Next.js Middleware                       │
│  - Route protection (/admin/*)                               │
│  - JWT session validation                                    │
│  - Role-based access control                                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Routes Layer                        │
│  /api/admin/auth       - Authentication                      │
│  /api/admin/employees  - Employee CRUD                       │
│  /api/admin/articles   - Article CRUD                        │
│  /api/admin/users      - User management (admin only)        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Library Layer                           │
│  src/lib/admin/                                              │
│  ├── auth.ts        - JWT session management                 │
│  ├── employees.ts   - Employee data operations               │
│  ├── articles.ts    - Article data operations                │
│  └── users.ts       - User data operations                   │
│                                                              │
│  src/lib/schemas/   - Zod validation schemas                 │
│  src/lib/storage/   - File locking utilities                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer (JSON)                       │
│  src/data/                                                   │
│  ├── employees.json   - Employee records                     │
│  ├── articles.json    - Article content                      │
│  └── users.json       - User accounts                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Authentication System

### 2.1 Design Decisions

**Multi-user JWT-based authentication** was chosen over session storage for:
- Stateless operation (no server-side session storage)
- Edge runtime compatibility in middleware
- Scalability for future multi-instance deployment

### 2.2 Authentication Flow

```
1. User submits email + password
         │
         ▼
2. POST /api/admin/auth
   - Validate input with Zod
   - Lookup user by email
   - Verify password with bcrypt
         │
         ▼
3. Create JWT token (jose library)
   Payload: { userId, email, name, role }
   Expiry: 24 hours
         │
         ▼
4. Set HTTP-only cookie
   Name: admin-session
   Secure: true (production)
   SameSite: lax
         │
         ▼
5. Redirect to /admin/dashboard
```

### 2.3 Session Token Structure

```typescript
interface SessionPayload {
  userId: string;      // User ID from users.json
  email: string;       // User email address
  name: string;        // Display name
  role: 'admin' | 'editor';  // Authorization level
  iat: number;         // Issued at timestamp
  exp: number;         // Expiration timestamp
}
```

### 2.4 Middleware Protection

The middleware intercepts all `/admin/*` routes (except `/admin/login`) and:
1. Extracts session cookie
2. Validates JWT signature and expiry
3. Checks user role for protected routes (`/admin/users` requires admin)
4. Redirects to login if validation fails

**Edge Runtime Consideration:** The middleware uses the `jose` library instead of Node.js `crypto` for JWT operations to maintain Edge compatibility.

### 2.5 Password Security

- Hashing: bcrypt with 10 salt rounds
- Minimum password length: 8 characters
- Password hash never exposed to client

---

## 3. Data Layer

### 3.1 File-Based Storage

JSON files were chosen for data storage to:
- Eliminate database setup complexity
- Enable version control of data
- Simplify deployment and backup

**Limitations:**
- Not suitable for high-concurrency write scenarios
- Data stored in plaintext (encrypt sensitive fields in production)
- No query optimization (full file read on each operation)

### 3.2 File Locking Mechanism

To prevent data corruption from concurrent writes, a file locking system was implemented:

```typescript
// src/lib/storage/file-lock.ts

async function withFileLock<T>(
  resource: string,
  operation: () => Promise<T>
): Promise<T> {
  // 1. Try to create .lock file with 'wx' flag (exclusive)
  // 2. Execute operation
  // 3. Remove .lock file
  // Timeout: 5 seconds with 50ms retry interval
}
```

**Lock File Location:** `.locks/<resource-name>.lock`

**Stale Lock Handling:** Locks older than 5 seconds are automatically removed (process may have crashed).

### 3.3 Zod Validation

All data is validated on read and write using Zod schemas:

| Schema | Location | Purpose |
|--------|----------|---------|
| EmployeeSchema | `lib/schemas/employee.schema.ts` | Validate employee data |
| ArticleSchema | `lib/schemas/article.schema.ts` | Validate article data |
| UserSchema | `lib/schemas/user.schema.ts` | Validate user accounts |

**Benefits:**
- Type-safe data at runtime
- Automatic TypeScript type inference
- Clear validation error messages

---

## 4. Component Architecture

### 4.1 Admin Form Components

Large form components were split for maintainability:

#### Employee Form (previously 778 lines)

```
src/components/admin/employee/
├── EmployeeForm.tsx           # Orchestrator (~120 lines)
├── EmployeeBasicInfoSection.tsx   # Personal details
├── EmployeeHubsSection.tsx        # Related knowledge hubs
├── EmployeeTimelineSection.tsx    # Career timeline
└── useEmployeeForm.ts             # Form state hook
```

#### Article Form (previously 475 lines)

```
src/components/admin/article/
├── ArticleForm.tsx            # Orchestrator (~100 lines)
├── ArticleContentSection.tsx  # Title, content, excerpt
└── ArticleMetaSection.tsx     # SEO, category, author
```

### 4.2 Shared Components

```
src/components/admin/shared/
├── FormHeader.tsx    # Back button, title, save status
├── FormField.tsx     # Label + input with error display
├── FormActions.tsx   # Submit/cancel buttons
└── DynamicList.tsx   # Add/remove list items
```

---

## 5. API Design

### 5.1 Response Format

All API endpoints return JSON with consistent structure:

**Success Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Human-readable error message"
}
```

### 5.2 Error Codes

| HTTP Status | Meaning |
|-------------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad request (validation error) |
| 401 | Unauthorized (not logged in) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not found |
| 500 | Internal server error |

---

## 6. Security Considerations

### 6.1 Implemented

- [x] Password hashing with bcrypt
- [x] HTTP-only session cookies
- [x] JWT token expiration (24 hours)
- [x] Role-based access control
- [x] Input validation with Zod
- [x] Self-deletion prevention (users can't delete themselves)

### 6.2 Recommended for Production

- [ ] HTTPS enforcement
- [ ] Rate limiting on login endpoint
- [ ] CSRF protection
- [ ] Audit logging
- [ ] Password complexity requirements
- [ ] Account lockout after failed attempts
- [ ] Session refresh mechanism

---

## 7. Performance

### 7.1 Build Output

```
Route                              Size      First Load JS
────────────────────────────────────────────────────────────
○ /admin/login                     2.77 kB   105 kB
○ /admin/employees                 2.01 kB   108 kB
○ /admin/articles                  1.54 kB   107 kB
○ /admin/users                     3.04 kB   109 kB
```

### 7.2 Optimization Strategies

- Static page generation for public content
- Dynamic routes for admin pages
- Minimal client-side JavaScript
- Tailwind CSS purging

---

## 8. Directory Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── login/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── employees/
│   │   ├── articles/
│   │   └── users/
│   ├── api/admin/
│   │   ├── auth/route.ts
│   │   ├── employees/route.ts
│   │   ├── articles/route.ts
│   │   └── users/route.ts
│   ├── kunnskapsbank/
│   ├── om-oss/
│   └── tjenester/
├── components/
│   ├── admin/
│   │   ├── employee/
│   │   ├── article/
│   │   └── shared/
│   ├── modules/
│   └── ui/
├── data/
│   ├── employees.json
│   ├── articles.json
│   └── users.json
└── lib/
    ├── admin/
    ├── schemas/
    └── storage/
```

---

## 9. Testing Verification

| Test Case | Status |
|-----------|--------|
| Homepage renders | PASS |
| Admin login API (valid credentials) | PASS |
| Admin login API (invalid credentials) | PASS |
| Protected routes require auth | PASS |
| User management (admin only) | PASS |
| Build completes without errors | PASS |
| TypeScript type checking | PASS |
| ESLint validation | PASS |

---

## 10. Future Improvements

1. **Database Migration:** Move to PostgreSQL for scalability
2. **Image Upload:** Add file upload for employee photos
3. **Audit Logging:** Track all admin actions
4. **Two-Factor Authentication:** Add TOTP support
5. **API Rate Limiting:** Protect against abuse
6. **Caching Layer:** Add Redis for session management
7. **Search Functionality:** Full-text search for articles
