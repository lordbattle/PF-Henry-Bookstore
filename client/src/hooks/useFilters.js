import  { useState } from "react";

const useFilters = () => {
  const [filters, setFilters] = useState({
    rating: "all",
    price: "all",
    genre: "all",
  });

  const filtersBooks = (arr) => {
    return arr.filter((book) => {
      return (
        filters.genre === "all" ||
        (book.genre === filters.genre && filters.rating === "all") ||
        (book.usersRating === filters.rating && filters.price === "all") ||
        book.price === filters.price
      );
    });
  };

  return {setFilters, filtersBooks}
};


export default useFilters;
