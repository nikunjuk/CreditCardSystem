const path = require("path");
const multer = require("multer");
require("dotenv").config();

//<-----------======== TESTIMONIAL IMAGE ===============----------------->

let testimonialImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.AVATAR_PATH);
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    // cb(null, Date.now() + ext);
    cb(null, "testimonial" + "-" + Date.now() + ext);
  },
});

exports.uploadTestimonialImage = multer({
  storage: testimonialImage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/webp"
    ) {
      callback(null, true);
    } else {
      // callback(null, false);               // this is For callBack False and Console print Only.
      // console.log("Only image/jpeg & image/png & image/webp files are supported!");

      callback("Only image/jpeg & image/png & image/webp files are supported!");
    }
  },
});


//<-----------======== TESTIMONIAL IMAGE ===============----------------->

let avatarImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.AVATAR_PATH);
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    // cb(null, Date.now() + ext);
    cb(null, "avatar" + "-" + Date.now() + ext);
  },
});

exports.avatarImage = multer({
  storage: avatarImage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/webp"
    ) {
      callback(null, true);
    } else {
      // callback(null, false);               // this is For callBack False and Console print Only.
      // console.log("Only image/jpeg & image/png & image/webp files are supported!");

      callback("Only image/jpeg & image/png & image/webp files are supported!");
    }
  },
});
