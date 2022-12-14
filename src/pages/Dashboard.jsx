import React, { useState, useEffect } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import '../styles/pages/dashboard.css';

import Loader from '../components/Loader';
import AnimatedComponent from '../components/AnimatedComponent';
import ModalTop from '../components/ModalTop';
import TopUser from '../components/TopUser';
import SongUser from '../components/SongUser';
import ArtistUser from '../components/ArtistUser';
import GenreUser from '../components/GenreUser';
import ModalCreate from '../components/ModalCreate';
import Button from '../components/Button';

import { getSongsTopByUser } from '../services/topSongs/topSongs';
import { getSongsByUser } from '../services/songs/songs';
import { getArtistsByUser } from '../services/artists/artists';
import { getGenresByUser } from '../services/genres/genres';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [topsUser, setTopsUser] = useState([]);
  const [songsUser, setSongsUser] = useState([]);
  const [artistsUser, setArtistsUser] = useState([]);
  const [genresUser, setGenresUser] = useState([]);
  const [modalTopData, setModalTopData] = useState({});

  const USER_ID = 2;

  useEffect(() => {
    setIsLoading(true);
    getSongsTopByUser(USER_ID)
      .then(tops => setTopsUser(tops))
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getSongsByUser(USER_ID)
      .then(songs => setSongsUser(songs))
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getArtistsByUser(USER_ID)
      .then(artists => setArtistsUser(artists))
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getGenresByUser(USER_ID)
      .then(genres => setGenresUser(genres))
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
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
    <AnimatedComponent>
      <main className='Dashboard__main'>
        <section className='Dashboard__header'>
          <Link to='/'>
            <h1 className='Dashboard__title'>SoundWave</h1>
          </Link>
          <Link to='/' className='Dashboard__link'>
            <LogoutIcon fontSize='large' />
          </Link>
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
              <AnimatedComponent>
                <div className='Dashboard__list'>
                  {/* If isLoading, show Loader, if not check if topUser is not empy */}
                  {
                    isLoading ?
                      <Loader />
                      : topsUser.length > 0 ?
                        topsUser.map(top =>
                          <TopUser top={top} key={top.id} setModalTopData={setModalTopData} />
                        ) :
                        <p>No tops have been created.</p>
                  }
                  <ModalTop topData={modalTopData} />
                </div>
              </AnimatedComponent>
            }
          </div>
        </section>

        <section className='Dashboard__section Dashboard__songs'>
          <div className='container'>
            {isSelected.songs &&
              <AnimatedComponent>
                <div className='Dashboard__list'>
                  {/* If isLoading, show Loader, if not check if songsUser is not empy */}
                  {
                    isLoading ?
                      <Loader />
                      : songsUser.length > 0 ?
                        songsUser.map(song =>
                          <SongUser songData={song} key={song.id} />
                        ) :
                        <p>No songs have been created.</p>
                  }
                  <ModalTop topData={modalTopData} />
                </div>
              </AnimatedComponent>
            }
          </div>
        </section>

        <section className='Dashboard__section Dashboard__artists'>
          <div className='container'>
            {isSelected.artists &&
              <AnimatedComponent>
                <div className='Dashboard__list'>
                  {/* If isLoading, show Loader, if not check if artistsUser is not empy */}
                  {
                    isLoading ?
                      <Loader />
                      : artistsUser.length > 0 ?
                        artistsUser.map(artist =>
                          <ArtistUser key={crypto.randomUUID()} artist={artist} />
                        ) :
                        <p>No artists have been created.</p>
                  }
                </div>
              </AnimatedComponent>
            }
          </div>
        </section>

        <section className='Dashboard__section Dashboard__genres'>
          <div className='container'>
            {isSelected.genres &&
              <AnimatedComponent>
                <div className='Dashboard__list'>
                  {/* If isLoading, show Loader, if not check if genresUser is not empy */}
                  {
                    isLoading ?
                      <Loader />
                      : genresUser.length > 0 ?
                        genresUser.map(genre =>
                          <GenreUser key={crypto.randomUUID()} genre={genre} />
                        ) :
                        <p>No genres have been created.</p>
                  }
                </div>
              </AnimatedComponent>
            }
          </div>
        </section>
      </main>
    </AnimatedComponent>
  );
}
