import React, { useState, useEffect } from "react";
import { CsvData } from "../types/CsvData";
import Pagination from "../utils/Pagination";
import TableRow from "../utils/TableRow";

const DisplayCsvFile: React.FC<{
  data: CsvData["data"];
  totalRecords: number;
}> = ({ data, totalRecords }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p role="alert">No data available.</p>;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key, index) => (
              <th key={index}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex: number) => (
            <TableRow key={rowIndex} row={row} />
          ))}
        </tbody>
      </table>
      <Pagination
        totalRecords={totalRecords}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
};

export default DisplayCsvFile;
