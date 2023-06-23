import {useDispatch} from "react-redux"
import { useEffect } from "react"
import { getBooks } from "../../redux/actions"
import Cards from "../Cards/Cards"
const Card = ({currentBooks}) =>{

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getBooks())
    }, [dispatch])
    
    return (
      <div className="bg-danger ">
        {currentBooks.length > 0 ? (
          currentBooks.map((v) => {
            const { volumeInfo } = v; // Desestructura volumeInfo del objeto v
            return (
              <Cards
                key={v.id}
                id={v.id}
                title={volumeInfo.title}
                authors={volumeInfo.authors}
                categories={volumeInfo.categories}
                pageCount={volumeInfo.pageCount}
                imageLinks={volumeInfo.imageLinks?.thumbnail}
                // Otras propiedades de volumeInfo que desees utilizar
              />
            );
          })
        ) : (
          <p>Error de carga</p>
        )}
      </div>
    );
    
}

export default Card