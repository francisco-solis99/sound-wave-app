import React from 'react';
import '../styles/components/genres.css';

export default function Genre({genreData}){
    return(
        <div className='genre' style={{
            backgroundImage: 'linear-gradient(to right top, rgba(154, 0, 162, 0.6), rgba(98, 49, 152, 0.6), rgba(52, 56, 127, 0.6), rgba(30, 52, 93, 0.6), rgba(33, 43, 56, 0.6)), url(' + genreData.urlImage + ')'
        }}>
            <h1>{genreData.name}</h1>
        </div>
    );
};