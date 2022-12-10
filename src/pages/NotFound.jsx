import React from 'react';
import '../styles/pages/notfound.css';
import NotFoundImg from '../assets/notfound.png';

export default function NotFound() {
  return (
    <div className='NotFound'>
      <img src={NotFoundImg} alt="Not found icon" className='NotFound__img' />

      <p>Sorry! The page you were looking for could not be found. <br /><br />
        But please don't stop the music, <a href="" className='NotFound__return'> go back home </a>.</p>
    </div>
  );
}
