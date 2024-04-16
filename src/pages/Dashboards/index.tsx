
import { toast } from "react-toastify";
import Toastify from "../../components/Toastify";
import Sidebar from "../../components/Sidebar";
import Title from "../../components/Title";

import './styles.css'

import useAuth from "../../hooks/useAuth";

import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from "react-router-dom";

import useToast from "../../hooks/useToast";

export default function Dashboards() {
  const { logout } = useAuth();
  const { notifyError, notifySuccess } = useToast();

  async function handleLogout() {
    await logout()
  }


  return (
    <div>
      <Sidebar />
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Sair</button>

      {/* <Toastify /> */}

      <div className="content">
        <Title name="Tickets">
          <FiMessageSquare size={25} />
        </Title>

        <>
          <Link to='/newTicket' className="new">
            <FiPlus color="#fff" size={25} />
            Novo chamado
          </Link>
          <table>
            <thead>
              <tr>
                <th scope="col">Cliente</th>
                <th scope="col">Assunto</th>
                <th scope="col">Status</th>
                <th scope="col">Cadastrado em</th>
                <th scope="col">#</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td data-label='Cliente'> Mercado esquina</td>
                <td data-label='Suporte'> Suporte</td>
                <td data-label='Status'>
                  <span className="badge" style={{ backgroundColor: '#999' }}>
                    Em aberto
                  </span>
                </td>
                <td data-label='Cadastrado'> 12/12/24</td>
                <td data-label='#'>
                  <button className="action" style={{ backgroundColor: '#3583f3' }}>
                    <FiSearch color="#fff" size={17} />
                  </button>
                  <button className="action" style={{ backgroundColor: '#f6a935' }}>
                    <FiEdit2 color="#fff" size={17} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      </div>
    </div>
  );
}