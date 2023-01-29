const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 9999;
const fetch = require("node-fetch");

const uri =
  "mongodb+srv://cluster0.jtunn.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority";

app.get("/", (req, res) => {
  res.send("Hello");
});

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

app.get("/api/randomPokemon", async (req, res) => {
  try {
    let totalPokemon;
    fetch("https://pokeapi.co/api/v2/pokemon-species/?limit=0")
      .then((response) => response.json())
      .then((data) => {
        totalPokemon = data.count;
        fetch(
          "https://pokeapi.co/api/v2/pokemon/" +
            Math.floor(Math.random() * totalPokemon + 1)
        )
          .then((response) => response.json())
          .then((data) => {
            const pokemon = {
              name: data.name,
              sprite: data.sprites,
            };
            console.log(data);
            res.send(pokemon);
          });
      });
  } catch (err) {
    console.log(err);
  }
});
app.listen(PORT, () => {
  console.log(`Bono Bot's server is listening on port ${PORT}`);
});
