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
        return a.averageRating - b.averageRating;
      } else if(filters.rating === "Mayor"){
        return b.averageRating - a.averageRating;
      }

      return 0
    }).sort((a,b) => {
      if(filters.price === "Menor"){
        return a.price - b.price;
      } else if(filters.price === "Mayor"){
        return b.price - a.price;
      }

      return 0
    });
  };

  return { setFilters, filtersBooks };
};

export default useFilters;
