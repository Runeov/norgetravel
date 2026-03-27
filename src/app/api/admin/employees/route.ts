import { NextRequest, NextResponse } from 'next/server';
import { getAllEmployeesSorted, createEmployee } from '@/lib/admin/employees';
import { getAdminReadOnlyResponse } from '@/lib/admin/write-access';

export const dynamic = 'force-static';

/**
 * GET /api/admin/employees - List all employees
 */
export async function GET() {
  try {
    const employees = await getAllEmployeesSorted();
    return NextResponse.json({ success: true, data: employees });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json(
      { success: false, error: 'Kunne ikke hente ansatte' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/employees - Create a new employee
 */
export async function POST(request: NextRequest) {
  try {
    const readOnlyResponse = getAdminReadOnlyResponse();
    if (readOnlyResponse) {
      return readOnlyResponse;
    }

    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'role', 'email', 'phone', 'office', 'description'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Feltet '${field}' er påkrevd` },
          { status: 400 }
        );
      }
    }
    
    // Create employee with defaults
    const employeeData = {
      name: body.name,
      role: body.role,
      email: body.email,
      phone: body.phone,
      office: body.office,
      description: body.description,
      longDescription: body.longDescription || '',
      experience: body.experience || '',
      specialties: body.specialties || [],
      education: body.education || [],
      languages: body.languages || [],
      workingHours: body.workingHours || 'Man-Fre: 08:00-16:00',
      achievements: body.achievements || [],
      clientTypes: body.clientTypes || [],
      image: body.image,
      relatedHubs: body.relatedHubs || [],
      timeline: body.timeline || [],
      isActive: body.isActive !== false,
    };
    
    const employee = await createEmployee(employeeData);
    
    return NextResponse.json({ success: true, data: employee }, { status: 201 });
  } catch (error) {
    console.error('Error creating employee:', error);
    return NextResponse.json(
      { success: false, error: 'Kunne ikke opprette ansatt' },
      { status: 500 }
    );
  }
}
