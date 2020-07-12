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
    overflow: 'hidden'
  },
  gridList: {
    maxWidth: '100%',
    maxHeight: '100%'
  }
}));

const VerticalMovieList = ({ movies }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        {(movies || []).map((data) => {
          return <MovieCard key={data.id} movie={data} />;
        })}
      </GridList>
    </div>
  );
};

VerticalMovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired
    })
  ).isRequired
};

export default VerticalMovieList;
