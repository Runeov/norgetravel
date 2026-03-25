import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

let _secretKey: Uint8Array | null = null;

/**
 * Get the JWT secret key (lazy-loaded to avoid build-time errors).
 * In production, JWT_SECRET env var is required.
 * In development, a fallback key is used.
 */
function getSecretKey(): Uint8Array {
  if (_secretKey) return _secretKey;

  const secret = process.env.JWT_SECRET;
  if (!secret && process.env.NODE_ENV === 'production') {
    throw new Error(
      'JWT_SECRET environment variable is required in production. ' +
      'Generate one with: openssl rand -base64 32'
    );
  }
  _secretKey = new TextEncoder().encode(
    secret || 'averdi-admin-dev-only-secret-key-32chars-min'
  );
  return _secretKey;
}

const COOKIE_NAME = 'averdi-admin-session';
const SESSION_DURATION = 24 * 60 * 60; // 24 hours in seconds

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
  exp: number;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
}

/**
 * Create a signed JWT session token for a user
 */
export async function createSession(user: SessionUser): Promise<string> {
  const token = await new SignJWT({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(`${SESSION_DURATION}s`)
    .setIssuedAt()
    .sign(getSecretKey());

  return token;
}

/**
 * Verify a session token and return the payload
 */
export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

/**
 * Set the session cookie
 */
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION,
    path: '/',
  });
}

/**
 * Get the session cookie
 */
export async function getSessionCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

/**
 * Clear the session cookie
 */
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Get the current session payload from the cookie
 */
export async function getSession(): Promise<SessionPayload | null> {
  const token = await getSessionCookie();

  if (!token) {
    return null;
  }

  return verifySession(token);
}

/**
 * Check if the current request is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}

/**
 * Get the current user from the session
 */
export async function getCurrentUser(): Promise<SessionPayload | null> {
  return getSession();
}

/**
 * Check if the current user has a specific role
 */
export async function hasRole(role: 'admin' | 'editor'): Promise<boolean> {
  const session = await getSession();

  if (!session) {
    return false;
  }

  // Admin has all roles
  if (session.role === 'admin') {
    return true;
  }

  return session.role === role;
}

/**
 * Check if the current user is an admin
 */
export async function isAdmin(): Promise<boolean> {
  const session = await getSession();
  return session?.role === 'admin';
}

/**
 * Middleware helper to check authentication from request
 */
export async function checkAuthFromRequest(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return false;
  }

  const session = await verifySession(token);
  return session !== null;
}

/**
 * Middleware helper to get session from request
 */
export async function getSessionFromRequest(request: NextRequest): Promise<SessionPayload | null> {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifySession(token);
}

/**
 * Create an unauthorized response
 */
export function unauthorizedResponse(): NextResponse {
  return NextResponse.json(
    { success: false, error: 'Unauthorized' },
    { status: 401 }
  );
}

/**
 * Create a forbidden response
 */
export function forbiddenResponse(): NextResponse {
  return NextResponse.json(
    { success: false, error: 'Forbidden' },
    { status: 403 }
  );
}
