
import { useState, useContext } from 'react';
import './perfil.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import avatar from '../../assets/avatar.png'
import firebase from '../../services/firebaseConnection'
import { AuthContext } from '../../contexts/auth';
import { FiSettings, FiUpload } from "react-icons/fi";


export default function Perfil() {

    const { user, signOut, setUser, storageUser } = useContext(AuthContext)

    const [nome, setNome] = useState(user && user.nome)
    const [email, setEmail] = useState(user && user.email)
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [imageAvatar, setImageAvatar] = useState(null)

    function handleFile(e) {
        if (e.target.files [0]) {
            const image = e.target.files[0]

            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                setImageAvatar(image)
                setAvatarUrl(URL.createObjectURL(e.target.files[0]))
            }else{
                alert('Envie uma imagem do tipo JPEG ou PNG')
                setImageAvatar(null)
                return null
            }
        }
    }

    function handleUpload() {
        
    }


    async function handleSave(e) {
        e.preventDefault()
        
        if (imageAvatar === null && nome !== '') {

            await firebase.firestore().collection('users').doc(user.uid).update({nome: nome})
            .then(() => {
                let data = {...user, nome: nome} 
                setUser(data)
                storageUser(data)
            })

        }else if (nome !== '' && imageAvatar !== null) {
            handleUpload()
        }

    }



    return (
        <div>
            <Header />

            <div className="content">
                <Title name='Meu perfil'>
                    <FiSettings size={20} />
                </Title>

                <div className="container">
                    <form className="form-perfil" onSubmit={handleSave}>
                        <label className="label-avatar">
                            <span>
                                <FiUpload color='#fff' size={20} />
                            </span>

                            <input type="file" accept='image/*' onChange={handleFile} /> <br />
                            {avatarUrl === null ?
                                <img src={avatar} width='250' height='250' alt="foto de perfil usuario" />
                                :
                                <img src={avatarUrl} width='250' height='250' alt="foto de perfil usuario" />
                            }
                        </label>

                        <label>Nome</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

                        <label>Email</label>
                        <input type="text" value={email} disabled={true} />

                        <button className="btn-dash" type='submit'>Salvar</button>

                    </form>
                </div>

                <div className="container">
                <button className="sair-btn" onClick={() => signOut()}>
                            Sair
                        </button>
                </div>
            </div>
        </div>
    )
}