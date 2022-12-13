import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/menuPremium.css';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function Menu() {
  const [showBar, setShowBar] = useState(false);

  return (
    <div className="menu__container">
      <h1 className="logo__menu">
        <Link to="/">Soundwave</Link>
      </h1>
      <div className="side__container">
        <button
          className="nav__toggle"
          onClick={() => {
            setShowBar(!showBar);
          }}
        >
          <MenuIcon fontSize='medium'/>
        </button>
        <div className="nav__menu" id={showBar ? 'hidden' : ''}>
          <ul className="list__menu">
            <li>
              <Link to="/songs">Songs</Link>
            </li>
            <li>
              <Link to="/artists">Artists</Link>
            </li>
            <li>
              <Link to="/genres">Genres</Link>
            </li>
          </ul>
        </div>
        <button className="user__icon">
          <Link to="/signup">
            <PersonOutlineOutlinedIcon fontSize='medium'/>
          </Link>
        </button>
        <button className="exit__button">
          <Link to="/dashboard">
            <LogoutOutlinedIcon fontSize='medium'/>
          </Link>
        </button>
      </div>
    </div>
  );
}
