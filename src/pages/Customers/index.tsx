import { FiUser } from "react-icons/fi";
import Sidebar from "../../components/Sidebar";
import Title from "../../components/Title";

import './styles.css'
import { useState } from "react";

import { db } from "../../services/firebaseConn";
import { addDoc, collection } from "firebase/firestore";
import Toastify from "../../components/Toastify";
import { toast } from 'react-toastify'

import useAuth from "../../hooks/useAuth";


export default function Customers() {
    const { registerCustomers } = useAuth();

    const [companyName, setCompanyName] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [address, setAddress] = useState('')

    async function handleRegister(e: any) {
        e.preventDefault()

        if (companyName !== '' && cnpj !== '' && address !== '') {

            try {
                registerCustomers(companyName, cnpj, address)
                setCompanyName('')
                setCnpj('')
                setAddress('')
                toast.success('Empresa cadastrada com sucesso!')
            } catch (error) {
                console.log('Error register customers: ', error)
                toast.error('Erro ao cadastrar empresa.!')
            }

        } else {
            toast.error('Prrencha todos os campos!')
        }
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
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
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

            <Toastify />

        </div>
    );
}