
import './styles.css';
import { FiX } from 'react-icons/fi'

export default function Modal() {
    return (
        <div className="modal">
            <div className="container">
                <button className="close">
                    <FiX size={25} color='#000' />
                    {/* Fechar */}
                </button>

                <main>
                    <h2>Detalhes do chamado</h2>

                    <div className='row'>
                        <span>
                            Clientes: <i>Mercado</i>
                        </span>
                    </div>

                    <div className='row'>
                        <span>
                            Assunto: <i>Suporte</i>
                        </span>
                        <span>
                            Cadastrado em: <i>22/03/2024</i>
                        </span>
                    </div>

                    <div className='row'>
                        <span>
                            Status: <i>Aberto</i>
                        </span>
                    </div>

                    <>
                        <h3>Complemento</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias delectus suscipit, ipsum itaque facilis deserunt ea debitis error quo autem earum quos voluptatem illo ducimus, eum accusantium exercitationem a? Illum!
                        </p>
                    </>


                </main>
            </div>
        </div>
    );
}