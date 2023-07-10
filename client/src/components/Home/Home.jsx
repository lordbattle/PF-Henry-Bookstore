import Card from "../Card/Card";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { logingUser, postUsers } from "../../redux/actions";
import Filters from "../Filters/Filters";
import useFilters from "../../hooks/useFilters";
import Pagination from "../Pagination/Pagination";
import { getPaginationBooks } from "../../redux/actions";
//import { UserAuth } from "../../context/AuthContextFirebase";
/* import { useNavigate } from "react-router-dom"; */

const Home = () => {
  const { books, pagination } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaginationBooks());
  }, []);

  console.log("home pagination", pagination);

  /*
import { useDispatch, useSelector } from "react-redux";
import { logingUser, postUsers,getPaginationBooks } from "../../redux/actions";
import Filters from "../Filters/Filters";
import useFilters from "../../hooks/useFilters";
import Pagination from "../Pagination/Pagination";
import { UserAuth } from "../../context/AuthContextFirebase";
/* import { useNavigate } from "react-router-dom"; */

  /* const userlogin = useSelector((state) => state.user);
  const { user } = UserAuth();
  //const navigate = useNavigate();
  

  useEffect(() => {
    console.log("HOME USER AQUI  ", user);

    if (user) {
      setTimeout(() => {
        dispatch(postUsers(user));
        console.log;
      }, 3000);

      setTimeout(() => {
        dispatch(logingUser(user));
      }, 4000);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("userDataLogin", JSON.stringify(userlogin));
  }, [userlogin]); */

  const { setFilters, setCurrentPage, currentPage } = useFilters();
  const componentRef = useRef(null);

  const handleScrollUp = () => {
    componentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setFilters({
      author: "all",
      genre: "all",
      page: 1,
      limit: 10,
      price: 0,
      orderPrice: "nue",
      orderTitle: "nue",
    });
  }, [setFilters]);

  return (
    <div className="d-flex flex-column" ref={componentRef}>
      <div className="d-flex">
        <Filters setFilters={setFilters} />
        <Card currentBooks={books} />
      </div>

      <div className="d-flex justify-content-center p-2">
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          handleScrollUp={handleScrollUp}
          componentRef={componentRef}
          pagination={pagination}
        />
      </div>
    </div>
  );
};

export default Home;
