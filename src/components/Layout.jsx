import React from 'react';
import { Box, Container } from '@mui/material';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'background.default',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '300px',
          background:
            'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(129,140,248,0.06) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 0
        }
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flex: 1,
          position: 'relative',
          zIndex: 1
        }}
      >
        <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3 } }}>
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
