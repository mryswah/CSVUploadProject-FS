import React, { useState, useEffect } from "react";
import { CsvData } from "../types/CsvData";

interface SearchCsvFileProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  data: CsvData | null;
  setSearchResults: (results: CsvData | null) => void;
}

const SearchCsvFile: React.FC<SearchCsvFileProps> = ({
  searchTerm: initialSearchTerm,
  setSearchTerm,
  data,
  setSearchResults,
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    setLocalSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  useEffect(() => {
    const filterData = () => {
      if (!data || !data.data) return { data: [] };

      const filteredData = data.data.filter((row: any) =>
        Object.values(row).some((value: any) =>
          value.toString().toLowerCase().includes(localSearchTerm.toLowerCase())
        )
      );

      return { data: filteredData };
    };

    setSearchResults(filterData());
  }, [data, localSearchTerm, setSearchResults]);

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value);
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={localSearchTerm}
        onChange={handleSearchTermChange}
      />
    </div>
  );
};

export default SearchCsvFile;
