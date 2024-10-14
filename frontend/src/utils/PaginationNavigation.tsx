import React from "react";

interface PaginationNavigationProps {
  currentPage: number;
  recordsPerPage: number;
  totalRecords: number;
  onPageChange: (newPage: number) => void;
  pageNumbers: number[];
}

const PaginationNavigation: React.FC<PaginationNavigationProps> = ({
  currentPage,
  recordsPerPage,
  totalRecords,
  onPageChange,
  pageNumbers,
}) => {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  return (
    <div>
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>Previous</button>
      )}
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          disabled={pageNumber === currentPage}
        >
          {pageNumber}
        </button>
      ))}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
      )}
    </div>
  );
};

export default PaginationNavigation;
