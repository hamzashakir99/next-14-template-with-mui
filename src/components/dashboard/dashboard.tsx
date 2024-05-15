'use client';
import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import { signOut } from 'next-auth/react';

export const Dashboard = () => {
  return (
    <Grid flexDirection={'column'} alignItems={'center'} container spacing={2} justifyContent={'center'} marginTop={12}>
      <Box>Dashboard</Box>
      <Button variant='contained' color='primary' onClick={()=>signOut({ callbackUrl: '/dashboard' })}>
        Logout
      </Button>
    </Grid>
  );
};
