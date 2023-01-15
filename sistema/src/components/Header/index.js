
import { useContext } from 'react'
import './header.css'
import { AuthContext } from '../../contexts/auth'
import avatar from '../../assets/avatar.png'

import {Link} from 'react-router-dom'
import { FiUser, FiEdit, FiCheckSquare, FiFileText } from "react-icons/fi";

export default function Header() {

    const {user} = useContext(AuthContext)

    return(
        <div className="sidebar">
            <div>
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="foto avatar" />
            </div>

            <Link to='/dashboard'>
            <FiFileText color='#fff' size={24}/>
            Chamados
            </Link>

            <Link to='/clientes'>
            <FiEdit color='#fff' size={24}/>
            Cadastrar
            </Link>

            <Link to='/perfil'>
            <FiUser color='#fff' size={24}/>
            Editar Perfil
            </Link>
        </div>
    )
}
