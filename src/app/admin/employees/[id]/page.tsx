import { notFound } from 'next/navigation';
import { getEmployee } from '@/lib/admin/employees';
import EmployeeForm from '@/components/admin/employee/EmployeeForm';

export function generateStaticParams() { return []; }

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEmployeePage({ params }: PageProps) {
  const { id } = await params;
  const employee = await getEmployee(id);
  
  if (!employee) {
    notFound();
  }
  
  return <EmployeeForm employee={employee} />;
}
