import fs from "fs/promises";
import path from "path";

export async function deleteUploadFolder() {
  const cwd = process.cwd();
  const uploadFolder = path.join(cwd, "uploads");
  try {
    const files = await fs.readdir(uploadFolder);
    await Promise.all(
      files.map((file) => fs.unlink(path.join(uploadFolder, file)))
    );
    await fs.rmdir(uploadFolder);
  } catch (err) {
    console.error(err);
  }
}

export async function handleExit() {
  await deleteUploadFolder();
  process.exit();
}
