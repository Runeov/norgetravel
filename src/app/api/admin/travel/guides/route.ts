import { NextRequest, NextResponse } from 'next/server';
import { guidesStore } from '@/lib/admin/travel-guides';
import { GuideCreateSchema, GuideUpdateSchema } from '@/lib/schemas/travel.guides.schema';
import { getAdminReadOnlyResponse } from '@/lib/admin/write-access';
import type { Destination } from '@/lib/schemas/travel.shared';

export const dynamic = 'force-static';

// GET /api/admin/travel/guides — List all guide items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get('destination') as Destination | null;

    if (destination && destination !== 'all') {
      const items = await guidesStore.filterByDestination(destination);
      return NextResponse.json({ success: true, data: items });
    }

    const items = await guidesStore.getAllSorted();
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error('Error fetching guide items:', error);
    return NextResponse.json(
      { success: false, error: 'Could not fetch guide items' },
      { status: 500 }
    );
  }
}

// POST /api/admin/travel/guides — Create a new guide item
export async function POST(request: NextRequest) {
  try {
    const readOnlyResponse = getAdminReadOnlyResponse();
    if (readOnlyResponse) return readOnlyResponse;

    const body = await request.json();
    const parsed = GuideCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const item = await guidesStore.create(parsed.data);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    console.error('Error creating guide item:', error);
    return NextResponse.json(
      { success: false, error: 'Could not create guide item' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/travel/guides?id=<id> — Update a guide item
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
    const parsed = GuideUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const item = await guidesStore.update(id, parsed.data);

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Guide item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating guide item:', error);
    return NextResponse.json(
      { success: false, error: 'Could not update guide item' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/travel/guides?id=<id> — Delete a guide item
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

    const deleted = await guidesStore.remove(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Guide item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Guide item deleted' });
  } catch (error) {
    console.error('Error deleting guide item:', error);
    return NextResponse.json(
      { success: false, error: 'Could not delete guide item' },
      { status: 500 }
    );
  }
}
