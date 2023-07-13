//import axios from "axios";
import {
  GET_BOOK_ID,
  GET_BOOK_TITLE,
  DELETE_BOOK,
  FILTERS_BOOKS,
  GET_USERS,
  GET_USER_ID,
  GET_CURRENT_USER,
  GET_PAGINATION_USERS,
  DELETE_USER,
  GET_USERS_BY_NAME,
  GET_USERS_BY_STATUS,
  CLEAN_USER_DETAIL,
  LOGING_USER,
  LOGOUT_USER,
  POST_USERS,
  GET_ORDERS,
  HISTORY_PURCHASE,
  INCREMENT_ITEMS,
  DECREMENT_ITEMS,
  CHANGE_PASSWORD,
  UPDATE_STATUS_ORDER,
  GET_ORDERS_BY_STATUS,
} from "../types/types.js";

import axiosInstance from "../../api/axiosInstance.js";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
//import axios from "axios";

//BOOKS
//?
//!Esta funcion esta deteriorada no descomentar
/* export const getBooks = () => {
  return (dispatch) => {

    try {
      const { data } = axiosInstance.get("/books");
      
      return dispatch({
        type: GET_BOOKS,
        payload: data,
      });
    } catch (error) {
      alert(`ERROR DEL CATCH ${error}`);
    }
  };
}; */

export const getBookById = (idBook) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`/books/${idBook}`);
      console.log("LOG DEL GETID", data);
      return dispatch({
        type: GET_BOOK_ID,
        payload: data,
      });
    } catch (error) {
      alert(`Error catch getbooksbyid ${error}`);
    }
  };
};

export const getBookAll = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`/books`);
      return dispatch({
        type: GET_BOOK_TITLE,
        payload: data,
      });
    } catch (error) {
      alert(`Error catch getbooksAll ${error}`);
    }
  };
};

export const getBookByTitle = (title) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`/books/?title=${title}`);
      console.log(title, " soy titulo action ");
      return dispatch({
        type: GET_BOOK_TITLE,
        payload: data,
      });
    } catch (error) {
      alert(`Error catch getbooksbyname ${error}`);
    }
  };
};

export const getPaginationBooks = () => {
  return async (dispatch) => {
    const { data } = await axiosInstance.get("/books/?limit=450");
    return dispatch({
      type: GET_PAGINATION_USERS,
      payload: data.shift(),
    });
  };
};

export const getBooksByFilters = (obj) => {
  return async (dispatch) => {
    try {
      let url = "/books/?";

      if (obj.author && obj.author !== "all") {
        url += `author=${obj.author}&`;
      }

      if (obj.genre && obj.genre !== "all") {
        url += `genre=${obj.genre}&`;
      }
      if (obj.page) {
        url += `page=${obj.page}&`;
      }
      if (obj.limit) {
        url += `limit=${obj.limit}&`;
      }
      if (obj.price) {
        url += `price=${obj.price}&`;
      }
      if (obj.orderPrice && obj.orderPrice !== "neu") {
        url += `orderPrice=${obj.orderPrice}&`;
      }

      if (obj.orderTitle && obj.orderTitle !== "neu") {
        url += `orderTitle=${obj.orderTitle}&`;
      }

      // Remove trailing '&' from the URL
      url = url.slice(0, -1);
      console.log(url);

      const { data } = await axiosInstance.get(url);

      console.log("actions", data);
      return dispatch({
        type: FILTERS_BOOKS,
        payload: data,
      });
    } catch (error) {
      console.error(`Error catch getBooksByFilters ${error.message}`);
    }
  };
};

export const deleteBook = (idBook) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.delete(`/books/${idBook}`);
      const data = response.data;
      //Swal.fire("The product was successfully disabled", "", "success");
      return dispatch({
        type: DELETE_BOOK,
        payload: data,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
      });
    }
  };
};

export const postBooks = (payload) => {
  return async () => {
    try {
      const dat = await axiosInstance.post("/books", payload);
      return dat;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
};

export const activeBook = (idBook) => {
  return async () => {
    try {
      const { data } = await axiosInstance.put(`/books/${idBook}`, {
        active: true,
      });
      //Swal.fire("The product was successfully enabled", "", "success");
    } catch (error) {
      alert(`Catch del activeBook ${error}`);
    }
  };
};

export const editBook = (idBook, updatedProduct) => {
  return async () => {
    try {
      const { data } = await axiosInstance.put(
        `/books/${idBook}`,
        updatedProduct
      );
      Swal.fire("The product was successfully edit", "", "success");
    } catch (error) {
      console.log(error);
      alert(`Cath del editBook ${error}`);
    }
  };
};

export const buyBook = (payload) => {
  return async () => {
    try {
      const { data } = await axiosInstance.post(`/orders`, payload);
      console.log(`Se ejecuto bien buyBook`, data);
      const { id } = data.results;
      return id;
    } catch (error) {
      Swal.fire({
        title: "Log in or Sign up",
        text: "You must log in to buy",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Log in | Sign Up",
        cancelButtonText: "Later",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/optionLoginOrRegister";
        }
      });
      console.log(`Catch de buyBook `, error);
    }
  };
};

//USER

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get("/users");
      console.log("LOG DATA ACTIONS", data);
      return dispatch({
        type: GET_USERS,
        payload: data,
      });
    } catch (error) {
      alert(`ERROR DEL CATCH ${error}`);
    }
  };
};

