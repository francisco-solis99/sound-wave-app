import React, { useState, useEffect } from 'react';

import '../styles/pages/searchpage.css';
import NavBar from '../components/Navbar';
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
      <header className='GenresPage__header'>
        <NavBar />
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
};
