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

  const [isSelected, setIsSelected] = useState({
    'tops': true,
    'songs': false,
    'artists': false,
    'genres': false
  });

  const handleOnClickNavBar = (option) => {
    switch (option) {
      case 'dashboard_tops':
        setIsSelected({
          'tops': true,
          'songs': false,
          'artists': false,
          'genres': false
        });
        break;
      case 'dashboard_songs':
        setIsSelected({
          'tops': false,
          'songs': true,
          'artists': false,
          'genres': false
        });
        break;
      case 'dashboard_artists':
        setIsSelected({
          'tops': false,
          'songs': false,
          'artists': true,
          'genres': false
        });
        break;
      case 'dashboard_genres':
        setIsSelected({
          'tops': false,
          'songs': false,
          'artists': false,
          'genres': true
        });
        break;
      default:
        break;
    }
  };

  return (
    <main className='Dashboard__main'>

      <section className='Dashboard__header'>
        <h1 className='Dashboard__title'>SoundWave</h1>
        <LogoutIcon fontSize='large' />
      </section>

      <section className='Dashboard__profile'>
        <ModalCreate />
        <span className='modal__actionable' aria-label='button' data-bs-toggle='modal' data-bs-target='#modalCreate'>
          <Button type='secundary'>CREATE</Button>
        </span>
      </section>

      <section>
        <ul className='Dashboard__nav-bar'>
          <li className={`Dashboard__nav-link ${isSelected.tops ? 'selected' : ''}`} onClick={(e) => handleOnClickNavBar(e.target.id)} id='dashboard_tops'>Tops |</li>
          <li className={`Dashboard__nav-link ${isSelected.songs ? 'selected' : ''}`} onClick={(e) => handleOnClickNavBar(e.target.id)} id='dashboard_songs'>Songs |</li>
          <li className={`Dashboard__nav-link ${isSelected.artists ? 'selected' : ''}`} onClick={(e) => handleOnClickNavBar(e.target.id)} id='dashboard_artists'>Artists |</li>
          <li className={`Dashboard__nav-link ${isSelected.genres ? 'selected' : ''}`} onClick={(e) => handleOnClickNavBar(e.target.id)} id='dashboard_genres'>Genres</li>
        </ul>
      </section>

      <section className='Dashboard__section Dashboard__tops'>
        <div className='container'>

          {isSelected.tops &&
            <div className='Dashboard__list'>
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
          }

        </div>
      </section>

      <section className='Dashboard__section Dashboard__artists'>
        <div className='container'>

          {isSelected.songs &&
            <h2>Aqui van las canciones</h2>
          }
        </div>
      </section>

      <section className='Dashboard__section Dashboard__artists'>
        <div className='container'>

          {isSelected.artists &&
            <div className='Dashboard__list'>
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
          }
        </div>
      </section>

      <section className='Dashboard__section Dashboard__artists'>
        <div className='container'>

          {isSelected.genres &&
            <div className='Dashboard__list'>
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
          }
        </div>
      </section>
    </main>);
}
