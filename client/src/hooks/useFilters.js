import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getBooksByFilters } from "../redux/actions/index";

const useFilters = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    author: "all",
    genre: "all",
    page: 1,
    limit: 10,
    price: 0,
    orderPrice: "nue",
    orderTitle: "nue",
  });

  const dispatch = useDispatch();

  const filtersBooks = (obj) => {
    const options = {
      ...obj,
      page: currentPage,
    };

    try {
       dispatch(getBooksByFilters(options));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    try {
      filtersBooks(filters);
    } catch (error) {
      console.log(error.message);
    }
    
  }, [currentPage,filters]);

  return { setFilters, setCurrentPage, currentPage };
};

export default useFilters;
