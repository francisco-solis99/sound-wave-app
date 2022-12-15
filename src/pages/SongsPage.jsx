import React, { useState, useEffect, useRef } from 'react';
import '../styles/pages/searchpage.css';
import SearchBar from '../components/SearchBar';
import Menu from '../components/Menu';
import Loader from '../components/Loader';
import SongsList from '../components/SongsList';
import ModalAddToTop from '../components/ModalAddToTop';
import AnimatedComponent from '../components/AnimatedComponent';
import { getSongsWithSample } from '../services/songs/songs';
import { getUser } from '../services/auth/auth';
import { getSongsTopByUser } from '../services/topSongs/topSongs';

export default function SongsPage() {
  const userId = useRef(null);
  const [isLogged, setIsLogged] = useState(false);
  const [topsByUser, setTopsByUser] = useState([]);
  const [songs, setSongs] = useState([]);
  const allSongs = useRef([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedSoundwaveApp');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setIsLogged(user || getUser());
    }
  }, []);

  useEffect(() => {
    const { userId: id } = JSON.parse(getUser());
    userId.current = id;
  }, []);

  useEffect(() => {
    if (isLogged) {
      setIsLoading(true);
      setTimeout(() => {
        getSongsTopByUser(userId.current)
          .then(tops => {
            setTopsByUser(tops);
          })
          .catch(err => console.log(err))
          .finally(() => {
            setIsLoading(false);
          });
      }, 200);
    }
  }, [isLogged]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getSongsWithSample({ limit: null, id: null })
        .then(songsData => {
          const songListUI = songsData.map((song) => ({ ...song, playing: false }));
          allSongs.current.value = songListUI;
          setSongs(songListUI);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }, 200);
  }, []);

  const search = (query) => {
    setIsLoading(true);
    const queryLowerCase = query.toLowerCase();
    const songsSearched = allSongs.current.value.filter(song => song.name.toLowerCase().includes(queryLowerCase));
    setSongs(songsSearched);
    setIsLoading(false);
  };

  const renderResults = () => {
    if (!songs.length) return (<p className='search__no-results'>No results for your search</p>);
    return <SongsList songs={songs} showAddIcon={isLogged} />;
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

        <main className='searchpage__results'>
          <div className='container'>
            {
              isLogged ? <ModalAddToTop topByUser={topsByUser} /> : ''
            }
            <section className={`components__container SongsPage__songs ${isLoading ? 'loading' : ''}`}>
              {
                !isLoading ? renderResults() : <Loader />
              }
            </section>
          </div>
        </main>
      </div>
    </AnimatedComponent>
  );
}
