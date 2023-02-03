const express = require("express");
const app = express();
const PORT = 9999;
const fetch = require("node-fetch");
require("dotenv").config();
// MongoDB Setup
const MongoClient = require('mongodb').MongoClient;
const uri =
  `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.6sigoq7.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

client.connect(err =>{
  console.log(err);
  const db = client.db("pokedex");
  console.log("connected successfully")
  const pdCollection = db.collection("pokemon");

  pdCollection.insertOne({
    name: "asd",
    type: "123",
    user_id: "discID"
  })

  client.close();
})
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

// Routers

app.listen(PORT, () => {
  console.log(`Bono Bot's server is listening on port ${PORT}`);
});
