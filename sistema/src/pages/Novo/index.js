

import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiPlusCircle } from 'react-icons/fi'
import './novo.css'

export default function Novo() {

    function handleRegistro(e) {
        e.preventDefault()
        alert('teste')
    }


    return (
        <div>

            <Header />

            <div className="content">
                <Title name='Novo Chamado'>
                    <FiPlusCircle size={20} />
                </Title>

                <div className="container-novo-chamado">

                    <form className="novo-chamado" onSubmit={handleRegistro}>

                        <label>Cliente</label>
                        <select>
                            <option value={1} key={1}>Roger</option>
                        </select>

                        <label>Assunto</label>
                        <select>
                            <option value='Suporte'>Suporte</option>
                            <option value='Visita Tecnica' >Suporte</option>
                            <option value='Financeiro' >Financeiro</option>
                        </select>


                        <label>Status</label>
                        <div className="status">
                            <input
                                type="radio"
                                name='radio'
                                value='Aberto' />
                            <span>Em Aberto</span>

                            <input
                                type="radio"
                                name='radio'
                                value='Em Progresso' />
                            <span>Em Progresso</span>


                            <input
                                type="radio"
                                name='radio'
                                value='Finalizado' />
                            <span>Finalizado</span>

                        </div>

                        <label>Complemento</label>
                        <textarea
                            type='text'
                            placeholder='Descreva seu problema(opcional)'
                        />

                        <button className="novo-chamado-btn" type='submit'>Registrar</button>


                    </form>
                </div>
            </div>
        </div>
    )
}