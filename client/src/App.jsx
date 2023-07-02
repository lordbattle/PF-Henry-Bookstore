import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";
// import Stack from 'react-bootstrap/Stack'
import { Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import LandingPage from "./components/LandingPage/LandingPage";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

import Register from "./components/Register/Register";
import Footer from "./components/Footer/Footer.jsx";
import Cart from "./components/Cart/Cart";
<<<<<<< HEAD


import Detail from "./components/Detail/Detail";
import AddBookForm from "./components/BooksForm/BooksForm";
import axios from "axios";
import Profile from "./components/Profile/Profile";
=======
//import { useAuth0 } from "@auth0/auth0-react";

import Detail from "./components/Detail/Detail";
import AddBookForm from "./components/BooksForm/BooksForm";
import { AuthProvider } from "./context/AuthContext";
//import axios from "axios";
>>>>>>> 1e887b7aa7bd5207292481848751f19b85f382ca

//axios.defaults.baseURL = "http://localhost:3001";
//axios.defaults.baseURL = 'https://pf-henry-bookstore-production.up.railway.app'

function App() {
  const { pathname } = useLocation();
  //const { isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="container">
      {pathname !== "/" && <Nav />}

<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile"  element={<Profile />}/>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/createbook" element={<AddBookForm />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>

=======
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="/createbook" element={<AddBookForm />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </AuthProvider>
>>>>>>> 1e887b7aa7bd5207292481848751f19b85f382ca
      <Footer />
    </div>
  );
}

export default App;
