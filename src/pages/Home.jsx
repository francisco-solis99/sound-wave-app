import React, { useState, useEffect } from 'react';
import '../styles/pages/home.css';
import videoMobile from '../assets/soundwave-middle.mp4';
import videoDesktop from '../assets/soundwave-full.mp4';

import TopSongs from '../components/TopSongs';
import { getSongsTops } from '../services/topSongs/topSongs';



export default function Home() {

  const [topSongs, setTopSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    }, 200);

  }, []);


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
            <button className="Home__button">Get Started</button>
          </div>
        </div>
      </section>
      <section className="section Home__tops">
        <div className="container">
          <h2 className="Home__title-section">Tops</h2>
          {
            !isLoading ? topSongs.map(top => <TopSongs key={top.id} topData={top} />) : <p>Loading...</p>
          }
        </div>
      </section>
      <section className="section Home__songs">
        <div className="container">
          <h2 className="Home__title-section">Songs</h2>
        </div>
      </section>
      <section className="section Home__artists">
        <div className="container">
          <h2 className="Home__title-section">Artists</h2>
        </div>
      </section>
      <section className="section Home__genres">
        <div className="container">
          <h2 className="Home__title-section">Genres</h2>
        </div>
      </section>
    </main>
  );
}
