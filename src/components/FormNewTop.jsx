import React, { useState } from 'react';
import '../styles/components/modals.css';
// import { createTop } from '../services/tops/tops';

export default function FormNewTop({ userData, setAlert, setSuccess }) {
    const [topName, setTopName] = useState('');
    const [topDescription, setTopDescription] = useState('');

    const handleTopSubmit = (e) => {
        e.preventDefault();
        console.log(topName, topDescription);
        // createTop(e, topName, topDescription, userData.id)
        //     .then(response => setSuccess(response.ok));
        setTopName('');
        setTopDescription('');
        setAlert(true);
    };

    return (
        <form onSubmit={handleTopSubmit}>
            <div className='modal-input'>
                <label className='modal-label' htmlFor='topName'>
                    Name:
                    <input
                        className='modal-input-field'
                        type='text'
                        name='topName'
                        id='topName'
                        required
                        onChange={(e) => setTopName(e.target.value)}
                    ></input>
                </label>
            </div>
            <div className='modal-input'>
                <label className='modal-label' htmlFor='topDescription'>
                    Description:
                    <input
                        className='modal-input-field'
                        type='text'
                        name='topDescription'
                        id='topDescription'
                        required
                        onChange={(e) => setTopDescription(e.target.value)}
                    ></input>
                </label>
            </div>

            <input
                type='submit'
                value='Submit'
                className='btn btn-primary'
            />
        </form>
    );
}
