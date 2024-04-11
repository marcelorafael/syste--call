
import './styles.css'
import useAuth from '../../hooks/useAuth';

import avatar from '../../assets/avatar.png'
import { Link } from 'react-router-dom';

import { FiHome, FiUser, FiSettings } from 'react-icons/fi'

export default function Sidebar() {
    const { user } = useAuth();
    return (
        <div className="sidebar">
            <div>
                <img src={user?.avatarUrl === null ? avatar : user?.avatarUrl} alt="Foto usuário" />
            </div>

            <Link to='/dashboards'>
                <FiHome color='#fff' size={24} />
                Chamados
            </Link>

            <Link to='/customers'>
                <FiUser color='#fff' size={24} />
                Clientes
            </Link>

            <Link to='/profile'>
                <FiSettings color='#fff' size={24} />
                Perfil
            </Link>
        </div>
    );
}