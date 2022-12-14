import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';
import SongsPage from '../pages/SongsPage';
import ArtistsPage from '../pages/ArtistsPage';
import GenresPage from '../pages/GenresPage';
import ProtectedRoute from '../components/ProtectedRoute';
import { setToken } from '../services/auth/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedSoundwaveApp');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  return (
    <div className="wrapper">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Navigate to="/" />} />
        <Route path='/login' element={<Login handlerChangeUser={setUser} />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/songs' element={<SongsPage />} />
        <Route path='/artists' element={<ArtistsPage />} />
        <Route path='/genres' element={<GenresPage />} />
        {/* Protected route */}

        <Route path='/dashboard' element={
          <ProtectedRoute user={user}>
            <Dashboard handlerChangeUser={setUser} />
          </ProtectedRoute>
        } />
        <Route path='/*' element={<NotFound />} />

      </Routes>
    </div>
  );
}

export default App;
