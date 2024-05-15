'use client';

import React from 'react';
import { Container, Box, Typography, Grid, TextField } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { LoginFormik } from '@/lib/index';

export function AdminLoginForm() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: LoginFormik?.initialValues,
    validationSchema: LoginFormik.validationSchema,
    onSubmit: async values => {
      try {
        const res = await signIn('admin-login', {
          redirect: false,
          email: values?.email,
          password: values?.password,
          domain: 'admin.com'
        });
        if (!res?.error) {
          router.push('/dashboard');
        } else {
          console.log('Incorrect phone number or password. Please check and try again.');
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '70dvh'
      }}
    >
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <Typography variant='h1' align='center' color='primary'>
            Welcome Back
          </Typography>
          <Typography variant='body1' align='center'>
            Please login to your account
          </Typography>
          <Box component='form' onSubmit={formik.handleSubmit}>
            <TextField
              label='Email'
              fullWidth={true}
              type='email'
              margin='normal'
              required
              value={formik?.values?.email}
              onChange={formik.handleChange}
              name='email'
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              label='Password'
              type='password'
              fullWidth={true}
              margin='normal'
              required
              value={formik?.values?.password}
              onChange={formik.handleChange}
              name='password'
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <LoadingButton
              loading={false}
              loadingPosition='end'
              endIcon={<ChevronRightIcon />}
              variant='contained'
              fullWidth={true}
              type='submit'
              disabled={formik.isSubmitting || !formik.isValid}
            >
              Next
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
