import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh'
  }
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <Container maxWidth="xl" className={classes.root}>
        {children}
      </Container>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;
