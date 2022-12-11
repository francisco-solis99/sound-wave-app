import React from 'react';
import '../styles/components/navbar.css';
import SearchBar from './SearchBar';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export default function NavBar(){
    return(
        <div className='navbar'>
            <div>
                <SearchBar/>
            </div>
            <button className='user__icon'>
                <PersonOutlineOutlinedIcon/>
            </button>   
        </div>
    ); 
}