import React, { useState, useEffect, useRef } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import '../styles/pages/dashboard.css';
import Loader from '../components/Loader';
import ModalTop from '../components/ModalTop';
import TopUser from '../components/TopUser';
import ArtistUser from '../components/ArtistUser';
import GenreUser from '../components/GenreUser';
import ModalCreate from '../components/ModalCreate';
import Button from '../components/Button';
import SongUser from '../components/SongUser';
import { getSongsTopByUser } from '../services/topSongs/topSongs';
import { getSongsByUser } from '../services/songs/songs';
import { getArtistsByUser } from '../services/artists/artists';
import { getGenresByUser } from '../services/genres/genres';
import { getUser, logout } from '../services/auth/auth';


// const getUserId = () => JSON.parse(window.localStorage.getItem('loggedSoundwaveApp'));

export default function Dashboard({ handlerChangeUser }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [topsUser, setTopsUser] = useState([]);
  const [songsUser, setSongsUser] = useState([]);
  const [artistsUser, setArtistsUser] = useState([]);
  const [genresUser, setGenresUser] = useState([]);
  const [modalTopData, setModalTopData] = useState({});
  const userId = useRef(null);

  useEffect(() => {
    const { userId: id } = JSON.parse(getUser());
    userId.current = id;
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getSongsTopByUser(userId.current)
        .then(tops => setTopsUser(tops))
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }, 200);

  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getSongsByUser(userId.current)
        .then(songs => {
          setSongsUser(songs);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }, 200);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getArtistsByUser(userId.current)
        .then(artists => {
          setArtistsUser(artists);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }, 200);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getGenresByUser(userId.current)
        .then(genres => {
          setGenresUser(genres);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }, 200);
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

  const handlerClickLogOut = () => {
    handlerChangeUser(null);
    logout();
    navigate('/');
  };


  if (!getUser()) return <Navigate to="/" />;

  return (
    <main className='Dashboard__main'>

      <section className='Dashboard__header'>
        <Link to='/'>
          <h1 className='Dashboard__title'>SoundWave</h1>
        </Link>
        <div className='Dashboard__link' onClick={handlerClickLogOut}>
          <LogoutIcon fontSize='large' />
        </div>
      </section>

      <section className='Dashboard__profile'>
        <ModalCreate />
        <span className='modal__actionable' aria-label='button' data-bs-toggle='modal' data-bs-target='#modalCreate'>
          <Button typeStyle='secundary' type="button">CREATE</Button>
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

      <section className='Dashboard__nav-bar-mobile'>
        <select className='Dashboard__nav-bar-select Dashboard__nav-link' name='select' onChange={(e) => handleOnClickNavBar(e.target.value)} defaultValue='dashboard_tops'>
          <option value='dashboard_tops'>Tops</option>
          <option value='dashboard_songs'>Songs</option>
          <option value='dashboard_artists'>Artists</option>
          <option value='dashboard_genres'>Genres</option>
        </select>
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
            <div className='Dashboard__list'>
              {
                !isLoading
                  ?
                  songsUser.map(song =>
                    <SongUser songData={song} key={song.id} />
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
