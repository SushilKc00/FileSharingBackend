const express = require("express");
const Router = express.Router();
const {
  uploadFile,
  getAllImages,
  downloadImage,
  deleteFile,
} = require("../controlers/uploadfile");

Router.get("/:uuid", getAllImages);
Router.get("/download/uploads/:uuid", downloadImage);
Router.post("/", uploadFile);
Router.post("/delete", deleteFile);

module.exports = { Router };
