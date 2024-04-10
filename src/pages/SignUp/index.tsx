import { useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png'

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <div className="container-center">
      <div className='login'>
        <div className='login-area'>
          <img src={logo} alt='logo to call system' />
        </div>

        <form action="">
          <h1>Nova Conta</h1>
          <input
            type="text"
            placeholder='Seu nome'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="text"
            placeholder='email@email.com'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="text"
            placeholder='******'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit">Cadastrar</button>
        </form>

        <Link to='/'>Já possui uma conta? Faça login</Link>
      </div>
    </div>
  );
}