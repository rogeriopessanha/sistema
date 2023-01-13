import './dashboard.css'
import { useState } from 'react'

// import { useContext } from "react"
// import { AuthContext } from "../../contexts/auth"

import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiMessageSquare, FiPlus, FiSearch,FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function Dashboard() {
    const [chamados, setChamados] = useState([1])

    // const {signOut} = useContext(AuthContext)
    return (
        <div>
            <Header />

            <div className="content">
                <Title name='Atendimentos'>
                    <FiMessageSquare size={20} />
                </Title>

                {chamados.length === 0 ? (
                    <div className="container-dashboard">
                        <span>Nenhum chamado registrado</span>

                        <Link to='/novo' className="novo">
                            <FiPlus size={20} color='#fff' />
                            Novo chamado
                        </Link>
                    </div>
                )  :(
                   <>
                   <Link to='/novo' className="novo">
                            <FiPlus size={20} color='#fff' />
                            Novo chamado
                        </Link>

                        <table>
                            <thead>
                                <tr>
                                    <th scope='col'>Cliente</th>
                                    <th scope='col'>Assunto</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'>Cadastrado em</th>
                                    <th scope='col'>#</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td data-label='Cliente'>Sujeito</td>
                                    <td data-label='Assunto'>Assunto</td>
                                    <td data-label='Status'>
                                        <span className="andamento" style={{backgroundColor: '#5cb85c'}}>Em aberto</span>
                                    </td>
                                    <td data-label='Cadastrado'>12/01/2023</td>
                                    <td data-label='#'>
                                        <button className="btn-acao" style={{backgroundColor: '#3583f6'}}>
                                            <FiSearch color='#fff' size={16}/>
                                        </button>

                                        <button className="btn-acao" style={{backgroundColor: '#f6a935'}}>
                                            <FiEdit2 color='#fff' size={16}/>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                   </> 
                )}


            </div>


        </div>
    )
}