import React, { useState, useEffect } from 'react';
import '../styles/pages/searchpage.css';
import SearchBar from '../components/SearchBar';
import Menu from '../components/Menu';
import Loader from '../components/Loader';
import Artist from '../components/Artist';
import ModalArtist from '../components/ModalArtist';
import { getArtists } from '../services/artists/artists';
import { searchQuery } from '../services/search/search';
import AnimatedComponent from '../components/AnimatedComponent';

export default function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalArtistData, setModalArtistData] = useState({});

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getArtists({ limit: null })
        .then(data => setArtists(data))
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
    }, 100);
  }, []);


  const search = (query) => {
    const toSearch = 'artists';
    setIsLoading(true);
    searchQuery({ query, toSearch })
      .then(data => setArtists(data))
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const renderResults = () => {
    if (!artists.length) return (<p className="search__no-results">No results for your search</p>);
    return (
      artists.map(artist => <Artist key={artist.id} artistData={artist} setModalArtistData={setModalArtistData} />)
    );
  };

  return (
    <AnimatedComponent>
      <div className="searchpage__wrapper">
        <header className="searchpage__header">
          <nav>
            <Menu />
          </nav>
        </header>

        <div className="searchpage__bar">
          <SearchBar className="searchpage__bar" searchCallback={search} />
        </div>

        <main className="searchpage__results">
          <div className="container">
            <section className={`components__container ArtistsPage__artists ${isLoading ? 'loading' : ''}`}>
              <ModalArtist artistData={modalArtistData} />
              {
                !isLoading ? renderResults() : <Loader />
              }
            </section>
          </div>
        </main>
      </div>
    </AnimatedComponent>
  );
};
