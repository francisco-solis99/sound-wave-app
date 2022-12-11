import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/pages/login.css';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login() {
  return (
    <main className='Login__page'>
      <div className='Login__background'></div>
      <Form>
        <h1 className="Login__title" >Soundwave</h1>
        <h2 className="Login__subtitle">Welcome back!</h2>
        <Input type='text' placeholder='example@gmail.com' />
        <Input type='password' placeholder='Password' />
        <br></br>
        <Button type="primary">Login</Button>
        <p className="Last__line">
          New user?
          <Link to="/signup"><strong>Sign up</strong></Link>
        </p>
      </Form>
    </main>
  );
}
