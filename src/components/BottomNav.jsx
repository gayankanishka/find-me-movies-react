import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import navigationService from '../services/navigation.service';

const NAV_ITEMS = [
  { label: 'Home', icon: HomeRoundedIcon, path: '/', action: () => navigationService.goToHome() },
  { label: 'Popular', icon: WhatshotRoundedIcon, path: '/popular-movies', action: () => navigationService.goToPopularMovies() },
  { label: 'Search', icon: SearchRoundedIcon, path: null, action: () => {
    const input = document.querySelector('input[placeholder*="earch"]');
    if (input) { input.focus(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  }},
  { label: 'Trending', icon: LocalFireDepartmentRoundedIcon, path: '/trending', action: () => navigationService.goToTrending() },
  { label: 'Genres', icon: CategoryRoundedIcon, path: '/genres', action: () => navigationService.goToGenres() },
];

function BottomNav() {
  const location = useLocation();

  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'none' },
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        background: 'rgba(10,10,10,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        height: 60,
        alignItems: 'stretch'
      }}
    >
      {NAV_ITEMS.map(({ label, icon: Icon, path, action }) => {
        const isActive = path && location.pathname === path;
        return (
          <Box
            key={label}
            onClick={action}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.4,
              cursor: 'pointer',
              position: 'relative',
              transition: 'opacity 0.15s',
              '&:active': { opacity: 0.6 }
            }}
          >
            {/* Active indicator */}
            {isActive && (
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 24,
                height: 2,
                borderRadius: '0 0 2px 2px',
                background: '#e8b84b'
              }} />
            )}
            <Icon sx={{
              fontSize: '1.35rem',
              color: isActive ? '#e8b84b' : '#999999',
              transition: 'color 0.15s'
            }} />
            <Typography sx={{
              fontSize: '0.6rem',
              fontWeight: isActive ? 700 : 400,
              color: isActive ? '#e8b84b' : '#999999',
              letterSpacing: '0.02em',
              transition: 'color 0.15s'
            }}>
              {label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

export default BottomNav;
