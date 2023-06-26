export const initialState = {
    books: [],
    details:[],
}

function rootReducer (state=initialState, action){
    switch (action.type) {
        case "GET_BOOKS":
                return{
                    ...state,
                    books: action.payload,
                }
        case "GET_BOOK_ID":
            return{
                ...state,
                details: action.payload
            }
        case "GET_BOOK_TITLE":
            return{
                ...state,
                books: action.payload
            }
        case "DELETE_BOOK":
            return{
                ...state,
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