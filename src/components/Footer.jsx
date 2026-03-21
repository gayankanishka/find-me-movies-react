import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        py: { xs: 3, sm: 4 }
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2
          }}
        >
          {/* TMDB badge */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 0.75,
              borderRadius: '8px',
              background: 'rgba(129,140,248,0.06)',
              border: '1px solid rgba(129,140,248,0.12)'
            }}
          >
            <MovieFilterIcon sx={{ color: 'primary.main', fontSize: 18 }} />
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                letterSpacing: '0.02em'
              }}
            >
              Powered by{' '}
              <Box
                component="span"
                sx={{ color: 'primary.main', fontWeight: 700 }}
              >
                TMDB
              </Box>
            </Typography>
          </Box>

          {/* Copyright */}
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', textAlign: 'center' }}
          >
            {'© '}
            {new Date().getFullYear()}{' '}
            <Link
              href="https://gayankanishka.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
              Gayan K.
            </Link>
            {' · All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
