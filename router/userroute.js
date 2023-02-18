const express = require("express");

const userRouter = express.Router();
const { userRegister, userLogin } = require("../controlers/user");

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);

module.exports = { userRouter };
