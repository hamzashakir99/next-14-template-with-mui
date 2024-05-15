import { PaletteMode, ThemeOptions } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: '#1B9BD7',
            light: '#48afdf',
            dark: '#126c96'
          },
          error: {
            main: '#d32f2f',
            light: '#ef5350',
            dark: '#c62828'
          },
          success: {
            main: '#2e7d32',
            light: '#4caf50',
            dark: '#1b5e20'
          },
          warning: {
            main: '#ed6c02',
            light: '#ff9800',
            dark: '#e65100'
          },
          background: {
            default: '#f5f5f5'
          },
          purple: {
            main: '#A562E2'
          }
        }
      : {
          // palette values for dark mode
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            default: deepOrange[900],
            paper: deepOrange[900]
          }
        })
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // borderRadius: '100px',
          padding: '9px 36px',
          fontSize: '16px',
          fontWeight: 400,
          textTransform: 'capitalize'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff'
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            WebkitBackgroundClip: 'text'
          }
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#f5f5f5'
        }
      }
    },

    MuiGrid: {
      styleOverrides: {
        root: {
          marginBottom: 15
        }
      }
    }
  },
  typography: {
    h1: {
      fontSize: '28px',
      fontWeight: 500,
      color: '#1B9BD7',
      marginBottom: '5px'
    },
    h2: {
      fontSize: '24px',
      fontWeight: 'bold'
    },
    h3: {
      fontSize: '18px',
      fontWeight: 'bold'
    },
    h4: {
      fontSize: '16px',
      fontWeight: 'bold'
    },
    h5: {
      fontSize: '14px',
      fontWeight: 500 // Medium
    },
    h6: {
      fontSize: '12px',
      fontWeight: 500 // Medium
    },
    subtitle1: {
      fontSize: '14px',
      fontWeight: 'normal' // Regular
    },
    subtitle2: {
      fontSize: '12px',
      fontWeight: 'normal' // Regular
    },
    body1: {
      fontSize: '16px',
      fontWeight: 'normal' // Regular
    },
    body2: {
      fontSize: '14px',
      fontWeight: 'normal' // Regular
    }
  }
});
