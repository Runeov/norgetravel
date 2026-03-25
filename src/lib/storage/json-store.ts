import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';
import { withFileLock } from './file-lock';

export interface JsonStoreOptions<T> {
  filePath: string;
  schema: z.ZodSchema<T>;
}

export class JsonStore<T extends { id: string }> {
  private filePath: string;
  private schema: z.ZodSchema<T>;
  private resourceName: string;

  constructor(options: JsonStoreOptions<T>) {
    this.filePath = path.join(process.cwd(), options.filePath);
    this.schema = options.schema;
    this.resourceName = path.basename(options.filePath, '.json');
  }

  private async readFile(): Promise<Record<string, T>> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const parsed = JSON.parse(data);

      // Validate each item
      const validated: Record<string, T> = {};
      for (const [key, value] of Object.entries(parsed)) {
        try {
          validated[key] = this.schema.parse(value);
        } catch (error) {
          console.warn(`Validation warning for ${key}:`, error);
          // Still include the item but mark validation issue
          validated[key] = value as T;
        }
      }

      return validated;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return {};
      }
      throw error;
    }
  }

  private async writeFile(data: Record<string, T>): Promise<void> {
    const dir = path.dirname(this.filePath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async getAll(): Promise<Record<string, T>> {
    return this.readFile();
  }

  async getAllAsArray(): Promise<T[]> {
    const data = await this.readFile();
    return Object.values(data);
  }

  async get(id: string): Promise<T | null> {
    const data = await this.readFile();
    return data[id] || null;
  }

  async save(id: string, item: T): Promise<T> {
    return withFileLock(this.resourceName, async () => {
      const data = await this.readFile();

      // Validate the item before saving
      const validated = this.schema.parse(item);
      data[id] = validated;

      await this.writeFile(data);
      return validated;
    });
  }

  async create(item: Omit<T, 'id'> & { id: string }): Promise<T> {
    return withFileLock(this.resourceName, async () => {
      const data = await this.readFile();

      if (data[item.id]) {
        throw new Error(`Item with id ${item.id} already exists`);
      }

      const validated = this.schema.parse(item);
      data[item.id] = validated;

      await this.writeFile(data);
      return validated;
    });
  }

  async update(id: string, updates: Partial<T>): Promise<T | null> {
    return withFileLock(this.resourceName, async () => {
      const data = await this.readFile();

      if (!data[id]) {
        return null;
      }

      const updated = { ...data[id], ...updates, id };
      const validated = this.schema.parse(updated);
      data[id] = validated;

      await this.writeFile(data);
      return validated;
    });
  }

  async delete(id: string): Promise<boolean> {
    return withFileLock(this.resourceName, async () => {
      const data = await this.readFile();

      if (!data[id]) {
        return false;
      }

      delete data[id];
      await this.writeFile(data);
      return true;
    });
  }

  async getNextSortOrder(): Promise<number> {
    const data = await this.readFile();
    const items = Object.values(data);

    if (items.length === 0) {
      return 1;
    }

    const maxOrder = Math.max(
      ...items.map((item) => (item as T & { sortOrder?: number }).sortOrder || 0)
    );

    return maxOrder + 1;
  }
}
