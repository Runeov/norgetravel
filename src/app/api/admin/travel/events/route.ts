import { NextRequest, NextResponse } from 'next/server';
import { eventsStore } from '@/lib/admin/travel-events';
import { EventCreateSchema, EventUpdateSchema } from '@/lib/schemas/travel.events.schema';
import { getAdminReadOnlyResponse } from '@/lib/admin/write-access';
import type { Destination } from '@/lib/schemas/travel.shared';

export const dynamic = 'force-static';

// GET /api/admin/travel/events — List all event items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get('destination') as Destination | null;

    if (destination && destination !== 'all') {
      const items = await eventsStore.filterByDestination(destination);
      return NextResponse.json({ success: true, data: items });
    }

    const items = await eventsStore.getAllSorted();
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error('Error fetching event items:', error);
    return NextResponse.json(
      { success: false, error: 'Could not fetch event items' },
      { status: 500 }
    );
  }
}

// POST /api/admin/travel/events — Create a new event item
export async function POST(request: NextRequest) {
  try {
    const readOnlyResponse = getAdminReadOnlyResponse();
    if (readOnlyResponse) return readOnlyResponse;

    const body = await request.json();
    const parsed = EventCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const item = await eventsStore.create(parsed.data);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    console.error('Error creating event item:', error);
    return NextResponse.json(
      { success: false, error: 'Could not create event item' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/travel/events?id=<id> — Update an event item
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
    const parsed = EventUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const item = await eventsStore.update(id, parsed.data);

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Event item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating event item:', error);
    return NextResponse.json(
      { success: false, error: 'Could not update event item' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/travel/events?id=<id> — Delete an event item
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

    const deleted = await eventsStore.remove(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Event item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Event item deleted' });
  } catch (error) {
    console.error('Error deleting event item:', error);
    return NextResponse.json(
      { success: false, error: 'Could not delete event item' },
      { status: 500 }
    );
  }
}
