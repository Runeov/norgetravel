# Averdi Admin System - Product Requirements Document

**Version:** 1.0
**Date:** January 2026
**Status:** Implemented

---

## 1. Executive Summary

The Averdi Admin System is a content management solution for averdi.no, a Norwegian accounting firm website. The system enables authorized staff to manage employee profiles and knowledge base articles without developer intervention.

### 1.1 Product Goals

1. Enable non-technical staff to update website content
2. Support multiple admin users with role-based permissions
3. Maintain data integrity with validation and concurrency protection
4. Provide a professional, responsive admin interface

### 1.2 Success Metrics

| Metric | Target |
|--------|--------|
| Content update time | < 5 minutes per item |
| System uptime | 99.9% |
| Login success rate | > 99% |
| Data validation errors | 0 silent failures |

---

## 2. User Personas

### 2.1 Administrator

**Name:** Hilde (Office Manager)
**Role:** Admin
**Goals:**
- Manage all employee profiles
- Publish and update articles
- Create accounts for new team members
- Deactivate accounts for departing staff

**Pain Points:**
- Previously needed developer to update website
- Risk of data loss when multiple people edit simultaneously

### 2.2 Editor

**Name:** Jan (Accountant/Content Creator)
**Role:** Editor
**Goals:**
- Write and publish knowledge base articles
- Update own profile information
- Preview content before publishing

**Pain Points:**
- Complex publishing workflows
- Difficulty formatting rich content

---

## 3. Functional Requirements

### 3.1 Authentication

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| AUTH-01 | Users must log in with email and password | P0 | Done |
| AUTH-02 | Passwords must be at least 8 characters | P0 | Done |
| AUTH-03 | Sessions expire after 24 hours | P1 | Done |
| AUTH-04 | Failed login shows error message | P0 | Done |
| AUTH-05 | Logout clears session completely | P0 | Done |

### 3.2 User Management (Admin Only)

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| USER-01 | Admin can view list of all users | P0 | Done |
| USER-02 | Admin can create new users | P0 | Done |
| USER-03 | Admin can assign roles (admin/editor) | P0 | Done |
| USER-04 | Admin can deactivate users | P1 | Done |
| USER-05 | Admin cannot delete own account | P0 | Done |
| USER-06 | Email addresses must be unique | P0 | Done |

### 3.3 Employee Management

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| EMP-01 | View list of all employees | P0 | Done |
| EMP-02 | Create new employee profile | P0 | Done |
| EMP-03 | Edit existing employee profile | P0 | Done |
| EMP-04 | Delete employee profile | P0 | Done |
| EMP-05 | Required fields: name, role, email, phone, office, description | P0 | Done |
| EMP-06 | Optional: photo, specialties, education, languages | P1 | Done |
| EMP-07 | Career timeline with milestones | P2 | Done |
| EMP-08 | Link to related knowledge hubs | P2 | Done |
| EMP-09 | Set employee as active/inactive | P1 | Done |

### 3.4 Article Management

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| ART-01 | View list of all articles | P0 | Done |
| ART-02 | Create new article | P0 | Done |
| ART-03 | Edit existing article | P0 | Done |
| ART-04 | Delete article | P0 | Done |
| ART-05 | Rich text editor for content | P0 | Done |
| ART-06 | Categories: Bedrift, Sametinget, Organisasjoner, Analyse, Regelverk | P0 | Done |
| ART-07 | Save as draft or publish | P0 | Done |
| ART-08 | Auto-generate URL slug from title | P1 | Done |
| ART-09 | Add tags for filtering | P1 | Done |
| ART-10 | Set featured image | P2 | Done |
| ART-11 | SEO meta title and description | P2 | Done |
| ART-12 | Set estimated read time | P2 | Done |
| ART-13 | Mark article as featured | P1 | Done |

---

## 4. Non-Functional Requirements

### 4.1 Performance

| ID | Requirement | Target |
|----|-------------|--------|
| PERF-01 | Page load time | < 3 seconds |
| PERF-02 | Form submission response | < 2 seconds |
| PERF-03 | Build time | < 2 minutes |

### 4.2 Security

| ID | Requirement |
|----|-------------|
| SEC-01 | Passwords stored as bcrypt hashes |
| SEC-02 | Session tokens are HTTP-only cookies |
| SEC-03 | Admin routes protected by middleware |
| SEC-04 | Input validation on all forms |
| SEC-05 | No sensitive data in client-side code |

### 4.3 Usability

| ID | Requirement |
|----|-------------|
| UX-01 | Responsive design (desktop, tablet, mobile) |
| UX-02 | Norwegian language interface |
| UX-03 | Clear error messages |
| UX-04 | Loading indicators for async operations |
| UX-05 | Confirmation dialogs for destructive actions |

### 4.4 Reliability

| ID | Requirement |
|----|-------------|
| REL-01 | No data loss on concurrent edits |
| REL-02 | Graceful error handling |
| REL-03 | Data validation prevents corrupt entries |

---

## 5. User Interface Specifications

### 5.1 Login Page

