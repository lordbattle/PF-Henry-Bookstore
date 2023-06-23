export const initialState = {
    books: [],
}

function rootReducer (state=initialState, action){
    switch (action.type) {
        case "GET_BOOKS":
                return{
                    ...state,
                    books: action.payload,
                }

        default:          
               console.log("Entro a caso default")
            break;
            
    }
}