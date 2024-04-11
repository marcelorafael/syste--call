import { useState } from 'react';
import './styles.css'

import Toastify from '../../components/Toastify';
import { toast } from 'react-toastify';

import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png'

import useAuth from '../../hooks/useAuth';
export default function SignIn() {
  const { signed, signIn, loadingAuth } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  async function handleSubmit(e: any) {
    e.preventDefault();

    if (email !== '' && password !== '') {
      
        const result = await signIn(email, password);

        if(result?.name === 'FirebaseError'){
          toast.error('Erro no login, verique seu email e senha!!!')
          return
        }
      
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

          <button
            type="submit"
            style={{
              backgroundColor: loadingAuth && 'gray',
              cursor: loadingAuth && 'not-allowed'
            }}
            disabled={loadingAuth ? true : false}
          >{!loadingAuth ? 'Acessar' : 'Carregando...'}</button>
        </form>

        <Link to='/register'>Criar uma conta</Link>
      </div>
      <Toastify />
    </div>
  );
}