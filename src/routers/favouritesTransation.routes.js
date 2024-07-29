const express = require("express");
const {newfavourite, getFavouriteTransation, getFavouritesTransfers, getFavouritesPays} = require("../controllers/favoritesTransation.controller");
const favouriteTransationRoutes = express.Router();

// register, login, postUser, updateUser, deleteUser




favouriteTransationRoutes.post("/new-favourite", newfavourite);
//FavouriteTransationRoutes.get("/getAllUsers", getUsers);

favouriteTransationRoutes.get("/get-Favourite-Transations/:id", getFavouriteTransation);
favouriteTransationRoutes.get("/favourites-transfers/:id", getFavouritesTransfers)
favouriteTransationRoutes.get("/favourites-pays/:id", getFavouritesPays)

// FavouriteTransationRoutes.put("/update/:id", updateUser);

// FavouriteTransationRoutes.delete("/delete/:id", deleteUser);




module.exports= favouriteTransationRoutes;