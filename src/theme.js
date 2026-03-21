import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#0a0a0a', paper: '#141414' },
    primary: { main: '#e8b84b', light: '#f5d27a', dark: '#c9952e', contrastText: '#0a0a0a' },
    secondary: { main: '#e8b84b', light: '#f5d27a', dark: '#c9952e', contrastText: '#0a0a0a' },
    error: { main: '#ef4444' },
    text: { primary: '#ffffff', secondary: '#999999', disabled: '#555555' },
    divider: 'rgba(255,255,255,0.07)'
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
    caption: { fontWeight: 400, color: '#999999' },
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
          backgroundColor: '#0a0a0a',
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(232,184,75,0.06), transparent)'
        },
        '::-webkit-scrollbar': {
          width: '6px',
          height: '6px'
        },
        '::-webkit-scrollbar-track': {
          background: '#0a0a0a'
        },
        '::-webkit-scrollbar-thumb': { background: 'rgba(232,184,75,0.3)', borderRadius: '3px' },
        '::-webkit-scrollbar-thumb:hover': { background: 'rgba(232,184,75,0.5)' },
        '::selection': { background: 'rgba(232,184,75,0.3)', color: '#ffffff' }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(10,10,10,0.8)',
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
          background: 'linear-gradient(135deg, #e8b84b, #c9952e)',
          boxShadow: '0 4px 15px rgba(232,184,75,0.25)',
          '&:hover': {
            background: 'linear-gradient(135deg, #f5d27a, #e8b84b)',
            boxShadow: '0 6px 20px rgba(232,184,75,0.4)',
            transform: 'translateY(-1px)'
          }
        },
        outlined: {
          borderColor: 'rgba(232,184,75,0.4)',
          color: '#e8b84b',
          '&:hover': {
            borderColor: '#e8b84b',
            background: 'rgba(232,184,75,0.08)'
          }
        },
        text: {
          color: '#999999',
          '&:hover': {
            color: '#ffffff',
            background: 'rgba(255,255,255,0.04)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#141414',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '12px',
          transition: 'all 0.3s ease',
          '&:hover': {
            border: '1px solid rgba(232,184,75,0.2)',
            background: 'rgba(232,184,75,0.04)',
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
          background: 'rgba(232,184,75,0.15)',
          color: '#e8b84b',
          '&:hover': { background: 'rgba(232,184,75,0.25)' }
        },
        outlined: { borderColor: 'rgba(232,184,75,0.3)', color: '#e8b84b' }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'rgba(10,10,10,0.95)',
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
          '&:hover': { background: 'rgba(232,184,75,0.08)' },
          '&.Mui-selected': {
            background: 'rgba(232,184,75,0.12)',
            '&:hover': { background: 'rgba(232,184,75,0.16)' }
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
          color: '#e8b84b'
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: '#141414',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#ffffff',
          fontSize: '0.75rem',
          borderRadius: '8px'
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#ffffff'
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
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(232,184,75,0.4)' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#e8b84b' }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#141414',
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