**URL:** `/admin/login`

**Elements:**
- Logo and title "Averdi Admin"
- Email input field
- Password input field (with show/hide toggle)
- "Logg inn" button
- Error message display area
- Link back to main website

**Behavior:**
- Email validation (format check)
- Loading state during submission
- Redirect to dashboard on success
- Error display on failure

### 5.2 Dashboard

**URL:** `/admin/dashboard`

**Elements:**
- Welcome message with user name
- Navigation menu (Employees, Articles, Users)
- Quick stats overview
- Recent activity

### 5.3 Employee List

**URL:** `/admin/employees`

**Elements:**
- "Ny ansatt" (New employee) button
- Table/grid of employees
  - Name
  - Role
  - Office
  - Status (active/inactive)
  - Edit/Delete actions
- Search/filter functionality

### 5.4 Employee Form

**URL:** `/admin/employees/new` or `/admin/employees/[id]`

**Sections:**
1. **Basic Info** - Name, role, email, phone, office
2. **Description** - Short and long description
3. **Details** - Specialties, education, languages
4. **Knowledge Hubs** - Related article categories
5. **Timeline** - Career milestones

### 5.5 Article List

**URL:** `/admin/articles`

**Elements:**
- "Ny artikkel" (New article) button
- Table of articles
  - Title
  - Category
  - Status (draft/published)
  - Author
  - Date
  - Actions
- Filter by category/status

### 5.6 Article Form

**URL:** `/admin/articles/new` or `/admin/articles/[id]`

**Layout:** Two columns

**Main Column:**
- Title input
- Subtitle input
- Excerpt textarea
- Rich text content editor

**Sidebar:**
- Status toggle (draft/published)
- Featured checkbox
- Category dropdown
- URL slug input
- Read time
- Featured image URL
- Author name
- Tags input
- SEO meta fields

### 5.7 User Management

**URL:** `/admin/users`

**Elements:**
- "Ny bruker" (New user) button
- Table of users
  - Name
  - Email
  - Role
  - Status (active/inactive)
  - Actions (edit/delete)

**Access:** Admin role only

---

## 6. Data Models

### 6.1 User

```typescript
{
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: 'admin' | 'editor';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### 6.2 Employee

```typescript
{
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  office: string;
  description: string;
  longDescription: string;
  experience: string;
  specialties: string[];
  education: string[];
  languages: string[];
  workingHours: string;
  achievements: string[];
  clientTypes: string[];
  image?: string;
  relatedHubs?: { title: string; link: string }[];
  timeline?: { year: string; title: string; description: string; icon: string }[];
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}
```

### 6.3 Article

```typescript
{
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  category: 'bedrift' | 'sametinget' | 'organisasjoner' | 'analyse' | 'regelverk';
  tags: string[];
  readTime: number;
  authorId: string;
  authorName?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  metaTitle?: string;
  metaDescription?: string;
  status: 'draft' | 'published';
  publishedAt?: string;
  isFeatured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}
```

---

## 7. Integration Points

### 7.1 Public Website

The admin system manages content displayed on:

| Public Page | Data Source |
|-------------|-------------|
| `/om-oss` | employees.json |
| `/om-oss/[employee]` | employees.json |
| `/kunnskapsbank` | articles.json |
| `/kunnskapsbank/[category]/[slug]` | articles.json |

### 7.2 External Services

| Service | Purpose | Status |
|---------|---------|--------|
| Hotjar | Analytics | Configured |
| Next.js Sitemap | SEO | Auto-generated |

---

## 8. Release Information

### 8.1 Initial Release (v1.0)

**Date:** January 2026

**Included Features:**
- Multi-user authentication
- User management (admin only)
- Employee CRUD
- Article CRUD with rich text
- File locking for concurrent access
- Norwegian language interface

**Default Credentials:**
- Email: `admin@averdi.no`
- Password: `admin123`

*Change password immediately after first login.*

### 8.2 Future Roadmap

| Version | Features | Target |
|---------|----------|--------|
| 1.1 | Image upload, Password reset | Q2 2026 |
| 1.2 | Two-factor authentication | Q3 2026 |
| 1.3 | Audit logging | Q3 2026 |
| 2.0 | Database migration | Q4 2026 |

---

## 9. Glossary

| Term | Definition |
|------|------------|
| Admin | User with full access including user management |
| Editor | User with access to content management only |
| Draft | Unpublished article visible only in admin |
| Published | Article visible on public website |
| Knowledge Hub | Category of related articles |
| Timeline | Employee career milestones display |

---

## 10. Appendix

### 10.1 Article Categories

| Category | Norwegian | Description |
|----------|-----------|-------------|
| bedrift | Bedrift | Business-related content |
| sametinget | Sametinget | Sami Parliament topics |
| organisasjoner | Organisasjoner | Non-profit organizations |
| analyse | Analyse | Analysis and reports |
| regelverk | Regelverk | Regulations and compliance |

### 10.2 Office Locations

- Karasjok
- Tana
- Lakselv

### 10.3 Contact

For questions about this system, contact the development team.
