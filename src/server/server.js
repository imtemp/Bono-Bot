require("dotenv").config({ path: "../../.env" });
const express = require("express");
const app = express();
const PORT = process.env.PORT || 9999;
const fetch = require("node-fetch");
const User = require("./models/user.js");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://bonobot:${process.env.MONGO_PASSWORD}@cluster0.6sigoq7.mongodb.net/?retryWrites=true&w=majority`;
const clientParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
};

mongoose
  .connect(uri, clientParams)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello");
});

// API Endpoints
app.get("/api/steam", async (req, res) => {
  try {
    const response = fetch(
      "https://store.steampowered.com/api/featuredcategories"
    );
    const data = await response.json();
    res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

// **************** POKEMON GACHA ***********************

// POST Request to roll a random pokemon and add it to a Pokedex in the database
app.post("/api/randomPokemon/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let user = await User.findOne({ discordId: id });
    if (!user) {
      user = new User({
        discordId: id,
        pokedex: [],
      });
    }

    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon-species/?limit=0"
    );
    const data = await response.json();
    const totalPokemon = data.count;

    const pokemonResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${Math.floor(
        Math.random() * totalPokemon + 1
      )}`
    );
    const pokemonData = await pokemonResponse.json();

    const pokemonToStore = {
      name: pokemonData.name,
      sprite: pokemonData.sprites,
    };
    user.pokedex.push(pokemonToStore);
    await user.save();

    console.log(`${pokemonToStore.name} has been added to ${user.discordId}`);
    const pokemon = {
      name: pokemonData.name,
      sprite: pokemonData.sprites,
      id: user.discordId,
    };

    res.json(pokemon);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error");
  }
});

// GET reuqest to display all the information regarding an users pokedex
app.get("/api/pokedex/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // use id to access mongo database
    const user = await User.findOne({ discordId: id });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user.pokedex);
  } catch (err) {
    res.status(500).send("Error");
  }
});

app.listen(PORT, () => {
  console.log(`Bono Bot's server is listening on port ${PORT}`);
});
