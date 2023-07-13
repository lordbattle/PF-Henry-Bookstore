import style from '../SearchBar/SearchBar.module.css'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import { getBookByTitle } from '../../redux/actions'

const SearchBar = ({setPaginaActual}) => {

    const dispatch = useDispatch();
    const [title, setTitle] = useState('');

    function handleInput(event){
        event.preventDefault();
        setTitle(event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        setPaginaActual(1);
        if(title){
            dispatch(getBookByTitle(title));
            setTitle('')
        }
    } 


    return (
        <div className={style.main}>
            <div className={style.container}>
                <input type='search' className={style.input} placeholder="Search books" onChange={ event => handleInput(event)}></input>
                <button className={style.btn} onClick={ event => handleSubmit(event)}>🔍︎</button>
            </div>
        </div>
    )
}

export default SearchBar