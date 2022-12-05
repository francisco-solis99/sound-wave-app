import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../../pages/Home';
import Login from '../../pages/Login';
import SignUp from '../../pages/SignUp';
import NotFound from '../../pages/NotFound';
import Dashboard from '../../pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Navigate to="/" />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      {/* Protected route */}
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
