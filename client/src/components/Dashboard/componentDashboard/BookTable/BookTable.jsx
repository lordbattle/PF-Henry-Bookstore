import React from 'react';

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksByFilters, getBookAll } from "../../../../redux/actions";
import { useFuncionRangoDePaginacion, DOTS } from '../../utils/usePaginationRange'
import Filters from "../../../Filters/Filters";
import Pagination from "../../../Pagination/Pagination";
import useFilters from "../../../../hooks/useFilters";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import style from "../BookTable/BookTable.module.css"
let books = [];
let bookByTitle = [];
const BOTONES_A_MOSTRAR = 3;
const CANTIDAD_POR_PAGINA = 8;
const BOTONES_HERMANOS = 1;

const BookTable = () => {
  const [upLoad, setUpLoad] = useState(false);
  const [search, setSearch] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [actived, setActived] = useState(true);


  const dispatch = useDispatch();
  if (!upLoad) {
    dispatch(getBookAll());
    setUpLoad(true);
  }
  books = useSelector((state) => state.books);
  const verifiActived = () => {
    if (actived === 'false') {
      if (bookByTitle.length !== 0) {
        bookByTitle = bookByTitle.filter((book) => book.active === false)
      } else {
        bookByTitle = bookByTitle.filter((book) => book.active === true)
      }
      if (books.length !== 0) {
        books = books.filter((book) => book.active === false)
      } else {
        books = books.filter((book) => book.active === true)
      }
    }
  }
  const CalcTotalDePaginas = () => {
    verifiActived();
    return Math.ceil((bookByTitle.length === 0 ? books.length : bookByTitle.length) / CANTIDAD_POR_PAGINA);
  }
  let totalDePaginas = CalcTotalDePaginas();


  useEffect(() => {
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: "0px",
    });

  }, [paginaActual]);

  const active = (event) => {
    setActived(event.target.defaultValue)
  }



  const filterTitle = () => {
    if (search.length === 0) {
      bookByTitle = [];
    } else {
      let bookNews = books.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
      );
      if (bookNews.length !== 0) {

        bookByTitle = bookNews;
        setPaginaActual(1);
      }
      else {
        setPaginaActual(1);
        Swal.fire({
          icon: "error",
          title: "Title not found!",
          text: `The book with the indicated name : ${search} does not exist in this list!`,
          backdrop: true,
        });
        bookByTitle = [];
        setSearch('');
      }
    }
  };
  let rangoDePaginacion = useFuncionRangoDePaginacion({
    totalDePaginas,
    botonesaMostrar: BOTONES_A_MOSTRAR,
    botonesHermanos: BOTONES_HERMANOS,
    paginaActual
  });
  //Accion para dar a la siguiente pagina 
  function siguientePagina() {
    setPaginaActual((page) => page + 1);

  }
  //Accion para dar a la anterior pagina
  function anteriorPagina() {
    setPaginaActual((page) => page - 1);

  }
  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setPaginaActual(pageNumber);

  }
  const onChangeSearch = (evento) => {
    setSearch(evento.target.value);
    filterTitle();
  };

  const booksPaginaActual = () => {
    const indiceInicio = paginaActual * CANTIDAD_POR_PAGINA - CANTIDAD_POR_PAGINA;
    const inidceFin = indiceInicio + CANTIDAD_POR_PAGINA;
    verifiActived();
    return bookByTitle.length === 0 ? books.slice(indiceInicio, inidceFin) : bookByTitle.slice(indiceInicio, inidceFin);
  };

  return (
    <div>
      <div className="d-flex" >
        {/* <Filters setFilters={setFilters} /> */}
        <div className="d-flex flex-column">
          <h2 style={{ fontWeight: 'bold' }}>BOOKS</h2>
          <div className={style.filters}>
            <input
              type="text"
              className="mb-2 form-control w-25"
              placeholder="Search User"
              onChange={onChangeSearch}
              value={search}
            />
            <div className={style.divRadio}>
              <span className={style.span}>Active: </span>
              <input type="radio" id="radioT" value="true" name='active' onChange={active} /> <label className={style.labelRadio} htmlFor="radioT">True</label>
              <input type="radio" id="radioF" value="false" name='active' onChange={active} /><label className={style.labelRadio} htmlFor="radioF">False</label>

            </div>
          </div>

          <table className={style.table}>
            <thead className={style.thead}>
              <tr>
                <th>Title</th>
                <th>ISBN</th>
                <th>usersRating</th>
                <th>stock</th>
                <th>Active</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {booksPaginaActual().map((book, index) => (
                <tr key={index}>
                  <td>{book.title}</td>
                  <td>{book.identifier}</td>
                  <td>{book.usersRating}</td>
                  <td>{book.stock}</td>
                  <td>{book.active ? "true" : "false"}</td>
                  <td>
                    <button style={{ borderRadius: '10px' }}>
                      <Link to={`/ManageBooks/${book.id}`} style={{ color: 'white', textDecoration: 'none' }}>See Datail</Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Se muestran los botones correspondientes, por defecto 5
                el anterior , el siguiente y los botones primero , actual y
                ultimo y su grupo de botones con o sin DOTS */}
      <div className={style.pagination}>
        {/* Boton Anterior */}
        <button
          onClick={anteriorPagina}
          className={paginaActual === 1 ? style.prevDisabled: style.prev}
        >
          Anterior
        </button>
        {/* Se muestra el grupo correspondiente de nums o DOTS segun el boton/pagina que se encuentre
                */}
        {
          rangoDePaginacion.map((item, index) => {
            if (item === DOTS) {
              return (
                <button key={index} className={style.paginationItem}>
                  {DOTS}
                </button>
              );
            }
            return (
              <button
                key={index}
                onClick={changePage}
                className={paginaActual === item ? style.paginationItemActive : style.paginationItemNotActive}
              >
                <span>{item}</span>
              </button>
            );
          })}
        {/* Boton siguiente */}
        <button
          onClick={siguientePagina}
          className={paginaActual === totalDePaginas ? style.nextDisabled : style.next}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default BookTable;