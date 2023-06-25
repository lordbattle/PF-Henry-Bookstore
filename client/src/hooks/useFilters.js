import { useState } from "react";

const useFilters = () => {
  const [filters, setFilters] = useState({
    rating: "all",
    price: "all",
    genre: "all",
  });

  const filtersBooks = (arr) => {
    return arr.filter((book) => {
      return (
        (filters.genre === "all" ||
        book.genre.toLowerCase() === filters.genre.toLowerCase()) && (filters.price === "all" ||
        book.price === filters.price)
      );
    }).sort((a,b) => {
      if(filters.rating === "Menor"){
        return a.rating - b.rating;
      } else if(filters.rating === "Mayor"){
        return b.rating - a.rating;
      }

      return 0
    });
  };

  return { setFilters, filtersBooks };
};

export default useFilters;
