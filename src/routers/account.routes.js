const express = require("express");
const {withdrawMoney, deleteAllAccounts, getAccountByIBAN} = require("../controllers/account.controller");
const accountRoutes = express.Router();



// userRoutes.post("/register", register);
// userRoutes.post("/login", login);
// userRoutes.get("/getAllUsers", getUsers);

// userRoutes.get("/getUser/:id", getUser);

// userRoutes.put("/update/:id", updateUser);

accountRoutes.delete("/deleteAllAccounts", deleteAllAccounts);

accountRoutes.put("/withdraw-money/:id", withdrawMoney);
accountRoutes.get("/get-account-by-IBAN/:IBAN", getAccountByIBAN)


module.exports= accountRoutes;