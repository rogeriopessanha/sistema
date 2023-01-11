
import './perfil.css'
import Header from '../../components/Header'
import Title from '../../components/Title'

import { FiSettings } from "react-icons/fi";

export default function Perfil() {
    return(
        <div>
            <Header/>

            <div className="content">
                <Title name='Meu Perfil'>
                    <FiSettings color='#000' size={25}/>
                </Title>
            </div>
        </div>
    )
}