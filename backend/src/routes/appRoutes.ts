import express from "express";
import multer from "multer";
import fs from "fs";
import {
  uploadCsvFile,
  displayCsvFile,
  searchCsvFile,
} from "../controllers/appController";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadFolder = "uploads/";
    fs.mkdirSync(uploadFolder, { recursive: true }); // Create the folder if it doesn't exist
    cb(null, uploadFolder);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "uploaded.csv"); // Rename to "uploaded.csv" to avoid different filenames being uploaded
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.endsWith(".csv")) {
      return cb(null, false);
    }
    cb(null, true);
  },
});

const router = express.Router();

router.post("/upload", upload.single("file"), uploadCsvFile);
router.get("/", displayCsvFile);
router.get("/search", searchCsvFile);

export default router;
