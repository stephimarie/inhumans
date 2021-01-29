// In the code below, is the configuration used for uploading images on the server.

// import multer module
const multer = require("multer");
const path = require("path");

// configure multer to use Disk Storage engine
const multerStorage = multer.diskStorage({
  // destination determines folder to store the uploaded files.
  destination: (req, file, cb) => {
    cb(null, "./public/images/uploads");
  },
  // filename determines the name of the file inside the destination folder
  filename: (req, file, cb) => {
    console.log(file);
    const ext = file.mimetype.split("/")[1];
    cb(null, `actor-${Date.now()}.${ext}`);
  },
});

// define a filter to only allow images to pass
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Not an image! Please upload an image.", false);
  }
};

// combine the storage specification and imageFilter into a new multer object and then export it as a middleware: file up to only 1MB can be uploaded
const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 10000000 },
  fileFilter: imageFilter,
});

module.exports = upload;
