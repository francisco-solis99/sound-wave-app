import React from 'react';
import '../styles/pages/notfound.css';
import NotFoundImg from '../assets/notfound.png';

export default function NotFound() {
  return (
    <div className='NotFound'>
      <img src={NotFoundImg} alt="Not found icon" className='NotFound__img' />
      <p className='NotFound__text'>Please don't stop the music, <a href=''>go back home</a> .</p>

    </div>
  );
}
