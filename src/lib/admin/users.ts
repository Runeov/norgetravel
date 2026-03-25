import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import { UserSchema, UserCreateSchema, type User, type UserCreate, type UserUpdate, type SafeUser } from '@/lib/schemas/user.schema';
import { withFileLock } from '@/lib/storage/file-lock';

const DATA_FILE = path.join(process.cwd(), 'src/data/users.json');
const SALT_ROUNDS = 10;

export interface UsersData {
  [key: string]: User;
}

/**
 * Read all users from the JSON file
 */
export async function getUsers(): Promise<UsersData> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(data);

    const validated: UsersData = {};
    for (const [key, value] of Object.entries(parsed)) {
      try {
        validated[key] = UserSchema.parse(value);
      } catch (error) {
        console.warn(`Validation warning for user ${key}:`, error);
        validated[key] = value as User;
      }
    }

    // Override initial-admin password hash from environment variable if set
    const envHash = process.env.ADMIN_PASSWORD_HASH;
    if (envHash && validated['initial-admin']) {
      validated['initial-admin'] = { ...validated['initial-admin'], passwordHash: envHash };
    }

    return validated;
  } catch (error) {
    console.error('Error reading users:', error);
    return {};
  }
}

/**
 * Get a single user by ID
 */
export async function getUser(id: string): Promise<User | null> {
  const users = await getUsers();
  return users[id] || null;
}

/**
 * Get a user by email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await getUsers();
  return Object.values(users).find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

/**
 * Get all users as safe user objects (without password hash)
 */
export async function getAllUsersSafe(): Promise<SafeUser[]> {
  const users = await getUsers();
  return Object.values(users).map(({ passwordHash, ...user }) => user);
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
 * Hash a password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Create a new user (with validation and locking)
 */
export async function createUser(userData: UserCreate): Promise<SafeUser> {
  // Validate input
  const validated = UserCreateSchema.parse(userData);

  return withFileLock('users', async () => {
    const users = await getUsers();

    // Check if email already exists
    const existingUser = Object.values(users).find(
      u => u.email.toLowerCase() === validated.email.toLowerCase()
    );
    if (existingUser) {
      throw new Error('En bruker med denne e-postadressen finnes allerede');
    }

    // Generate ID from name
    const baseId = generateId(validated.name);

    // Ensure unique ID
    let uniqueId = baseId;
    let counter = 1;
    while (users[uniqueId]) {
      uniqueId = `${baseId}-${counter}`;
      counter++;
    }

    // Hash password
    const passwordHash = await hashPassword(validated.password);

    const now = new Date().toISOString();
    const newUser: User = {
      id: uniqueId,
      email: validated.email,
      name: validated.name,
      passwordHash,
      role: validated.role,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };

    // Validate complete user
    const finalUser = UserSchema.parse(newUser);

    users[uniqueId] = finalUser;
    await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), 'utf-8');

    // Return safe user without password hash
    const { passwordHash: _, ...safeUser } = finalUser;
    return safeUser;
  });
}

/**
 * Update an existing user (with validation and locking)
 */
export async function updateUser(id: string, updates: UserUpdate): Promise<SafeUser | null> {
  return withFileLock('users', async () => {
    const users = await getUsers();

    if (!users[id]) {
      return null;
    }

    // If email is being changed, check for duplicates
    if (updates.email) {
      const existingUser = Object.values(users).find(
        u => u.email.toLowerCase() === updates.email!.toLowerCase() && u.id !== id
      );
      if (existingUser) {
        throw new Error('En bruker med denne e-postadressen finnes allerede');
      }
    }

    // If password is being changed, hash it
    let passwordHash = users[id].passwordHash;
    if (updates.password) {
      passwordHash = await hashPassword(updates.password);
    }

    const updatedUser: User = {
      ...users[id],
      ...updates,
      id, // Ensure ID doesn't change
      passwordHash,
      updatedAt: new Date().toISOString(),
    };

    // Remove password field if it was in updates (we use passwordHash)
    delete (updatedUser as User & { password?: string }).password;

    // Validate the updated user
    const validated = UserSchema.parse(updatedUser);

    users[id] = validated;
    await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), 'utf-8');

    // Return safe user without password hash
    const { passwordHash: _, ...safeUser } = validated;
    return safeUser;
  });
}

/**
 * Delete a user (with locking)
 */
export async function deleteUser(id: string): Promise<boolean> {
  return withFileLock('users', async () => {
    const users = await getUsers();

    if (!users[id]) {
      return false;
    }

    // Don't allow deleting the last admin
    const admins = Object.values(users).filter(u => u.role === 'admin' && u.isActive);
    if (admins.length === 1 && users[id].role === 'admin') {
      throw new Error('Kan ikke slette den siste administratoren');
    }

    delete users[id];
    await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), 'utf-8');

    return true;
  });
}

/**
 * Verify user credentials and return the user if valid
 */
export async function verifyCredentials(email: string, password: string): Promise<User | null> {
  const user = await getUserByEmail(email);

  if (!user || !user.isActive) {
    return null;
  }

  const isValid = await verifyPassword(password, user.passwordHash);

  if (!isValid) {
    return null;
  }

  return user;
}

// Re-export types for convenience
export type { User, UserCreate, UserUpdate, SafeUser };
