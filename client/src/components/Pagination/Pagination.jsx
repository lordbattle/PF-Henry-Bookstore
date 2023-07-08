const Pagination = ({ currentPage, onPageChange, handleScrollUp, componentRef, pagination }) => {
  const pageNumbers = [];
  const maxPageDisplay = 5; // Número máximo de páginas a mostrar en la paginación
  const totalPages = Math.ceil(pagination / 10);

  // Lógica para generar los números de página
  if (totalPages <= maxPageDisplay) {
    // Si el total de páginas es menor o igual al máximo a mostrar, mostrar todas las páginas
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Si el total de páginas es mayor al máximo a mostrar
    const halfMaxPageDisplay = Math.floor(maxPageDisplay / 2);

    // Mostrar los primeros números de página
    for (let i = 1; i <= halfMaxPageDisplay + 1; i++) {
      pageNumbers.push(i);
    }

    // Mostrar los tres puntos
    pageNumbers.push('...');

    // Mostrar los últimos números de página
    for (let i = totalPages - halfMaxPageDisplay; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  }

  return (
    <ul className="pagination">
      {currentPage > 1 && (
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => {
              onPageChange(currentPage - 1)
            }}
          >
            Previous
          </button>
        </li>
      )}

      {pageNumbers.map((pageNumber, index) => (
        <li
          key={index}
          className={`page-item${pageNumber === currentPage ? " active" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => {
              if (typeof pageNumber === 'number') {
                onPageChange(pageNumber);
                handleScrollUp();
              }
            }}
          >
            {pageNumber}
          </button>
        </li>
      ))}

      {currentPage < totalPages && (
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => {
              onPageChange(currentPage + 1);
            }}
          >
            Next
          </button>
        </li>
      )}

      <div ref={componentRef}></div>
    </ul>
  );
};

export default Pagination;
