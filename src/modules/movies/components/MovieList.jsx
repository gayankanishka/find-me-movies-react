import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import MovieCard from './MovieCard';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)'
  }
}));

const MovieList = ({ movies }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={3}>
          {(movies || []).map((data) => {
            return <MovieCard key={data.id} movie={data} />;
          })}
        </GridList>
      </div>
    </>
  );
};

export default MovieList;
