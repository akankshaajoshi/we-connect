const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const userRoute = require("../routes/users");
const authRoute = require("../routes/auth");
const postRoute = require("../routes/posts");
const conversationRoute = require("../routes/conversations");
const messageRoute = require("../routes/messages");

const app = express();

dotenv.config();
app.use(cors({ origin: "*", credentials: true }));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(express.json());
app.use(morgan("common"));

mongoose.connect(process.env.MONGO_URL);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(
  "/images",
  express.static(path.join(__dirname, "public/images"), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    },
  })
);
app.get("/", (req, res) => {
  res.status(200).json("Server working");
});
app.use("/posts", postRoute);
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully.");
  } catch (err) {
    console.log(err);
  }
});

app.listen(8080, () => {
  console.log("Backend server is ready.");
});

module.exports = app;
