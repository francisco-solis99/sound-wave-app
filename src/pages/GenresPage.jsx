import React, { useState, useEffect } from 'react';
import '../styles/pages/searchpage.css';

import SearchBar from '../components/SearchBar';
import Menu from '../components/Menu';
import Loader from '../components/Loader';
import Genre from '../components/Genre';
import AnimatedComponent from '../components/AnimatedComponent';

import { getGenres } from '../services/genres/genres';
import { searchQuery } from '../services/search/search';

export default function GenresPage() {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getGenres({ limit: null, id: null })
        .then(data => setGenres(data))
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
    }, 200);
  }, []);

  const search = (query) => {
    const toSearch = 'genres';
    setIsLoading(true);
    searchQuery({ query, toSearch })
      .then(data => setGenres(data))
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const renderResults = () => {
    if (!genres.length) return (<p className='search__no-results'>No results for your search</p>);
    return (
      genres.map(genre => <Genre key={genre.id} genreData={genre} />)
    );
  };

  return (
    <AnimatedComponent>
      <div className='searchpage__wrapper'>
        <header className='searchpage__header'>
          <nav>
            <Menu />
          </nav>
        </header>

        <div className='searchpage__bar'>
          <SearchBar className='searchpage__bar' searchCallback={search} />
        </div>

        <main>
          <div className='container'>
            <section className={`components__container GenresPage__genres ${isLoading ? 'loading' : ''}`} >
              {
                !isLoading ? renderResults() : <Loader />
              }
            </section>
          </div>
        </main >
      </div >
    </AnimatedComponent>
  );
};
