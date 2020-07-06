import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    flex: '0 0 auto',
    backgroundColor: 'white'
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <>
      <footer className={classes.root}>
        <h4>Gayan K</h4>
      </footer>
    </>
  );
};

export default Footer;
