
import './styles.css';
import { FiX } from 'react-icons/fi'

interface ModalProps {
    content?: any;
    close?: () => void;
}

export default function Modal({
    content,
    close
}:ModalProps) {

    return (
        <div className="modal">
            <div className="container">
                <button className="close" onClick={close}>
                    <FiX size={25} color='#000' />
                </button>

                <main>
                    <h2>Detalhes do chamado</h2>

                    <div className='row'>
                        <span>
                            Clientes: <i>{content?.client}</i>
                        </span>
                    </div>

                    <div className='row'>
                        <span>
                            Assunto: <i>{content?.topic}</i>
                        </span>
                        <span>
                            Cadastrado em: <i>{content?.createdFormat}</i>
                        </span>
                    </div>

                    <div className='row'>
                        <span >
                            Status: <i style={{ backgroundColor: content?.status === 'Aberto' ? '#5cb85c' : content?.status === 'Progresso' ? '#f6a935' : '#999', borderRadius: 5, color: '#fff' }}>{content?.status}</i>
                        </span>
                    </div>

                    <>
                        <h3>Complemento</h3>
                        <p>
                            {content?.complement !== '' ? content?.complement : '-- Sem detalhes --'}
                        </p>
                    </>


                </main>
            </div>
        </div>
    );
}