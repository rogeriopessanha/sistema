
import { useState} from 'react'
import {Link} from 'react-router-dom'
import './signin.css'
import logo from '../../assets/logo2.png'

function SignIn() {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState ('')

  return (
    <div className="container-center">

      <div className="login">
        <div className="login-area">
          <img src={logo} alt="logo" />
        </div>

        <form>
          <h1>Entrar</h1>
          <input type="text" placeholder='exemplo@email.com' />
          <input type="password" placeholder='digite sua senha: *********' />
          <button type='submit'>Acessar</button>
        </form>

        <Link to='/registro'>Clique aqui e faça sua conta</Link>
      </div>
      
    </div>

  );
}

export default SignIn;