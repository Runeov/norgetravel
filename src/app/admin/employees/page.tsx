import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { getAllEmployeesSorted } from '@/lib/admin/employees';
import DeleteEmployeeButton from '@/components/admin/DeleteEmployeeButton';

export default async function EmployeesListPage() {
  const employees = await getAllEmployeesSorted();
  
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Ansatte</h1>
          <p className="text-slate-500 mt-1">Administrer ansatte som vises på nettsiden</p>
        </div>
        <Link
          href="/admin/employees/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#E86C1F] to-[#F4B223] rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#E86C1F]/30 hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          Ny ansatt
        </Link>
      </div>
      
      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Ansatt</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Rolle</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Kontor</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">Handlinger</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {employee.image ? (
                      <Image
                        src={employee.image}
                        alt={employee.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E86C1F] to-[#F4B223] flex items-center justify-center text-white font-bold text-sm">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-slate-900">{employee.name}</p>
                      <p className="text-sm text-slate-500">{employee.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-700">{employee.role}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-700 capitalize">{employee.office}</p>
                </td>
                <td className="px-6 py-4">
                  {employee.isActive ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                      <Eye className="w-3 h-3" />
                      Aktiv
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
                      <EyeOff className="w-3 h-3" />
                      Skjult
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/employees/${employee.id}`}
                      className="p-2 text-slate-400 hover:text-[#E86C1F] hover:bg-[#E86C1F]/10 rounded-lg transition-colors"
                      title="Rediger"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <DeleteEmployeeButton id={employee.id} name={employee.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {employees.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-slate-500 mb-4">Ingen ansatte ennå</p>
            <Link
              href="/admin/employees/new"
              className="text-[#E86C1F] hover:underline"
            >
              Legg til din første ansatt
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
