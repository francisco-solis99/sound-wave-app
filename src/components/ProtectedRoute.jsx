import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getUser } from '../services/auth/auth';

export default function ProtectedRoute({ user, children }) {
  const location = useLocation();


  if (!user && !getUser()) {
    console.log('Entry here');
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }

  return (
    children
  );
}
