import axios from "axios";
//import Cookies from 'js-cookie';

//Api Local
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  //credentials: "include",
  withCredentials: true,
});

//Api Nube
/* const axiosInstance = axios.create({
  baseURL: "https://pf-henry-bookstore-production.up.railway.app",
  //credentials: "include",
  withCredentials: true,
}); */

export default axiosInstance;

/* const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

instance.interceptors.request.use((config) => {
  const cookie = Cookies.get('cookieName'); // Reemplaza 'cookieName' con el nombre de tu cookie
  if (cookie) {
    config.headers['Cookie'] = cookie;
  }
  return config;
});

export default instance; */
