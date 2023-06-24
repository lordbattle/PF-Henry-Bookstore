import axios from "axios";
const GET_BOOKS = "GET_BOOKS";

export const getBooks=()=>{
    return async (dispatch)=>{
        try {
            const {data} = await axios.get("https://www.googleapis.com/books/v1/volumes?startIndex=1&maxResults=40&q=%20+title&key=AIzaSyB1opBkQMWTSQmL77Uiin6L35qJhWNhHas");
            console.log("LOG DATA ACTIONS", data.items)
            return dispatch({
                type: GET_BOOKS,
                payload: data.items
            })
        } catch (error) {
            alert(`ERROR DEL CATCH ${error}` )
        }
    }
}