import { useAuth0 } from '@auth0/auth0-react'
import Register from '../Register/Register';
import style from '../Login/Login.module.css';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={style.ContainerMain}>
      <Register />
      <button onClick={() => loginWithRedirect()}>Login</button>
    </div>
  )
}

export default Login; 
