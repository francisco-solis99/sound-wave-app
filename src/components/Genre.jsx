import React from 'react';
import '../styles/components/genre.css';

export default function Genre({ genreData }) {
    return (
        <div className='genre' style={{
            backgroundImage: 'linear-gradient(to right top, rgba(55, 70, 91, 0.7), rgba(55, 70, 91, 0.7)), url(' + genreData.urlImage + ')'
        }}>
            <h1>{genreData.name}</h1>
        </div>
    );
};