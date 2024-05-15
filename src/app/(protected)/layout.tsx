import React, { ReactNode } from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth.options';


export default async function ProtectedLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const session: any = await getServerSession(authOptions);
  if (!session) {
    return redirect('/login');
  }
  return (
    <>
      {children}
    </>
  );
}
