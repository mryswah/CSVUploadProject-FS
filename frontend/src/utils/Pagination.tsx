import React from "react";
import PaginationNavigation from "./PaginationNavigation";

interface PaginationProps {
  totalRecords: number;
  onPageChange: (newPage: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalRecords,
  onPageChange,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalRecords / 10);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div>
      <PaginationNavigation
        currentPage={currentPage}
        recordsPerPage={10}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        pageNumbers={pageNumbers}
      />
    </div>
  );
};

export default Pagination;
