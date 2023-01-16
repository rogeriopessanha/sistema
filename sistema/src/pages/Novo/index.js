
import { useState, useEffect, useContext } from 'react'
import firebase from '../../services/firebaseConnection'
import {useHistory, useParams} from 'react-router-dom'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { AuthContext } from '../../contexts/auth'
import { toast } from 'react-toastify';
import { FiPlusCircle } from 'react-icons/fi'
import './novo.css'



export default function Novo() {
    const {id} = useParams()
    const History = useHistory()

    const[loadClientes, setLoadClientes] = useState(true)
    const [clientes, setClientes] = useState([])
    const [clienteSelecionado, setClienteSelecionado] = useState(0)

    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto')
    const [complemento, setComplemento] = useState('')
    const {user} = useContext(AuthContext)
    const [idCliente, setIdCliente] = useState('')

    useEffect(() =>{
        async function loadClientes() {
            await firebase.firestore().collection('clientes')
            .get()
            .then((snapshot) =>{
                let lista = []

                snapshot.forEach((doc) =>{
                    lista.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeFantasia
                    })
                })

                if (lista.length === 0) {
                    console.log('NENHUMA EMPRESA ENCONTRADA')
                    setClientes([{id: '1', nomeFantasia: 'EMPRESA NÃO CADASTRADA'}])
                    setLoadClientes(false)
                    return
                }

                setClientes(lista)
                setLoadClientes(false)

                if (id) {
                    loadId(lista)
                }
            })

            .catch((error) =>{
                console.log('OPS! DEU ALGUM ERRO', error)
                setLoadClientes(false)
                setClientes([{id: '1', nomeFantasia: ''}])
            })
        }

        loadClientes()

    }, [id])

    async function loadId(Lista) {
        await firebase.firestore().collection('chamados').doc(id)
        .get()
        .then((snapshot) =>{
            setAssunto(snapshot.data().assunto)
            setStatus(snapshot.data().status)
            setComplemento(snapshot.data().complemento)

            let index = Lista.findIndex(item => item.id === snapshot.data().clienteId)
            setClienteSelecionado(index)
            setIdCliente(true)
        })
        .catch((err) => {
            console.log('ERRO NO ID INFORMADO: ', err )
            setIdCliente(false)
        })
    }

    async function handleRegistro(e) {
        e.preventDefault()
        
        await firebase.firestore().collection('chamados')
        .add({
            created: new Date(),
            cliente: clientes[clienteSelecionado].nomeFantasia,
            clienteId: clientes[clienteSelecionado].id,
            assunto: assunto,
            status: status,
            complemento: complemento,
            userId: user.uid
        })

        .then(()=> {
            toast.success('Chamado criado com sucesso')
            setComplemento('')
            setClienteSelecionado(0)
        })

        .catch((err) =>{
            toast.error('Ops! erro ao registrar, tente mais tarde')
            console.log(err)
        })
    }

    //chama quando troca o assunto
    function handleChangeSelect(e){
        setAssunto(e.target.value);
    }
    
    //chama quando troca o status
    function handleOptionChange(e) {
        setStatus(e.target.value)
      }

      //chamado quando troca de cliente
      function handleChangeClientes(e) {
        // console.log('index do cliente selecionado', e.target.value)
        // console.log('cliente selecionado', clientes[e.target.value])
        setClienteSelecionado(e.target.value)
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

                        {loadClientes ? (
                            <input type="text" disabled={true} value='Carregando clientes...' />
                        ) : (

                            <select value={clienteSelecionado} onChange={handleChangeClientes}>
                            {clientes.map((item, index) =>{
                                return(
                                   <option value={index} key={item.id}>
                                    {item.nomeFantasia}
                                   </option>
                                )
                            })}
                        </select>

                        )}
                        

                        <label>Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option value="Suporte">Suporte</option>
                            <option value="Visita Tecnica">Visita Tecnica</option>
                            <option value="Financeiro">Financeiro</option>
                        </select>


                        <label>Status</label>
                        <div className="status">
                            <input
                                type="radio"
                                name='radio'
                                value='Aberto' onChange={handleOptionChange}
                                checked={status === 'Aberto'} />
                            <span>Em Aberto</span>

                            <input
                                type="radio"
                                name='radio'
                                value='Em Progresso' onChange={handleOptionChange} 
                                checked={status === 'Em Progresso'}/> 
                            <span>Em Progresso</span>

                            <input
                                type="radio"
                                name='radio'
                                value='Finalizado' onChange={handleOptionChange} 
                                checked={status === 'Finalizado'}/> 
                            <span>Finalizado</span>

                        </div>

                        <label>Complemento</label>
                        <textarea
                            type='text'
                            placeholder='Me fale um pouco sobre o assunto(opcional)...'
                            value={complemento} onChange={(e) => setComplemento(e.target.value)}
                        />

                        <button className="novo-chamado-btn" type='submit'>Registrar</button>


                    </form>
                </div>
            </div>
        </div>
    )
}