


import { useState} from 'react'
import {Link} from 'react-router-dom'
import './signUp.css'
import logo from '../../assets/logo2.png'

function SignUp() {

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState ('')

  function handleSubmit(e) {
    e.preventDefault()
    alert('clicou')
  }

  return (
    <div className="container-center">

      <div className="login">
        <div className="login-area">
          <img src={logo} alt="logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Cadastre-se</h1>

          <input type="text" placeholder='seu nome:' value={nome} onChange={(e) => setNome(e.target.value)} />


          <input type="text" placeholder='exemplo@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />

          <input type="password" placeholder='digite sua senha: *********' value={senha} onChange={(e) => setSenha(e.target.value)} />
          <button type='submit'>Cadastrar</button>
        </form>

        <Link to='/'>JÁ TEM UMA CONTA? FAÇO O LOGIN</Link>
      </div>
      
    </div>

  );
}

export default SignUp;