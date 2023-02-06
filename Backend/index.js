const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

// Database Connection ....
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public/files")));
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// make Directory
try {
  const path = "./public/files";

  fs.access(path, (error) => {
    // To check if given directory
    // already exists or not
    if (error) {
      // If current directory does not exist then create it
      fs.mkdir(path, { recursive: true }, (error) => {
        if (error) {
          console.log(error);
        }
      });
    }
  });
} catch (err) {
  console.error(err);
}

app.use("/public/files", express.static("public/files"));

const user = require("./routes/user.routes");

app.use("/api/v1", [user]);

var port = process.env.PORT;

app.listen(port, () => {
  console.log(`your serever start at http://localhost:${port}`);
});
