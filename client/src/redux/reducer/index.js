import {GET_BOOKS, GET_BOOK_ID, GET_BOOK_TITLE, DELETE_BOOK, FILTERS_BOOKS} from "../types/types.js"

export const initialState = {
    books: [],
    details:[],
}

function rootReducer (state=initialState, action){
    switch (action.type) {
        case GET_BOOKS:
                return{
                    ...state,
                    books: action.payload,
                }
        case GET_BOOK_ID:
            return{
                ...state,
                details: action.payload
            }
        case GET_BOOK_TITLE:
            return{
                ...state,
                books: action.payload
            }
        case DELETE_BOOK:
            return{
                ...state,
            }
            case FILTERS_BOOKS:
                return {
                    ...state,
                    books: action.payload
                }
        default:
            return {
                ...state,
            }
        case "CREATE_BOOK":
            return{
                ...state,
            }
    }
}
export default rootReducer;