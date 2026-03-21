import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import BottomNav from './BottomNav';

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
            'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(232,184,75,0.06) 0%, transparent 100%)',
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
          zIndex: 1,
          pb: { xs: '60px', md: 0 }
        }}
      >
        {children}
      </Box>
      <Footer />
      <BottomNav />
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
