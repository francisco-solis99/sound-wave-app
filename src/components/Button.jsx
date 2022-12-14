import React from 'react';
import '../styles/components/button.css';

export default function Button({ typeStyle, onClick, children, type = 'button' }) {

  const buttonConf = {
    typesStyles: {
      primary: 'primary',
      secundary: 'secundary'
    }
  };

  return (
    <button className={`Button ${buttonConf.typesStyles[typeStyle] ?? ''}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
