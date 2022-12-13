import React from 'react';
import '../styles/components/button.css';

export default function Button({ type, onClick, children }) {
  const buttonConf = {
    types: {
      primary: 'primary',
      secundary: 'secundary'
    }
  };

  return (
    <button className={`Button ${buttonConf.types[type] ?? ''}`} type="button" onClick={onClick}>
      {children}
    </button>
  );
}
