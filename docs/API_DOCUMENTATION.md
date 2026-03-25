# Averdi Admin API Documentation

**Version:** 1.0
**Base URL:** `/api/admin`
**Authentication:** JWT Cookie (`admin-session`)

---

## Table of Contents

1. [Authentication](#1-authentication)
2. [Users](#2-users)
3. [Employees](#3-employees)
4. [Articles](#4-articles)
5. [Error Handling](#5-error-handling)
6. [Data Schemas](#6-data-schemas)

---

## 1. Authentication

### 1.1 Login

Authenticate a user and create a session.

**Endpoint:** `POST /api/admin/auth`

**Request Body:**
```json
{
  "email": "admin@averdi.no",
  "password": "your-password"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "initial-admin",
    "email": "admin@averdi.no",
    "name": "Administrator",
    "role": "admin",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "error": "Feil e-post eller passord"
}
```

**Side Effects:**
- Sets `admin-session` HTTP-only cookie with JWT token
- Token expires after 24 hours

---

### 1.2 Logout

End the current session.

**Endpoint:** `DELETE /api/admin/auth`

**Headers:**
```
Cookie: admin-session=<jwt-token>
```

**Success Response (200):**
```json
{
  "success": true
}
```

**Side Effects:**
- Clears `admin-session` cookie

---

### 1.3 Check Authentication Status

Verify if the current session is valid.

**Endpoint:** `GET /api/admin/auth`

**Headers:**
```
Cookie: admin-session=<jwt-token>
```

**Authenticated Response (200):**
```json
{
  "success": true,
  "authenticated": true,
  "user": {
    "id": "initial-admin",
    "email": "admin@averdi.no",
    "name": "Administrator",
    "role": "admin"
  }
}
```

**Not Authenticated Response (200):**
```json
{
  "success": true,
  "authenticated": false,
  "user": null
}
```

---

## 2. Users

**Authorization:** Admin role required for all user endpoints.

### 2.1 List All Users

**Endpoint:** `GET /api/admin/users`

**Headers:**
```
Cookie: admin-session=<jwt-token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "initial-admin",
      "email": "admin@averdi.no",
      "name": "Administrator",
      "role": "admin",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

**Error Response (403):**
```json
{
  "success": false,
  "error": "Ingen tilgang"
}
```

---

### 2.2 Create User

**Endpoint:** `POST /api/admin/users`

**Headers:**
```
Cookie: admin-session=<jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "ny.bruker@averdi.no",
  "name": "Ny Bruker",
  "password": "minst8tegn",
  "role": "editor"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | Valid email address |
| name | string | Yes | Display name |
| password | string | Yes | Minimum 8 characters |
| role | string | Yes | `admin` or `editor` |

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "user-abc123",
    "email": "ny.bruker@averdi.no",
    "name": "Ny Bruker",
    "role": "editor",
    "isActive": true,
    "createdAt": "2026-01-31T12:00:00Z",
    "updatedAt": "2026-01-31T12:00:00Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "E-postadressen er allerede i bruk"
}
```

---

### 2.3 Update User

**Endpoint:** `PUT /api/admin/users`

**Headers:**
```
Cookie: admin-session=<jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "id": "user-abc123",
  "name": "Oppdatert Navn",
  "role": "admin",
  "isActive": false
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | User ID to update |
| email | string | No | New email address |
| name | string | No | New display name |
| password | string | No | New password (min 8 chars) |
| role | string | No | `admin` or `editor` |
| isActive | boolean | No | Account status |

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "user-abc123",
    "email": "ny.bruker@averdi.no",
    "name": "Oppdatert Navn",
    "role": "admin",
    "isActive": false,
    "createdAt": "2026-01-31T12:00:00Z",
    "updatedAt": "2026-01-31T13:00:00Z"
  }
}
```

---

### 2.4 Delete User

**Endpoint:** `DELETE /api/admin/users?id=<user-id>`

**Headers:**
```
Cookie: admin-session=<jwt-token>
```

**Query Parameters:**
| Parameter | Required | Description |
|-----------|----------|-------------|
| id | Yes | User ID to delete |

**Success Response (200):**
```json
{
  "success": true
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Du kan ikke slette din egen bruker"
}
```

---

## 3. Employees

**Authorization:** Valid session required (any role).

### 3.1 List All Employees

**Endpoint:** `GET /api/admin/employees`

**Headers:**
```
Cookie: admin-session=<jwt-token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "ingvald-laiti",
      "name": "Ingvald Laiti",
      "role": "Daglig leder / Autorisert regnskapsfører",
      "email": "ingvald@averdi.no",
      "phone": "78 46 72 00",
      "office": "karasjok",
      "description": "Grunnlegger og daglig leder...",
      "longDescription": "...",
      "experience": "25+ års erfaring",
      "specialties": ["Skatterådgiving", "Reindrift"],
      "education": ["Autorisert regnskapsfører"],
      "languages": ["Norsk", "Samisk"],
      "workingHours": "Man-Fre: 08:00-16:00",
      "achievements": [],
      "clientTypes": ["SMB", "Reindrift"],
      "image": "/images/team/ingvald.jpg",
      "relatedHubs": [],
      "timeline": [],
      "isActive": true,
      "sortOrder": 1,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### 3.2 Get Single Employee

**Endpoint:** `GET /api/admin/employees/[id]`

**Headers:**
```
Cookie: admin-session=<jwt-token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "ingvald-laiti",
    "name": "Ingvald Laiti",
    ...
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Ansatt ikke funnet"
}
```

---

### 3.3 Create Employee

**Endpoint:** `POST /api/admin/employees`

**Headers:**
```
Cookie: admin-session=<jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Ola Nordmann",
  "role": "Regnskapsfører",
  "email": "ola@averdi.no",
  "phone": "78 46 72 01",
  "office": "karasjok",
  "description": "Erfaren regnskapsfører med fokus på SMB.",
  "longDescription": "Lengre beskrivelse...",
  "experience": "10 års erfaring",
  "specialties": ["Regnskap", "MVA"],
  "education": ["Bachelor i økonomi"],
  "languages": ["Norsk", "Engelsk"],
  "workingHours": "Man-Fre: 08:00-16:00",
  "achievements": [],
  "clientTypes": ["SMB"],
  "image": "/images/team/ola.jpg",
  "relatedHubs": [
    { "title": "Regnskap for bedrifter", "link": "/kunnskapsbank/bedrifter" }
  ],
  "timeline": [
    { "year": "2015", "title": "Startet i Averdi", "description": "Begynte som junior", "icon": "briefcase" }
  ],
  "isActive": true
}
```

**Required Fields:**
- name, role, email, phone, office, description

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "ola-nordmann",
    ...
  }
}
```

---

### 3.4 Update Employee

**Endpoint:** `PUT /api/admin/employees/[id]`

**Headers:**
```
Cookie: admin-session=<jwt-token>
Content-Type: application/json
```

**Request Body:** (partial update allowed)
```json
{
  "role": "Senior Regnskapsfører",
  "isActive": false
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "ola-nordmann",
    "role": "Senior Regnskapsfører",
    "isActive": false,
    ...
  }
}
```

---

### 3.5 Delete Employee

**Endpoint:** `DELETE /api/admin/employees/[id]`

**Headers:**
```
Cookie: admin-session=<jwt-token>
```

**Success Response (200):**
```json
{
  "success": true
}
```

---

## 4. Articles

**Authorization:** Valid session required (any role).

### 4.1 List All Articles

**Endpoint:** `GET /api/admin/articles`

**Headers:**
```
Cookie: admin-session=<jwt-token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "art-001",
      "slug": "vipps-integrasjon",
      "title": "Vipps-integrasjon for bedrifter",
      "subtitle": "En komplett guide",
      "excerpt": "Lær hvordan du setter opp Vipps...",
      "content": "<p>Innhold her...</p>",
      "category": "bedrift",
      "tags": ["vipps", "betaling"],
      "readTime": 8,
      "authorId": "admin",
      "authorName": "Ingvald Laiti",
      "featuredImage": "/images/articles/vipps.jpg",
      "featuredImageAlt": "Vipps logo",
      "metaTitle": "Vipps-integrasjon | Averdi",
      "metaDescription": "Komplett guide til Vipps...",
      "status": "published",
      "publishedAt": "2024-06-15T10:00:00Z",
      "isFeatured": true,
      "sortOrder": 1,
      "createdAt": "2024-06-01T00:00:00Z",
      "updatedAt": "2024-06-15T10:00:00Z"
    }
  ]
}
```

---

### 4.2 Get Single Article

**Endpoint:** `GET /api/admin/articles/[id]`

**Headers:**
```
Cookie: admin-session=<jwt-token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "art-001",
    "title": "Vipps-integrasjon for bedrifter",
    ...
  }
}
```

---

### 4.3 Create Article

**Endpoint:** `POST /api/admin/articles`

**Headers:**
```
Cookie: admin-session=<jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Ny artikkel",
  "slug": "ny-artikkel",
  "subtitle": "Valgfri undertittel",
  "excerpt": "Kort beskrivelse av artikkelen...",
  "content": "<p>Artikkelinnhold med HTML...</p>",
  "category": "bedrift",
  "tags": ["regnskap", "tips"],
  "readTime": 5,
  "authorId": "admin",
  "authorName": "Forfatter Navn",
  "featuredImage": "https://example.com/image.jpg",
  "featuredImageAlt": "Bildetekst",
  "metaTitle": "SEO Tittel",
  "metaDescription": "SEO beskrivelse",
  "status": "draft",
  "isFeatured": false
}
```

**Required Fields:**
- title, slug, excerpt, content

**Categories:**
- `bedrift` - Business
- `sametinget` - Sami Parliament
- `organisasjoner` - Organizations
- `analyse` - Analysis
- `regelverk` - Regulations

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "art-new-123",
    "title": "Ny artikkel",
    "status": "draft",
    ...
  }
}
```

