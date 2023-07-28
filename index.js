const express = require("express");
const cors = require("cors");
const path = require('path');
const multer = require("multer");
const app = express();
// app.use(express.static("./public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors({
  origin:'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization','multipart/form-data']
}))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+"_"+file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  return res.json({ mess: "hi" });
});

app.post("/upload",upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file provided." });
  }
  console.log(req.file)
  return res.json({image:req.file, message: "Image uploaded successfully." });
});

app.listen(5000, () => {
  console.log("server running");
});
