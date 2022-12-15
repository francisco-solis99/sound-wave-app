import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../services/auth/auth';

import '../styles/pages/home.css';
import videoMobile from '../assets/soundwave-middle.mp4';
import videoDesktop from '../assets/soundwave-full.mp4';

import Loader from '../components/Loader';
import Button from '../components/Button';
import TopSlider from '../components/TopSlider';
import ModalAddToTop from '../components/ModalAddToTop';
import SongsList from '../components/SongsList';
import ModalArtist from '../components/ModalArtist';
import ArtistSlider from '../components/ArtistSlider';
import GenreSlider from '../components/GenreSlider';

import { getSongsTops } from '../services/topSongs/topSongs';
import { getSongsWithSample } from '../services/songs/songs';
import { getArtists } from '../services/artists/artists';
import { getGenres } from '../services/genres/genres';
import { getSongsTopByUser } from '../services/topSongs/topSongs';

export default function Home() {
  const navigate = useNavigate();

  const userId = useRef(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isTopDataLoading, setIsTopDataLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [topSongs, setTopSongs] = useState([]);
  const [topsByUser, setTopsByUser] = useState([]);
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState([]);
  const [modalArtistData, setModalArtistData] = useState({});
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);

  const handleClickStarted = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedSoundwaveApp');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setIsLogged(user || getUser());
    }
  }, []);

  useEffect(() => {
    setIsTopDataLoading(true);
    setTimeout(() => {
      getSongsTops(3)
        .then(data => setTopSongs(data))
        .catch(err => console.log(err))
        .finally(() => setIsTopDataLoading(false));
    }, 100);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getSongsWithSample({ limit: 6, id: null })
        .then(songsData => {
          const songListUI = songsData.map((song) => ({ ...song, playing: false }));
          setSongs(songListUI);
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
    }, 100);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getArtists({ limit: 8, id: null })
        .then(data => setArtists(data))
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
    }, 100);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getGenres({ limit: 10, id: null })
        .then(data => setGenres(data))
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
    }, 100);
  }, []);

  useEffect(() => {
    if (isLogged) {
      const { userId: id } = JSON.parse(getUser());
      userId.current = id;
    }
  }, [isLogged]);

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

  return (
    <div>
      <main className='Home__main'>
        <div className='Home__section-container'>

          {/* ----------------- START OF LANDING SECTION ----------------- */}
          <section className='section Home__CTA'>
            <div className='overlay'></div>
            <video className='Home__video' muted autoPlay loop>
              <source src={videoMobile} type='video/mp4' />
              <source src={videoDesktop} type='video/mp4' media='all and (min-width: 768px)' />
            </video>

            <div className="container Home__container">
              <div className="Home__copy">
                <h1 className="Home__title">SoundWave</h1>
                <p className="Home__sub-copy">This website will provide you with many songs, artists and genres included in the top lists over the years. Enjoy!</p>
                <Button typeStyle="secundary" type="button" onClick={handleClickStarted}>
                  Get started
                </Button>
              </div>
            </div>
          </section>
          {/* ----------------- END OF LANDING SECTION ----------------- */}

          {/* ----------------- START OF TOPS SECTION ----------------- */}
          <section className='section Home__tops' id='tops'>
            <div className='container Home__container'>
              <h2 className='Home__title-section'>Tops</h2>
              {
                !isTopDataLoading ? <TopSlider topData={topSongs} /> : <Loader />
              }
            </div>
          </section>
          {/* ----------------- END OF TOPS SECTION ----------------- */}

          {/* ----------------- START OF SONGS SECTION ----------------- */}
          <section className='section Home__songs' id='songs'>
            <div className='container Home__container'>
              <h2 className='Home__title-section'>Songs</h2>
              {
                isLogged ? <ModalAddToTop topByUser={topsByUser} song={selectedSong} /> : ''
              }
              <div className='Home__songs-list'>
                {
                  !isLoading ? <SongsList songs={songs} setSelectedSong={setSelectedSong} showAddIcon={isLogged} /> : <Loader />
                }
              </div>
              <Link to='/songs' className='Home__more-link'>Ver mas</Link>
            </div>
          </section>
          {/* ----------------- END OF SONGS SECTION ----------------- */}

          {/* ----------------- START OF ARTISTS SECTION ----------------- */}
          <section className='section Home__artists' id='artists'>
            <div className='container Home__container'>
              <h2 className='Home__title-section'>Artists</h2>
              <ModalArtist artistData={modalArtistData} />
              {
                !isLoading ? <ArtistSlider artists={artists} setModalArtistData={setModalArtistData} /> : <Loader />
              }
              <Link to='/artists' className='Home__more-link'>Ver mas</Link>
            </div>
          </section>
          {/* ----------------- END OF ARTISTS SECTION ----------------- */}

          {/* ----------------- START OF GENRES SECTION ----------------- */}
          <section className='section Home__genres' id='genres'>
            <div className='container Home__container'>
              <h2 className='Home__title-section'>Genres</h2>
              {
                !isLoading ? <GenreSlider genres={genres} /> : <Loader />
              }
              <Link to='/genres' className='Home__more-link'>Ver mas</Link>
            </div>
          </section>
          {/* ----------------- END OF GENRES SECTION ----------------- */}
        </div>
      </main>
    </div>
  );
}
