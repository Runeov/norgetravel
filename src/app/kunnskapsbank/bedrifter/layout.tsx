import { notFound } from 'next/navigation';
import { isKunnskapsbankSectionPublished } from '@/lib/admin/kunnskapsbank';

export const dynamic = 'force-dynamic';

export default async function BedrifterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isPublished = await isKunnskapsbankSectionPublished('bedrifter');

  if (!isPublished) {
    notFound();
  }

  return <>{children}</>;
}
