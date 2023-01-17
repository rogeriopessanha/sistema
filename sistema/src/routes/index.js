
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

            <Route exact path='/novo/:id' component={Novo} isPrivate/>
        </Switch>
    )
}



// import { Routes, Route } from "react-router-dom"; // Não utilizamos Switch, mas sim Routes.

// import RouteWrapper from "./teste"; 

// import SignIn from '../pages/SingIn'; // Página de login.

// import SignUp from '../pages/SignUp'; // Página de cadastro.

// import Dashboard from '../pages/Dashboard'; // Página privada.



// export default function AllRoutes() {

//     return (

//         <Routes>

//             <Route path='/' element={<RouteWrapper loggedComponent={<Dashboard />} defaultComponent={<SignIn />} />} /> 

//             <Route path='/dashboard' element={<RouteWrapper loggedComponent={<Dashboard />} defaultComponent={<SignIn />} isPrivate />} />

//             <Route path='/signin' element={<RouteWrapper loggedComponent={<Dashboard />} defaultComponent={<SignIn />} />} />

//             <Route path='/signup' element={<RouteWrapper loggedComponent={<Dashboard />} defaultComponent={<SignUp />} />} />

//         </Routes>

//     )
// }