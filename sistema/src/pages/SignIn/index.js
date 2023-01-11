
import { useState, useContext} from 'react'
import {Link} from 'react-router-dom'

import { AuthContext } from '../../contexts/auth' 
import './signin.css'
import logo from '../../assets/logo2.png'

function SignIn() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState ('')

  const { signIn, loadingAuth } = useContext(AuthContext)

  function handleSubmit(e) {
    e.preventDefault()
    if (email !== '' && senha !== '') {
      signIn(email, senha)
    }

  }

  return (
    <div className="container-center">

      <div className="login">
        <div className="login-area">
          <img src={logo} alt="logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Entre</h1>
          <input type="text" placeholder='exemplo@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />

          <input type="password" placeholder='digite sua senha: *********' value={senha} onChange={(e) => setSenha(e.target.value)} />
          <button type='submit'>{loadingAuth ? 'Entrando...' : 'Entrar'}</button>
        </form>

        <Link to='/registro'>CLIQUE AQUI E CADASTRE-SE</Link>
      </div>
      
    </div>

  );
}

export default SignIn;