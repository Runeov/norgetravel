import { NextRequest, NextResponse } from 'next/server';
import { updateArticle, deleteArticle } from '@/lib/admin/articles';
import { getAdminReadOnlyResponse } from '@/lib/admin/write-access';

export const dynamic = 'force-dynamic';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const readOnlyResponse = getAdminReadOnlyResponse();
    if (readOnlyResponse) {
      return readOnlyResponse;
    }

    const { id } = await params;
    const body = await request.json();

    const article = await updateArticle(id, body);

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Artikkelen ble ikke funnet' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { success: false, error: 'Kunne ikke oppdatere artikkelen' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const readOnlyResponse = getAdminReadOnlyResponse();
    if (readOnlyResponse) {
      return readOnlyResponse;
    }

    const { id } = await params;
    const success = await deleteArticle(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Artikkelen ble ikke funnet' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { success: false, error: 'Kunne ikke slette artikkelen' },
      { status: 500 }
    );
  }
}
