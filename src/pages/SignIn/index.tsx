import { useState } from 'react';
import './styles.css'

import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png'

import useAuth from '../../hooks/useAuth';
export default function SignIn() {
  const { signed,signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function handleSubmit(e: any){
    e.preventDefault();

    if (email !== '' && password !== '') {
      signIn(email, password)
    }
  }


  return (
    <div className="container-center">
      <div className='login'>
        <div className='login-area'>
          <img src={logo} alt='logo to call system' />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <input
            type="text"
            placeholder='email@email.com'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="password"
            placeholder='******'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit">Acessar</button>
        </form>

        <Link to='/register'>Criar uma conta</Link>
      </div>
    </div>
  );
}