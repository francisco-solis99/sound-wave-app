import React, { useState, useEffect } from 'react';

import '../styles/pages/searchpage.css';
import Loader from '../components/Loader';
import Genre from '../components/Genre';
import { getAllGenres } from '../services/genres/genres';

export default function GenresPage() {

  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getAllGenres()
        .then(data => {
          setGenres(data);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }, 200);
  }, []);

  // TODO: Replace NavBar for just the SearchBar and refactor of NavBar
  // TODO: Think about how to apply styles to each page because they are so similar

  return (
    <>

      <main>
        <div className="container">
          <section className="components__container GenresPage__genres">
            {
              !isLoading ? genres.map(genre => <Genre key={genre.id} genreData={genre} />) : <Loader />
            }
          </section>
        </div>
      </main>
    </>
  );
};
