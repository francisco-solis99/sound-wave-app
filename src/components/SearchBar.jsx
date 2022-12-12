import React from 'react';

import '../styles/components/searchbar.css';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
    return (
        <div className="SearchBar">
            <input className='SearchBar__input' type='text' placeholder='SEARCH' />
            <button className='SearchBar__button'>
                <SearchIcon />
            </button>
        </div>
    );
};
