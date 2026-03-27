import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';
import {
  createSession,
  setSessionCookie,
  clearSessionCookie,
  getSession
} from '@/lib/admin/auth';
import { verifyCredentials } from '@/lib/admin/users';
import { LoginCredentialsSchema } from '@/lib/schemas/user.schema';
import { ZodError } from 'zod';

/**
 * POST /api/admin/auth - Login
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const { email, password } = LoginCredentialsSchema.parse(body);

    // Authenticate user
    const user = await verifyCredentials(email, password);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Feil e-post eller passord' },
        { status: 401 }
      );
    }

    // Create session and set cookie
    const token = await createSession(user);
    await setSessionCookie(token);

    // Return user info (without password hash)
    const { passwordHash, ...safeUser } = user;

    return NextResponse.json({
      success: true,
      user: safeUser
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: 'Ugyldig e-post eller passord' },
        { status: 400 }
      );
    }

    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'En feil oppstod' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/auth - Logout
 */
export async function DELETE() {
  try {
    await clearSessionCookie();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'En feil oppstod' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/auth - Check authentication status
 */
export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({
        success: true,
        authenticated: false,
        user: null
      });
    }

    return NextResponse.json({
      success: true,
      authenticated: true,
      user: {
        id: session.userId,
        email: session.email,
        name: session.name,
        role: session.role
      }
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { success: false, authenticated: false },
      { status: 500 }
    );
  }
}
