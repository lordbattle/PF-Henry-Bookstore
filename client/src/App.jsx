import { Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import LandingPage from "./components/LandingPage/LandingPage";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Footer from "./components/Footer/Footer.jsx";
import Cart from "./components/Cart/Cart";
import Detail from "./components/Detail/Detail";
import AddBookForm from "./components/BooksForm/BooksForm";
import Profile from "./components/Profile/Profile";
import OptionLoginOrRegister from './components/OptionLoginOrRegister/OptionLoginOrRegister';

import { AuthProvider } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";
import { AuthContextProvider, UserAuth } from "./context/AuthContextFirebase";
// import Stack from 'react-bootstrap/Stack'
//import { useAuth0 } from "@auth0/auth0-react";
//import axios from "axios";

//axios.defaults.baseURL = "http://localhost:3001";
//axios.defaults.baseURL = 'https://pf-henry-bookstore-production.up.railway.app'

function App() {
  const { pathname } = useLocation();
  //const { isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="container">
      {pathname !== "/" && <Nav />}


      <AuthContextProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/optionLoginOrRegister" element={<OptionLoginOrRegister />}></Route>
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />}></Route>
            <Route path="/detail/:id" element={<Detail />}></Route>
            <Route path="/createbook" element={<AddBookForm />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>

          <Footer />
        </AuthProvider>
      </AuthContextProvider>

    </div>
  );
}

export default App;
