
import { toast } from "react-toastify";
import Toastify from "../../components/Toastify";
import Sidebar from "../../components/Sidebar";
import Title from "../../components/Title";

import './styles.css'

import useAuth from "../../hooks/useAuth";

import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from "react-router-dom";

import useToast from "../../hooks/useToast";
import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebaseConn";

import { format } from 'date-fns'

const listRef = collection(db, 'tickets');

export default function Dashboards() {
  const { logout } = useAuth();
  const { notifyError, notifySuccess } = useToast();

  const [tickets, setTickets] = useState<any>([]);
  const [loadingTickets, setLoadingTickets] = useState(true);

  async function handleLogout() {
    await logout()
  }

  async function updateState(querySnapshot: any) {
    console.log('querySnapshot: ', querySnapshot.size)
    const isCollectionEmpty = querySnapshot?.size === 0;

    if (!isCollectionEmpty) {
      let list: { id: any; topic: any; client: any; clientId: any; created: any; status: any; complement: any; createdFormat: any; }[] = [];

      querySnapshot.forEach((doc: any) => {
        list.push({
          id: doc.id,
          topic: doc.data().topic,
          client: doc.data().client,
          clientId: doc.data().clientId,
          created: doc.data().created,
          createdFormat: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
          status: doc.data().status,
          complement: doc.data().complement,
        })
      });

      setTickets((ticketsReceived: any) => [...ticketsReceived, ...list])
    }
  }

  useEffect(() => {
    async function getTickets() {
      const q = query(listRef, orderBy('created', 'desc'), limit(5));

      const querySnapshot = await getDocs(q)
      setTickets([])

      updateState(querySnapshot)

      setLoadingTickets(false);
    }

    getTickets();

    return () => { }
  }, [])

  if(loadingTickets){
    return (
      <div>
        <Sidebar />
        <div className="content">
          <Title name="Tickets">
            <FiMessageSquare size={25} />
          </Title>

          <div className="container dashboards">
            <span>Bucando chamados...</span>
          </div>
        </div>
      </div>
    )
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

          {tickets.length === 0 ? (
            <div className="container dashboards">
              <span>Nenhum chamado registrado</span>
              <Link to='/newTicket' className="new">
                <FiPlus color="#fff" size={25} />
                Novo chamado
              </Link>
            </div>
          ) : (
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

                  {tickets.map((item: any, index: any) => (
                    <tr key={index}>
                      <td data-label='Cliente'>{item?.client}</td>
                      <td data-label='Suporte'> {item?.topic}</td>
                      <td data-label='Status'>
                        <span className="badge" style={{ backgroundColor: '#999' }}>
                          {item?.status}
                        </span>
                      </td>
                      {/* <td data-label='Cadastrado'>{item?.created}</td> */}
                      <td data-label='Cadastrado'>{item?.createdFormat}</td>
                      <td data-label='#'>
                        <button className="action" style={{ backgroundColor: '#3583f3' }}>
                          <FiSearch color="#fff" size={17} />
                        </button>
                        <button className="action" style={{ backgroundColor: '#f6a935' }}>
                          <FiEdit2 color="#fff" size={17} />
                        </button>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </>
          )}

        </>
      </div>
    </div>
  );
}