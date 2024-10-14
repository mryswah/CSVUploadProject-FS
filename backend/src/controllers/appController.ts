import { Request, Response } from "express";
import { parseCSV } from "../services/appService";
import * as fs from "fs";

let fileData: any[] = [];

export const uploadCsvFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.file) {
    res.status(400).send("Please upload a .csv file.");
    return;
  }

  const fileExtension = req.file.originalname.split(".").pop()?.toLowerCase();

  if (fileExtension !== "csv" || req.file.mimetype !== "text/csv") {
    res.status(400).send("Please upload a .csv file.");
    return;
  }

  try {
    const filePath = req.file.path;
    const fileBuffer = await fs.promises.readFile(filePath);
    const data = await parseCSV(fileBuffer);
    fileData = data; // Store data in memory
    console.log("File uploaded and processed successfully:", fileData);

    // Call displayCsvFile function after successful upload
    displayCsvFile(req, res);
    // res.status(200).send('File uploaded and processed successfully.');
  } catch (error) {
    console.log("error : ", error);
    const errorMessage =
      (error as Error).message || "An error occurred during file processing.";
    res.status(500).send("Error processing file: " + errorMessage);
  }
};

export const displayCsvFile = (req: Request, res: Response): void => {
  res.status(200).json({ data: fileData, total: fileData.length });
};

export const searchCsvFile = (req: Request, res: Response): void => {
  const { query } = req.query;
  const searchQuery = query ? query.toString().toLowerCase() : "";

  const filteredData = fileData.filter((item) =>
    Object.values(item).some((value) =>
      typeof value === "string"
        ? value.toLowerCase().includes(searchQuery)
        : false
    )
  );

  res.json({ data: filteredData });
};
