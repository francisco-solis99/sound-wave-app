import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/login-sign.css';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login() {
  return (
    <main className='Initial__page'>
      <div className='Initial__background'></div>
      <Form>
        <h1 className="Title" >Soundwave</h1>
        <h2 className="Subtitle">Welcome back!</h2>
        <Input type='text' placeholder='example@gmail.com' />
        <Input type='password' placeholder='password' />
        <Button type="primary">LOGIN</Button>
        <p className="Last__line">
          New user?
          <Link to="/signup" id="inicio"><strong>Sign up</strong></Link>
        </p>
      </Form>
    </main>
  );
}
