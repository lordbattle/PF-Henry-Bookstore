import SearchBar from "../SearchBar/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import useStorage from "../LocalStorage/LocalStorage"
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { UserAuth } from "../../context/AuthContextFirebase";
import { logoutUser } from "../../redux/actions";

const Nav = () => {

  const user = useSelector(state=>state.user)

  const [isLogout, setIsLogout] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = UserAuth();

  useEffect(() => {
    setIsLogout(true);
  }, []);
  const handlerLogOut = async () => {
    await logout();
    dispatch(logoutUser());
    navigate("/");
  }

  const { cart } = useStorage();
  const [totalItems, setTotalItems] = useState(0);
  const [updateKey, setUpdateKey] = useState(0);

  useEffect(() => {
    setTotalItems(cart.length);
  }, [cart]);

  useEffect(() => {
    const handleStorageChange = () => {
      setUpdateKey((prevKey) => prevKey + 1);
    };

    window.addEventListener("cart", handleStorageChange);

    return () => {
      window.removeEventListener("cart", handleStorageChange);
    };
  }, []);

  function alert(){
    Swal.fire({
      title: 'Log out',
      text: "Are you sure you want to log out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        handlerLogOut()
        Swal.fire(
          'Log out!',
          '',
          'success'
        )
      } else{
        navigate("/home")
      }
    })
  }

  return (
    <div key={updateKey}
      className="px-2 py-3 border-0 bg_navbar text-white"
      style={{ backgroundColor: "#71a5e5" }}
    >
      <Stack direction="horizontal" gap={3}>
        <span className="p-2 link-as-text">
          <Link to={"/"} className="text-decoration-none fs-4 text-reset">
            TheLiteraryCorner
          </Link>
        </span>

        <SearchBar />

        <div className="w-100 m-0 d-flex justify-content-end">
          {" "}
          <span className="p-2 ms-0 link-as-text">
            <Link to={"/dashboard"} className="text-decoration-none fs-5 text-reset">
              Dashboard
            </Link>
          </span>{" "}
          <span className="p-2 ms-0 link-as-text">
            <Link to={"/home"} className="text-decoration-none fs-5 text-reset">
              Home
            </Link>
          </span>{" "}
          <span className="p-2 ms-0 link-as-text">
            <Link
              to={"/profile"}
              className="text-decoration-none fs-5 text-reset"
            >
              Profile
            </Link>
          </span>
          <span className="p-2 ms-0 link-as-text">
            <Link
              to={"/about"}
              className="text-decoration-none fs-5 text-reset"
            >
              About Us
            </Link>
          </span>
          <span className="p-2 ms-0 link-as-text">
            <Link
              to={"/createbook"}
              className="text-decoration-none fs-5 text-reset"
            >
              Publish Books
            </Link>
          </span>
          <span className="p-2 ms-0 link-as-text">
            <Link to={"/cart"}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/107/107831.png?w=360"
                width={"25em"}
              ></img><span className="badge bg-secondary">{totalItems}</span>
            </Link>
          </span>
        </div>

        <b className="vr" />
        <div className="w-25 d-flex justify-content-center gap-3">
        {!user.id ? 
        <>
          <Link to={"/login"} className="text-decoration-none  fs-5 text-reset">
            Log in
          </Link>

          <Link
            to={"/register"}
            className="text-decoration-none fs-5 text-reset"
          >
            Sign up
          </Link> 
        </> 
          : 
        <>
          <button style={{border: 'none', backgroundColor : '#71a5e5', fontSize: '20px'}} onClick={alert}>Log out</button>
        </>
        }
        
        </div>
      </Stack>
    </div>
  );
};

export default Nav;
