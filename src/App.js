import React from "react";
import Layout from "./components/Layout";
import PopularMovies from "./modules/movies/components/PopularMovies";
import TopRatedMovies from "./modules/movies/components/TopRatedMovies";
import UpcomingMovies from "./modules/movies/components/UpcomingMovies";

function App() {
  return (
    <div>
      <Layout title="Home">
        <PopularMovies />
        <TopRatedMovies />
        <UpcomingMovies />
      </Layout>
    </div>
  );
}

export default App;
