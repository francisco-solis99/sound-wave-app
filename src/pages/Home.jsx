import React from 'react';

import videoMobile from '../assets/soundwave-middle.mp4';
import videoDesktop from '../assets/soundwave-full.mp4';
import '../styles/pages/home.css';


export default function Home() {
  return (
    <main className="Home__main">
      <section className="section container Home__CTA">
        <div className="overlay"></div>
        <video className='Home__video' muted autoPlay loop>
          <source src={videoMobile} type="video/mp4" />
          <source src={videoDesktop} type="video/mp4" media="all and (min-width: 768px)" />
        </video>
        <div className="Home__copy">
          <h1 className="Home__title">SoundWave</h1>
          <p className="Home__sub-copy">Curabitur rhoncus ut magna sit amet fringilla. Nullam placerat lacus vel arcu volutpat, sed efficitur justo porta</p>
          <button className="Home__button">Get Started</button>
        </div>
      </section>
      <section className="section container">
        <h2>Tops</h2>
      </section>
      <section className="section container">
        <h2>Songs</h2>
      </section>
      <section className="section container">
        <h2>Artists</h2>
      </section>
      <section className="section container">
        <h2>Genres</h2>
      </section>
    </main>
  );
}
