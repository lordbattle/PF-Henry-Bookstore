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
        default:
            return {
                ...state,
            }

            
    }
}
export default rootReducer;