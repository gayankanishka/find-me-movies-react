import React from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  let { id } = useParams();

  return <h1>Movie details: {id}</h1>;
};

export default MovieDetails;
