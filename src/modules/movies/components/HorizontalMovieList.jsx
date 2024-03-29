import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    width: '100%'
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)'
  }
}));

const HorizontalMovieList = ({ movies }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
          {(movies || []).map((data) => {
            return <MovieCard key={data.id} movie={data} />;
          })}
        </GridList>
      </div>
    </>
  );
};

HorizontalMovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired
    })
  ).isRequired
};

export default HorizontalMovieList;
