import React from "react";
import Layout from "./components/Layout";
import MovieList from "./modules/featured-movies/components/MovieList";

function App() {
  return (
    <div>
      <Layout title="Home">
        <MovieList />
      </Layout>
    </div>
  );
}

export default App;
