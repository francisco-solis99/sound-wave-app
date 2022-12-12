import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/login-sign.css';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';

export default function SignUp() {
  return (
    <main className='Initial__page'>
      <div className='Initial__background'></div>
      <Form>
        <h1 className="Title" >Soundwave</h1>
        <h2 className="Subtitle">Welcome!</h2>
        <Input type='text' placeholder='example@gmail.com' />
        <Input type='password' placeholder='password' />
        <Input type="password" placeholder='confirm password' />
        <Button type="primary">SIGN UP</Button>
        <p className="Last__line">
          Already a user?
          <Link to="/login" id="inicio"><strong> Login</strong></Link>
        </p>
      </Form>
    </main>
  );
}
