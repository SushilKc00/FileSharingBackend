const express = require("express");
const Router = express.Router();
const {
  uploadFile,
  getAllImages,
  downloadImage,
  deleteFile,
  userFileDelete,
} = require("../controlers/uploadfile");

Router.get("/:uuid", getAllImages);
Router.get("/download/uploads/:uuid", downloadImage);
Router.post("/", uploadFile);
Router.post("/user/delete", userFileDelete);

module.exports = { Router };
