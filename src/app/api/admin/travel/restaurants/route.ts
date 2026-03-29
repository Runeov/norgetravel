import { NextRequest, NextResponse } from 'next/server';
import { restaurantsStore } from '@/lib/admin/travel-restaurants';
import { RestaurantCreateSchema, RestaurantUpdateSchema } from '@/lib/schemas/travel.restaurants.schema';
import { getAdminReadOnlyResponse } from '@/lib/admin/write-access';
import type { Destination } from '@/lib/schemas/travel.shared';

export const dynamic = 'force-static';

// GET /api/admin/travel/restaurants — List all restaurant items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get('destination') as Destination | null;

    if (destination && destination !== 'all') {
      const items = await restaurantsStore.filterByDestination(destination);
      return NextResponse.json({ success: true, data: items });
    }

    const items = await restaurantsStore.getAllSorted();
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error('Error fetching restaurant items:', error);
    return NextResponse.json(
      { success: false, error: 'Could not fetch restaurant items' },
      { status: 500 }
    );
  }
}

// POST /api/admin/travel/restaurants — Create a new restaurant item
export async function POST(request: NextRequest) {
  try {
    const readOnlyResponse = getAdminReadOnlyResponse();
    if (readOnlyResponse) return readOnlyResponse;

    const body = await request.json();
    const parsed = RestaurantCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const item = await restaurantsStore.create(parsed.data);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    console.error('Error creating restaurant item:', error);
    return NextResponse.json(
      { success: false, error: 'Could not create restaurant item' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/travel/restaurants?id=<id> — Update a restaurant item
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
    const parsed = RestaurantUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const item = await restaurantsStore.update(id, parsed.data);

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Restaurant item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating restaurant item:', error);
    return NextResponse.json(
      { success: false, error: 'Could not update restaurant item' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/travel/restaurants?id=<id> — Delete a restaurant item
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

    const deleted = await restaurantsStore.remove(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Restaurant item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Restaurant item deleted' });
  } catch (error) {
    console.error('Error deleting restaurant item:', error);
    return NextResponse.json(
      { success: false, error: 'Could not delete restaurant item' },
      { status: 500 }
    );
  }
}
