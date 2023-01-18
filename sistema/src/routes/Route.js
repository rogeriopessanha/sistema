


import { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import {AuthContext} from '../contexts/auth'
import PropTypes from 'prop-types';

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

    return (<Route {...rest} render={props => ( <Component {...props} /> )}
        />
    )
}

RouteWrapper.propTypes = {
    isPrivate: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
      .isRequired,
  };
  
  RouteWrapper.defaultProps = {
    isPrivate: false,
  };







