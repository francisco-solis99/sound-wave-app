import React from 'react';
import '../styles/components/form.css';

export default function Form({ children }) {
  return (
    <form>
      {children}
    </form>
  );
};
