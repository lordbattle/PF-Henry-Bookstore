import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    const maxPageDisplay = 5; // Número máximo de páginas a mostrar en la paginación
  
    // Generar los números de página
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
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
  
        {currentPage > maxPageDisplay && (
          <li className="page-item">
            <button className="page-link" onClick={() => onPageChange(1)}>
              1
            </button>
          </li>
        )}
  
        {currentPage > maxPageDisplay && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
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
  
        {currentPage < totalPages - maxPageDisplay + 1 && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}
  
        {currentPage < totalPages - maxPageDisplay + 1 && (
          <li className="page-item">
            <button className="page-link" onClick={() => onPageChange(totalPages)}>
              {totalPages}
            </button>
          </li>
        )}
  
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
