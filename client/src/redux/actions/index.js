import axios from "axios";
import {
  GET_BOOK_ID,
  GET_BOOK_TITLE,
  DELETE_BOOK,
  FILTERS_BOOKS,
} from "../types/types.js";



//!Esta funcion esta deteriorada no descomentar
/* export const getBooks = () => {
  return (dispatch) => {
    try {
      const { data } = axios.get("/books");
      
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
      const { data } = await axios.get(`/books/${idBook}`);
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

export const getBookByTitle = (title) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/books/?title=${title}`);
      console.log(title);
      return dispatch({
        type: GET_BOOK_TITLE,
        payload: data,
      });
    } catch (error) {
      alert(`Error catch getbooksbyname ${error}`);
    }
  };
};

export const getBooksByFilters = (obj) => {
  return async (dispatch) => {
    try {
      let url = "/books/?";

      if ( obj.author && obj.author !== "all") {
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
      const { data } = await axios.get(url);
      
      
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
      const response = await axios.delete(`/books/${idBook}`);
      const data = response.data;
      alert(data);
      return dispatch({
        type: DELETE_BOOK,
        payload: data,
      });
    } catch (error) {
      alert(`Error del catch delete ${error}`);
    }
  };
};

export const postBooks = (payload) => {
  return async () => {
    try {
      const dat = await axios.post("/books", payload);
      return dat;
    } catch (error) {
      console.log(error);
    }
  };
};

export const activeBook = (idBook) => {
  return async () => {
    try {
      const { data } = await axios.put(`/books/${idBook}`, { active: true });
      alert(data);
    } catch (error) {
      alert(`Catch del activeBook ${error}`);
    }
  };
};

export const editBook = (idBook, updatedProduct) => {
  return async () => {
    try {
      const { data } = await axios.put(`/books/${idBook}`, updatedProduct);
      alert(data);
    } catch (error) {
      console.log(error);
      alert(`Cath del editBook ${error}`);
    }
  };
};

export const buyBook = (id_user, items, total) => {
  return async () => {
    try {
      const payload = {
        id_user: id_user,
        items: items,
        total: total
      };

      const response = await axios.post(`/orders`, payload);
      console.log(`Se ejecutó bien buyBook ${data}`);
      const { id } = response.data; 
      return id;
    } catch (error) {
      console.log(`Catch de buyBook ${error}`);
    }
  };
};
