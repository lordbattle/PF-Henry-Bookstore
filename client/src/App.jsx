import { Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import LandingPage from "./components/LandingPage/LandingPage";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import ContactForm from "./components/ContactForm/ContactForm";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Footer from "./components/Footer/Footer.jsx";
import Cart from "./components/Cart/Cart";
import Detail from "./components/Detail/Detail";
import AddBookForm from "./components/BooksForm/BooksForm";
import Profile from "./components/Profile/Profile";
import OptionLoginOrRegister from "./components/OptionLoginOrRegister/OptionLoginOrRegister";
import BookManager from "./components/Dashboard/componentDashboard/BookManager/BookManager";
import ChangePassword from "./components/EditPassword/EditPassword";
import Forgotpassword from "./components/ForgotPassword/Forgotpassword";
import EditProfile from "./components/EditProfile/EditProfile";
import Dashboard from "./components/Dashboard/Dashboard";
import { AuthContextProvider } from "./context/AuthContextFirebase";
import { AuthProvider } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./main.css";
import PurchaseHistory from "./components/PurchaseHistory/PurchaseHistory";

// import Stack from 'react-bootstrap/Stack'
//import axios from "axios";

//axios.defaults.baseURL = "http://localhost:3001";
//axios.defaults.baseURL = 'https://pf-henry-bookstore-production.up.railway.app'

function App() {
  const { pathname } = useLocation();
  const [paginaActual, setPaginaActual] = useState(1);

  return (
    <div className="container">
      <AuthContextProvider>
        <AuthProvider>
          {pathname !== "/" && <Nav paginaActual={paginaActual} setPaginaActual={setPaginaActual} />}
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/home" element={<Home paginaActual={paginaActual} setPaginaActual={setPaginaActual} />}></Route>

            <Route path="/about" element={<About />}></Route>

            <Route path="/contact" element={<ContactForm />}></Route>

            <Route path="/login" element={<Login />}></Route>

            <Route
              path="/optionLoginOrRegister"
              element={<OptionLoginOrRegister />}
            ></Route>

            <Route path="/profile" element={<Profile />}></Route>

            <Route path="/changepassword" element={<ChangePassword />}></Route>

            <Route path="/forgotpassword" element={<Forgotpassword />}></Route>

            <Route path="/register" element={<Register />}></Route>

            <Route path="/detail/:id" element={<Detail />}></Route>

            <Route path="/createbook" element={<AddBookForm />}></Route>

            <Route path="/cart" element={<Cart />}></Route>

            <Route path="/editprofile" element={<EditProfile />}></Route>

            <Route path="/managebooks/:id" element={<BookManager />}></Route>

            <Route
              path="/purchasehistory"
              element={<PurchaseHistory />}
            ></Route>
          </Routes>

          {pathname !== "/dashboard" && pathname !== "/" && <Footer />}
        </AuthProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
