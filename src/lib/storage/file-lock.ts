import { promises as fs } from 'fs';
import path from 'path';

const LOCK_TIMEOUT = 5000; // 5 seconds
const RETRY_INTERVAL = 50; // 50ms between retries

interface LockInfo {
  pid: number;
  timestamp: number;
}

function getLockPath(resource: string): string {
  const lockDir = path.join(process.cwd(), '.locks');
  const safeName = resource.replace(/[^a-z0-9]/gi, '_');
  return path.join(lockDir, `${safeName}.lock`);
}

async function ensureLockDir(): Promise<void> {
  const lockDir = path.join(process.cwd(), '.locks');
  try {
    await fs.mkdir(lockDir, { recursive: true });
  } catch {
    // Directory may already exist
  }
}

async function acquireLock(resource: string): Promise<boolean> {
  const lockPath = getLockPath(resource);
  await ensureLockDir();

  const lockInfo: LockInfo = {
    pid: process.pid,
    timestamp: Date.now(),
  };

  try {
    // Try to check if lock exists and is stale
    try {
      const existingLock = await fs.readFile(lockPath, 'utf-8');
      const existing: LockInfo = JSON.parse(existingLock);

      // If lock is older than timeout, it's stale - remove it
      if (Date.now() - existing.timestamp > LOCK_TIMEOUT) {
        await fs.unlink(lockPath);
      } else {
        return false; // Lock is held by another process
      }
    } catch {
      // Lock doesn't exist or can't be read - proceed with creation
    }

    // Try to create lock file exclusively
    await fs.writeFile(lockPath, JSON.stringify(lockInfo), { flag: 'wx' });
    return true;
  } catch {
    return false;
  }
}

async function releaseLock(resource: string): Promise<void> {
  const lockPath = getLockPath(resource);
  try {
    await fs.unlink(lockPath);
  } catch {
    // Lock may already be released
  }
}

export async function withFileLock<T>(
  resource: string,
  operation: () => Promise<T>
): Promise<T> {
  const startTime = Date.now();

  // Try to acquire lock with retries
  while (Date.now() - startTime < LOCK_TIMEOUT) {
    if (await acquireLock(resource)) {
      try {
        return await operation();
      } finally {
        await releaseLock(resource);
      }
    }

    // Wait before retrying
    await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
  }

  throw new Error(`Could not acquire lock for ${resource} within ${LOCK_TIMEOUT}ms`);
}
