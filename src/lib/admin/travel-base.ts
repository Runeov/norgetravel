import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';
import { withFileLock } from '@/lib/storage/file-lock';
import type { TravelItemBase, Destination } from '@/lib/schemas/travel.shared';

// ─── Generic data map type ───
export interface TravelDataMap<T extends TravelItemBase> {
  [key: string]: T;
}

// ─── Return type for the factory ───
export interface TravelStore<T extends TravelItemBase> {
  getAll: () => Promise<TravelDataMap<T>>;
  getAllSorted: () => Promise<T[]>;
  getById: (id: string) => Promise<T | null>;
  getPublished: () => Promise<T[]>;
  getFeatured: () => Promise<T[]>;
  filterByDestination: (destination: Destination) => Promise<T[]>;
  create: (data: Omit<T, 'id' | 'sortOrder' | 'createdAt' | 'updatedAt'>) => Promise<T>;
  update: (id: string, updates: Partial<T>) => Promise<T | null>;
  remove: (id: string) => Promise<boolean>;
  togglePublish: (id: string) => Promise<T | null>;
}

/**
 * Generate a URL-safe slug from a name string
 */
function generateSlug(name: string): string {
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
 * Factory function that creates CRUD operations for any travel category.
 *
 * @param dataFileName - Filename inside src/data/ (e.g. "travel-transport.json")
 * @param schema       - Zod schema for the full item type (extends TravelItemBase)
 */
export function createTravelStore<T extends TravelItemBase>(
  dataFileName: string,
  schema: z.ZodSchema<T>
): TravelStore<T> {
  const DATA_FILE = path.join(process.cwd(), 'src/data', dataFileName);
  const lockResource = dataFileName.replace('.json', '');

  // ─── Read all items from JSON file ───
  async function readFile(): Promise<TravelDataMap<T>> {
    try {
      const data = await fs.readFile(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(data);

      const validated: TravelDataMap<T> = {};
      for (const [key, value] of Object.entries(parsed)) {
        try {
          validated[key] = schema.parse(value);
        } catch (error) {
          console.warn(`Validation warning for ${lockResource}/${key}:`, error);
          validated[key] = value as T;
        }
      }

      return validated;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return {};
      }
      console.error(`Error reading ${dataFileName}:`, error);
      return {};
    }
  }

  // ─── Write all items to JSON file ───
  async function writeFile(data: TravelDataMap<T>): Promise<void> {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  }

  // ─── Public API ───

  async function getAll(): Promise<TravelDataMap<T>> {
    return readFile();
  }

  async function getAllSorted(): Promise<T[]> {
    const items = await readFile();
    return Object.values(items).sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();
      return dateB - dateA;
    });
  }

  async function getById(id: string): Promise<T | null> {
    const items = await readFile();
    return items[id] || null;
  }

  async function getPublished(): Promise<T[]> {
    const items = await readFile();
    return Object.values(items)
      .filter((item) => item.status === 'published')
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  async function getFeatured(): Promise<T[]> {
    const items = await readFile();
    return Object.values(items)
      .filter((item) => item.status === 'published' && item.isFeatured)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  async function filterByDestination(destination: Destination): Promise<T[]> {
    const items = await readFile();
    return Object.values(items)
      .filter((item) => item.status === 'published' && (item.destination === destination || item.destination === 'all'))
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  async function create(
    data: Omit<T, 'id' | 'sortOrder' | 'createdAt' | 'updatedAt'>
  ): Promise<T> {
    return withFileLock(lockResource, async () => {
      const items = await readFile();

      // Generate ID from name
      const baseId = generateSlug((data as unknown as TravelItemBase).name);
      let uniqueId = baseId;
      let counter = 1;
      while (items[uniqueId]) {
        uniqueId = `${baseId}-${counter}`;
        counter++;
      }

      // Calculate sort order
      const maxSortOrder = Math.max(0, ...Object.values(items).map((i) => i.sortOrder || 0));

      const now = new Date().toISOString();
      const newItem = {
        ...data,
        id: uniqueId,
        sortOrder: maxSortOrder + 1,
        createdAt: now,
        updatedAt: now,
      } as unknown as T;

      // Validate complete item
      const validated = schema.parse(newItem);
      items[uniqueId] = validated;
      await writeFile(items);

      return validated;
    });
  }

  async function update(id: string, updates: Partial<T>): Promise<T | null> {
    return withFileLock(lockResource, async () => {
      const items = await readFile();

      if (!items[id]) {
        return null;
      }

      const now = new Date().toISOString();
      const updatedItem = {
        ...items[id],
        ...updates,
        id, // Ensure ID doesn't change
        updatedAt: now,
      } as unknown as T;

      const validated = schema.parse(updatedItem);
      items[id] = validated;
      await writeFile(items);

      return validated;
    });
  }

  async function remove(id: string): Promise<boolean> {
    return withFileLock(lockResource, async () => {
      const items = await readFile();

      if (!items[id]) {
        return false;
      }

      delete items[id];
      await writeFile(items);

      return true;
    });
  }

  async function togglePublish(id: string): Promise<T | null> {
    const items = await readFile();

    if (!items[id]) {
      return null;
    }

    const item = items[id];
    const newStatus = item.status === 'published' ? 'draft' : 'published';

    return update(id, { status: newStatus } as unknown as Partial<T>);
  }

  return {
    getAll,
    getAllSorted,
    getById,
    getPublished,
    getFeatured,
    filterByDestination,
    create,
    update,
    remove,
    togglePublish,
  };
}
