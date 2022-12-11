import React from 'react';
import '../styles/components/menuPremium.css';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function MenuPremium() {
  return (
    <div className='menu__container'>
      <div>
        <h1 className='logo__menu' >Soundwave</h1>
      </div>
      <div className='side__container'>
        <div className='breadcrumbs'>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" href="/">
              Songs
            </Link>
            <Link underline="hover" href="/">
              Artists
            </Link>
            <Link underline="hover" href="/">
              Genres
            </Link>
          </Breadcrumbs>
        </div>
        <button className='exit__button'>
          <LogoutOutlinedIcon/>
        </button>
      </div>
    </div>
  );
}
