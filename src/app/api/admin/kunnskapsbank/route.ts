import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';
import {
  getAllKunnskapsbankSectionsSorted,
  updateKunnskapsbankSectionPublishStatus,
} from '@/lib/admin/kunnskapsbank';
import { KunnskapsbankSectionIdSchema } from '@/lib/schemas/kunnskapsbank.schema';
import { getAdminReadOnlyResponse } from '@/lib/admin/write-access';

interface UpdateKunnskapsbankBody {
  id?: string;
  isPublished?: boolean;
}

// GET /api/admin/kunnskapsbank - List all kunnskapsbank section statuses
export async function GET() {
  try {
    const sections = await getAllKunnskapsbankSectionsSorted();
    return NextResponse.json({ success: true, data: sections });
  } catch (error) {
    console.error('Error fetching kunnskapsbank sections:', error);
    return NextResponse.json(
      { success: false, error: 'Kunne ikke hente kunnskapsbank status' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/kunnskapsbank - Update section publish status
export async function PATCH(request: NextRequest) {
  try {
    const readOnlyResponse = getAdminReadOnlyResponse();
    if (readOnlyResponse) {
      return readOnlyResponse;
    }

    const body: UpdateKunnskapsbankBody = await request.json();
    const parsedId = KunnskapsbankSectionIdSchema.safeParse(body.id);

    if (!parsedId.success) {
      return NextResponse.json(
        { success: false, error: 'Ugyldig seksjon' },
        { status: 400 }
      );
    }

    if (typeof body.isPublished !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'isPublished must be true or false' },
        { status: 400 }
      );
    }

    const updated = await updateKunnskapsbankSectionPublishStatus(
      parsedId.data,
      body.isPublished
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Seksjon ikke funnet' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating kunnskapsbank section:', error);
    return NextResponse.json(
      { success: false, error: 'Kunne ikke oppdatere kunnskapsbank status' },
      { status: 500 }
    );
  }
}

