

import { useState } from 'react'
import './clientes.css'
import Title from '../../components/Title'
import Header from '../../components/Header'
import firebase from '../../services/firebaseConnection'
import { FiUser } from 'react-icons/fi'
import {toast} from 'react-toastify'

export default function Clientes() {
    const [nomeFantasia, setNomeFantasia] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [endereco, setEndereco] = useState('')

    async function handleAdd(e) {
        e.preventDefault()

        if (nomeFantasia !== '' && cnpj !== '' && endereco !== '') {
            await firebase.firestore().collection('clientes').add({
                nomeFantasia: nomeFantasia,
                cnpj: cnpj,
                endereco: endereco
            })
            .then(() => {
                setNomeFantasia('')
                setCnpj('')
                setEndereco('')
                toast.info('Empresa cadastrada com sucesso')
            })
            .catch((error) =>{
                console.log(error)
                toast.error('Erro ao cadastrar essa empresa')
            })
        }else{
            toast.error('Preencha todos os campos')
        }
    }





    return(

        <div>
            <Header/>

            <div className="content">
                <Title name='Cadastrar Cliente'>
                    <FiUser size={20}/>
                </Title>

                <div className="container-cliente">
                    <form className="form-perfil clientes" onSubmit={handleAdd}>
                        <label>Nome Fantasia</label>
                        <input type="text" placeholder='Nome da sua empresa' value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} />

                        <label>CNPJ</label>
                        <input type="text" placeholder='CNPJ da sua empresa' value={cnpj} onChange={(e) => setCnpj(e.target.value)} />

                        <label>Endereço</label>
                        <input type="text" placeholder='Endereço da sua empresa' value={endereco} onChange={(e) => setEndereco(e.target.value)} />

                        <button type='submit'>Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}