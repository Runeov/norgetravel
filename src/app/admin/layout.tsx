import { Metadata } from 'next';
import AdminLayoutWrapper from '@/components/admin/AdminLayoutWrapper';

export const metadata: Metadata = {
  title: 'Admin | NorgeTravel',
  description: 'NorgeTravel administrasjonspanel',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
