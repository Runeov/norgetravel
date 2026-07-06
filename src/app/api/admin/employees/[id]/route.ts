import { NextRequest, NextResponse } from 'next/server';
import { updateEmployee, deleteEmployee } from '@/lib/admin/employees';
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

    const employee = await updateEmployee(id, body);

    if (!employee) {
      return NextResponse.json(
        { success: false, error: 'Ansatt ble ikke funnet' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: employee });
  } catch (error) {
    console.error('Error updating employee:', error);
    return NextResponse.json(
      { success: false, error: 'Kunne ikke oppdatere ansatt' },
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
    const success = await deleteEmployee(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Ansatt ble ikke funnet' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting employee:', error);
    return NextResponse.json(
      { success: false, error: 'Kunne ikke slette ansatt' },
      { status: 500 }
    );
  }
}
