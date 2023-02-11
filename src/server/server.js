require("dotenv").config({ path: "../../.env" });

// SERVER
const express = require("express");
const app = express();
const router = express.Router;
const PORT = process.env.PORT || 9999;
const fetch = require("node-fetch");

// MONGODB
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const User = require("./models/user.js");

// CONTROLLERS
const pokedex_controller = require("./controller/pokedexController");
const randomPokemon_Controller = require("./controller/randomPokemonController.js");
const uri = `mongodb+srv://bonobot:${process.env.MONGO_PASSWORD}@cluster0.6sigoq7.mongodb.net/?retryWrites=true&w=majority`;
const clientParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
};

// connect to db
mongoose
  .connect(uri, clientParams)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// API Endpoints
// **************** POKEMON GACHA ***********************

// POST Request to roll a random pokemon and add it to a Pokedex in the database
app.post("/api/randomPokemon/:id", randomPokemon_Controller.getRandomPokemon);

// GET reuqest to display all the information regarding an users pokedex
app.get("/api/pokedex/:id", pokedex_controller.getPokedex);

app.listen(PORT, () => {
  console.log(`Bono Bot's server is listening on port ${PORT}`);
});
