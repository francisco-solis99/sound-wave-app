import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';
import SongsPage from '../pages/SongsPage';
import ArtistsPage from '../pages/ArtistsPage';
import GenresPage from '../pages/GenresPage';

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Navigate to="/" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/songs' element={<SongsPage />} />
        <Route path='/artists' element={<ArtistsPage />} />
        <Route path='/genres' element={<GenresPage />} />
        {/* Protected route */}
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/*' element={<NotFound />} />

      </Routes>
    </div>
  );
}

export default App;
