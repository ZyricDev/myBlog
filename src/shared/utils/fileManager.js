import path from "path";
import fs from "fs/promises";
import AppError from "../errors/AppError.js";
import logger from "./logger.js";

const deleteFile = async (filePath) => {
  try {
    const absolutePath = path.join(process.cwd(), filePath);
    await fs.unlink(absolutePath);
  } catch (err) {
    if (err.code === "ENOENT") {
      logger.warn(`[deleteFile] File not found, skipping: ${filePath}`);
      return;
    }
    throw new AppError(`Failed to delete file: ${err.message}`, 500);
  }
};

export default { deleteFile };
