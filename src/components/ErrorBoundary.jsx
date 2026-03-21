import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            p: 4
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 64, color: '#ef4444', opacity: 0.7 }} />
          <Typography sx={{ color: '#fafafa', fontWeight: 700, fontSize: '1.5rem' }}>
            Something went wrong
          </Typography>
          <Typography
            sx={{
              color: '#999999',
              fontSize: '0.9rem',
              textAlign: 'center',
              maxWidth: 400
            }}
          >
            An unexpected error occurred. Please refresh the page or go back home.
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.href = '/'}
            sx={{ mt: 1, background: '#e8b84b', '&:hover': { background: '#c9952e' } }}
          >
            Go Home
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
