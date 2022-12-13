import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import '../styles/pages/home.css';
import videoMobile from '../assets/soundwave-middle.mp4';
import videoDesktop from '../assets/soundwave-full.mp4';

import Loader from '../components/Loader';
import Button from '../components/Button';
import TopSlider from '../components/TopSlider';
import SongsList from '../components/SongsList';
import ModalArtist from '../components/ModalArtist';
import ArtistSlider from '../components/ArtistSlider';
import GenreSlider from '../components/GenreSlider';

import { getSongsTops } from '../services/topSongs/topSongs';
import { getSongsWithSample } from '../services/songs/songs';
import { getAllArtists } from '../services/artists/artists';
import { getAllGenres } from '../services/genres/genres';

export default function Home() {
  const navigate = useNavigate();
  // TODO: Check bug when try it with others
  const [isDataLoading, setIsDataLoading] = useState({
    'topSongs': true,
    'songs': true,
    'artists': true,
    'genres': true
  });
  const [isLoading, setIsLoading] = useState(true);
  const [topSongs, setTopSongs] = useState([]);
  const [songs, setSongs] = useState([]);
  const [modalArtistData, setModalArtistData] = useState({});
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);

  const handleClickStarted = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    setIsDataLoading({ ...isDataLoading, topSongs: true });
    setTimeout(() => {
      getSongsTops()
        .then(data => setTopSongs(data))
        .catch(err => console.log(err))
        .finally(() => setIsDataLoading({ ...isDataLoading, topSongs: false }));
    }, 100);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getSongsWithSample({ limit: 6 })
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
      getAllArtists()
        .then(data => setArtists(data))
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
    }, 100);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getAllGenres()
        .then(data => setGenres(data))
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
    }, 100);
  }, []);

  return (
    <div>
      <main className="Home__main">
        <div className="Home__section-container">

          {/* ----------------- START OF LANDING SECTION ----------------- */}
          <section className="section Home__CTA">
            <div className="overlay"></div>
            <video className='Home__video' muted autoPlay loop>
              <source src={videoMobile} type="video/mp4" />
              <source src={videoDesktop} type="video/mp4" media="all and (min-width: 768px)" />
            </video>

            <div className="container Home__container">
              <div className="Home__copy">
                <h1 className="Home__title">SoundWave</h1>
                <p className="Home__sub-copy">This website will provide you with many songs, artists and genres included in the top lists over the years. Enjoy!</p>
                <Button type="secundary" text="Get started" onClick={handleClickStarted}>
                  Get started
                </Button>
              </div>
            </div>
          </section>
          {/* ----------------- END OF LANDING SECTION ----------------- */}

          {/* ----------------- START OF TOPS SECTION ----------------- */}
          <section className="section Home__tops">
            <div className="container Home__container">
              <h2 className="Home__title-section">Tops</h2>
              {
                !isDataLoading.topSongs ? <TopSlider topData={topSongs} /> : <Loader />
              }
            </div>
          </section>
          {/* ----------------- END OF TOPS SECTION ----------------- */}

          {/* ----------------- START OF SONGS SECTION ----------------- */}
          <section className="section Home__songs">
            <div className="container Home__container">
              <h2 className="Home__title-section">Songs</h2>
              <div className="Home__songs-list">
                {
                  !isLoading ? <SongsList songs={songs} /> : <Loader />
                }
              </div>
              <Link to="/songs" className='Home__more-link'>Ver mas</Link>
            </div>
          </section>
          {/* ----------------- END OF SONGS SECTION ----------------- */}


          {/* ----------------- START OF ARTISTS SECTION ----------------- */}
          <section className="section Home__artists">
            <div className="container Home__container">
              <h2 className="Home__title-section">Artists</h2>
              <ModalArtist artistData={modalArtistData} />
              {
                !isLoading ? <ArtistSlider artists={artists} setModalArtistData={setModalArtistData} /> : <Loader />
              }
              <Link to="/artists" className='Home__more-link'>Ver mas</Link>
            </div>
          </section>
          {/* ----------------- END OF ARTISTS SECTION ----------------- */}

          {/* ----------------- START OF GENRES SECTION ----------------- */}
          <section className="section Home__genres">
            <div className="container Home__container">
              <h2 className="Home__title-section">Genres</h2>
              {
                !isLoading ? <GenreSlider genres={genres} /> : <Loader />
              }
              <Link to="/genres" className='Home__more-link'>Ver mas</Link>
            </div>
          </section>
          {/* ----------------- END OF GENRES SECTION ----------------- */}

        </div>
      </main>
    </div>
  );
}
