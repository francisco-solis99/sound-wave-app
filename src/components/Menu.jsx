import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/menuPremium.css';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export default function Menu() {
  const [showBar, setShowBar] = useState(false);

  return (
    <div className='Menu__container'>
      <h1 className='Logo__menu'>
        <Link to='/'>Soundwave</Link>
      </h1>
      <div className='Side__container'>
        <button className='Nav__toggle' onClick={() => setShowBar(!showBar)}>
          <MenuIcon fontSize='medium' />
        </button>
        <div className='Nav__menu' id={showBar ? 'hidden' : ''}>
          <ul className='List__menu'>
            <li>
              <Link to='/songs'>Songs</Link>
            </li>
            <li>
              <Link to='/artists'>Artists</Link>
            </li>
            <li>
              <Link to='/genres'>Genres</Link>
            </li>
          </ul>
        </div>
        <button className='User__icon'>
          <Link to='/dashboard'>
            <PersonOutlineOutlinedIcon fontSize='medium' />
          </Link>
        </button>
      </div>
    </div>
  );
}
