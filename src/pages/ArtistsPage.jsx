import React, { useState, useEffect, useRef } from 'react';
import '../styles/pages/searchpage.css';
import AnimatedComponent from '../components/AnimatedComponent';
import SearchBar from '../components/SearchBar';
import Menu from '../components/Menu';
import Loader from '../components/Loader';
import Artist from '../components/Artist';
import ModalArtist from '../components/ModalArtist';
import { getArtists } from '../services/artists/artists';
import { searchQuery } from '../services/search/search';

export default function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalArtistData, setModalArtistData] = useState({});
  const allInitialArtists = useRef([]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getArtists({ limit: null, id: null })
        .then(data => {
          setArtists(data);
          allInitialArtists.current = data;
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
    }, 100);
  }, []);

  const search = (query) => {
    const toSearch = 'artists';
    setIsLoading(true);
    searchQuery({ query, toSearch })
      .then(data => {
        const artistsBaseFiltered = data.filter(item => item.userId === null);
        setArtists(artistsBaseFiltered);
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const backToAllResults = () => setArtists(allInitialArtists.current);

  const renderResults = () => {
    if (!artists.length) return (<p className='search__no-results'>No results for your search</p>);
    return (
      artists.map(artist => <Artist key={artist.id} artistData={artist} setModalArtistData={setModalArtistData} />)
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
          <SearchBar className='searchpage__bar' searchCallback={search} restartCallback={backToAllResults} />
        </div>

        <main className='searchpage__results'>
          <div className='container'>
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
