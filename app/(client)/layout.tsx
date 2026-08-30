import type { ReactNode } from 'react';
import { Navbar } from '@/components/navigation/navbar';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
