import style from '../SearchBar/SearchBar.module.css'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import { getBookByTitle } from '../../redux/actions'

const SearchBar = () => {

    const dispatch = useDispatch();
    const [title, setTitle] = useState('');

    function handleInput(event){
        event.preventDefault();
        setTitle(event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        if(title){
            dispatch(getBookByTitle(title));
            setTitle('')
        }
    } 


    return (
        <div className={style.main}>
            <div className={style.container}>
                <input type='search' className={style.input} placeholder="Ingresa el libro que deseas buscar" onChange={ event => handleInput(event)}></input>
                <button className={style.btn} onClick={ event => handleSubmit(event)}>🔍︎</button>
            </div>
        </div>
    )
}

export default SearchBar