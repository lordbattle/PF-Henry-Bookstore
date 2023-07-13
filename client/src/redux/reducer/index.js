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
  DECREMENT_ITEMS,
  INCREMENT_ITEMS,
  GET_ORDERS,
  HISTORY_PURCHASE,
  GET_ORDERS_BY_STATUS

} from "../types/types.js";

const numcart = localStorage.getItem("numcart");

export const initialState = {
  books: [],
  details: [],
  allUsers: [],
  user: [],
  users: [],
  orders: {},
  userDetail: [],
  pagination: null,
  currentUser: null,
  historyPurchase: [],
  totalItemSCart: numcart ? JSON.parse(numcart) : 0
};

function rootReducer(state = initialState, action) {
  let allUsers = state.allUsers;
  let filteredUsers = state.users;

  switch (action.type) {
    case INCREMENT_ITEMS:
      const totalItemSCartI = state.totalItemSCart + action.payload
      localStorage.setItem("numcart", totalItemSCartI)
      return {
        ...state,
        totalItemSCart: totalItemSCartI
      }
    case DECREMENT_ITEMS:
      const totalItemSCartD = state.totalItemSCart === 0 ? 0 : state.totalItemSCart - action.payload
      localStorage.setItem("numcart", totalItemSCartD)
      return{
        ...state,
        totalItemSCart : totalItemSCartD
      }
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
        historyPurchase: action.payload,
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
        userDetail: action.payload,
      };

      case POST_USERS : 
      return {
        ...state,
        userDetail: action.payload,
      };

      case GET_ORDERS:
        return {
          ...state,
          orders: action.payload,
        }

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
    //ORDERS

    case GET_ORDERS_BY_STATUS:

    const allOrders = state.orders.rows
      console.log('esto es el orders', allOrders)
    const ordersFilter = action.payload === 'Filter by status' ? 
    state.orders : allOrders.map(status => {
      if((action.payload === 'approved') && (status.status === "approved")) return console.log('aprobado funciona')

      if((action.payload === 'pending') && (status.status === "pending")) return console.log('pendiente funciona')

      if((action.payload === 'reject') && (status.status === "reject")) return console.log('rechazado funciona')
    })

      return {
        ...state,
        orders: ordersFilter
      };

    default:
      return {
        ...state,
      };
  }
}
export default rootReducer;
