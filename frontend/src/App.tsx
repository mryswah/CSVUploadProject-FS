import React, { useState } from "react";
import DisplayCsvFile from "./components/DisplayCsvFile";
import SearchCsvFile from "./components/SearchCsvFile";
import UploadCsvFile from "./components/UploadCsvFile";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadedData, setUploadedData] = useState<any | null>(null);
  const [searchResults, setSearchResults] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleUploadComplete = (data: any) => {
    setUploadedData(data);
    setSearchTerm("");
    setSearchResults(null);
    setCurrentPage(1);
  };

  const renderSearchResults = () => {
    if (
      searchResults &&
      searchResults.data &&
      Object.keys(searchResults.data).length > 0
    ) {
      return (
        <DisplayCsvFile
          data={searchResults.data}
          totalRecords={searchResults.data.length}
        />
      );
    }
    if (uploadedData?.data?.length === 0) {
      return <p>No data available.</p>;
    }

    if (searchTerm && uploadedData) {
      return <p>Nothing found for {searchTerm}</p>;
    } else {
      return <p></p>;
    }
  };

  return (
    <div id="container">
      <div id="container-top">
        <div id="top">
          <h1>CSV Data Uploader</h1>
          <UploadCsvFile onUploadComplete={handleUploadComplete} />
          <SearchCsvFile
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            data={uploadedData}
            setSearchResults={setSearchResults}
          />
        </div>
      </div>
      <div id="container-bottom">
        <div id="bottom">{renderSearchResults()}</div>
      </div>
    </div>
  );
};

export default App;
