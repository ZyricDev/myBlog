import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const createUploader = (folderName, maxSizeInMB = 3) => {
  const uploadDir = path.join("uploads", folderName);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      fs.mkdir(uploadDir, { recursive: true }, (err) => {
        if (err) {
          return cb(err, null);
        }

        cb(null, uploadDir);
      });
    },

    filename: (req, file, cb) => {
      crypto.randomBytes(8, (err, hash) => {
        if (err) {
          return cb(err, null);
        }

        const ext = path.extname(file.originalname).toLowerCase();
        const uniqueName = `${Date.now()}-${hash.toString("hex")}${ext}`;

        cb(null, uniqueName);
      });
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new AppError(
          "The file format is invalid. Only JPG, PNG, WEBP, and SVG are allowed.",
          415,
        ),
        false,
      );
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: maxSizeInMB * 1024 * 1024 },
  });
};

export default createUploader;
