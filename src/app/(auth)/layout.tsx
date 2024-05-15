import React, { ReactNode } from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth.options';

interface IProps {
  children: ReactNode;
  params: {
    token: string | null;
  };
}

export default async function AdminAuthLayout({ children, params }: Readonly<IProps>) {
  if (params?.token) {
    return <>{children}</>;
  }
  const session: any = await getServerSession(authOptions);
  if (session) {
      return redirect('/dashboard');
  }
  return <>{children}</>;
}
