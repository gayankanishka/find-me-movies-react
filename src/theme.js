import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#09090b',
      paper: '#0f0f13'
    },
    primary: {
      main: '#818cf8',
      light: '#a5b4fc',
      dark: '#6366f1',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#09090b'
    },
    error: {
      main: '#ef4444'
    },
    text: {
      primary: '#fafafa',
      secondary: '#a1a1aa',
      disabled: '#52525b'
    },
    divider: 'rgba(255,255,255,0.08)'
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700, letterSpacing: '-0.01em' },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 500 },
    body1: { fontWeight: 400 },
    body2: { fontWeight: 400 },
    button: { fontWeight: 600, textTransform: 'none', letterSpacing: '0.01em' },
    caption: { fontWeight: 400, color: '#a1a1aa' },
    overline: { fontWeight: 600, letterSpacing: '0.1em' }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box'
        },
        html: {
          scrollBehavior: 'smooth'
        },
        body: {
          backgroundColor: '#09090b',
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(129,140,248,0.08), transparent)'
        },
        '::-webkit-scrollbar': {
          width: '6px',
          height: '6px'
        },
        '::-webkit-scrollbar-track': {
          background: '#09090b'
        },
        '::-webkit-scrollbar-thumb': {
          background: 'rgba(129,140,248,0.3)',
          borderRadius: '3px'
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(129,140,248,0.5)'
        },
        '::selection': {
          background: 'rgba(129,140,248,0.3)',
          color: '#fafafa'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(9,9,11,0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          boxShadow: 'none'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 600,
          textTransform: 'none',
          transition: 'all 0.2s ease'
        },
        contained: {
          background: 'linear-gradient(135deg, #818cf8, #6366f1)',
          boxShadow: '0 4px 15px rgba(129,140,248,0.25)',
          '&:hover': {
            background: 'linear-gradient(135deg, #a5b4fc, #818cf8)',
            boxShadow: '0 6px 20px rgba(129,140,248,0.4)',
            transform: 'translateY(-1px)'
          }
        },
        outlined: {
          borderColor: 'rgba(129,140,248,0.4)',
          color: '#818cf8',
          '&:hover': {
            borderColor: '#818cf8',
            background: 'rgba(129,140,248,0.08)'
          }
        },
        text: {
          color: '#a1a1aa',
          '&:hover': {
            color: '#fafafa',
            background: 'rgba(255,255,255,0.04)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#0f0f13',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '12px',
          transition: 'all 0.3s ease',
          '&:hover': {
            border: '1px solid rgba(129,140,248,0.2)',
            background: 'rgba(129,140,248,0.04)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.4)'
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 500
        },
        filled: {
          background: 'rgba(129,140,248,0.15)',
          color: '#818cf8',
          '&:hover': {
            background: 'rgba(129,140,248,0.25)'
          }
        },
        outlined: {
          borderColor: 'rgba(129,140,248,0.3)',
          color: '#818cf8'
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'rgba(9,9,11,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255,255,255,0.06)'
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          margin: '2px 8px',
          '&:hover': {
            background: 'rgba(129,140,248,0.08)'
          },
          '&.Mui-selected': {
            background: 'rgba(129,140,248,0.12)',
            '&:hover': {
              background: 'rgba(129,140,248,0.16)'
            }
          }
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255,255,255,0.08)'
        }
      }
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)'
        }
      }
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#818cf8'
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: '#0f0f13',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#fafafa',
          fontSize: '0.75rem',
          borderRadius: '8px'
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#fafafa'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255,255,255,0.1)'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(129,140,248,0.4)'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#818cf8'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#0f0f13',
          border: '1px solid rgba(255,255,255,0.06)'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          letterSpacing: 'inherit'
        }
      }
    }
  }
});

export default theme;
