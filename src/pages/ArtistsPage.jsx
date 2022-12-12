import React, { useState, useEffect } from 'react';

import '../styles/pages/searchpage.css';
import NavBar from '../components/Navbar';
import Loader from '../components/Loader';
import Artist from '../components/Artist';
import ModalArtist from '../components/ModalArtist';
import { getAllArtists } from '../services/artists/artists';

export default function ArtistsPage() {

  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalArtistData, setModalArtistData] = useState({});

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
            <ModalArtist artistData={modalArtistData} />

            {
              !isLoading ? artists.map(artist => <Artist key={artist.id} artistData={artist} setModalArtistData={setModalArtistData} />) : <Loader />
            }
          </section>
        </div>
      </main>
    </>
  );
};
