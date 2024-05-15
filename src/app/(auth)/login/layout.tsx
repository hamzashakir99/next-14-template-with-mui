'use client';

import React, { ReactNode } from 'react';
import { Container } from '@mui/material';



export default function AdminLayout({
  children // will be a page or nested layout
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Container maxWidth='sm'>
      {children}
    </Container>
  );
}
