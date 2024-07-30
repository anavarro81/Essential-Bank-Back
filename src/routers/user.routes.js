const express = require("express");
const {register,login, getUsers, getUser, updateUser, deleteUser, deleteAllUser, setPassword } = require("../controllers/user.controllers");
const {isAuth, isAdmin} = require("../middlewares/auth");
const userRoutes = express.Router();

// register, login, postUser, updateUser, deleteUser



userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post('/set-password', setPassword)
userRoutes.get("/getAllUsers", getUsers);

userRoutes.get("/getUser/:id", getUser);

userRoutes.put("/update/:id", updateUser);

userRoutes.delete("/delete/:id", deleteUser);
userRoutes.delete("/deleteAllUser", deleteAllUser);





module.exports= userRoutes;