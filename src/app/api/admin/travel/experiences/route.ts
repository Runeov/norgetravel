import { NextRequest, NextResponse } from 'next/server';
import { experiencesStore } from '@/lib/admin/travel-experiences';
import { ExperienceCreateSchema, ExperienceUpdateSchema } from '@/lib/schemas/travel.experiences.schema';
import { getAdminReadOnlyResponse } from '@/lib/admin/write-access';
import type { Destination } from '@/lib/schemas/travel.shared';

export const dynamic = 'force-static';

// GET /api/admin/travel/experiences — List all experience items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get('destination') as Destination | null;

    if (destination && destination !== 'all') {
      const items = await experiencesStore.filterByDestination(destination);
      return NextResponse.json({ success: true, data: items });
    }

    const items = await experiencesStore.getAllSorted();
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error('Error fetching experience items:', error);
    return NextResponse.json(
      { success: false, error: 'Could not fetch experience items' },
      { status: 500 }
    );
  }
}

// POST /api/admin/travel/experiences — Create a new experience item
export async function POST(request: NextRequest) {
  try {
    const readOnlyResponse = getAdminReadOnlyResponse();
    if (readOnlyResponse) return readOnlyResponse;

    const body = await request.json();
    const parsed = ExperienceCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const item = await experiencesStore.create(parsed.data);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    console.error('Error creating experience item:', error);
    return NextResponse.json(
      { success: false, error: 'Could not create experience item' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/travel/experiences?id=<id> — Update an experience item
export async function PUT(request: NextRequest) {
  try {
    const readOnlyResponse = getAdminReadOnlyResponse();
    if (readOnlyResponse) return readOnlyResponse;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing id parameter' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const parsed = ExperienceUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const item = await experiencesStore.update(id, parsed.data);

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Experience item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating experience item:', error);
    return NextResponse.json(
      { success: false, error: 'Could not update experience item' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/travel/experiences?id=<id> — Delete an experience item
export async function DELETE(request: NextRequest) {
  try {
    const readOnlyResponse = getAdminReadOnlyResponse();
    if (readOnlyResponse) return readOnlyResponse;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing id parameter' },
        { status: 400 }
      );
    }

    const deleted = await experiencesStore.remove(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Experience item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Experience item deleted' });
  } catch (error) {
    console.error('Error deleting experience item:', error);
    return NextResponse.json(
      { success: false, error: 'Could not delete experience item' },
      { status: 500 }
    );
  }
}
