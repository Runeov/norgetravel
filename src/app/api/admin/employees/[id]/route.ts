import { NextRequest, NextResponse } from 'next/server';
import { getEmployee, updateEmployee, deleteEmployee } from '@/lib/admin/employees';
import { getAdminReadOnlyResponse } from '@/lib/admin/write-access';

export function generateStaticParams() { return []; }

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/admin/employees/[id] - Get a single employee
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const employee = await getEmployee(id);
    
    if (!employee) {
      return NextResponse.json(
        { success: false, error: 'Ansatt ikke funnet' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: employee });
  } catch (error) {
    console.error('Error fetching employee:', error);
    return NextResponse.json(
      { success: false, error: 'Kunne ikke hente ansatt' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/employees/[id] - Update an employee
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
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
        { success: false, error: 'Ansatt ikke funnet' },
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

/**
 * DELETE /api/admin/employees/[id] - Delete an employee
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const readOnlyResponse = getAdminReadOnlyResponse();
    if (readOnlyResponse) {
      return readOnlyResponse;
    }

    const { id } = await params;
    const success = await deleteEmployee(id);
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Ansatt ikke funnet' },
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
