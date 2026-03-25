import { NextResponse } from 'next/server';

function isTrue(value: string | undefined): boolean {
  if (!value) return false;
  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
}

/**
 * In production, writes are disabled unless explicitly enabled.
 * Set ADMIN_WRITE_ENABLED=true to allow write operations.
 */
export function isAdminWriteEnabled(): boolean {
  if (process.env.NODE_ENV !== 'production') {
    return true;
  }

  const configured = process.env.ADMIN_WRITE_ENABLED;

  // Default to read-only in production when not configured
  if (!configured || configured.trim() === '') {
    return false;
  }

  return isTrue(configured);
}

export function getAdminReadOnlyResponse(): NextResponse | null {
  if (isAdminWriteEnabled()) {
    return null;
  }

  return NextResponse.json(
    {
      success: false,
      error:
        'Admin skriveoperasjoner er deaktivert i produksjon (sett ADMIN_WRITE_ENABLED=true for å aktivere).',
    },
    { status: 403 }
  );
}
