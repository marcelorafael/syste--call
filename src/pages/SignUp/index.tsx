import { useState } from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

import logo from '../../assets/logo.png'

export default function SignUp() {
  const { signUp, loadingAuth } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (name !== '' && email !== '' && password !== '') {
      await signUp(name, email, password);

      setName('')
      setEmail('')
      setPassword('')
    }
  }


  return (
    <div className="container-center">
      <div className='login'>
        <div className='login-area'>
          <img src={logo} alt='logo to call system' />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Nova Conta</h1>
          <input
            type="text"
            placeholder='Seu nome'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

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

          <button type="submit" disabled={loadingAuth} style={{ backgroundColor: loadingAuth && 'gray', cursor: loadingAuth && 'not-allowed' }}>
            {!loadingAuth ? 'Cadastrar' : 'Carregando...'}
          </button>
        </form>

        <Link to='/'>Já possui uma conta? Faça login</Link>
      </div>
    </div>
  );
}