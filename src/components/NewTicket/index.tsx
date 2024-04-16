
import Sidebar from "../Sidebar";
import Title from "../Title";

import { FiPlusCircle } from 'react-icons/fi'

import './styles.css'
import { useState } from "react";

import useAuth from "../../hooks/useAuth";


const NewTicket = () => {
  const { customers, loadCustomers } = useAuth();

  
  const [customersSelected, setCustomersSelected] = useState<any>(0);

  const [complement, setComplement] = useState('');
  const [topic, setTopic] = useState('Suporte');
  const [status, setStatus] = useState('Aberto');

  function handleOptionChange(e: any) {
    setStatus(e.target.value);

  }

  function handleChangeSelect(e: any) {
    setTopic(e.target.value);
  }


  function handleChangeCustomers(e: any) {
    setCustomersSelected(e.target.value)
  }


  return (
    <div>
      <Sidebar />

      <div className="content">
        <Title name="Novo chamado">
          <FiPlusCircle size={25} />
        </Title>

        <div className="container">

          <form className="form-profile">

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

            <button type="submit">Registrar</button>

          </form>

        </div>
      </div>

    </div>
  );
}

export default NewTicket