import Card from "../Card/Card";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filters from "../Filters/Filters";
import useFilters from "../../hooks/useFilters";
import Pagination from "../Pagination/Pagination";
import { UserAuth } from "../../context/AuthContextFirebase";
import { logingUser, postUsers } from "../../redux/actions";
/* import { useNavigate } from "react-router-dom"; */

const Home = () => {
  const { user } = UserAuth();
  const dispatch = useDispatch();
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
  }, []);


  const { books } = useSelector((state) => state);
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
        />
      </div>
    </div>
  );
};

export default Home;
