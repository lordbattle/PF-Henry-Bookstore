import axios from "axios";
const GET_BOOKS = "GET_BOOKS";

export const getBooks=()=>{
    return async (dispatch)=>{
        try {
            const data = await axios.get("http://localhost:5173/books");
            return dispatch({
                type: GET_BOOKS,
                payload: data
            })
        } catch (error) {
            alert(error)
        }
    }
}