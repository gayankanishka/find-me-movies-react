import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <Typography variant="h5">Find Me Movies</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
