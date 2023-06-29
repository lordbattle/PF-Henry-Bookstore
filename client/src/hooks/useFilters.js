import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getBooksByFilters } from "../redux/actions/index";

const useFilters = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    price: 0,
    genre: 'all',
    author: 'all',
    limit: 10,
    orderPrice: 'neu',
    orderTitle: 'neu',
  });

  const dispatch = useDispatch();

  const filtersBooks = (obj) => {
    const options = {
      ...obj,
      page: currentPage,
    };

    dispatch(getBooksByFilters(options));
  };

  useEffect(() => {
    filtersBooks(filters);
  }, [currentPage, filters]);

 /*  const filtLimit = filters.limit / 10;
  console.log(filtLimit); */

  return { setFilters, setCurrentPage, currentPage };
};

export default useFilters;
