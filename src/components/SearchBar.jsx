import React, { useRef } from 'react';
import '../styles/components/searchbar.css';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({ searchCallback }) {
    const inputSearch = useRef();

    const handlerSearch = () => {
        if (inputSearch.current.value === '') return;
        const searchValue = inputSearch.current.value;
        searchCallback(searchValue);
        inputSearch.current.value = '';
    };

    return (
        <div className="SearchBar">
            <input className='SearchBar__input' type='text' placeholder='SEARCH' ref={inputSearch} onKeyUp={(e) => {
                if (e.key !== 'Enter') return;
                handlerSearch();
            }} />
            <button className='SearchBar__button' onClick={() => handlerSearch()}>
                <SearchIcon />
            </button>
        </div>
    );
};
