require("dotenv").config();
const fileupload = require("express-fileupload");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const { Router } = require("./router/fileuploadroute");
const { userRouter } = require("./router/userroute");
const database = require("./db/database");

app.use(express.static("./uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileupload());
app.use(require("cors")());
app.use("/files", Router);
app.use("/api", userRouter);

database(process.env.DB_URL);

app.listen(PORT);