---

### 4.4 Update Article

**Endpoint:** `PUT /api/admin/articles/[id]`

**Headers:**
```
Cookie: admin-session=<jwt-token>
Content-Type: application/json
```

**Request Body:** (partial update allowed)
```json
{
  "status": "published",
  "isFeatured": true
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "art-001",
    "status": "published",
    "publishedAt": "2026-01-31T12:00:00Z",
    ...
  }
}
```

**Note:** When status changes to `published`, the `publishedAt` field is automatically set.

---

### 4.5 Delete Article

**Endpoint:** `DELETE /api/admin/articles/[id]`

**Headers:**
```
Cookie: admin-session=<jwt-token>
```

**Success Response (200):**
```json
{
  "success": true
}
```

---

## 5. Error Handling

### 5.1 Standard Error Response

All errors follow this format:

```json
{
  "success": false,
  "error": "Human-readable error message in Norwegian"
}
```

### 5.2 HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Request completed |
| 201 | Created | New resource created |
| 400 | Bad Request | Validation failed |
| 401 | Unauthorized | Not logged in |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Internal error |

### 5.3 Common Error Messages

| Message | Cause |
|---------|-------|
| "Feil e-post eller passord" | Invalid login credentials |
| "Ugyldig e-postadresse" | Email format validation failed |
| "Passord må være minst 8 tegn" | Password too short |
| "Ingen tilgang" | User lacks required role |
| "Bruker ikke funnet" | User ID doesn't exist |
| "Ansatt ikke funnet" | Employee ID doesn't exist |
| "Tittel, utdrag, innhold og slug er påkrevd" | Missing required article fields |
| "Du kan ikke slette din egen bruker" | Self-deletion attempted |
| "E-postadressen er allerede i bruk" | Duplicate email |

