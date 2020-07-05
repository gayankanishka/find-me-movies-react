import React from 'react';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxWidth="xl">{children}</Container>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;
