import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import Input from '../components/Input';
import '../styles/pages/signup.css';

export default function SignUp() {
  return (
    <main className='SignUp__page'>
      <div className='SignUp__background'></div>
      <Form>
        <h1 className="SignUp__title" >Soundwave</h1>
        <h2 className="SignUp__subtitle">Welcome!</h2>
        <Input type='text' placeholder='example@gmail.com' />
        <Input type='password' placeholder='Password' />
        <Input type='text' placeholder='Confirm password' /><br></br>
        <button className='SignUp__button'> Login</button>
        <p className="Last__line2">
          Already a user?
          <Link to="/signup"><strong>Login</strong></Link>
        </p>
      </Form>
    </main>
  );
}