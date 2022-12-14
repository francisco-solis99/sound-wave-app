import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/notfound.css';
import NotFoundImg from '../assets/notfound.png';
import AnimatedComponent from '../components/AnimatedComponent';

export default function NotFound() {
  return (
    <AnimatedComponent>
      <div className='NotFound'>
        <img src={NotFoundImg} alt='Not found icon' className='NotFound__img' />
        <p className='NotFound__text'>Please don't stop the music, <Link to='/' className='NotFound__link'>go back home</Link> .</p>
      </div>
    </AnimatedComponent>
  );
}
