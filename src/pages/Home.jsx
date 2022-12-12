import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/pages/home.css';
import videoMobile from '../assets/soundwave-middle.mp4';
import videoDesktop from '../assets/soundwave-full.mp4';

import Loader from '../components/Loader';
import TopSongs from '../components/TopSongs';
import ArtistSlider from '../components/ArtistSlider';
import ModalArtist from '../components/ModalArtist';
import SongsList from '../components/SongsList';
import Button from '../components/Button';
import { getSongsTops } from '../services/topSongs/topSongs';
import { getSongsWithSample } from '../services/songs/songs';
import { getAllArtists } from '../services/artists/artists';
import { getAllGenres } from '../services/genres/genres';
import GenreSlider from '../components/GenreSlider';

export default function Home() {
  const [topSongs, setTopSongs] = useState([]);
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [modalArtistData, setModalArtistData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getSongsTops()
        .then(data => {
          setTopSongs(data);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }, 100);

  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getSongsWithSample({ limit: 4 })
        .then(songsData => {
          const songListUI = songsData.map((song) => ({ ...song, playing: false }));
          setSongs(songListUI);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }, 100);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getSongsTops()
        .then(data => {
          setTopSongs(data);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }, 100);

  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getAllArtists()
        .then(data => {
          setArtists(data);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }, 100);
  }, []);


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

  const handleClickStarted = () => {
    navigate('/dashboard');
  };

  return (
    <main className="Home__main">
      <section className="section Home__CTA">
        <div className="overlay"></div>
        <video className='Home__video' muted autoPlay loop>
          <source src={videoMobile} type="video/mp4" />
          <source src={videoDesktop} type="video/mp4" media="all and (min-width: 768px)" />
        </video>
        <div className="container">
          <div className="Home__copy">
            <h1 className="Home__title">SoundWave</h1>
            <p className="Home__sub-copy">Curabitur rhoncus ut magna sit amet fringilla. Nullam placerat lacus vel arcu volutpat, sed efficitur justo porta</p>
            <Button type="secundary" text="Get started" onClick={handleClickStarted}>
              Get started
            </Button>
          </div>
        </div>
      </section>
      <section className="section Home__tops">
        <div className="container">
          <h2 className="Home__title-section">Tops</h2>
          {
            !isLoading ? topSongs.map(top => <TopSongs key={top.id} topData={top} />) : <Loader />
          }
        </div>
      </section>
      <section className="section Home__songs">
        <div className="container">
          <h2 className="Home__title-section">Songs</h2>
          <div className="Home__songs-list">
            {
              !isLoading ? <SongsList songs={songs} /> : <Loader />
            }
          </div>
        </div>
      </section>
      <section className="section Home__artists">
        <div className="container">
          <h2 className="Home__title-section">Artists</h2>
          <ModalArtist artistData={modalArtistData} />

          {
            !isLoading ? <ArtistSlider artists={artists} setModalArtistData={setModalArtistData} /> : <Loader />
          }
        </div>
      </section>
      <section className="section Home__genres">
        <div className="container">
          <h2 className="Home__title-section">Genres</h2>
          {
            !isLoading ? <GenreSlider genres={genres} /> : <Loader />
          }
        </div>
      </section>
    </main>
  );
}
