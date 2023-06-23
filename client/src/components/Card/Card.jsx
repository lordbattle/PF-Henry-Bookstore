import {useDispatch} from "react-redux"
import { useEffect } from "react"
import { getBooks } from "../../redux/actions"
import Cards from "../Cards/Cards"
const Card = ({currentRecipes}) =>{

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getBooks())
    }, [dispatch])
    console.log(getBooks())
return ( <div className={s.containerCard}>
    {currentRecipes.length > 0 ?
    currentRecipes?.map(v => {
        return (<Cards
            key={v.id}
            id={v.id}
            title={v.title}
            genre={v.genre?.map(e => typeof (e) === 'object' ? e.name : e).join(', ')}
            averageRating={v.averageRating}
            description={v.description}
            />)}) : console.log("errorCarga")}

</div>
)
}

export default Card