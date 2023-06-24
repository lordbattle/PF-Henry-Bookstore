import axios from "axios";
const GET_BOOKS = "GET_BOOKS";
const GET_BOOK_ID= "GET_BOOK_ID";
const GET_BOOK_TITLE= "GET_BOOK_TITLE"

export const getBooks=()=>{
    return async (dispatch)=>{
        try {
            const {data} = await axios.get("http://localhost:3001/books");
            console.log("LOG DATA ACTIONS", data)
            return dispatch({
                type: GET_BOOKS,
                payload: data
            })
        } catch (error) {
            alert(`ERROR DEL CATCH ${error}` )
        }
    }
}

export const getBookById = (idBook) =>{
    return async (dispatch)=>{
        try {
            const {data} = await axios.get(`http://localhost:3001/books/${idBook}`);
            console.log("LOG DEL GETID", data)
            return dispatch({
                type: GET_BOOK_ID,
                payload: data
            })
        } catch (error) {
            alert(`Error catch getbooksbyid ${error}`)
        }
    }
}

export const getBookByTitle = (title) => {
    return async (dispatch)=>{
        try {
            const {data} = await axios.get(`http://localhost:3001/books/?title=${title}`);
            return dispatch({
                type: GET_BOOK_TITLE,
                payload: data
            })
            
        } catch (error) {
            alert(`Error catch getbooksbyname ${error}`)
            
        }
    }
}
