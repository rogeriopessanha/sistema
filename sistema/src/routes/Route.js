
import { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import {AuthContext} from '../contexts/auth'

export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}) {

    const {signed, loading} = useContext(AuthContext)

    if (loading) {
        return (
            <div></div>
        )
    }

    //se não estiver logado, retorna para o login
    if (!signed && isPrivate) {
        return <Redirect to='/' />}

    //se estiver logado, acessa a dashboard
    if (signed && !isPrivate) {
        return <Redirect to='/dashboard' />}

    return (
        <Route
            {...rest}
            render={props => (
                <Component {...props} />
            )}
        />
    )
}






// import { useContext } from 'react';

// import { Navigate } from 'react-router-dom'; //Agora utilizamos Navigate para redirecionar a página para o local desejado.

// import { AuthContext } from '../contexts/user';



// export default function RouteWrapper({ loggedComponent, defaultComponent, isPrivate}) {

//       const { auth, loadingPage } = useContext(AuthContext);



//       if (loadingPage) {

//           return (

//              <div>

//                   <span>Carregando...</span>

//              </div>

//           )

//      }



//        if (auth && !isPrivate) {

//               return <Navigate to='/dashboard' /> //direciona para página privada.

//       } else if (!auth && isPrivate) {

//               return <Navigate to='/' /> //direciona para página inicial.

//       }



// return auth ? loggedComponent : defaultComponent

// }