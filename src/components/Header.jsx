/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  SwipeableDrawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useScrollTrigger,
  Slide
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import TheatersIcon from '@mui/icons-material/Theaters';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CategoryIcon from '@mui/icons-material/Category';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

import navigationService from '../services/navigation.service';
import MovieSearch from '../modules/movies/components/MovieSearch';
import { useColorMode } from '../context/ColorModeContext';

const NAV_LINKS = [
  {
    label: 'Popular',
    icon: <TrendingUpIcon fontSize="small" />,
    action: () => navigationService.goToPopularMovies(),
    path: '/popular-movies'
  },
  {
    label: 'Top Rated',
    icon: <WhatshotIcon fontSize="small" />,
    action: () => navigationService.goToTopMovies(),
    path: '/top-movies'
  },
  {
    label: 'Upcoming',
    icon: <ScheduleIcon fontSize="small" />,
    action: () => navigationService.goToUpcomingMovies(),
    path: '/upcoming-movies'
  },
  {
    label: 'In Theaters',
    icon: <TheatersIcon fontSize="small" />,
    action: () => navigationService.goToOnTheaters(),
    path: '/on-theaters'
  },
  {
    label: 'Trending',
    icon: <LocalFireDepartmentIcon fontSize="small" />,
    action: () => navigationService.goToTrending(),
    path: '/trending'
  },
  {
    label: 'Genres',
    icon: <CategoryIcon fontSize="small" />,
    action: () => navigationService.goToGenres(),
    path: '/genres'
  }
];


function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired
};

function NavButton({ label, action, path, isActive }) {
  return (
    <Box sx={{ position: 'relative' }}>
      <Button
        onClick={action}
        sx={{
          color: isActive ? 'primary.main' : 'text.secondary',
          fontWeight: isActive ? 600 : 500,
          fontSize: '0.875rem',
          px: 1.5,
          py: 0.75,
          minWidth: 'auto',
          background: 'transparent',
          '&:hover': {
            color: 'text.primary',
            background: 'transparent'
          }
        }}
      >
        {label}
      </Button>
      <AnimatePresence>
        {isActive && (
          <motion.div
            layoutId="nav-indicator"
            style={{
              position: 'absolute',
              bottom: 0,
              left: '12px',
              right: '12px',
              height: '2px',
              background: 'linear-gradient(90deg, #818cf8, #6366f1)',
              borderRadius: '1px'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </Box>
  );
}

NavButton.propTypes = {
  label: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired
};

function DrawerContent({ onClose }) {
  const location = useLocation();

  return (
    <Box
      sx={{ width: 260, pt: 2, pb: 2 }}
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 2,
          pb: 2
        }}
      >
        <LocalMoviesIcon sx={{ color: 'primary.main', fontSize: 22 }} />
        <Typography variant="subtitle1" fontWeight={700}>
          <Box component="span" sx={{ color: 'text.primary' }}>
            FindMe
          </Box>
          <Box component="span" sx={{ color: 'primary.main' }}>
            Movies
          </Box>
        </Typography>
      </Box>

      <Divider sx={{ mb: 1 }} />

      <List disablePadding>
        {NAV_LINKS.map(({ label, icon, action, path }) => {
          const isActive = location.pathname === path;
          return (
            <ListItemButton
              key={path}
              onClick={action}
              selected={isActive}
              sx={{ mx: 1, borderRadius: '8px', mb: 0.5 }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  color: isActive ? 'primary.main' : 'text.secondary'
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'primary.main' : 'text.primary'
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <Box sx={{ px: 3 }}>
        <MovieSearch />
      </Box>
    </Box>
  );
}

DrawerContent.propTypes = {
  onClose: PropTypes.func.isRequired
};

function Header(props) {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { mode, toggleColorMode } = useColorMode();

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  return (
    <Box sx={{ mb: { xs: 8, sm: 9 } }}>
      <HideOnScroll {...props}>
        <AppBar elevation={0} position="fixed">
          <Toolbar sx={{ gap: 1, minHeight: { xs: 56, sm: 64 } }}>
            {/* Hamburger — mobile only */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open navigation menu"
              onClick={handleOpenDrawer}
              sx={{
                display: { md: 'none' },
                mr: 0.5,
                color: 'text.secondary',
                '&:hover': { color: 'text.primary' }
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                textDecoration: 'none',
                flexShrink: 0
              }}
            >
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <LocalMoviesIcon
                  sx={{
                    color: 'primary.main',
                    fontSize: { xs: 22, sm: 24 }
                  }}
                />
              </motion.div>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                  letterSpacing: '-0.01em',
                  lineHeight: 1
                }}
              >
                <Box component="span" sx={{ color: 'text.primary' }}>
                  FindMe
                </Box>
                <Box component="span" sx={{ color: 'primary.main' }}>
                  Movies
                </Box>
              </Typography>
            </Box>

            {/* Desktop nav */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 0.5,
                ml: 3
              }}
            >
              {NAV_LINKS.map(({ label, action, path }) => (
                <NavButton
                  key={path}
                  label={label}
                  action={action}
                  path={path}
                  isActive={location.pathname === path}
                />
              ))}
            </Box>

            {/* Spacer */}
            <Box sx={{ flex: 1 }} />

            {/* Search — desktop */}
            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                minWidth: 220,
                maxWidth: 300,
                width: '100%'
              }}
            >
              <MovieSearch />
            </Box>

            {/* Dark/light mode toggle */}
            <IconButton
              onClick={toggleColorMode}
              aria-label="toggle color mode"
              sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
            >
              {mode === 'dark' ? (
                <LightModeIcon fontSize="small" />
              ) : (
                <DarkModeIcon fontSize="small" />
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* Mobile drawer */}
      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        onOpen={handleOpenDrawer}
        PaperProps={{
          sx: {
            background: 'rgba(9,9,11,0.97)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(255,255,255,0.06)'
          }
        }}
      >
        <DrawerContent onClose={handleCloseDrawer} />
      </SwipeableDrawer>
    </Box>
  );
}

export default Header;
