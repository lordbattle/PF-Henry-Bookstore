import Card from "../Card/Card";
import style from './Home.module.css';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { logingUser, postUsers } from "../../redux/actions";
import Filters from "../Filters/Filters";
import useFilters from "../../hooks/useFilters";
import Pagination from "../Pagination/Pagination";
import { getPaginationBooks } from "../../redux/actions";
import { useFuncionRangoDePaginacion, DOTS } from "../Dashboard/utils/usePaginationRange";
//import { UserAuth } from "../../context/AuthContextFirebase";
/* import { useNavigate } from "react-router-dom"; */
const BOTONES_A_MOSTRAR = 3;
const CANTIDAD_POR_PAGINA = 6;
const BOTONES_HERMANOS = 1;

const Home = () => {
  const { books, pagination } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaginationBooks());
  }, []);

  const { setFilters, setCurrentPage, currentPage } = useFilters();
  const componentRef = useRef(null);

  const handleScrollUp = () => {
    componentRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    setFilters({
    });
  }, [setFilters]);
  const [paginaActual, setPaginaActual] = useState(1);

  let totalDePaginas = Math.ceil((books.length) / CANTIDAD_POR_PAGINA)
  console.log(books, ' soy librossss a renderizar' , totalDePaginas , ' total de paginas')

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: "0px",
    });

  }, [paginaActual]);

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
  const booksPaginaActual = () => {
    const indiceInicio = paginaActual * CANTIDAD_POR_PAGINA - CANTIDAD_POR_PAGINA;
    const inidceFin = indiceInicio + CANTIDAD_POR_PAGINA;
    return books.slice(indiceInicio, inidceFin);
  };

  return (
    <div className="d-flex flex-column" ref={componentRef}>
      <div className="d-flex">
        <Filters setFilters={setFilters} setPaginaActual={setPaginaActual} />
        <Card currentBooks={ booksPaginaActual()} />
      </div>

      <div className="d-flex justify-content-center p-2">
        {/* Se muestran los botones correspondientes, por defecto 5
                el anterior , el siguiente y los botones primero , actual y
                ultimo y su grupo de botones con o sin DOTS */}
        <div className={style.pagination}>
          {/* Boton Anterior */}
          <button
            onClick={anteriorPagina}
            className={paginaActual === 1 ? style.prevDisabled : style.prev}
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
    </div>
  );
};

export default Home;
