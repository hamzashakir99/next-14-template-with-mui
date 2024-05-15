'use client';

/* Core */
import { PropsWithChildren, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
/* Instruments */
import { getDesignTokens } from '@/theme/themes';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { RootState } from '@/redux/store';

const Providers = (props: PropsWithChildren) => {
  const themeSlice = useSelector((state: RootState) => state.themeSlice);
  const theme = useMemo(
    () => createTheme(getDesignTokens(themeSlice.mode as 'light' | 'dark')),
    [themeSlice.mode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterMoment}>
        {props.children}
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default Providers;
