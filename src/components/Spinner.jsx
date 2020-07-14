import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Backdrop } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

const Spinner = () => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open>
      <CircularProgress size={50} thickness={5} />
    </Backdrop>
  );
};

export default Spinner;
