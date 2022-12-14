import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import SongsPage from '../pages/SongsPage';
import ArtistsPage from '../pages/ArtistsPage';
import GenresPage from '../pages/GenresPage';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';

function App() {
  const location = useLocation();

  return (
    <div className="wrapper">
      <AnimatePresence mode='wait'>
        <Routes key={location.pathname} location={location} >
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Navigate to="/" />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/songs' element={<SongsPage />} />
          <Route path='/artists' element={<ArtistsPage />} />
          <Route path='/genres' element={<GenresPage />} />
          {/* Protected routes */}
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
