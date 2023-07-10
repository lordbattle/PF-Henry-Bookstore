import {
  GET_BOOKS,
  GET_BOOK_ID,
  GET_BOOK_TITLE,
  DELETE_BOOK,
  FILTERS_BOOKS,
  GET_USERS,
  GET_USER_ID,
  GET_PAGINATION_USERS,
  GET_CURRENT_USER,
  DELETE_USER,
  GET_USERS_BY_STATUS,
  CLEAN_USER_DETAIL,
  LOGING_USER,
  LOGOUT_USER,
  POST_USERS,
  HISTORY_PURCHASE
} from "../types/types.js";

export const initialState = {
  books: [],
  details: [],
  allUsers: [],
  user: [],
  users: [],
  userDetail: [],
  pagination: null,
  currentUser: null,
  historyPurchase: [],
};

function rootReducer(state = initialState, action) {
  let allUsers = state.allUsers;
  let filteredUsers = state.users;

  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
      };
    case GET_BOOK_ID:
      return {
        ...state,
        details: action.payload,
      };
      case GET_PAGINATION_USERS:
        return {
          ...state,
          pagination: action.payload,
        }
    case GET_BOOK_TITLE:
      return {
        ...state,
        books: action.payload,
      };
    case DELETE_BOOK:
      return {
        ...state,
      };
    case FILTERS_BOOKS:
      return {
        ...state,
        books: action.payload,
      };
    case "CREATE_BOOK":
      return {
        ...state,
      };
    
    case HISTORY_PURCHASE:
      return{
        ...state,
        historyPurchase: action.payload
      }

    //USER

    case GET_USERS:
      return {
        ...state,
        allUsers: action.payload,
        users: action.payload,
      };

    case GET_USER_ID:
      return {
        ...state,
        userDetail: action.payload,
      };

    case GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

      case POST_USERS : 
      return {
       ...state,
       currentUser: action.payload,
      };

    case DELETE_USER:
      return {
        ...state,
      };

    case GET_USERS_BY_STATUS:
      if (action.payload.toLowerCase() === "active") {
        filteredUsers = allUsers.filter((user) => !user.banned);
      } else {
        filteredUsers = allUsers.filter((user) => user.banned);
      }
      return {
        ...state,
        users: filteredUsers,
      };

    case CLEAN_USER_DETAIL:
      return {
        ...state,
        userDetail: [],
      };

    //LOGIN
    case LOGING_USER:
      return {
        ...state,
        user: action.payload,
      };

      case LOGOUT_USER:
      return {
        ...state,
        user: [],
        userDetail: []
      };
    default:
      return {
        ...state,
      };
  }
}
export default rootReducer;
