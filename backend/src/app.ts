import express from "express";
import fileRoutes from "./routes/appRoutes";
import { handleExit } from "./utils/utils";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api", fileRoutes);

// Deletes "uploads/"" folder when application ends/terminates - sort of like a cleanup
const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];

signals.forEach((signal) => {
  process.on(signal, async () => {
    await handleExit();
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
