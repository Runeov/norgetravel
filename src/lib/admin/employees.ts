import { promises as fs } from 'fs';
import path from 'path';
import { EmployeeSchema, EmployeeCreateSchema, type Employee, type EmployeeCreate } from '@/lib/schemas/employee.schema';
import { withFileLock } from '@/lib/storage/file-lock';

const DATA_FILE = path.join(process.cwd(), 'src/data/employees.json');

export interface EmployeesData {
  [key: string]: Employee;
}

/**
 * Read all employees from the JSON file
 */
export async function getEmployees(): Promise<EmployeesData> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(data);

    // Validate each employee
    const validated: EmployeesData = {};
    for (const [key, value] of Object.entries(parsed)) {
      try {
        validated[key] = EmployeeSchema.parse(value);
      } catch (error) {
        console.warn(`Validation warning for employee ${key}:`, error);
        validated[key] = value as Employee;
      }
    }

    return validated;
  } catch (error) {
    console.error('Error reading employees:', error);
    return {};
  }
}

/**
 * Get a single employee by ID
 */
export async function getEmployee(id: string): Promise<Employee | null> {
  const employees = await getEmployees();
  return employees[id] || null;
}

/**
 * Save all employees to the JSON file (with file locking)
 */
export async function saveEmployees(employees: EmployeesData): Promise<void> {
  await withFileLock('employees', async () => {
    await fs.writeFile(DATA_FILE, JSON.stringify(employees, null, 2), 'utf-8');
  });
}

/**
 * Generate a URL-safe ID from a name
 */
function generateId(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Create a new employee (with validation and locking)
 */
export async function createEmployee(employeeData: EmployeeCreate): Promise<Employee> {
  // Validate input
  const validated = EmployeeCreateSchema.parse(employeeData);

  return withFileLock('employees', async () => {
    const employees = await getEmployees();

    // Generate ID from name
    const baseId = generateId(validated.name);

    // Ensure unique ID
    let uniqueId = baseId;
    let counter = 1;
    while (employees[uniqueId]) {
      uniqueId = `${baseId}-${counter}`;
      counter++;
    }

    // Calculate sort order (add to end)
    const maxSortOrder = Math.max(0, ...Object.values(employees).map(e => e.sortOrder || 0));

    const now = new Date().toISOString();
    const newEmployee: Employee = {
      ...validated,
      id: uniqueId,
      sortOrder: maxSortOrder + 1,
      createdAt: now,
      updatedAt: now,
    };

    // Validate complete employee
    const finalEmployee = EmployeeSchema.parse(newEmployee);

    employees[uniqueId] = finalEmployee;
    await fs.writeFile(DATA_FILE, JSON.stringify(employees, null, 2), 'utf-8');

    return finalEmployee;
  });
}

/**
 * Update an existing employee (with validation and locking)
 */
export async function updateEmployee(id: string, updates: Partial<Employee>): Promise<Employee | null> {
  return withFileLock('employees', async () => {
    const employees = await getEmployees();

    if (!employees[id]) {
      return null;
    }

    const updatedEmployee: Employee = {
      ...employees[id],
      ...updates,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };

    // Validate the updated employee
    const validated = EmployeeSchema.parse(updatedEmployee);

    employees[id] = validated;
    await fs.writeFile(DATA_FILE, JSON.stringify(employees, null, 2), 'utf-8');

    return validated;
  });
}

/**
 * Delete an employee (with locking)
 */
export async function deleteEmployee(id: string): Promise<boolean> {
  return withFileLock('employees', async () => {
    const employees = await getEmployees();

    if (!employees[id]) {
      return false;
    }

    delete employees[id];
    await fs.writeFile(DATA_FILE, JSON.stringify(employees, null, 2), 'utf-8');

    return true;
  });
}

/**
 * Reorder employees (with locking)
 */
export async function reorderEmployees(orderedIds: string[]): Promise<void> {
  return withFileLock('employees', async () => {
    const employees = await getEmployees();

    orderedIds.forEach((id, index) => {
      if (employees[id]) {
        employees[id].sortOrder = index + 1;
        employees[id].updatedAt = new Date().toISOString();
      }
    });

    await fs.writeFile(DATA_FILE, JSON.stringify(employees, null, 2), 'utf-8');
  });
}

/**
 * Get employees sorted by sortOrder
 */
export async function getSortedEmployees(): Promise<Employee[]> {
  const employees = await getEmployees();
  return Object.values(employees)
    .filter(e => e.isActive)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

/**
 * Get all employees (including inactive) sorted by sortOrder
 */
export async function getAllEmployeesSorted(): Promise<Employee[]> {
  const employees = await getEmployees();
  return Object.values(employees)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

// Re-export types for convenience
export type { Employee, EmployeeCreate };
