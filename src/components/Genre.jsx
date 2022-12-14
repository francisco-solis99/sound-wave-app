import React from 'react';
import '../styles/components/genre.css';

export default function Genre({ genreData }) {
    return (
        <div className='Genre' style={{
            backgroundImage: 'linear-gradient(to right top, rgba(55, 70, 91, 0.7), rgba(55, 70, 91, 0.7)), url(' + genreData.urlImage + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maxWidth: '500px'
        }}>
            <h1>{genreData.name}</h1>
        </div>
    );
};
