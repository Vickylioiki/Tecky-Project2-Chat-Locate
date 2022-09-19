import fs from "fs";
import formidable from "formidable";

const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });
export const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
});
