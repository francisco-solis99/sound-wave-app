import React, { useState, useEffect } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';

import '../styles/pages/dashboard.css';
import Loader from '../components/Loader';
import ModalTop from '../components/ModalTop';
import TopUser from '../components/TopUser';
import ArtistUser from '../components/ArtistUser';
import GenreUser from '../components/GenreUser';
import ModalCreate from '../components/ModalCreate';
import Button from '../components/Button';
import { getSongsTopByUser } from '../services/topSongs/topSongs';
import { getArtistsByUser } from '../services/artists/artists';
import { getGenresByUser } from '../services/genres/genres';

export default function Dashboard() {

  const [isLoading, setIsLoading] = useState(false);
  const [topsUser, setTopsUser] = useState([]);
  const [artistsUser, setArtistsUser] = useState([]);
  const [genresUser, setGenresUser] = useState([]);
  const [modalTopData, setModalTopData] = useState({});

  const USER_ID = 2;

  useEffect(() => {
    setIsLoading(true);
    getSongsTopByUser(USER_ID)
      .then(tops => setTopsUser(tops))
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getArtistsByUser(USER_ID)
      .then(artists => {
        setArtistsUser(artists);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getGenresByUser(USER_ID)
      .then(genres => {
        setGenresUser(genres);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <main className='Dashboard__main'>

      <section className="Dashboard__header">
        <h1 className="Dashboard__title">SoundWave</h1>
        <LogoutIcon fontSize='large' />
      </section>

      <section className="Dashboard__profile">
        <ModalCreate />
        <span className="modal__actionable" aria-label="button" data-bs-toggle="modal" data-bs-target="#modalCreate">
          <Button type="secundary">CREATE</Button>
        </span>
      </section>

      <section className="Dashboard__section Dashboard__tops">
        <div className="container">
          <h2 className="Home__title-section">Tops</h2>
          <div className="Dashboard__list">
            {
              !isLoading
                ?
                topsUser.map(top =>
                  <TopUser top={top} key={top.id} setModalTopData={setModalTopData} />
                )
                :
                <Loader />
            }
            <ModalTop topData={modalTopData} />
          </div>
        </div>
      </section>

      <section className="Dashboard__section Dashboard__artists">
        <div className="container">
          <h2 className="Home__title-section">Artists</h2>
          <div className="Dashboard__list">
            {
              !isLoading
                ?
                artistsUser.map(artist => (
                  <ArtistUser key={crypto.randomUUID()} artist={artist} />
                ))
                :
                <Loader />
            }
          </div>
        </div>
      </section>

      <section className="Dashboard__section Dashboard__artists">
        <div className="container">
          <h2 className="Home__title-section">Genres</h2>
          <div className="Dashboard__list">
            {
              !isLoading
                ?
                genresUser.map(genre => (
                  <GenreUser key={crypto.randomUUID()} genre={genre} />
                ))
                :
                <Loader />
            }
          </div>
        </div>
      </section>
    </main>);
}
