import { notFound } from 'next/navigation';
import { isKunnskapsbankSectionPublished } from '@/lib/admin/kunnskapsbank';

export const dynamic = 'force-static';

export default async function SametingetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isPublished = await isKunnskapsbankSectionPublished('sametinget');

  if (!isPublished) {
    notFound();
  }

  return <>{children}</>;
}
