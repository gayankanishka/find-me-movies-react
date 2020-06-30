import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Container from "@material-ui/core/Container";
import { Helmet } from "react-helmet";

const Layout = ({ children, title }) => {
  return (
    <>
      <Helmet titleTemplate="Find Me Movies - %s" defaultTitle="Find Me Movies">
        <title>{title}</title>
      </Helmet>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;
