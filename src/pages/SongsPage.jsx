import React, { useState, useEffect } from 'react';


import '../styles/pages/searchpage.css';
import '../styles/pages/songspage.css';
import SearchBar from '../components/SearchBar';
import MenuPremium from '../components/MenuPremium';
import Loader from '../components/Loader';
import SongsList from '../components/SongsList';
import { getSongsWithSample } from '../services/songs/songs';


export default function SongsPage() {

  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getSongsWithSample({ limit: null })
        .then(songsData => {
          const songListUI = songsData.map((song) => ({ ...song, playing: false }));
          setSongs(songListUI);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }, 200);
  }, []);

  return (
    <>
      <header className='songs__page'>
        <nav>
          <MenuPremium />
          <SearchBar />
        </nav>
      </header>

      <main>
        <div className="container">
          <section className="components__container GenresPage__genres">
            {
              !isLoading ? <SongsList songs={songs} /> : <Loader />
            }
          </section>
        </div>
      </main>
    </>
  );
}
