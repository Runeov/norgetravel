import EmployeeForm from '@/components/admin/employee/EmployeeForm';
import { getEmployee } from '@/lib/admin/employees';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditEmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const employee = await getEmployee(id);

  if (!employee) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <EmployeeForm employee={employee} />
    </div>
  );
}
