import { notFound } from 'next/navigation';
import { isKunnskapsbankSectionPublished } from '@/lib/admin/kunnskapsbank';

export const dynamic = 'force-dynamic';

export default async function OrganisasjonerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isPublished = await isKunnskapsbankSectionPublished('organisasjoner');

  if (!isPublished) {
    notFound();
  }

  return <>{children}</>;
}
