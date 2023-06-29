
const Pagination = ({ currentPage, onPageChange }) => {
  const pageNumbers = [];
  const maxPageDisplay = 9; // Número máximo de páginas a mostrar en la paginación
  const totalPages = 9;

  // Generar los números de página
  for (let i = 1; i <= Math.min(totalPages, maxPageDisplay); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {currentPage > 1 && (
        <li className="page-item">
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
            Previous
          </button>
        </li>
      )}

      {pageNumbers.map((pageNumber) => (
        <li
          key={pageNumber}
          className={`page-item${pageNumber === currentPage ? ' active' : ''}`}
        >
          <button className="page-link" onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </button>
        </li>
      ))}

      {currentPage < totalPages && (
        <li className="page-item">
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
            Next
          </button>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
