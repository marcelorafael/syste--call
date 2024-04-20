
import Sidebar from "../Sidebar";
import Title from "../Title";

import { FiPlusCircle } from 'react-icons/fi'

import './styles.css'
import { useEffect, useState } from "react";

import useAuth from "../../hooks/useAuth";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConn";


const NewTicket = () => {
  const { customers, loadCustomers, registerTicket, listCustomers, user } = useAuth();
  const { id }: string | any = useParams()
  const navigate = useNavigate()


  const [customersSelected, setCustomersSelected] = useState<any>(0);

  const [complement, setComplement] = useState('');
  const [topic, setTopic] = useState('Suporte');
  const [status, setStatus] = useState('Aberto');
  const [idCustomer, setIdCustomer] = useState(false);

  function handleOptionChange(e: any) {
    setStatus(e.target.value);

  }

  function handleChangeSelect(e: any) {
    setTopic(e.target.value);
  }


  function handleChangeCustomers(e: any) {
    setCustomersSelected(e.target.value)
  }

  async function handleRegisterTicket(e: any) {
    e.preventDefault();

    if (idCustomer) {
      const docRef = doc(db, 'tickets', id);
      await updateDoc(docRef, {
        client: customers[customersSelected].companyName,
        clientId: customers[customersSelected].id,
        topic: topic,
        complement: complement,
        status: status,
        userId: user?.uid
      })
      .then(() => {
        toast.info('Chamado atualizado com sucesso!');
        setCustomersSelected(0);
        setComplement('');
        navigate('/dashboards')
      })
      .catch((error: any) => {
        toast.error('Erro ao atualizar este chamado!');
        console.log(error)
      })
      return
    }

    try {
      await registerTicket(customersSelected, topic, complement, status)

      toast.success("Chamado registrado!")
      setComplement('')
      setCustomersSelected(0)
    } catch (error) {
      console.log('Erro a registrar chamado!', error)
      toast.error("Ops erro ao registrar, tente mais tarde!")
    }

  }

  async function loadId(listCustomers: any, id: any) {
    const docRef = doc(db, 'tickets', id);
    await getDoc(docRef)
      .then((snapShot: any) => {
        setTopic(snapShot.data().topic);
        setStatus(snapShot.data().status);
        setComplement(snapShot.data().complement);

        let index = listCustomers.findIndex((item: any) => item.id === snapShot.data().clientId);

        setCustomersSelected(index);

        setIdCustomer(true);

      })
      .catch((error: any) => {
        console.log('', error)
      })
  }

  useEffect(() => {
    if (id) {
      loadId(listCustomers, id)
    }
  }, [id])
  return (
    <div>
      <Sidebar />

      <div className="content">
        <Title name={id ? `Edição - ${customers[customersSelected]?.companyName}` : 'Novo chamado'}>
          <FiPlusCircle size={25} />
        </Title>

        <div className="container">

          <form className="form-profile" onSubmit={handleRegisterTicket}>

            <label>Clientes</label>
            {
              loadCustomers ? (
                <input type="text" disabled value='carregando...' />
              ) : (
                <select value={customersSelected} onChange={handleChangeCustomers}>
                  {customers.map((item: any, index: any) => (
                    <option key={index} value={index}>
                      {item?.companyName}
                    </option>
                  ))}
                </select>
              )
            }

            <label>Assunto</label>
            <select value={topic} onChange={handleChangeSelect}>
              <option key={1} value='suporte'>Suporte</option>
              <option key={1} value='visita tecnica'>Visita técnica</option>
              <option key={1} value='financeiro'>Financeiro</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="radio"
                value="Aberto"
                onChange={handleOptionChange}
                checked={status === 'Aberto'}
              />
              <span>Em aberto</span>

              <input
                type="radio"
                name="radio"
                value="Progresso"
                onChange={handleOptionChange}
                checked={status === 'Progresso'}
              />
              <span>Progresso</span>

              <input
                type="radio"
                name="radio"
                value="Atendido"
                onChange={handleOptionChange}
                checked={status === 'Atendido'}
              />
              <span>Atendido</span>
            </div>

            <label>Complemento</label>
            <textarea
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
              placeholder="Descreva seu problema (Opcional)"
            />

            <button type="submit" style={{ backgroundColor: loadCustomers && 'gray' }} disabled={loadCustomers}>
              {
                loadCustomers ? 'Carregando...' : 'Registrar'
              }
            </button>

          </form>

        </div>
      </div>

    </div>
  );
}

export default NewTicket