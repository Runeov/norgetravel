import { NextRequest, NextResponse } from 'next/server';
import { transportStore } from '@/lib/admin/travel-transport';
import { TransportCreateSchema, TransportUpdateSchema } from '@/lib/schemas/travel.transport.schema';
import { getAdminReadOnlyResponse } from '@/lib/admin/write-access';
import type { Destination } from '@/lib/schemas/travel.shared';

export const dynamic = 'force-static';

// GET /api/admin/travel/transport — List all transport items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get('destination') as Destination | null;

    if (destination && destination !== 'all') {
      const items = await transportStore.filterByDestination(destination);
      return NextResponse.json({ success: true, data: items });
    }

    const items = await transportStore.getAllSorted();
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error('Error fetching transport items:', error);
    return NextResponse.json(
      { success: false, error: 'Could not fetch transport items' },
      { status: 500 }
    );
  }
}

// POST /api/admin/travel/transport — Create a new transport item
export async function POST(request: NextRequest) {
  try {
    const readOnlyResponse = getAdminReadOnlyResponse();
    if (readOnlyResponse) return readOnlyResponse;

    const body = await request.json();
    const parsed = TransportCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const item = await transportStore.create(parsed.data);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    console.error('Error creating transport item:', error);
    return NextResponse.json(
      { success: false, error: 'Could not create transport item' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/travel/transport?id=<id> — Update a transport item
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
    const parsed = TransportUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const item = await transportStore.update(id, parsed.data);

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Transport item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating transport item:', error);
    return NextResponse.json(
      { success: false, error: 'Could not update transport item' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/travel/transport?id=<id> — Delete a transport item
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

    const deleted = await transportStore.remove(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Transport item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Transport item deleted' });
  } catch (error) {
    console.error('Error deleting transport item:', error);
    return NextResponse.json(
      { success: false, error: 'Could not delete transport item' },
      { status: 500 }
    );
  }
}
