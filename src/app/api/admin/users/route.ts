import { NextRequest, NextResponse } from 'next/server';
import { getAllUsersSafe, createUser, updateUser, deleteUser } from '@/lib/admin/users';
import { getSessionFromRequest } from '@/lib/admin/auth';
import { getAdminReadOnlyResponse } from '@/lib/admin/write-access';
import { UserCreateSchema, UserUpdateSchema } from '@/lib/schemas/user.schema';
import { ZodError } from 'zod';

function getZodErrorMessage(error: ZodError): string {
  return error.issues[0]?.message || 'Ugyldig data';
}

/**
 * GET /api/admin/users - List all users (admin only)
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);

    if (!session || session.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Ingen tilgang' },
        { status: 403 }
      );
    }

    const users = await getAllUsersSafe();

    return NextResponse.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, error: 'En feil oppstod' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/users - Create a new user (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);

    if (!session || session.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Ingen tilgang' },
        { status: 403 }
      );
    }

    const readOnlyResponse = getAdminReadOnlyResponse();
    if (readOnlyResponse) {
      return readOnlyResponse;
    }

    const body = await request.json();

    // Validate input
    const userData = UserCreateSchema.parse(body);

    const user = await createUser(userData);

    return NextResponse.json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: getZodErrorMessage(error) },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    console.error('Error creating user:', error);
    return NextResponse.json(
      { success: false, error: 'En feil oppstod' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/users - Update a user (admin only)
 */
export async function PUT(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);

    if (!session || session.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Ingen tilgang' },
        { status: 403 }
      );
    }

    const readOnlyResponse = getAdminReadOnlyResponse();
    if (readOnlyResponse) {
      return readOnlyResponse;
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Bruker-ID mangler' },
        { status: 400 }
      );
    }

    // Validate updates
    const validatedUpdates = UserUpdateSchema.parse(updates);

    const user = await updateUser(id, validatedUpdates);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Bruker ikke funnet' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: getZodErrorMessage(error) },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    console.error('Error updating user:', error);
    return NextResponse.json(
      { success: false, error: 'En feil oppstod' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/users - Delete a user (admin only)
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);

    if (!session || session.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Ingen tilgang' },
        { status: 403 }
      );
    }

    const readOnlyResponse = getAdminReadOnlyResponse();
    if (readOnlyResponse) {
      return readOnlyResponse;
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Bruker-ID mangler' },
        { status: 400 }
      );
    }

    // Prevent deleting yourself
    if (id === session.userId) {
      return NextResponse.json(
        { success: false, error: 'Du kan ikke slette din egen bruker' },
        { status: 400 }
      );
    }

    const success = await deleteUser(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Bruker ikke funnet' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    console.error('Error deleting user:', error);
    return NextResponse.json(
      { success: false, error: 'En feil oppstod' },
      { status: 500 }
    );
  }
}
