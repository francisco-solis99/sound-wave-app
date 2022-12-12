import React from 'react';

import '../styles/components/navbar.css';
import SearchBar from './SearchBar';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export default function NavBar() {
    return (
        <nav className='navbar'>
            <SearchBar />
            <button className='user__icon'>
                <PersonOutlineOutlinedIcon />
            </button>
        </nav>
    );
}
