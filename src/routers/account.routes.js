const express = require("express");
const {withdrawMoney} = require("../controllers/account.controller");
const accountRoutes = express.Router();



// userRoutes.post("/register", register);
// userRoutes.post("/login", login);
// userRoutes.get("/getAllUsers", getUsers);

// userRoutes.get("/getUser/:id", getUser);

// userRoutes.put("/update/:id", updateUser);

// userRoutes.delete("/delete/:id", deleteUser);

accountRoutes.put("/withdraw-money/:id", withdrawMoney);


module.exports= accountRoutes;