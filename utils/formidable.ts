import fs from "fs";
import formidable from "formidable";
import express from "express";

const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });
export const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
});

export const formParse = (req: express.Request) => {
  return new Promise<any>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      try {
        const contentFile = fields.content;
        const fromSocketId = fields.fromSocketId;
        let imageFile: any = ""; //因為有可能係null
        let file = Array.isArray(files.image) ? files.image[0] : files.image; //如果多過一個file upload, file 就會係一串array
        //upload file都要check, 有機會upload多過一個file(會以array存),
        //如果係Array就淨係拎第1個file, 即file.image[0],
        //如果只有一個file, 即files.image
        if (file) {
          imageFile = file.newFilename;
        }

        resolve({
          contentFile,
          imageFile,
        });
      } catch (err) {
        console.log("err");
        reject(err);
      }
    });
  });
};
