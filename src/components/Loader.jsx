import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    display: 'flex',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: '2',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const Loader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress size={50} thickness={5} />
    </div>
  );
};

export default Loader;
