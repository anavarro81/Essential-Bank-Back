const express = require("express");
const {checkToken} = require("../controllers/otp.controller")

const otpRoutes = express.Router();

// register, login, postUser, updateUser, deleteUser



otpRoutes.post("/checkToken", checkToken);




module.exports= otpRoutes;