const express = require("express");
const {newTransation, getTransationTransation, getTransationsTransfers, getTransationsPays} = require ('../controllers/transation.controller')
const transationRoutes = express.Router();






transationRoutes.post("/new-transation", newTransation);


transationRoutes.get("/get-transation/:id", getTransationTransation);
transationRoutes.get("/transfers/:id", getTransationsTransfers)
transationRoutes.get("/pays/:id", getTransationsPays)

// transationRoutes.put("/update/:id", updateUser);

// transationRoutes.delete("/delete/:id", deleteUser);




module.exports= transationRoutes;