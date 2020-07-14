import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%'
  }
});

const SkeltonLoader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
};

export default SkeltonLoader;
