import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getBooksByFilters } from "../redux/actions/index";

const useFilters = () => {
  const [filters, setFilters] = useState({
    rating: "all",
    price: 0,
    genre: "all",
    author: "all",
    page: 1,
    limit: 10,
    orderPrice:0,
    orderTitle: 0
  });

  const dispatch = useDispatch();

  const filtersBooks = (obj) => {
    let options = {
      rating: obj.rating || "all",
      genre: obj.genre || "all",
      price: obj.price !== 0 ? obj.price :  0,
      author: obj.author || "all",
    };

    dispatch(getBooksByFilters(options));
  };

  useEffect(() => {
    setFilters({
      rating: "",
      price: 0,
      genre: "",
      author: "",
    });
  }, []);

  useEffect(() => {
    filtersBooks(filters);
  }, [filters]);

  return { setFilters };
};

export default useFilters;
