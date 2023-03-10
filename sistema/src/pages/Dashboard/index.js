import './dashboard.css'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import firebase from '../../services/firebaseConnection'
import Modal from '../../components/Modal'

const listRef = firebase.firestore().collection('chamados').orderBy('created', 'desc');

export default function Dashboard() {
    const [chamados, setChamados] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)
    const [lastDocs, setLastDocs] = useState()

    const [showPostModal, setShowPostModal] = useState(false)
    const [detail, setDetail] = useState()

    useEffect(() => {

        async function loadChamados() {
            await listRef.limit(3)
                .get()
                .then((snapshot) => {
                    updateState(snapshot)
                })
                .catch((err) => {
                    console.log('Deu algum erro: ', err);
                    setLoadingMore(false);
                })

            setLoading(false);

        }

        loadChamados()

        return () => {

        }
    }, [])

    async function updateState(snapshot) {
        const isCollectionEmpty = snapshot.size === 0;

        if (!isCollectionEmpty) {
            let lista = [];

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clienteId,
                    created: doc.data().created,
                    createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                    complemento: doc.data().complemento
                })
            })

            const lastDoc = snapshot.docs[snapshot.docs.length - 1]; //Pegando o ultimo documento buscado

            setChamados(chamados => [...chamados, ...lista]);
            setLastDocs(lastDoc);

        } else {
            setIsEmpty(true);
        }

        setLoadingMore(false);
    }

    async function handleMore() {
        setLoadingMore(true);
        await listRef.startAfter(lastDocs).limit(3)
            .get()
            .then((snapshot) => {
                updateState(snapshot)
            })
    }

    function togglePostModal(item) {
        setShowPostModal(!showPostModal) //trocando de true para false(abrindo e fechando o modal)
        setDetail(item)
    }

    if (loading) {
        return (
            <div>
                <Header />

                <div className="content">
                    <Title name='Atendimentos'>
                        <FiMessageSquare size={20} />
                    </Title>

                    <div className="container-dashboard">
                        <span>Buscando chamado...</span>
                    </div>
                </div>
            </div>
        )
    }

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
                ) : (
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
                                {chamados.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td data-label='Cliente'>{item.cliente}</td>
                                            <td data-label='Assunto'>{item.assunto}</td>
                                            <td data-label='Status'>
                                                <span className="andamento"
                                                    style={{
                                                        backgroundColor:
                                                            item.status === 'Aberto' ?
                                                                '#5cb85c' : '#999'
                                                    }}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td data-label='Cadastrado'>{item.createdFormated}</td>
                                            <td data-label='#'>

                                                <button
                                                    className="btn-acao"
                                                    style={{
                                                        backgroundColor:
                                                            '#3583f6'
                                                    }} onClick={() =>
                                                        togglePostModal(item)} >
                                                    <FiSearch
                                                        color='#fff'
                                                        size={16}
                                                    />
                                                </button>

                                                <Link
                                                    className="btn-acao"
                                                    style={{
                                                        backgroundColor:
                                                            '#f6a935'
                                                    }}
                                                    to={`/novo/${item.id}`} >
                                                    <FiEdit2
                                                        color='#fff'
                                                        size={16}
                                                    />
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                        {loadingMore && <h3 style={{ textAlign: 'center', marginTop: 15 }}>Buscando dados...</h3>}
                        {!loadingMore && !isEmpty && <button className="btn-more" onClick={handleMore}>Buscar mais</button>}
                    </>
                )}


            </div>

            {showPostModal && (
                <Modal
                    conteudo={detail}
                    close={togglePostModal}
                />
            )}

        </div>
    )
}