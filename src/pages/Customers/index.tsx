import { FiUser } from "react-icons/fi";
import Sidebar from "../../components/Sidebar";
import Title from "../../components/Title";

import './styles.css'
import { useState } from "react";


export default function Customers() {
    const [name, setName] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [address, setAddress] = useState('')

    function handleRegister(e: any){
        e.preventDefault()

        alert('teste')
    }


    return (
        <div>
            <Sidebar />
            <div className='content'>
                <Title name='Clientes'>
                    <FiUser size={25} />
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleRegister}>
                        <label>Nome fantasia</label>
                        <input
                            type="text"
                            placeholder="Nome da empresa"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label>CNPJ</label>
                        <input
                            type="text"
                            placeholder="CNPJ"
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                        />

                        <label>Endereço</label>
                        <input
                            type="text"
                            placeholder="Endereço da empresa"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        <button type="submit">
                            Salvar
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
}