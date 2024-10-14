import React, { useState } from "react";
import axios from "axios";

interface UploadCsvFileProps {
  onUploadComplete: (data: any) => void;
}

const UploadCsvFile: React.FC<UploadCsvFileProps> = ({ onUploadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setError(null);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://localhost:3000/api/upload",
          formData,
          {
            onUploadProgress: (event) => {
              const percent = Math.round(
                (event.loaded * 100) / (event.total || 1)
              );
              setProgress(percent);
            },
          }
        );

        if (response.status === 200) {
          // console.table(response.data.data);
          onUploadComplete(response.data);
        }
      } catch (error) {
        // console.error("Upload failed:", error);
        setError("Upload failed, please upload a .csv file.");
        onUploadComplete(null);
      }
    }
  };
  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        role="button"
      />
      {error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : progress > 0 ? (
        <div>Upload Progress: {progress}%</div>
      ) : null}
    </div>
  );
};

export default UploadCsvFile;
