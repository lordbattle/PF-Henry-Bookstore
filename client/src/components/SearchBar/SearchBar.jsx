import style from '../SearchBar/SearchBar.module.css'

const SearchBar = () => {
    return (
        <div className={style.main}>
            <div className={style.container}>
                <input type='search' className={style.input} placeholder="Ingresa el libro que deseas buscar"></input>
                <button className={style.btn}>🔍︎</button>
            </div>
        </div>
    )
}

export default SearchBar