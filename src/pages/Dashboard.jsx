import React, { useState, useEffect, useRef } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/pages/dashboard.css';

import Loader from '../components/Loader';
import AnimatedComponent from '../components/AnimatedComponent';
import ModalTop from '../components/ModalTop';
import TopUser from '../components/TopUser';
import SongUser from '../components/SongUser';
import ModalAddToTop from '../components/ModalAddToTop';
import ArtistUser from '../components/ArtistUser';
import GenreUser from '../components/GenreUser';
import ModalCreate from '../components/ModalCreate';
import Button from '../components/Button';
import { getSongsTopByUser } from '../services/topSongs/topSongs';
import { getSongsByUser } from '../services/songs/songs';
import { getArtistsByUser } from '../services/artists/artists';
import { getGenresByUser } from '../services/genres/genres';
import { getUser, logout } from '../services/auth/auth';

export default function Dashboard({ handlerChangeUser }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [topsUser, setTopsUser] = useState([]);
  const [songsUser, setSongsUser] = useState([]);
  const [artistsUser, setArtistsUser] = useState([]);
  const [genresUser, setGenresUser] = useState([]);
  const [selectedSong, setSelectedSong] = useState([]);
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
        .then(tops => {
          setTopsUser(tops);
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

  return (
    <AnimatedComponent>
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
          <ModalCreate
            userId={userId}
            handlerChangeUserTops={setTopsUser}
            handlerChangeUserGenres={setGenresUser}
            handlerChangeUserSongs={setSongsUser}
            handlerChangeUserArtists={setArtistsUser} />
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
                <ModalAddToTop topByUser={topsUser} song={selectedSong}/>
                <div className='Dashboard__list'>
                  {/* If isLoading, show Loader, if not check if songsUser is not empy */}
                  {
                    isLoading ?
                      <Loader />
                      : songsUser.length > 0 ?
                        songsUser.map(song =>
                          <SongUser songData={song} key={song.id} setSelectedSong={setSelectedSong}/>
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
                        <p>No artists have been created. Please add songs to your tops in order to visualize your artists</p>
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
                        <p>No genres have been created. Please add songs to your tops in order to visualize your genres</p>
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
