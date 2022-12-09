import React from 'react';
import '../styles/components/navbar.css';
import SearchBar from './SearchBar';
import UserIcon from '../assets/icons/user.svg';

export default function NavBar(){
    return(
        <div className='navbar'>
            <SearchBar/>
            <button className='user__icon'>
            <img src={UserIcon} alt='user icon'/>
            </button>   
        </div>
    ); 
}