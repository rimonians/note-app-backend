// Import external module
const multer = require("multer");
const { v4: uuid4 } = require("uuid");
const path = require("path");
const createError = require("http-errors");

// Single uploader function
const singleUploader = (
  subfolder_path,
  allowed_file_types,
  max_file_size,
  error_msg
) => {
  // File uplaods folder
  const UPLOADS_FOLDER = path.join(
    __dirname,
    `../public/uploads/${subfolder_path}/`
  );

  // Initialize storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileName = uuid4();
      const extName = path.extname(file.originalname);
      cb(null, fileName + extName);
    },
  });

  // Initialize upload object
  const upload = multer({
    storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(error_msg));
      }
    },
  });

  // Return upload object
  return upload;
};

// Export single uploader function
module.exports = singleUploader;
