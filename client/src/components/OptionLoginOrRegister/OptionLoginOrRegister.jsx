import style from './OptionLoginOrRegister.module.css';
import { useNavigate } from 'react-router-dom';
const optionLoginOrRegister = () => {
    const navigate = useNavigate();
    const handleRegister = () =>{
        navigate('/register')
    }
    const handleLogin = () =>{
        navigate('/login')
    }
    return (
        <div className={style.containerMain}>
            <div className={style.containerRegister}>
                <p className={style.title}>Register</p>
                <button name='register' className={style.button} onClick={handleRegister} >Register</button>
            </div>
            <div className={style.containerLogin}>
                <p className={style.title}>Login</p>
                <button name='login' className={style.button} onClick={handleLogin} >Login</button>
            </div>
        </div>
    );


}
export default optionLoginOrRegister;