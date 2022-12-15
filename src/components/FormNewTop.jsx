import React, { useState } from 'react';
import '../styles/components/modals.css';
import { createTop } from '../services/tops/tops';
import { getUser } from '../services/auth/auth';

// Display the form for creating a new Top
// Handle the POST method to create a new Top
export default function FormNewTop({ setAlert, setSuccess, handlerChangeUserTops }) {
    const [topName, setTopName] = useState('');
    const [topDescription, setTopDescription] = useState('');

    const handleTopSubmit = (e) => {
        e.preventDefault();
        const { userId } = JSON.parse(getUser());
        createTop(topName, topDescription, userId)
            .then(async (response) => {
                const { data: newTop } = await response.json();
                handlerChangeUserTops((prev) => {
                    return [
                        ...prev,
                        newTop
                    ];
                });
                setSuccess(response.ok);
            })
            .catch(err => console.log(err))
            .finally(() => {
                setTopName('');
                setTopDescription('');
                setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                }, 2000);
            });
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
                        value={topName || ''}
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
                        value={topDescription || ''}
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
