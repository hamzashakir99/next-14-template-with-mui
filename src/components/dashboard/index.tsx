'use client';
import React from 'react';
import { Container } from '@mui/material';

import { Dashboard } from './dashboard';

export const AdminDashboardIndex = () => {
  return (
    <Container maxWidth='xl'>
      <Dashboard />
    </Container>
  );
};
