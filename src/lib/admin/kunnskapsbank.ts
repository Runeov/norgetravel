import { promises as fs } from 'fs';
import path from 'path';
import {
  KUNNSKAPSBANK_SECTION_ORDER,
  KunnskapsbankSectionSchema,
  type KunnskapsbankSection,
  type KunnskapsbankSectionId,
} from '@/lib/schemas/kunnskapsbank.schema';
import { withFileLock } from '@/lib/storage/file-lock';

const DATA_FILE = path.join(process.cwd(), 'src/data/kunnskapsbank.json');

export type KunnskapsbankSectionsData = Record<KunnskapsbankSectionId, KunnskapsbankSection>;

function createDefaultSections(now = new Date().toISOString()): KunnskapsbankSectionsData {
  return {
    sametinget: {
      id: 'sametinget',
      title: 'Sametinget & Duodji',
      path: '/kunnskapsbank/sametinget',
      isPublished: true,
      publishedAt: now,
      updatedAt: now,
    },
    bedrifter: {
      id: 'bedrifter',
      title: 'Bedrift & Handel',
      path: '/kunnskapsbank/bedrifter',
      isPublished: true,
      publishedAt: now,
      updatedAt: now,
    },
    organisasjoner: {
      id: 'organisasjoner',
      title: 'Lag & Forening',
      path: '/kunnskapsbank/organisasjoner',
      isPublished: true,
      publishedAt: now,
      updatedAt: now,
    },
  };
}

/**
 * Read all kunnskapsbank section publish states from JSON.
 * Falls back to defaults if file is missing or invalid.
 */
export async function getKunnskapsbankSections(): Promise<KunnskapsbankSectionsData> {
  const defaults = createDefaultSections();

  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const normalized: KunnskapsbankSectionsData = { ...defaults };

    for (const id of KUNNSKAPSBANK_SECTION_ORDER) {
      const value = parsed[id];
      if (!value) {
        continue;
      }

      try {
        const validated = KunnskapsbankSectionSchema.parse(value);
        normalized[id] = { ...validated, id };
      } catch (error) {
        console.warn(`Validation warning for kunnskapsbank section ${id}:`, error);
      }
    }

    return normalized;
  } catch (error) {
    console.error('Error reading kunnskapsbank sections:', error);
    return defaults;
  }
}

/**
 * Get all sections in a fixed display order.
 */
export async function getAllKunnskapsbankSectionsSorted(): Promise<KunnskapsbankSection[]> {
  const sections = await getKunnskapsbankSections();
  return KUNNSKAPSBANK_SECTION_ORDER.map((id) => sections[id]);
}

/**
 * Get one section by ID.
 */
export async function getKunnskapsbankSection(
  id: KunnskapsbankSectionId
): Promise<KunnskapsbankSection | null> {
  const sections = await getKunnskapsbankSections();
  return sections[id] || null;
}

/**
 * Check whether a section is currently published.
 */
export async function isKunnskapsbankSectionPublished(
  id: KunnskapsbankSectionId
): Promise<boolean> {
  const section = await getKunnskapsbankSection(id);
  return Boolean(section?.isPublished);
}

/**
 * Update publish status for one section.
 */
export async function updateKunnskapsbankSectionPublishStatus(
  id: KunnskapsbankSectionId,
  isPublished: boolean
): Promise<KunnskapsbankSection | null> {
  return withFileLock('kunnskapsbank', async () => {
    const sections = await getKunnskapsbankSections();
    const existing = sections[id];

    if (!existing) {
      return null;
    }

    const now = new Date().toISOString();
    const updated: KunnskapsbankSection = KunnskapsbankSectionSchema.parse({
      ...existing,
      id,
      isPublished,
      publishedAt: isPublished ? existing.publishedAt || now : null,
      updatedAt: now,
    });

    sections[id] = updated;
    await fs.writeFile(DATA_FILE, JSON.stringify(sections, null, 2), 'utf-8');

    return updated;
  });
}

/**
 * Toggle publish status for one section.
 */
export async function toggleKunnskapsbankSectionPublishStatus(
  id: KunnskapsbankSectionId
): Promise<KunnskapsbankSection | null> {
  const section = await getKunnskapsbankSection(id);

  if (!section) {
    return null;
  }

  return updateKunnskapsbankSectionPublishStatus(id, !section.isPublished);
}
