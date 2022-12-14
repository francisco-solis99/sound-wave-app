import React from 'react';
import '../styles/components/form.css';

export default function Form({ children, callbackSubmit }) {

  const handlerSubmit = (e) => {
    e.preventDefault();
    callbackSubmit();
  };

  return (
    <form className='Form' onSubmit={handlerSubmit}>
      {children}
    </form>
  );
};
