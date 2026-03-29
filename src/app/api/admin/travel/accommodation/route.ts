import { NextRequest, NextResponse } from 'next/server';
import { accommodationStore } from '@/lib/admin/travel-accommodation';
import { AccommodationCreateSchema, AccommodationUpdateSchema } from '@/lib/schemas/travel.accommodation.schema';
import { getAdminReadOnlyResponse } from '@/lib/admin/write-access';
import type { Destination } from '@/lib/schemas/travel.shared';

export const dynamic = 'force-static';

// GET /api/admin/travel/accommodation — List all accommodation items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get('destination') as Destination | null;

    if (destination && destination !== 'all') {
      const items = await accommodationStore.filterByDestination(destination);
      return NextResponse.json({ success: true, data: items });
    }

    const items = await accommodationStore.getAllSorted();
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error('Error fetching accommodation items:', error);
    return NextResponse.json(
      { success: false, error: 'Could not fetch accommodation items' },
      { status: 500 }
    );
  }
}

// POST /api/admin/travel/accommodation — Create a new accommodation item
export async function POST(request: NextRequest) {
  try {
    const readOnlyResponse = getAdminReadOnlyResponse();
    if (readOnlyResponse) return readOnlyResponse;

    const body = await request.json();
    const parsed = AccommodationCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const item = await accommodationStore.create(parsed.data);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    console.error('Error creating accommodation item:', error);
    return NextResponse.json(
      { success: false, error: 'Could not create accommodation item' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/travel/accommodation?id=<id> — Update an accommodation item
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
    const parsed = AccommodationUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const item = await accommodationStore.update(id, parsed.data);

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Accommodation item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating accommodation item:', error);
    return NextResponse.json(
      { success: false, error: 'Could not update accommodation item' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/travel/accommodation?id=<id> — Delete an accommodation item
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

    const deleted = await accommodationStore.remove(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Accommodation item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Accommodation item deleted' });
  } catch (error) {
    console.error('Error deleting accommodation item:', error);
    return NextResponse.json(
      { success: false, error: 'Could not delete accommodation item' },
      { status: 500 }
    );
  }
}
