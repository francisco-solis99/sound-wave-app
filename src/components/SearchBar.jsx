import React from 'react';

import '../styles/components/searchbar.css';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
    return (
        <div className="SearchBar">
            <input className='search__input' type='text' placeholder='SEARCH' />
            <button className='search__button'>
                <SearchIcon />
            </button>
        </div>
    );
};
