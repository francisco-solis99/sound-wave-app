import React from 'react';
import '../styles/pages/songspage.css';
import SearchBar from '../components/SearchBar';
import MenuPremium from '../components/MenuPremium';

export default function SongsPage() {
  return (
    <main className='songs__page'>
      <nav>
      <MenuPremium/>
      <SearchBar />
      </nav>
    </main>
  );
};
