import React from 'react';

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksByFilters } from "../../../../redux/actions";
import Filters from "../../../Filters/Filters";
import Pagination from "../../../Pagination/Pagination";
import useFilters from "../../../../hooks/useFilters";
import { Link } from "react-router-dom";

const BookTable = () => {

    const dispatch = useDispatch();
    // const users = useSelector((state) => state.users);
     const books = useSelector((state) => state.books);
   
     useEffect(() => {
       dispatch(getBooksByFilters());
     }, [dispatch]);
   
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
   
     console.log(books);

    return (
        <div>
        <div className="d-flex flex-column" ref={componentRef}>
          <div className="d-flex">
            <Filters setFilters={setFilters} />
            <h2>Libros</h2>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>ISBN</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={index}>
                    <td>{book.title}</td>
                    <td>{book.identifier}</td>
                    <td>{book.active ? "true" : "false"}</td>
                    <td>
                      <button >
                      <Link to={`/ManageBooks/${book.id}`}>Ver detalle</Link>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <p>{book.subtitle}</p>
                <p>{book.publishedDate}</p>
                <p>{book.publisher}</p>
                <p>{book.description}</p>
                <p>{book.pages}</p>
                <p>{book.averageRating}</p>
                <p>{book.usersRating}</p>
                <p>{book.bookPic}</p>
                <p>{book.price}</p>
                <p>{book.stock}</p>
                <p>{book.authors}</p>
                <p>{book.genre}</p> */}
          </div>
          {/* <Card currentBooks={books} /> */}
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

export default  BookTable ;