---

## 6. Data Schemas

### 6.1 User Schema

```typescript
{
  id: string;           // Unique identifier
  email: string;        // Valid email address
  name: string;         // Display name (min 1 char)
  passwordHash: string; // bcrypt hash (never exposed)
  role: 'admin' | 'editor';
  isActive: boolean;
  createdAt: string;    // ISO 8601 datetime
  updatedAt: string;    // ISO 8601 datetime
}
```

### 6.2 Employee Schema

```typescript
{
  id: string;
  name: string;           // Required
  role: string;           // Job title, required
  email: string;          // Valid email, required
  phone: string;          // Required
  office: string;         // Location, required
  description: string;    // Short bio, required
  longDescription: string;
  experience: string;
  specialties: string[];
  education: string[];
  languages: string[];
  workingHours: string;
  achievements: string[];
  clientTypes: string[];
  image?: string;         // URL to photo
  relatedHubs?: Array<{
    title: string;
    link: string;
  }>;
  timeline?: Array<{
    year: string;
    title: string;
    description: string;
    icon: 'briefcase' | 'graduation' | 'award' | 'star';
    highlight?: boolean;
  }>;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}
```

### 6.3 Article Schema

```typescript
{
  id: string;
  slug: string;           // URL-friendly identifier, required
  title: string;          // Required
  subtitle?: string;
  excerpt: string;        // Required, for previews
  content: string;        // HTML content, required
  category: 'bedrift' | 'sametinget' | 'organisasjoner' | 'analyse' | 'regelverk';
  tags: string[];
  readTime: number;       // Minutes, 1-120
  authorId: string;
  authorName?: string;
  featuredImage?: string; // URL
  featuredImageAlt?: string;
  metaTitle?: string;     // SEO title
  metaDescription?: string; // SEO description
  status: 'draft' | 'published';
  publishedAt?: string;   // Set when published
  isFeatured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}
```

---

## Appendix: cURL Examples

### Login
```bash
curl -X POST http://localhost:3000/api/admin/auth \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@averdi.no","password":"admin123"}' \
  -c cookies.txt
```

### List Employees (with session)
```bash
curl http://localhost:3000/api/admin/employees \
  -b cookies.txt
```

### Create Article
```bash
curl -X POST http://localhost:3000/api/admin/articles \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "Test Article",
    "slug": "test-article",
    "excerpt": "Test excerpt",
    "content": "<p>Test content</p>",
    "category": "bedrift",
    "status": "draft",
    "tags": [],
    "readTime": 5,
    "isFeatured": false
  }'
```

### Logout
```bash
curl -X DELETE http://localhost:3000/api/admin/auth \
  -b cookies.txt
```
