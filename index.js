const express = require("express");
const cors = require("cors");
const path = require('path');
const multer = require("multer");
const app = express();
const fs = require('fs');

fs.mkdir('uploads', (err) => {
  if (err) {
    console.error('Error creating folder:', err);
  } else {
    console.log('Folder created successfully.');
  }
});
const folderPath = './uploads';

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
    return res.status(400).json({ error: "No image file provided."});
  }
  
  return res.json({image:req.file, message: "Image uploaded successfully."});
});
app.get("/getAllImgs",async (req,res)=>{
  var imgFiles=[];
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
    } else {
      files.forEach(file => {
        imgFiles.push(file);
      });
    }
    return res.json({files:imgFiles});
  });
  
})

app.listen(5000, () => {
  console.log("server running");
});
