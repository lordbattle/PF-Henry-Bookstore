import { useAuth0 } from '@auth0/auth0-react'
import Register from '../Register/Register';
import style from '../Login/Login.module.css';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={style.ContainerMain}>
       <Register />
      <div className={style.contianerLoginButton}>
        <p className={style.title}>Login</p>
        <button className={style.buttonLogin} onClick={() => loginWithRedirect()}>Login</button>
      </div>
    </div>
  )
}

export default Login; 
