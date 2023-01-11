
import { Switch } from 'react-router-dom'
import Route  from './Route'

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

import Dashboard from '../pages/Dashboard'
import Perfil from '../pages/Perfil'

export default function Routes() {
    return(
        <Switch>
            <Route exact path='/' component={SignIn} />

            <Route exact path='/Registro' component={SignUp} />

            <Route exact path='/dashboard' component={Dashboard} isPrivate />

            <Route exact path='/perfil' component={Perfil} isPrivate/>
        </Switch>
    )
}