import React from 'react';
import '../styles/components/searchbar.css';
// import SearchIcon from '@mui/icons-material/Search';
import searchIcon from '../assets/icons/loupe.svg';

export default function SearchBar(){
    return(
        <div className='search__bar'>
            <input className='search__input' type='text' placeholder='SEARCH'/>
            <button className='search__button'>
            <img src={searchIcon} alt='search icon'/>
            </button>
        </div>
    );   
}; 