export const getUserById = (idUser) => {
  // name y lastname estan en null en el backend
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`/users/${idUser}`);
      console.log("LOG DEL GETID", data);
      return dispatch({
        type: GET_USER_ID,
        payload: data,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};

//Se espera se pueda usar despues en alguna funcion.
/* export function getCurrentUser(payload) {
  return async function (dispatch) {
    try {
      const user = await axiosInstance.post(`/users/register`, payload);

      
      console.log("Agregar usuario", user);

      return dispatch({
        type: GET_CURRENT_USER,
        payload: user.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
} */

export const deleteUser = (idUser) => {
  //no lo elimina pero si ejecuata el respose en el backend
  return async (dispatch) => {
    try {
      const response = await axiosInstance.delete(`/users/${idUser}`);
      const data = response.data;
      alert(data);
      return dispatch({
        type: DELETE_USER,
        payload: data,
      });
    } catch (error) {
      alert(`Error del catch delete ${error}`);
    }
  };
};

export const postUsers = (payload) => {
  return async (dispatch) => {
    try {
      const data = await axiosInstance.post("/users", payload);

      return dispatch({
        type: POST_USERS,
        payload: data,
      });
    } catch (error) {
      throw new Error(error.response.data);
    }
  };
};

export const editUser = (idUser, updatedUser) => {
  return async () => {
    try {
      await axiosInstance.put(`/users/${idUser}`, updatedUser);
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const incrementItemCart = ( ) => {
  return{
      type :INCREMENT_ITEMS,
      payload :1
  }
}
export const decrementItemCart = (value ) => {
  return{
      type :DECREMENT_ITEMS,
      payload : value
  }
}
export const activeUser = (idUser) => {
  //FUNCIONANDO CORRECTAMENTE
  return async () => {
    try {
      const { data } = await axiosInstance.put(`/users/${idUser}`, {
        active: true,
      });
      alert(data);
    } catch (error) {
      alert(`Catch del activeUser ${error}`);
    }
  };
};

export const getUsersByName = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`/users?username=${name}`);
      return dispatch({ type: GET_USERS_BY_NAME, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export function getUsersByStatus(status) {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`/users?status=${status}`);

      return dispatch({
        type: GET_USERS_BY_STATUS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function cleanUserDetail() {
  return {
    type: CLEAN_USER_DETAIL,
  };
}

export function logingUser(user) {
  return async (dispatch) => {
    try {
      const baseData = await axiosInstance.post(`/authUser/login`, user);
      dispatch({ type: LOGING_USER, payload: baseData.data });
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
}

export function logoutUser() {
  return async (dispatch) => {
    try {
      await axiosInstance.post("/authUser/logout");
      dispatch({ type: LOGOUT_USER });
    } catch (error) {
      alert(`Cath del logoutUser ${error}`);
    }
  };
}

export function verifyUserToken() {
  return async (dispatch) => {
    try {
      const cookies = Cookies.get();
      console.log(cookies);

      if (cookies.token) {
        const response = await axiosInstance.get(
          "/authUser/verifyuser",
          {},
          { headers: { Cookie: `token=${cookies.token}` } }
        );
        const { id, userName, email } = response.data;
        dispatch({ type: LOGING_USER, payload: { id, userName, email } });
      } else {
        dispatch({ type: LOGOUT_USER });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: LOGOUT_USER });
    }
  };
}

export const getPurchaseHistoryById = (idUser) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`/bills?userId=${idUser}`);
      return dispatch({
        type: HISTORY_PURCHASE,
        payload: data,
      });
    } catch (error) {
      console.log("ERROR DEL CATCH getPurchaseHistoryById", error);
    }
  };
};

export const getAllOrders = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get("/orders");
      return dispatch({
        type: GET_ORDERS,
        payload: data.results,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const changePasswordUser = (values) => {
  return async (dispatch) => {
    try {
      await axiosInstance.put(`/profileUser/changePassword`, values);
      return;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
};

export const forgotPassword = (email) => {
  return async (dispatch) => {
    try {
      let data = await axiosInstance.get(`/authUser/forgotPassword/${email}`);
      console.log("error catch  ", data.data);
    } catch (error) {
      console.log(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  };
};

export const forgotPasswordChange = (values) => {
  return async () => {
    try {
      await axiosInstance.post(`/authUser/forgotPassword`, values);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
};

export const contactAdm = (values) => {
  console.log("Estoy en la action de contactAdm");
  return async () => {
    try {
      let data = await axiosInstance.post(`/authUser/contact`, values);
      console.log(data);
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };
};

export const updateOrderStatus = (id, status) => {
  return async () => {
    try {
      await axiosInstance.put(`/orders/${id}`, status);
      return;
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const getOrdersByStatus = (payload) => {
  return {
    type: GET_ORDERS_BY_STATUS,
    payload: payload,
  };
};
