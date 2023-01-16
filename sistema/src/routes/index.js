
import { Switch } from 'react-router-dom'
import Route  from './Route'

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

import Dashboard from '../pages/Dashboard'
import Perfil from '../pages/Perfil'
import Clientes from '../pages/Clientes'
import Novo from '../pages/Novo'

export default function Routes() {
    return(
        <Switch>
            <Route exact path='/' component={SignIn} />

            <Route exact path='/Registro' component={SignUp} />

            <Route exact path='/dashboard' component={Dashboard} isPrivate />

            <Route exact path='/perfil' component={Perfil} isPrivate/>

            <Route exact path='/clientes' component={Clientes} isPrivate/>

            <Route exact path='/novo' component={Novo} isPrivate/>

            <Route exact path='/novo:id' component={Novo} isPrivate/>
        </Switch>
    )
}